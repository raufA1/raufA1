#!/usr/bin/env python3
"""
README Generator Script
Generates README.md from components and data files
"""

import json
import os
from datetime import datetime

def load_json(file_path):
    """Load JSON data from file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Warning: {file_path} not found")
        return {}

def read_component(file_path):
    """Read markdown component"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Warning: {file_path} not found")
        return ""

def generate_readme():
    """Generate complete README.md"""
    print("🚀 Generating README.md...")
    
    # Load data
    projects = load_json('data/projects.json')
    skills = load_json('data/skills.json')
    achievements = load_json('data/achievements.json')
    contacts = load_json('data/contacts.json')
    
    # Load components
    header = read_component('components/profile-header.md')
    tech_stack = read_component('components/tech-stack.md')
    projects_showcase = read_component('components/projects-showcase.md')
    achievements_metrics = read_component('components/achievements-metrics.md')
    contact_section = read_component('components/contact-section.md')
    
    # Generate README content
    readme_content = f"""# Rauf Alizada - AI & Machine Learning Engineer

{header}

## 🚀 Tech Stack & Skills
{tech_stack}

## 💼 Featured Projects
{projects_showcase}

## 🏆 Achievements & Metrics
{achievements_metrics}

## 📫 Contact & Connect
{contact_section}

---
<div align="center">
<i>Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</i><br>
<i>Generated with ❤️ using Python automation</i>
</div>
"""
    
    # Write README
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("✅ README.md generated successfully!")

if __name__ == "__main__":
    generate_readme()