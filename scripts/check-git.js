import { execSync } from 'child_process';
import path from 'path';

const projectDir = '/vercel/share/v0-project';

try {
  console.log('=== Current Branch ===');
  console.log(execSync('git branch -v', { cwd: projectDir }).toString());

  console.log('\n=== Git Status ===');
  console.log(execSync('git status', { cwd: projectDir }).toString());

  console.log('\n=== Recent Commits ===');
  console.log(execSync('git log --oneline -5', { cwd: projectDir }).toString());

  console.log('\n=== Changed Files (Staged/Unstaged) ===');
  console.log(execSync('git diff --name-only', { cwd: projectDir }).toString());
  console.log(execSync('git diff --cached --name-only', { cwd: projectDir }).toString());

} catch (error) {
  console.error('Error:', error.message);
}
