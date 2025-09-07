<div class="profile-container">

<!-- Banner Image -->
<div class="profile-banner">
  <!-- The banner image will be controlled by the CSS based on the theme -->
  <img src="assets/images/banner_light.png" alt="Profile Banner" class="banner_light" />
  <img src="assets/images/banner_dark.png" alt="Profile Banner" class="banner_dark" />
</div>

<!-- Profile Header -->
<div align="center">
  <h1>Rauf Aliyev</h1>
  <p>AI & Full-Stack Developer</p>
  <div class="badge-container">
    <a href="https://github.com/raufA1" target="_blank" class="badge-item"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
    <a href="https://linkedin.com/in/your-username" target="_blank" class="badge-item"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
    <a href="https://twitter.com/your-username" target="_blank" class="badge-item"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter"/></a>
  </div>
</div>

---

<!-- Tech Stack -->
<div class="profile-section">
  <div class="section-header">
    <span class="section-icon">🛠️</span>
    <h2 class="section-title">Tech Stack</h2>
  </div>
  <div class="tech-stack-grid">
    <div class="tech-category">
      <h4>Languages</h4>
      <div class="tech-badges">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
        <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
      </div>
    </div>
    <div class="tech-category">
      <h4>Frameworks & Libraries</h4>
      <div class="tech-badges">
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
        <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
      </div>
    </div>
    <div class="tech-category">
      <h4>AI/ML</h4>
      <div class="tech-badges">
        <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow"/>
        <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch"/>
        <img src="https://img.shields.io/badge/LangChain-A7B7D8?style=for-the-badge&logo=langchain&logoColor=black" alt="LangChain"/>
      </div>
    </div>
  </div>
</div>

---

<!-- Projects Showcase -->
<div class="profile-section">
  <div class="section-header">
    <span class="section-icon">🚀</span>
    <h2 class="section-title">Projects Showcase</h2>
  </div>

  <div class="project-showcase">
    <div class="project-header">
      <h3 class="project-title">Smart CLI</h3>
      <div class="project-badges">
        <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square" alt="Python"/>
        <img src="https://img.shields.io/badge/Typer-007B7C?style=flat-square" alt="Typer"/>
      </div>
    </div>
    <p class="project-description">An intelligent command-line interface for developers, designed for efficiency and ease of use.</p>
    <details class="project-features">
      <summary>Features</summary>
      <div class="feature-list">
        <ul>
          <li>Intuitive command structure</li>
          <li>AI-powered suggestions</li>
          <li>Customizable plugins</li>
        </ul>
      </div>
    </details>
    <a href="https://github.com/raufA1/smart-cli" target="_blank"><img src="assets/images/projects/smart-cli-demo.gif" alt="Smart CLI Demo" width="100%"/></a>
  </div>

  <div class="project-showcase">
    <div class="project-header">
      <h3 class="project-title">ClipFlow</h3>
      <div class="project-badges">
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square" alt="JavaScript"/>
        <img src="https://img.shields.io/badge/Electron-47848F?style=flat-square" alt="Electron"/>
        <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square" alt="React"/>
      </div>
    </div>
    <p class="project-description">A cross-platform clipboard manager with cloud synchronization and history.</p>
    <details class="project-features">
      <summary>Features</summary>
      <div class="feature-list">
        <ul>
          <li>Cloud sync across devices</li>
          <li>Searchable clipboard history</li>
          <li>Support for text, images, and files</li>
        </ul>
      </div>
    </details>
    <a href="https://github.com/raufA1/clipflow" target="_blank"><img src="assets/images/projects/clipflow-demo.gif" alt="ClipFlow Demo" width="100%"/></a>
  </div>
</div>

---

<!-- Achievements & Metrics -->
<div class="profile-section">
  <div class="section-header">
    <span class="section-icon">📊</span>
    <h2 class="section-title">Achievements & Metrics</h2>
  </div>
  <div class="stats-container">
    <div class="stat-card">
      <span class="stat-value">{{TOTAL_STARS}}</span>
      <span class="stat-label">GitHub Stars</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{{CONTRIBUTIONS}}</span>
      <span class="stat-label">Contributions (90 Days)</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">2</span>
      <span class="stat-label">Hackathons Won</span>
    </div>
     <div class="stat-card">
      <span class="stat-value">{{REPOS}}</span>
      <span class="stat-label">Public Repos</span>
    </div>
  </div>
  <p align="center" style="font-size: 0.8rem; color: var(--text-tertiary);"><i>Last updated: {{LAST_UPDATED}}</i></p>
</div>

---

<!-- Contact Section -->
<div class="profile-section">
  <div class="section-header">
    <span class="section-icon">📫</span>
    <h2 class="section-title">Get In Touch</h2>
  </div>
  <div class="contact-grid">
    <a href="mailto:your.email@example.com" class="contact-item">
      <span class="contact-icon">📧</span>
      <span class="contact-label">Email</span>
    </a>
    <a href="https://linkedin.com/in/your-username" target="_blank" class="contact-item">
      <span class="contact-icon">💼</span>
      <span class="contact-label">LinkedIn</span>
    </a>
    <a href="https://twitter.com/your-username" target="_blank" class="contact-item">
      <span class="contact-icon">🐦</span>
      <span class="contact-label">Twitter</span>
    </a>
  </div>
</div>

</div>