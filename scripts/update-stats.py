#!/usr/bin/env python3
"""
Stats Update Script
Updates project statistics and metrics automatically
"""

import json
import os
import subprocess
from datetime import datetime

def get_git_stats():
    """Get Git repository statistics"""
    try:
        # Get total commits
        commits = subprocess.check_output(['git', 'rev-list', '--all', '--count']).decode().strip()
        
        # Get languages used
        languages = subprocess.check_output(['git', 'ls-files', '*.py', '*.js', '*.html', '*.css', '*.md']).decode().strip().split('\n')
        
        # Get last commit date
        last_commit = subprocess.check_output(['git', 'log', '-1', '--format=%ci']).decode().strip()
        
        return {
            "total_commits": int(commits),
            "total_files": len([f for f in languages if f]),
            "last_updated": last_commit,
            "languages_used": len(set([f.split('.')[-1] for f in languages if f and '.' in f]))
        }
    except Exception as e:
        print(f"Git stats error: {e}")
        return {}

def count_files():
    """Count project files by category"""
    counts = {
        "total_files": 0,
        "markdown_files": 0,
        "python_scripts": 0,
        "json_configs": 0,
        "css_styles": 0
    }
    
    for root, dirs, files in os.walk('.'):
        # Skip .git and node_modules
        dirs[:] = [d for d in dirs if not d.startswith('.git') and d != 'node_modules']
        
        for file in files:
            if file.startswith('.git'):
                continue
                
            counts["total_files"] += 1
            
            if file.endswith('.md'):
                counts["markdown_files"] += 1
            elif file.endswith('.py'):
                counts["python_scripts"] += 1
            elif file.endswith('.json'):
                counts["json_configs"] += 1
            elif file.endswith('.css'):
                counts["css_styles"] += 1
    
    return counts

def update_achievements():
    """Update achievements.json with latest stats"""
    try:
        with open('data/achievements.json', 'r', encoding='utf-8') as f:
            achievements = json.load(f)
    except:
        achievements = {"metrics": {}, "badges": []}
    
    # Get current stats
    git_stats = get_git_stats()
    file_counts = count_files()
    
    # Update metrics
    achievements["metrics"].update({
        "last_updated": datetime.now().isoformat(),
        "repository_stats": git_stats,
        "file_counts": file_counts
    })
    
    # Save updated achievements
    with open('data/achievements.json', 'w', encoding='utf-8') as f:
        json.dump(achievements, f, indent=2, ensure_ascii=False)
    
    print("✅ Achievements updated!")

def main():
    """Main update function"""
    print("📊 Updating project statistics...")
    
    update_achievements()
    
    print("✅ All stats updated successfully!")
    print(f"📅 Updated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()