#!/bin/bash
cd /vercel/share/v0-project

echo "=== Current Branch ==="
git branch -v

echo -e "\n=== Git Status ==="
git status

echo -e "\n=== Recent Commits ==="
git log --oneline -5

echo -e "\n=== Changed Files ==="
git diff --name-only

echo -e "\n=== Remote Status ==="
git log --oneline -3 origin/v0/david-m-brown-2654-745823bf 2>/dev/null || echo "Could not fetch remote branch info"
