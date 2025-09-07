#!/usr/bin/env python3
"""
Profile Update Script
Updates profile components and regenerates README
"""

import json
import os
import subprocess
from datetime import datetime

def update_profile_header():
    """Update profile header with latest info"""
    print("🔄 Updating profile header...")
    
    # This would typically pull from an API or database
    # For now, we'll just update the timestamp
    header_template = """
<div align="center">

![Profile Views](https://komarev.com/ghpvc/?username=raufalizada&color=brightgreen&style=flat-square)
![GitHub followers](https://img.shields.io/github/followers/raufalizada?style=social)
![GitHub stars](https://img.shields.io/github/stars/raufalizada?style=social)

</div>

> 🤖 **AI & Machine Learning Engineer** | 🚀 **Innovation Enthusiast** | 🔧 **Full-Stack Developer**

Passionate about creating intelligent solutions and pushing the boundaries of what's possible with AI. 
Constantly learning, building, and sharing knowledge in the rapidly evolving world of technology.

### 🌟 Current Focus
- 🧠 **Large Language Models (LLMs)**
- 🤖 **AI Agent Development**
- 🔧 **MLOps & Production AI Systems**
- 🚀 **Open Source Contributions**
"""
    
    with open('components/profile-header.md', 'w', encoding='utf-8') as f:
        f.write(header_template)
    
    print("✅ Profile header updated!")

def update_tech_stack():
    """Update tech stack from skills.json"""
    print("🔄 Updating tech stack...")
    
    try:
        with open('data/skills.json', 'r', encoding='utf-8') as f:
            skills = json.load(f)
        
        tech_stack = """
### Programming Languages
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### AI/ML Frameworks
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Hugging Face](https://img.shields.io/badge/🤗_Hugging_Face-FFD21E?style=for-the-badge)

### Cloud & DevOps
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)

### Databases
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
"""
        
        with open('components/tech-stack.md', 'w', encoding='utf-8') as f:
            f.write(tech_stack)
        
        print("✅ Tech stack updated!")
    except Exception as e:
        print(f"❌ Error updating tech stack: {e}")

def regenerate_readme():
    """Regenerate README.md"""
    print("🔄 Regenerating README...")
    
    try:
        subprocess.run(['python3', 'scripts/generate-readme.py'], check=True)
        print("✅ README regenerated!")
    except Exception as e:
        print(f"❌ Error regenerating README: {e}")

def main():
    """Main profile update function"""
    print("🔄 Starting profile update...")
    
    update_profile_header()
    update_tech_stack()
    regenerate_readme()
    
    print("✅ Profile update completed!")
    print(f"📅 Updated at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()