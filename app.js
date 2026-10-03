/* ==========================================================================
   Competency Diagnostic & Job Recommendation System - Application Logic
   ========================================================================== */

// --- DATA DICTIONARIES & TAXONOMY ---

const SKILL_CATEGORIES = {
  web_backend: { name: 'Web & Backend', icon: 'server' },
  cloud_devops: { name: 'Cloud & DevOps', icon: 'cloud' },
  data_ai: { name: 'Data & AI', icon: 'database' },
  frontend_design: { name: 'Frontend & UI/UX', icon: 'layout' },
  systems_security: { name: 'Systems & Security', icon: 'shield' },
  soft_skills: { name: 'Problem Solving & Soft Skills', icon: 'award' }
};

const SKILL_DATABASE = [
  // Web & Backend
  { id: 'python', name: 'Python', category: 'web_backend', domain: 'backend', icon: '🐍' },
  { id: 'sql', name: 'SQL & Relational DBs', category: 'web_backend', domain: 'data', icon: '🗄️' },
  { id: 'nodejs', name: 'Node.js / Express', category: 'web_backend', domain: 'backend', icon: '🟢' },
  { id: 'java', name: 'Java / Spring Boot', category: 'web_backend', domain: 'backend', icon: '☕' },
  { id: 'rest_api', name: 'REST APIs & Microservices', category: 'web_backend', domain: 'backend', icon: '⚡' },
  { id: 'graphql', name: 'GraphQL', category: 'web_backend', domain: 'backend', icon: '🕸️' },
  { id: 'redis', name: 'Redis & Caching', category: 'web_backend', domain: 'backend', icon: '⚡' },

  // Cloud & DevOps
  { id: 'cloud_fund', name: 'Cloud Fundamentals', category: 'cloud_devops', domain: 'cloud', icon: '☁️' },
  { id: 'aws', name: 'AWS Services (EC2, S3, IAM)', category: 'cloud_devops', domain: 'cloud', icon: '🟧' },
  { id: 'azure', name: 'Azure / GCP', category: 'cloud_devops', domain: 'cloud', icon: '🟦' },
  { id: 'docker', name: 'Docker & Containers', category: 'cloud_devops', domain: 'devops', icon: '🐳' },
  { id: 'kubernetes', name: 'Kubernetes (K8s)', category: 'cloud_devops', domain: 'devops', icon: '☸️' },
  { id: 'linux', name: 'Linux System Administration', category: 'cloud_devops', domain: 'cloud', icon: '🐧' },
  { id: 'cicd', name: 'CI/CD Pipelines (GitHub Actions/Jenkins)', category: 'cloud_devops', domain: 'devops', icon: '🔄' },
  { id: 'terraform', name: 'Terraform (IaC)', category: 'cloud_devops', domain: 'devops', icon: '🏗️' },

  // Data & AI
  { id: 'pandas', name: 'Pandas & NumPy', category: 'data_ai', domain: 'data', icon: '🐼' },
  { id: 'data_viz', name: 'Data Viz (Tableau / PowerBI / Seaborn)', category: 'data_ai', domain: 'data', icon: '📊' },
  { id: 'ml_fund', name: 'Machine Learning Fundamentals', category: 'data_ai', domain: 'ai', icon: '🤖' },
  { id: 'tensorflow', name: 'TensorFlow / PyTorch', category: 'data_ai', domain: 'ai', icon: '🧠' },
  { id: 'stats', name: 'Statistics & Probability', category: 'data_ai', domain: 'data', icon: '📈' },
  { id: 'nlp', name: 'NLP & Large Language Models', category: 'data_ai', domain: 'ai', icon: '💬' },
  { id: 'spark', name: 'PySpark & Big Data', category: 'data_ai', domain: 'data', icon: '🔥' },

  // Frontend & UI/UX
  { id: 'html_css', name: 'HTML5 & CSS3', category: 'frontend_design', domain: 'frontend', icon: '🎨' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'frontend_design', domain: 'frontend', icon: '🟨' },
  { id: 'react', name: 'React / Next.js', category: 'frontend_design', domain: 'frontend', icon: '⚛️' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend_design', domain: 'frontend', icon: '📘' },
  { id: 'figma', name: 'Figma & UI Prototyping', category: 'frontend_design', domain: 'uiux', icon: '📐' },
  { id: 'user_research', name: 'User Research & Wireframing', category: 'frontend_design', domain: 'uiux', icon: '🔍' },

  // Systems & Security
  { id: 'git', name: 'Git & Version Control', category: 'systems_security', domain: 'devops', icon: '🌿' },
  { id: 'net_security', name: 'Network Security Basics', category: 'systems_security', domain: 'devops', icon: '🛡️' },
  { id: 'sys_design', name: 'System Design & Architecture', category: 'systems_security', domain: 'backend', icon: '🏛️' },

  // Soft Skills
  { id: 'problem_solving', name: 'Problem Solving & Algorithms', category: 'soft_skills', domain: 'soft', icon: '🧩' },
  { id: 'agile', name: 'Agile & Scrum Methodologies', category: 'soft_skills', domain: 'soft', icon: '🎯' },
  { id: 'team_comm', name: 'Technical Communication & Leadership', category: 'soft_skills', domain: 'soft', icon: '🗣️' }
];

// JOB ROLE DEFINITIONS & MATCHING REQUIREMENTS
const JOB_ROLES = [
  {
    id: 'cloud_engineer',
    title: 'Cloud Engineer',
    icon: '☁️',
    salary: '$105k - $145k',
    demand: 'Very High 🔥',
    description: 'Designs, deploys, and manages cloud infrastructure, serverless architectures, and virtual network security.',
    requiredSkills: ['cloud_fund', 'linux', 'aws', 'docker', 'python', 'problem_solving'],
    optionalSkills: ['azure', 'kubernetes', 'terraform', 'cicd', 'sql', 'sys_design'],
    weights: { cloud: 0.4, devops: 0.3, backend: 0.2, soft: 0.1 },
    certifications: [
      { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', duration: '4-6 weeks' },
      { name: 'HashiCorp Certified Terraform Associate', issuer: 'HashiCorp', duration: '3 weeks' }
    ],
    recommendedCourses: [
      'AWS Cloud Practitioner & Architect Ultimate Bootcamp',
      'Docker & Kubernetes: The Practical Guide',
      'Linux Administration & Shell Scripting Foundations'
    ]
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    icon: '💻',
    salary: '$95k - $135k',
    demand: 'High 🚀',
    description: 'Builds robust server-side application logic, database schemas, REST APIs, and microservices.',
    requiredSkills: ['python', 'sql', 'rest_api', 'git', 'problem_solving'],
    optionalSkills: ['nodejs', 'java', 'redis', 'docker', 'cloud_fund', 'sys_design'],
    weights: { backend: 0.45, data: 0.25, devops: 0.15, soft: 0.15 },
    certifications: [
      { name: 'AWS Certified Developer – Associate', issuer: 'AWS', duration: '4 weeks' },
      { name: 'Oracle Certified Professional: Java SE', issuer: 'Oracle', duration: '6 weeks' }
    ],
    recommendedCourses: [
      'Mastering REST APIs & Microservices with Python & Node',
      'High-Performance SQL Database Design & Query Optimization',
      'Data Structures & Algorithms in Python Masterclass'
    ]
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    icon: '📊',
    salary: '$80k - $115k',
    demand: 'High 📈',
    description: 'Transforms raw business data into actionable insights, dashboards, statistical models, and reports.',
    requiredSkills: ['python', 'sql', 'pandas', 'data_viz', 'stats', 'problem_solving'],
    optionalSkills: ['cloud_fund', 'spark', 'excel', 'ml_fund', 'agile'],
    weights: { data: 0.55, backend: 0.2, soft: 0.15, cloud: 0.1 },
    certifications: [
      { name: 'Google Data Analytics Professional Certificate', issuer: 'Google', duration: '6-8 weeks' },
      { name: 'Microsoft Certified: Power BI Data Analyst', issuer: 'Microsoft', duration: '4 weeks' }
    ],
    recommendedCourses: [
      'Advanced SQL & Data Analysis with PostgreSQL & Pandas',
      'Data Visualization with Tableau & PowerBI',
      'Applied Statistics & Exploratory Data Analysis for Business'
    ]
  },
  {
    id: 'ai_ml_engineer',
    title: 'AI / Machine Learning Engineer',
    icon: '🤖',
    salary: '$120k - $165k',
    demand: 'Extreme 🔥',
    description: 'Develops predictive machine learning models, neural networks, and scalable AI data pipelines.',
    requiredSkills: ['python', 'ml_fund', 'tensorflow', 'stats', 'pandas', 'problem_solving'],
    optionalSkills: ['sql', 'nlp', 'cloud_fund', 'docker', 'spark', 'rest_api'],
    weights: { ai: 0.5, data: 0.25, backend: 0.15, soft: 0.1 },
    certifications: [
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', duration: '6 weeks' },
      { name: 'AWS Certified Machine Learning – Specialty', issuer: 'AWS', duration: '8 weeks' }
    ],
    recommendedCourses: [
      'Machine Learning Specialization by Andrew Ng',
      'Deep Learning & PyTorch for Computer Vision & NLP',
      'MLOps: Deploying Production Machine Learning Models'
    ]
  },
  {
    id: 'fullstack_developer',
    title: 'Fullstack Developer',
    icon: '⚡',
    salary: '$100k - $140k',
    demand: 'Very High 🚀',
    description: 'Builds end-to-end web applications combining dynamic frontends with backend APIs and databases.',
    requiredSkills: ['javascript', 'react', 'html_css', 'nodejs', 'sql', 'rest_api', 'git'],
    optionalSkills: ['typescript', 'python', 'cloud_fund', 'docker', 'problem_solving'],
    weights: { frontend: 0.35, backend: 0.35, devops: 0.15, soft: 0.15 },
    certifications: [
      { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta', duration: '6 weeks' },
      { name: 'AWS Certified Cloud Practitioner', issuer: 'AWS', duration: '2 weeks' }
    ],
    recommendedCourses: [
      'The Complete Full-Stack Web Development Bootcamp (React & Node)',
      'Modern TypeScript & Next.js Architecture',
      'REST APIs and GraphQL with Node.js & React'
    ]
  },
  {
    id: 'ui_ux_designer',
    title: 'UI/UX Product Designer',
    icon: '🎨',
    salary: '$85k - $125k',
    demand: 'High ✨',
    description: 'Crafts intuitive user experiences, interactive prototypes, visual interfaces, and design systems.',
    requiredSkills: ['figma', 'user_research', 'html_css', 'team_comm', 'problem_solving'],
    optionalSkills: ['javascript', 'react', 'agile'],
    weights: { uiux: 0.6, frontend: 0.25, soft: 0.15 },
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google', duration: '8 weeks' }
    ],
    recommendedCourses: [
      'Figma Masterclass: UI/UX & Design Systems',
      'User Research Methods & Usability Testing'
    ]
  },
  {
    id: 'devops_engineer',
    title: 'DevOps & SRE Specialist',
    icon: '🛠️',
    salary: '$115k - $155k',
    demand: 'Very High 🔥',
    description: 'Automates deployment pipelines, manages Kubernetes clusters, and guarantees infrastructure reliability.',
    requiredSkills: ['linux', 'docker', 'kubernetes', 'cicd', 'terraform', 'aws', 'git'],
    optionalSkills: ['python', 'net_security', 'sys_design', 'cloud_fund'],
    weights: { devops: 0.5, cloud: 0.3, backend: 0.1, soft: 0.1 },
    certifications: [
      { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', duration: '6 weeks' },
      { name: 'Docker Certified Associate (DCA)', issuer: 'Mirantis', duration: '4 weeks' }
    ],
    recommendedCourses: [
      'DevOps Beginners to Advanced with Projects',
      'Mastering Kubernetes & Helm Charts',
      'Infrastructure as Code with Terraform & AWS'
    ]
  },
  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    icon: '🛡️',
    salary: '$95k - $135k',
    demand: 'High 🔒',
    description: 'Protects networks, cloud systems, and data endpoints against security vulnerabilities and threats.',
    requiredSkills: ['net_security', 'linux', 'cloud_fund', 'python', 'problem_solving'],
    optionalSkills: ['aws', 'docker', 'git', 'sys_design'],
    weights: { devops: 0.4, cloud: 0.3, backend: 0.15, soft: 0.15 },
    certifications: [
      { name: 'CompTIA Security+', issuer: 'CompTIA', duration: '4-6 weeks' },
      { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', duration: '6 weeks' }
    ],
    recommendedCourses: [
      'Network Security & Threat Analysis Complete Course',
      'Ethical Hacking & Penetration Testing Bootcamp'
    ]
  }
];

// DOMAIN DIAGNOSTIC QUIZZES
const DIAGNOSTIC_QUIZZES = {
  cloud: [
    {
      q: 'Which cloud computing model provides virtualized servers, storage, and networking (e.g. AWS EC2)?',
      options: ['SaaS (Software as a Service)', 'IaaS (Infrastructure as a Service)', 'PaaS (Platform as a Service)', 'FaaS (Function as a Service)'],
      answer: 1
    },
    {
      q: 'What is the primary function of Docker containerization?',
      options: ['To manage relational databases', 'To package code and dependencies into isolated portable units', 'To write CSS styling sheets', 'To encrypt web browser cookies'],
      answer: 1
    },
    {
      q: 'Which tool is widely used for Infrastructure as Code (IaC) to provision cloud resources declaratively?',
      options: ['Terraform', 'Postman', 'Webpack', 'Tableau'],
      answer: 0
    }
  ],
  backend: [
    {
      q: 'Which HTTP method is idempotent and typically used to update existing resources entirely?',
      options: ['POST', 'PUT', 'GET', 'PATCH'],
      answer: 1
    },
    {
      q: 'What is the purpose of database indexing in SQL?',
      options: ['To store backup files on disk', 'To speed up data retrieval queries at the cost of write speed', 'To format dates into string representations', 'To authenticate API users'],
      answer: 1
    },
    {
      q: 'In microservice architectures, what role does Redis commonly play?',
      options: ['CSS preprocessor', 'In-memory caching and fast session key-value storage', 'CI/CD pipeline orchestrator', 'UI design tool'],
      answer: 1
    }
  ],
  data: [
    {
      q: 'In SQL, which clause is used to filter aggregate functions (e.g. COUNT, SUM)?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      answer: 1
    },
    {
      q: 'What does a Pandas DataFrame represent in Python?',
      options: ['A 2D labeled tabular data structure with columns of potentially different types', 'A 3D image rendering array', 'A simple JSON string parser', 'A web scraper bot'],
      answer: 0
    },
    {
      q: 'Which metric measures the linear correlation between two continuous variables?',
      options: ['Standard Deviation', 'Pearson Correlation Coefficient', 'Confusion Matrix', 'Mean Squared Error'],
      answer: 1
    }
  ],
  frontend: [
    {
      q: 'What hook in React is used to execute side effects like fetching data or subscribing to events?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      answer: 1
    },
    {
      q: 'What is the key advantage of TypeScript over standard JavaScript?',
      options: ['Static type checking during development to catch errors early', 'Faster browser execution speeds', 'Built-in database engines', 'Automatic UI design creation'],
      answer: 0
    },
    {
      q: 'Which CSS layout system is best suited for 2-dimensional layouts (rows AND columns)?',
      options: ['Flexbox', 'CSS Grid', 'Float layout', 'Absolute positioning'],
      answer: 1
    }
  ]
};

// PROJECT EXPOSURE CHIPS
const PROJECT_CHIPS_DATA = [
  { id: 'p_api', label: 'Built RESTful APIs / Backend', domain: 'backend' },
  { id: 'p_cloud', label: 'Deployed Web App to AWS/Cloud', domain: 'cloud' },
  { id: 'p_db', label: 'Designed SQL Schemas & Queries', domain: 'data' },
  { id: 'p_docker', label: 'Created Docker Containers & CI/CD', domain: 'devops' },
  { id: 'p_ml', label: 'Trained Machine Learning Model', domain: 'ai' },
  { id: 'p_react', label: 'Built Single Page App in React', domain: 'frontend' },
  { id: 'p_dashboard', label: 'Built Data Visualization Dashboard', domain: 'data' }
];

// PRESET DEMO PROFILES
const PRESET_PROFILES = {
  example_student: {
    skills: {
      python: 4,
      sql: 4,
      cloud_fund: 3,
      problem_solving: 4,
      git: 3,
      rest_api: 3
    },
    education: 'bachelor_cs',
    exp: '0',
    workPref: 'hybrid',
    projects: ['p_api', 'p_cloud', 'p_db'],
    targetRole: 'cloud_engineer'
  },
  web_dev: {
    skills: {
      javascript: 4,
      html_css: 4,
      react: 3,
      nodejs: 3,
      git: 4,
      rest_api: 3
    },
    education: 'bootcamp',
    exp: '1-2',
    workPref: 'remote',
    projects: ['p_api', 'p_react'],
    targetRole: 'fullstack_developer'
  },
  data_enthusiast: {
    skills: {
      python: 4,
      sql: 4,
      pandas: 4,
      stats: 3,
      data_viz: 3,
      problem_solving: 3
    },
    education: 'bachelor_other',
    exp: '0',
    workPref: 'remote',
    projects: ['p_db', 'p_dashboard'],
    targetRole: 'data_analyst'
  },
  ai_aspirant: {
    skills: {
      python: 4,
      ml_fund: 3,
      pandas: 3,
      stats: 4,
      tensorflow: 2,
      sql: 3,
      problem_solving: 4
    },
    education: 'master',
    exp: '1-2',
    workPref: 'remote',
    projects: ['p_ml', 'p_db'],
    targetRole: 'ai_ml_engineer'
  }
};


// --- MAIN APPLICATION STATE ENGINE ---

class CompetencyApp {
  constructor() {
    this.userProfile = {
      skills: {}, // { skillId: rating (1-5) }
      education: 'bachelor_cs',
      expYears: '0',
      workPreference: 'hybrid',
      projects: [],
      quizAnswers: {}, // { domain: score (0-3) }
      targetRole: 'cloud_engineer'
    };

    this.activeCategory = 'all';
    this.activeQuizDomain = 'cloud';
    this.quizState = { answers: {} };

    this.init();
  }

  init() {
    this.renderCategoryFilterTabs();
    this.renderSkillPalette();
    this.renderSelectedSkills();
    this.renderProjectChips();
    this.loadDomainQuiz(this.activeQuizDomain);
    this.populateTargetRoleDropdown();
    
    // Auto-load example student profile by default for immediate visual impact!
    this.loadPresetProfile('example_student');
    
    // Initialize icons
    setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 100);
  }

  // --- TAB NAVIGATION ---
  switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });

    if (tabId === 'competency') {
      this.calculateCompetencyProfile();
      this.renderCompetencyAnalysis();
    } else if (tabId === 'recommendations') {
      this.renderJobRecommendations();
    } else if (tabId === 'roadmap') {
      this.renderCareerRoadmap();
    }
  }

  // --- PRESET PROFILE LOADER ---
  loadPresetProfile(presetKey) {
    if (!presetKey) return;
    
    if (presetKey === 'clear') {
      this.clearSkills();
      this.userProfile.projects = [];
      this.userProfile.quizAnswers = {};
      this.renderProjectChips();
      document.getElementById('presetSelect').value = '';
      return;
    }

    const preset = PRESET_PROFILES[presetKey];
    if (!preset) return;

    this.userProfile.skills = { ...preset.skills };
    this.userProfile.education = preset.education;
    this.userProfile.expYears = preset.exp;
    this.userProfile.workPreference = preset.workPref;
    this.userProfile.projects = [...preset.projects];
    this.userProfile.targetRole = preset.targetRole;

    document.getElementById('educationLevel').value = preset.education;
    document.getElementById('expYears').value = preset.exp;
    document.getElementById('workPreference').value = preset.workPref;

    this.renderSkillPalette();
    this.renderSelectedSkills();
    this.renderProjectChips();
    this.updateTargetRoleSelector();

    // Trigger celebration pulse
    if (window.confetti) {
      window.confetti({ particleCount: 40, spread: 60, origin: { y: 0.2 } });
    }

    this.calculateCompetencyProfile();
  }

  // --- SKILL SELECTION & PROFICIENCY MANAGEMENT ---
  renderCategoryFilterTabs() {
    const container = document.getElementById('skillCategoryTabs');
    let html = `<button class="cat-chip ${this.activeCategory === 'all' ? 'active' : ''}" onclick="app.filterCategory('all')">All Skills</button>`;
    
    Object.keys(SKILL_CATEGORIES).forEach(key => {
      const cat = SKILL_CATEGORIES[key];
      html += `<button class="cat-chip ${this.activeCategory === key ? 'active' : ''}" onclick="app.filterCategory('${key}')">${cat.name}</button>`;
    });

    container.innerHTML = html;
  }

  filterCategory(catKey) {
    this.activeCategory = catKey;
    this.renderCategoryFilterTabs();
    this.renderSkillPalette();
  }

  renderSkillPalette() {
    const container = document.getElementById('skillPalette');
    let filtered = SKILL_DATABASE;
    if (this.activeCategory !== 'all') {
      filtered = SKILL_DATABASE.filter(s => s.category === this.activeCategory);
    }

    let html = '';
    filtered.forEach(skill => {
      const isSelected = !!this.userProfile.skills[skill.id];
      html += `
        <button class="skill-tag ${isSelected ? 'selected' : ''}" onclick="app.toggleSkill('${skill.id}')">
          <span class="skill-icon">${skill.icon}</span>
          <span>${skill.name}</span>
          ${isSelected ? '<i data-lucide="check" style="width:14px;height:14px;"></i>' : '<i data-lucide="plus" style="width:14px;height:14px;"></i>'}
        </button>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  toggleSkill(skillId) {
    if (this.userProfile.skills[skillId]) {
      delete this.userProfile.skills[skillId];
    } else {
      this.userProfile.skills[skillId] = 3; // Default level = 3 (Intermediate)
    }

    this.renderSkillPalette();
    this.renderSelectedSkills();
    this.calculateCompetencyProfile();
  }

  setSkillLevel(skillId, level) {
    this.userProfile.skills[skillId] = level;
    this.renderSelectedSkills();
    this.calculateCompetencyProfile();
  }

  clearSkills() {
    this.userProfile.skills = {};
    this.renderSkillPalette();
    this.renderSelectedSkills();
    this.calculateCompetencyProfile();
  }

  renderSelectedSkills() {
    const container = document.getElementById('selectedSkillsList');
    const selectedIds = Object.keys(this.userProfile.skills);
    
    document.getElementById('selectedCount').innerText = selectedIds.length;
    document.getElementById('skillsCountBadge').innerText = `${selectedIds.length} Skills Selected`;

    if (selectedIds.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i data-lucide="mouse-pointer-click"></i>
          <p>No skills selected yet. Click any skill tag above or select a demo profile!</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let html = '';
    selectedIds.forEach(id => {
      const skillObj = SKILL_DATABASE.find(s => s.id === id);
      if (!skillObj) return;

      const currentRating = this.userProfile.skills[id];

      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= currentRating ? 'active' : ''}" onclick="app.setSkillLevel('${id}', ${i})">★</span>`;
      }

      html += `
        <div class="selected-skill-item">
          <div class="skill-info">
            <span style="font-size:1.1rem;">${skillObj.icon}</span>
            <span class="skill-name">${skillObj.name}</span>
          </div>
          <div class="skill-rating-controls">
            <div class="star-rating" title="Proficiency Level ${currentRating}/5">${starsHtml}</div>
            <button class="btn-remove" onclick="app.toggleSkill('${id}')" title="Remove Skill">
              <i data-lucide="x" style="width:16px;height:16px;"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- BACKGROUND & PROJECTS ---
  renderProjectChips() {
    const container = document.getElementById('projectChips');
    let html = '';
    PROJECT_CHIPS_DATA.forEach(chip => {
      const isSelected = this.userProfile.projects.includes(chip.id);
      html += `
        <button class="project-chip ${isSelected ? 'selected' : ''}" onclick="app.toggleProjectChip('${chip.id}')">
          ${chip.label} ${isSelected ? '✓' : '+'}
        </button>
      `;
    });
    container.innerHTML = html;
  }

  toggleProjectChip(chipId) {
    const idx = this.userProfile.projects.indexOf(chipId);
    if (idx > -1) {
      this.userProfile.projects.splice(idx, 1);
    } else {
      this.userProfile.projects.push(chipId);
    }
    this.renderProjectChips();
    this.calculateCompetencyProfile();
  }

  updateBackgroundData() {
    this.userProfile.education = document.getElementById('educationLevel').value;
    this.userProfile.expYears = document.getElementById('expYears').value;
    this.userProfile.workPreference = document.getElementById('workPreference').value;
    this.calculateCompetencyProfile();
  }

  // --- DIAGNOSTIC QUIZ LOGIC ---
  loadDomainQuiz(domainKey) {
    this.activeQuizDomain = domainKey;
    const questions = DIAGNOSTIC_QUIZZES[domainKey] || [];
    const container = document.getElementById('quizContainer');

    if (!this.quizState.answers[domainKey]) {
      this.quizState.answers[domainKey] = {};
    }

    let html = '';
    questions.forEach((qObj, idx) => {
      const selectedOpt = this.quizState.answers[domainKey][idx];

      let optsHtml = '';
      qObj.options.forEach((optText, optIdx) => {
        let cls = 'quiz-option-btn';
        if (selectedOpt !== undefined) {
          if (optIdx === qObj.answer) cls += ' correct';
          else if (selectedOpt === optIdx) cls += ' wrong';
        } else if (selectedOpt === optIdx) {
          cls += ' selected';
        }

        optsHtml += `
          <button class="${cls}" onclick="app.submitQuizAnswer('${domainKey}', ${idx}, ${optIdx})">
            ${String.fromCharCode(65 + optIdx)}. ${optText}
          </button>
        `;
      });

      html += `
        <div class="quiz-question-box">
          <span class="quiz-q-num">Question ${idx + 1} of ${questions.length}</span>
          <div class="quiz-q-text">${qObj.q}</div>
          <div class="quiz-options">${optsHtml}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  submitQuizAnswer(domainKey, qIdx, optIdx) {
    this.quizState.answers[domainKey][qIdx] = optIdx;
    
    // Calculate domain quiz score
    const questions = DIAGNOSTIC_QUIZZES[domainKey];
    let correctCount = 0;
    Object.keys(this.quizState.answers[domainKey]).forEach(key => {
      if (this.quizState.answers[domainKey][key] === questions[key].answer) {
        correctCount++;
      }
    });

    this.userProfile.quizAnswers[domainKey] = (correctCount / questions.length) * 100;
    this.loadDomainQuiz(domainKey);
    this.calculateCompetencyProfile();
  }

  // --- COMPETENCY ANALYSIS CALCULATION ENGINE ---
  calculateCompetencyProfile() {
    // Domains evaluated: cloud, backend, data, ai, devops, frontend, uiux, soft
    const domainScores = {
      cloud: 10,
      backend: 10,
      data: 10,
      ai: 10,
      devops: 10,
      frontend: 10,
      uiux: 10,
      soft: 20
    };

    // Calculate score contribution from self-rated skills
    Object.keys(this.userProfile.skills).forEach(skillId => {
      const skillObj = SKILL_DATABASE.find(s => s.id === skillId);
      if (!skillObj) return;
      
      const rating = this.userProfile.skills[skillId]; // 1 to 5
      const domain = skillObj.domain;
      if (domainScores[domain] !== undefined) {
        domainScores[domain] += rating * 16; // Up to +80 per domain
      }
    });

    // Calculate contribution from Projects completed
    this.userProfile.projects.forEach(pId => {
      const chip = PROJECT_CHIPS_DATA.find(c => c.id === pId);
      if (chip && domainScores[chip.domain] !== undefined) {
        domainScores[chip.domain] += 12;
      }
    });

    // Calculate contribution from Quiz verification
    Object.keys(this.userProfile.quizAnswers).forEach(domain => {
      const quizPercent = this.userProfile.quizAnswers[domain];
      if (domainScores[domain] !== undefined) {
        domainScores[domain] += (quizPercent / 100) * 15;
      }
    });

    // Education boost
    if (this.userProfile.education === 'bachelor_cs' || this.userProfile.education === 'master') {
      domainScores.soft += 10;
      domainScores.backend += 10;
    }

    // Clamp all domain scores between 0 and 100
    Object.keys(domainScores).forEach(d => {
      domainScores[d] = Math.min(100, Math.round(domainScores[d]));
    });

    this.currentCompetency = domainScores;

    // Overall score average
    const total = Object.values(domainScores).reduce((a, b) => a + b, 0);
    this.overallReadinessScore = Math.round(total / Object.keys(domainScores).length);

    return domainScores;
  }

  // --- RENDER COMPETENCY TAB & SPIDER CANVAS ---
  renderCompetencyAnalysis() {
    const domainScores = this.currentCompetency || this.calculateCompetencyProfile();

    // Render Canvas Spider Radar Chart
    this.drawRadarChart(domainScores);

    // Render Overall Score
    document.getElementById('overallScoreNum').innerText = `${this.overallReadinessScore}%`;
    
    const badgeEl = document.getElementById('overallReadinessBadge');
    if (this.overallReadinessScore >= 65) {
      badgeEl.className = 'readiness-badge readiness-high';
      badgeEl.innerText = 'High Proficiency 🚀';
    } else if (this.overallReadinessScore >= 35) {
      badgeEl.className = 'readiness-badge readiness-mid';
      badgeEl.innerText = 'Developing Level 📈';
    } else {
      badgeEl.className = 'readiness-badge readiness-low';
      badgeEl.innerText = 'Foundation Stage 🔰';
    }

    // Render Domain Mastery Bars
    const barsContainer = document.getElementById('domainBarsContainer');
    const domainLabels = {
      cloud: 'Cloud Infrastructure ☁️',
      backend: 'Backend & APIs 💻',
      data: 'Data & Analytics 📊',
      ai: 'AI & Machine Learning 🤖',
      devops: 'DevOps & Systems 🛠️',
      frontend: 'Frontend & Web ⚡',
      uiux: 'UI/UX & Design 🎨',
      soft: 'Problem Solving & Soft Skills 🧠'
    };

    let barsHtml = '';
    Object.keys(domainScores).forEach(dKey => {
      const val = domainScores[dKey];
      let barGrad = 'var(--grad-primary)';
      if (val < 40) barGrad = 'linear-gradient(90deg, #f43f5e, #fb7185)';
      else if (val < 70) barGrad = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
      else barGrad = 'linear-gradient(90deg, #10b981, #34d399)';

      barsHtml += `
        <div class="domain-bar-item">
          <div class="bar-label-row">
            <span>${domainLabels[dKey]}</span>
            <span style="color:var(--accent-cyan); font-weight:700;">${val}%</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${val}%; background: ${barGrad};"></div>
          </div>
        </div>
      `;
    });
    barsContainer.innerHTML = barsHtml;

    // Render Strengths vs Gaps Matrix
    const strengthsContainer = document.getElementById('strengthsList');
    const gapsContainer = document.getElementById('gapsList');

    let strengthsHtml = '';
    let gapsHtml = '';

    // Identify user top skills
    const userSkillsArr = Object.keys(this.userProfile.skills).map(sId => {
      const skillObj = SKILL_DATABASE.find(s => s.id === sId);
      return { ...skillObj, level: this.userProfile.skills[sId] };
    });

    userSkillsArr.sort((a, b) => b.level - a.level);

    userSkillsArr.slice(0, 5).forEach(s => {
      strengthsHtml += `
        <div class="matrix-item item-strength">
          <i data-lucide="check-circle"></i>
          <span><strong>${s.name}</strong> (${s.level}/5 Stars)</span>
        </div>
      `;
    });

    if (userSkillsArr.length === 0) {
      strengthsHtml = '<p class="text-muted" style="font-size:0.84rem;">Add skills in Step 1 to identify strengths.</p>';
    }

    // Identify missing fundamental skills for standard engineering
    const fundamentalSkills = ['cloud_fund', 'docker', 'linux', 'aws', 'rest_api', 'sql'];
    const missing = fundamentalSkills.filter(fId => !this.userProfile.skills[fId]);

    missing.slice(0, 4).forEach(fId => {
      const sObj = SKILL_DATABASE.find(s => s.id === fId);
      gapsHtml += `
        <div class="matrix-item item-gap">
          <i data-lucide="alert-circle"></i>
          <span>Missing <strong>${sObj ? sObj.name : fId}</strong></span>
        </div>
      `;
    });

    strengthsContainer.innerHTML = strengthsHtml;
    gapsContainer.innerHTML = gapsHtml;
    if (window.lucide) window.lucide.createIcons();
  }

  // --- DRAW CANVAS SPIDER RADAR CHART ---
  drawRadarChart(scores) {
    const canvas = document.getElementById('competencyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    const keys = ['cloud', 'backend', 'data', 'ai', 'devops', 'frontend', 'uiux', 'soft'];
    const labels = ['Cloud', 'Backend', 'Data', 'AI/ML', 'DevOps', 'Frontend', 'UI/UX', 'Soft Skills'];
    const numAxes = keys.length;

    // Web Spider Background Concentric Polygons
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let level = 1; level <= 4; level++) {
      const r = (radius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Axes Lines & Labels
    ctx.font = '12px Outfit, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Draw axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      // Draw Label
      const labelX = centerX + (radius + 28) * Math.cos(angle);
      const labelY = centerY + (radius + 18) * Math.sin(angle);
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Filled User Score Polygon
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const val = scores[keys[i]] || 0;
      const r = (radius * (val / 100));
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill Gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(0, 242, 254, 0.45)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Points
    for (let i = 0; i < numAxes; i++) {
      const val = scores[keys[i]] || 0;
      const r = (radius * (val / 100));
      const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // --- JOB RECOMMENDATION ENGINE ---
  calculateJobMatches() {
    const userSkills = this.userProfile.skills;
    const competency = this.currentCompetency || this.calculateCompetencyProfile();

    const matches = JOB_ROLES.map(role => {
      // Required skill coverage
      let reqMatchedCount = 0;
      const matchedRequired = [];
      const missingRequired = [];

      role.requiredSkills.forEach(reqId => {
        if (userSkills[reqId]) {
          reqMatchedCount++;
          const sObj = SKILL_DATABASE.find(s => s.id === reqId);
          matchedRequired.push(sObj ? sObj.name : reqId);
        } else {
          const sObj = SKILL_DATABASE.find(s => s.id === reqId);
          missingRequired.push(sObj ? sObj.name : reqId);
        }
      });

      const reqMatchRatio = role.requiredSkills.length > 0 ? (reqMatchedCount / role.requiredSkills.length) : 0;

      // Optional skill bonus
      let optMatchedCount = 0;
      const matchedOptional = [];
      role.optionalSkills.forEach(optId => {
        if (userSkills[optId]) {
          optMatchedCount++;
          const sObj = SKILL_DATABASE.find(s => s.id === optId);
          matchedOptional.push(sObj ? sObj.name : optId);
        }
      });

      const optMatchRatio = role.optionalSkills.length > 0 ? (optMatchedCount / role.optionalSkills.length) : 0;

      // Domain Alignment score
      let domainAlignmentScore = 0;
      if (role.weights) {
        Object.keys(role.weights).forEach(d => {
          const weight = role.weights[d];
          const score = competency[d] || 0;
          domainAlignmentScore += (score * weight);
        });
      }

      // Overall Percentage Calculation
      // 55% Required Skills + 20% Optional Skills + 25% Domain Competency
      let matchPercent = Math.round((reqMatchRatio * 55) + (optMatchRatio * 20) + (domainAlignmentScore * 0.25));
      matchPercent = Math.min(98, Math.max(15, matchPercent));

      return {
        role,
        matchPercent,
        matchedRequired,
        missingRequired,
        matchedOptional
      };
    });

    return matches;
  }

  renderJobRecommendations() {
    const matches = this.calculateJobMatches();
    const sortBy = document.getElementById('roleSortSelect').value;

    if (sortBy === 'match') {
      matches.sort((a, b) => b.matchPercent - a.matchPercent);
    } else if (sortBy === 'salary') {
      matches.sort((a, b) => b.role.salary.localeCompare(a.role.salary));
    }

    document.getElementById('matchBadge').innerText = `${matches.length} Roles Matched`;

    const grid = document.getElementById('jobCardsGrid');
    let html = '';

    matches.forEach(m => {
      const role = m.role;
      
      let ringColor = 'var(--accent-cyan)';
      if (m.matchPercent >= 75) ringColor = 'var(--accent-emerald)';
      else if (m.matchPercent < 50) ringColor = 'var(--accent-amber)';

      let matchedPills = m.matchedRequired.map(s => `<span class="pill-matched">✓ ${s}</span>`).join('');
      let missingPills = m.missingRequired.map(s => `<span class="pill-missing">✕ ${s}</span>`).join('');

      html += `
        <div class="card glass-card job-card">
          <div>
            <div class="job-card-top">
              <div>
                <div class="job-role-title">
                  <span>${role.icon}</span> ${role.title}
                </div>
                <div class="role-tags-row" style="margin-top:8px;">
                  <span class="role-tag tag-salary">💰 ${role.salary}</span>
                  <span class="role-tag tag-demand">${role.demand}</span>
                </div>
              </div>
              <div class="match-ring" style="border-color: ${ringColor};">
                <span class="match-percent">${m.matchPercent}%</span>
                <span class="match-label">Match</span>
              </div>
            </div>

            <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:14px;">
              ${role.description}
            </p>

            <div class="job-skills-breakdown">
              <div class="breakdown-label">Key Matched Skills (${m.matchedRequired.length}/${role.requiredSkills.length}):</div>
              <div class="skills-pill-group">${matchedPills || '<span style="font-size:0.75rem; color:var(--text-dim);">No core skills matched yet</span>'}</div>
            </div>

            ${m.missingRequired.length > 0 ? `
              <div class="job-skills-breakdown">
                <div class="breakdown-label">Skills to Learn:</div>
                <div class="skills-pill-group">${missingPills}</div>
              </div>
            ` : ''}
          </div>

          <div class="job-card-actions">
            <button class="btn btn-outline btn-block" onclick="app.setTargetRoleAndNavigate('${role.id}')">
              <i data-lucide="map"></i> Target Career Roadmap
            </button>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  setTargetRoleAndNavigate(roleId) {
    this.userProfile.targetRole = roleId;
    this.updateTargetRoleSelector();
    this.switchTab('roadmap');
  }

  // --- CAREER ROADMAP & SKILL GAP ENGINE ---
  populateTargetRoleDropdown() {
    const select = document.getElementById('targetRoleSelect');
    let html = '';
    JOB_ROLES.forEach(r => {
      html += `<option value="${r.id}">${r.icon} ${r.title}</option>`;
    });
    select.innerHTML = html;
    select.value = this.userProfile.targetRole;
  }

  updateTargetRoleSelector() {
    const select = document.getElementById('targetRoleSelect');
    if (select) select.value = this.userProfile.targetRole;
  }

  setTargetRole(roleId) {
    this.userProfile.targetRole = roleId;
    this.renderCareerRoadmap();
  }

  renderCareerRoadmap() {
    const roleId = this.userProfile.targetRole;
    const roleObj = JOB_ROLES.find(r => r.id === roleId) || JOB_ROLES[0];
    const matches = this.calculateJobMatches();
    const currentMatch = matches.find(m => m.role.id === roleId) || matches[0];

    const container = document.getElementById('roadmapContent');

    // Missing skills
    const missingSkillsObj = roleObj.requiredSkills
      .filter(sId => !this.userProfile.skills[sId])
      .map(sId => SKILL_DATABASE.find(s => s.id === sId) || { name: sId, icon: '💡' });

    // Step by step timeline
    let timelineHtml = '';
    
    // Step 1: Core missing skills
    let step1SkillsText = missingSkillsObj.map(s => s.name).join(', ');
    if (!step1SkillsText) step1SkillsText = 'All core skills mastered!';

    timelineHtml += `
      <div class="timeline-step">
        <div class="step-num">1</div>
        <div class="step-content">
          <h4>Phase 1: Bridge Essential Skill Gaps</h4>
          <p>Prioritize learning missing core requirements for <strong>${roleObj.title}</strong>: <span style="color:var(--accent-cyan); font-weight:600;">${step1SkillsText}</span>.</p>
        </div>
      </div>
    `;

    // Step 2: Certification & Hands-on project
    timelineHtml += `
      <div class="timeline-step">
        <div class="step-num">2</div>
        <div class="step-content">
          <h4>Phase 2: Earn Industry Certification</h4>
          <p>Prepare for <strong>${roleObj.certifications[0]?.name || 'Professional Tech Cert'}</strong> to validate competency for recruiters.</p>
        </div>
      </div>
    `;

    // Step 3: Portfolio Project Construction
    timelineHtml += `
      <div class="timeline-step">
        <div class="step-num">3</div>
        <div class="step-content">
          <h4>Phase 3: Build & Deploy Portfolio Project</h4>
          <p>Construct a production-ready application demonstrating ${step1SkillsText} with full CI/CD deployment and documentation.</p>
        </div>
      </div>
    `;

    // Certifications HTML
    let certsHtml = '';
    roleObj.certifications.forEach(cert => {
      certsHtml += `
        <div class="cert-card">
          <div class="cert-icon"><i data-lucide="award"></i></div>
          <div class="cert-info">
            <h5>${cert.name}</h5>
            <p>Issuer: ${cert.issuer} • Duration: ${cert.duration}</p>
          </div>
        </div>
      `;
    });

    // Recommended Courses HTML
    let coursesHtml = '';
    roleObj.recommendedCourses.forEach(course => {
      coursesHtml += `
        <div class="matrix-item item-strength" style="margin-bottom:8px;">
          <i data-lucide="book-open" style="color:var(--accent-cyan);"></i>
          <span>${course}</span>
        </div>
      `;
    });

    const estTime = missingSkillsObj.length > 3 ? '3 - 5 Months' : missingSkillsObj.length > 0 ? '1 - 2 Months' : 'Ready Now! 🚀';

    container.innerHTML = `
      <div class="roadmap-hero">
        <div class="target-summary">
          <h3>${roleObj.icon} Targeted Role: ${roleObj.title}</h3>
          <p>${roleObj.description}</p>
        </div>
        <div class="roadmap-metrics">
          <div class="metric-box">
            <div class="metric-val">${currentMatch.matchPercent}%</div>
            <div class="metric-lbl">Current Match</div>
          </div>
          <div class="metric-box">
            <div class="metric-val" style="color:var(--accent-cyan);">${missingSkillsObj.length}</div>
            <div class="metric-lbl">Skill Gaps</div>
          </div>
          <div class="metric-box">
            <div class="metric-val" style="color:var(--accent-emerald);">${estTime}</div>
            <div class="metric-lbl">Est. Readiness</div>
          </div>
        </div>
      </div>

      <div class="roadmap-sections">
        <!-- Action Plan Timeline -->
        <div class="card glass-card">
          <div class="card-header">
            <h3><i data-lucide="compass"></i> Step-by-Step Action Roadmap</h3>
          </div>
          <div class="action-timeline">${timelineHtml}</div>
        </div>

        <!-- Certifications & Recommended Courses -->
        <div>
          <div class="card glass-card" style="margin-bottom:20px;">
            <div class="card-header">
              <h3><i data-lucide="award"></i> Recommended Industry Certifications</h3>
            </div>
            ${certsHtml}
          </div>

          <div class="card glass-card">
            <div class="card-header">
              <h3><i data-lucide="graduation-cap"></i> Recommended Courses & Learning Resources</h3>
            </div>
            <div>${coursesHtml}</div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  analyzeAndProceed() {
    this.calculateCompetencyProfile();
    this.switchTab('competency');
  }

  // --- PRINTABLE DIAGNOSTIC REPORT MODAL ---
  openReportModal() {
    this.calculateCompetencyProfile();
    const domainScores = this.currentCompetency;
    const matches = this.calculateJobMatches();
    matches.sort((a, b) => b.matchPercent - a.matchPercent);

    const topRoles = matches.slice(0, 3);
    const selectedSkills = Object.keys(this.userProfile.skills).map(sId => {
      const sObj = SKILL_DATABASE.find(s => s.id === sId);
      return `${sObj ? sObj.name : sId} (${this.userProfile.skills[sId]}/5 Stars)`;
    }).join(', ');

    const modalBody = document.getElementById('reportModalBody');
    modalBody.innerHTML = `
      <div class="report-sheet">
        <div class="report-header-banner">
          <div>
            <h2>Competency Diagnostic & Career Profile</h2>
            <p style="font-size:0.85rem; color:#64748b;">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align:right;">
            <span style="font-size:1.6rem; font-weight:800; color:#0284c7;">${this.overallReadinessScore}%</span>
            <div style="font-size:0.75rem; color:#64748b;">Overall Readiness Index</div>
          </div>
        </div>

        <div class="report-section">
          <h3>Candidate Background</h3>
          <p style="font-size:0.88rem;"><strong>Education:</strong> ${this.userProfile.education.replace('_', ' ').toUpperCase()} | <strong>Experience:</strong> ${this.userProfile.expYears} yrs | <strong>Work Preference:</strong> ${this.userProfile.workPreference.toUpperCase()}</p>
          <p style="font-size:0.88rem; margin-top:4px;"><strong>Verified Skills:</strong> ${selectedSkills || 'None logged'}</p>
        </div>

        <div class="report-section">
          <h3>Top AI Recommended Job Matches</h3>
          <table class="report-table">
            <thead>
              <tr>
                <th>Recommended Role</th>
                <th>Match Score</th>
                <th>Salary Band</th>
                <th>Matched Core Skills</th>
              </tr>
            </thead>
            <tbody>
              ${topRoles.map(r => `
                <tr>
                  <td><strong>${r.role.icon} ${r.role.title}</strong></td>
                  <td style="font-weight:700; color:#0284c7;">${r.matchPercent}%</td>
                  <td>${r.role.salary}</td>
                  <td>${r.matchedRequired.join(', ') || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="report-section">
          <h3>Domain Mastery Index</h3>
          <table class="report-table">
            <thead>
              <tr>
                <th>Technology Domain</th>
                <th>Competency Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${Object.keys(domainScores).map(d => `
                <tr>
                  <td style="text-transform:capitalize;">${d}</td>
                  <td>${domainScores[d]}%</td>
                  <td>${domainScores[d] >= 65 ? 'Proficient ✅' : domainScores[d] >= 35 ? 'Developing 📈' : 'Gap Identified ⚠️'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    document.getElementById('reportModal').classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  closeReportModal() {
    document.getElementById('reportModal').classList.add('hidden');
  }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new CompetencyApp();
});
