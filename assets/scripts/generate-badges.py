#!/usr/bin/env python3
"""
Badge Generator Script
Automatically generates badge URLs based on configuration
"""

import json
import urllib.parse
from pathlib import Path

def load_badge_config():
    """Load badge configuration from config file"""
    config_path = Path("config/badge-config.json")
    if config_path.exists():
        with open(config_path) as f:
            return json.load(f)
    return {}

def generate_badge_url(label, message, color, logo=None, style="for-the-badge"):
    """Generate shields.io badge URL"""
    base_url = "https://img.shields.io/badge"
    
    # Format label and message
    label_encoded = urllib.parse.quote(label.replace(" ", "_"))
    message_encoded = urllib.parse.quote(message.replace(" ", "_"))
    
    # Build URL
    badge_url = f"{base_url}/{label_encoded}-{message_encoded}-{color}"
    
    # Add parameters
    params = []
    if style:
        params.append(f"style={style}")
    if logo:
        params.append(f"logo={logo}")
        params.append("logoColor=white")
    
    if params:
        badge_url += "?" + "&".join(params)
    
    return badge_url

def generate_project_badges():
    """Generate badges for all projects"""
    config = load_badge_config()
    
    projects = [
        {
            "name": "Smart CLI",
            "label": "Smart_CLI",
            "message": "AI_Platform", 
            "color": "00D4AA",
            "logo": "terminal"
        },
        {
            "name": "Clipflow",
            "label": "Clipflow",
            "message": "Video_AI",
            "color": "FF6B6B", 
            "logo": "video"
        },
        {
            "name": "LLM Family Pack",
            "label": "LLM_Pack",
            "message": "AI_Management",
            "color": "6C5CE7",
            "logo": "brain"
        }
    ]
    
    badge_markdown = "# Project Badges\n\n"
    
    for project in projects:
        url = generate_badge_url(
            project["label"],
            project["message"], 
            project["color"],
            project.get("logo"),
            config.get("badge_styles", {}).get("default", "for-the-badge")
        )
        
        badge_markdown += f"## {project['name']}\n"
        badge_markdown += f"![{project['name']}]({url})\n"
        badge_markdown += f"```\n![{project['name']}]({url})\n```\n\n"
    
    # Write to file
    output_path = Path("assets/generated-badges.md")
    with open(output_path, "w") as f:
        f.write(badge_markdown)
    
    print(f"✅ Generated badges saved to {output_path}")

def generate_skill_badges():
    """Generate skill and technology badges"""
    skills = [
        {"name": "Python", "color": "3776AB", "logo": "python"},
        {"name": "FastAPI", "color": "009688", "logo": "fastapi"},
        {"name": "Docker", "color": "2496ED", "logo": "docker"},
        {"name": "Kubernetes", "color": "326CE5", "logo": "kubernetes"},
        {"name": "OpenAI", "color": "412991", "logo": "openai"},
        {"name": "Claude", "color": "FF9A00", "logo": "anthropic"},
    ]
    
    badge_markdown = "# Technology Badges\n\n"
    
    for skill in skills:
        url = generate_badge_url(skill["name"], "", skill["color"], skill.get("logo"))
        badge_markdown += f"![{skill['name']}]({url}) "
    
    badge_markdown += "\n\n## Individual Badges\n\n"
    
    for skill in skills:
        url = generate_badge_url(skill["name"], "", skill["color"], skill.get("logo"))
        badge_markdown += f"**{skill['name']}:** `![{skill['name']}]({url})`\n\n"
    
    # Write to file
    output_path = Path("assets/skill-badges.md")
    with open(output_path, "w") as f:
        f.write(badge_markdown)
    
    print(f"✅ Generated skill badges saved to {output_path}")

if __name__ == "__main__":
    print("🎨 Generating badges...")
    generate_project_badges()
    generate_skill_badges()
    print("✅ Badge generation completed!")

---

