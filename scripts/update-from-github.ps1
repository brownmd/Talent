param(
    [string]$Remote = "origin",
    [string]$Branch = "",
    [switch]$Stash,
    [switch]$NoRebase
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Invoke-Git {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Args
    )

    & git @Args
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Args -join ' ') failed."
    }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is not installed or not available in PATH."
}

$insideRepo = (& git rev-parse --is-inside-work-tree 2>$null)
if ($LASTEXITCODE -ne 0 -or $insideRepo.Trim() -ne "true") {
    throw "This script must be run inside a Git repository."
}

if ([string]::IsNullOrWhiteSpace($Branch)) {
    $Branch = (& git rev-parse --abbrev-ref HEAD).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "Could not detect current branch."
    }

    if ($Branch -eq "HEAD") {
        throw "Detached HEAD detected. Re-run with -Branch <branch-name>."
    }
}

$hasLocalChanges = ((& git status --porcelain) -join "`n").Trim().Length -gt 0
$didStash = $false

if ($hasLocalChanges) {
    if (-not $Stash) {
        throw "Uncommitted changes found. Commit/stash first, or re-run with -Stash."
    }

    $stamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    Invoke-Git -Args @("stash", "push", "--include-untracked", "-m", "auto-stash-before-update-$stamp")
    $didStash = $true
    Write-Host "Stashed local changes."
}

try {
    Write-Host "Fetching latest from $Remote/$Branch..."
    Invoke-Git -Args @("fetch", $Remote, $Branch)

    $pullArgs = @("pull")
    if (-not $NoRebase) {
        $pullArgs += "--rebase"
    }
    $pullArgs += @($Remote, $Branch)

    Write-Host "Pulling updates..."
    Invoke-Git -Args $pullArgs

    if ($didStash) {
        Write-Host "Re-applying stashed changes..."
        & git stash pop
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Could not auto-apply stash cleanly. Resolve conflicts, then run 'git stash list'."
        }
    }

    Write-Host "Update complete."
}
catch {
    Write-Error $_
    if ($didStash) {
        Write-Warning "Your work is still saved in stash if it was not applied. Check with 'git stash list'."
    }
    exit 1
}
