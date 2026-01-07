# 📚 Git Commands Reference Guide

## 🎯 Basic Git Workflow

### Initial Setup (Already Done ✅)
```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Anukajagar/goa-trip.git
git push -u origin main
```

---

## 📤 Push Commands

### Basic Push
```bash
# Push to current branch
git push

# Push to specific branch
git push origin main

# Push with upstream tracking (-u flag)
git push -u origin main
```

### Force Push (Use with Caution!)
```bash
# Force push (overwrites remote)
git push --force

# Safer force push (won't overwrite if remote has new commits)
git push --force-with-lease
```

### Push All Branches
```bash
# Push all branches
git push --all origin

# Push all tags
git push --tags
```

### Push New Branch
```bash
# Create and push new branch
git checkout -b feature-branch
git push -u origin feature-branch
```

---

## 💾 Common Workflow Commands

### Check Status
```bash
# See what files have changed
git status

# Short status
git status -s
```

### Add Files
```bash
# Add specific file
git add filename.js

# Add all files in directory
git add .

# Add all files (including deletions)
git add -A

# Add only modified files (not new files)
git add -u

# Add specific file types
git add *.js
git add src/**/*.js
```

### Commit Changes
```bash
# Commit with message
git commit -m "Add feature X"

# Commit all tracked changes
git commit -am "Update all files"

# Amend last commit
git commit --amend -m "New commit message"

# Commit with detailed message
git commit -m "Title" -m "Detailed description here"
```

### Combined Add + Commit + Push
```bash
# Quick workflow
git add .
git commit -m "Your message"
git push
```

---

## ⬇️ Pull Commands

### Basic Pull
```bash
# Pull from current branch
git pull

# Pull from specific branch
git pull origin main

# Pull with rebase (cleaner history)
git pull --rebase
```

---

## 🌿 Branch Commands

### Create Branches
```bash
# Create new branch
git branch feature-name

# Create and switch to new branch
git checkout -b feature-name

# Create branch from specific commit
git branch feature-name <commit-hash>
```

### Switch Branches
```bash
# Switch to existing branch
git checkout main
git checkout feature-name

# Switch to branch (newer syntax)
git switch main
```

### List Branches
```bash
# List local branches
git branch

# List remote branches
git branch -r

# List all branches (local + remote)
git branch -a

# List branches with last commit
git branch -v
```

### Delete Branches
```bash
# Delete local branch
git branch -d feature-name

# Force delete local branch
git branch -D feature-name

# Delete remote branch
git push origin --delete feature-name
```

---

## 🔍 View History

### Log Commands
```bash
# View commit history
git log

# Compact one-line log
git log --oneline

# Show last N commits
git log -5

# Show commits with file changes
git log --stat

# Show commits with full diff
git log -p

# Graphical log
git log --graph --oneline --all

# Show commits by author
git log --author="YourName"

# Show commits in date range
git log --since="2 weeks ago"
git log --after="2024-01-01" --before="2024-12-31"
```

### View Changes
```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Compare branches
git diff main feature-branch

# Show changes in specific file
git diff filename.js
```

---

## 🔄 Sync with Remote

### Fetch vs Pull
```bash
# Download remote changes (doesn't merge)
git fetch origin

# Download and merge changes
git pull origin main
```

### View Remote Info
```bash
# List remotes
git remote -v

# Show remote details
git remote show origin
```

### Update Remote URL
```bash
# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git
```

---

## 🗂️ Specific to Your Project

### Add All Project Files
```bash
# Stage all changes
git add .

# Stage specific files
git add docker-compose.yml
git add prometheus.yml
git add grafana-datasource.yml
git add server/index.js

# Stage documentation
git add *.md
```

### Commit Your Docker Setup
```bash
git add docker-compose.yml Dockerfile .dockerignore prometheus.yml grafana-*.yml
git commit -m "Add Docker deployment with Prometheus, Grafana, and cAdvisor monitoring"
git push
```

### Commit Your Monitoring Guides
```bash
git add CADVISOR_GUIDE.md GRAFANA_GUIDE.md MONITORING.md DEPLOYMENT_SUMMARY.md
git commit -m "Add comprehensive monitoring documentation"
git push
```

### Commit All Code Changes
```bash
git add server/ src/ package.json
git commit -m "Update application with metrics endpoint"
git push
```

---

## 🚫 Ignore Files (.gitignore)

Your `.gitignore` should include:
```
node_modules/
dist/
.env
*.log
.DS_Store
```

### Add Files to Ignore
```bash
# Create/edit .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Update .gitignore"
git push
```

---

## ↩️ Undo Changes

### Unstage Files
```bash
# Unstage specific file
git reset filename.js

# Unstage all files
git reset
```

### Discard Changes
```bash
# Discard changes in specific file
git checkout -- filename.js

# Discard all local changes
git checkout -- .

# Discard changes (newer syntax)
git restore filename.js
```

### Undo Commits
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific number of commits
git reset --soft HEAD~3
```

### Revert Commit
```bash
# Create new commit that undoes a previous commit
git revert <commit-hash>
```

---

## 🏷️ Tags

### Create Tags
```bash
# Create lightweight tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Tag specific commit
git tag -a v1.0.0 <commit-hash> -m "Release 1.0.0"
```

### Push Tags
```bash
# Push specific tag
git push origin v1.0.0

# Push all tags
git push --tags
```

### List/Delete Tags
```bash
# List all tags
git tag

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0
```

---

## 🔀 Merge & Rebase

### Merge
```bash
# Merge branch into current branch
git merge feature-branch

# Merge with no fast-forward
git merge --no-ff feature-branch
```

### Rebase
```bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (edit history)
git rebase -i HEAD~3
```

---

## 🆘 Emergency Commands

### Stash Changes
```bash
# Save current changes temporarily
git stash

# Save with message
git stash save "Work in progress"

# List stashed changes
git stash list

# Apply last stash
git stash apply

# Apply and remove last stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}
```

### Recover Deleted Files
```bash
# Restore deleted file
git checkout HEAD -- filename.js
```

---

## 📊 Project-Specific Workflows

### Workflow 1: Daily Development
```bash
# Start your day
git pull origin main
git checkout -b feature/new-booking-flow

# Make changes...
git add .
git commit -m "Add booking confirmation page"
git push -u origin feature/new-booking-flow

# When feature is done, merge to main
git checkout main
git pull origin main
git merge feature/new-booking-flow
git push origin main
```

### Workflow 2: Update Documentation
```bash
git pull origin main
# Edit documentation files...
git add *.md
git commit -m "Update monitoring guides with new examples"
git push
```

### Workflow 3: Docker Configuration Changes
```bash
git pull origin main
# Edit docker-compose.yml, Dockerfile, etc...
git add docker-compose.yml Dockerfile prometheus.yml
git commit -m "Update Docker configuration for production"
git push
```

### Workflow 4: Quick Fixes
```bash
# Make quick fix
git add .
git commit -m "Fix: Resolve MongoDB connection timeout"
git push
```

---

## 🛠️ Useful Aliases

Add these to your `.gitconfig`:
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```

Then use:
```bash
git st      # instead of git status
git co main # instead of git checkout main
git br      # instead of git branch
git ci      # instead of git commit
```

---

## 🎯 Best Practices

### Commit Messages
```bash
# Good commit messages
git commit -m "Add Prometheus metrics endpoint to backend"
git commit -m "Fix: Resolve memory leak in event loop"
git commit -m "Update: Improve cAdvisor scraping interval"
git commit -m "Docs: Add comprehensive monitoring guide"

# Bad commit messages (avoid these)
git commit -m "fix"
git commit -m "changes"
git commit -m "update"
```

### Commit Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Before Pushing
```bash
# Always check before pushing
git status
git diff
git log --oneline -5

# Then push
git push
```

---

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| Add all files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push` |
| Pull latest | `git pull` |
| Create branch | `git checkout -b branch-name` |
| Switch branch | `git checkout main` |
| View log | `git log --oneline` |
| Undo changes | `git checkout -- .` |
| Stash changes | `git stash` |

---

## 🚀 Your Current Repository

**Repository:** https://github.com/Anukajagar/goa-trip.git  
**Branch:** main  
**Status:** ✅ Connected and pushed successfully!

### Next Time You Make Changes:
```bash
git add .
git commit -m "Your descriptive message here"
git push
```

That's it! Your changes will be on GitHub! 🎉
