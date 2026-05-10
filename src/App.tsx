// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import profilePic from './assets/DIT-E-Burtanog-Judelyn-A_business-attire-edited.jpg';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const typedTextRef = useRef<HTMLSpanElement>(null);

  // Typing animation effect
  useEffect(() => {
    const words = ['IT Student', 'Web Developer', 'Problem Solver', 'Creative Thinker'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      if (typedTextRef.current) {
        if (isDeleting) {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typedTextRef.current.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeEffect, 2000);
          return;
        }

        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeoutId = setTimeout(typeEffect, isDeleting ? 50 : 100);
    };

    timeoutId = setTimeout(typeEffect, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'certificates', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.nav-links');
      const hamburger = document.querySelector('.hamburger');
      if (isMenuOpen && nav && !nav.contains(event.target as Node) && 
          hamburger && !hamburger.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.name && formData.email && formData.message) {
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
    setIsSubmitting(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '' },
    { id: 'about', label: 'About', icon: '' },
    { id: 'skills', label: 'Skills', icon: '' },
    { id: 'certificates', label: 'Certificates', icon: '' },
    { id: 'projects', label: 'Projects', icon: '' },
    { id: 'contact', label: 'Contact', icon: '' },
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('home')}>
            J<span className="logo-accent">.</span>Burtanog
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="greeting"> Hello, I'm</span>
              <h1 className="name">Judelyn A. Burtanog</h1>
              <div className="typed-wrapper">
                <span className="typed-text" ref={typedTextRef}>IT Student</span>
                <span className="cursor-blink">|</span>
              </div>
              <p className="hero-description">
                I believe great code and great design go hand in hand. As an IT student, I'm passionate about creating digital experiences that feel as good as they function. Let's turn your ideas into responsive, user-friendly web applications that people actually enjoy using.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => scrollToSection('contact')}>
                  📧 Get In Touch
                </button>
                <button className="btn-secondary" onClick={() => scrollToSection('projects')}>
                  📂 View Projects
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="image-wrapper">
                <div className="image-circle">
                  <div className="profile-placeholder">
                    <img 
                      src={profilePic} 
                      alt="Judelyn A. Burtanog" 
                      className="profile-img" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <h3> Who am I?</h3>
              <p>
                I'm Judelyn A. Burtanog, an IT student who loves turning ideas into 
                meaningful digital experiences. While I'm still growing my skills in modern web 
                technologies, I'm dedicated to learning how to build applications that are both 
                functional and a joy to use.
              </p>
              <p>
                My journey started with simple curiosity — wanting to understand how websites 
                work — and quickly became a passion for code, creativity, and problem-solving. 
                As a student, I'm committed to continuous learning, exploring new tools, and 
                bringing ideas to life through code and curiosity.
              </p>
              <div className="personal-info">
                <div className="info-item">
                  <span className="info-label">📛 Name:</span>
                  <span>Judelyn A. Burtanog</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📍 Location:</span>
                  <span>Philippines 🇵🇭</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📧 Email:</span>
                  <span>jaburtanog.student@asiancollege.edu.ph</span>
                </div>
                <div className="info-item">
                  <span className="info-label">💼 Availability:</span>
                  <span className="available-badge">Open for Opportunities</span>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-card">
                <h3>1+</h3>
                <p>Years of Learning</p>
              </div>
              <div className="stat-card">
                <h3>5</h3>
                <p>Projects Built</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-section">
            <div className="skill-category">
              <h4>💻 Frontend Development</h4>
              <div className="skill-tags">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>TypeScript</span>
                <span>Responsive Design</span>
              </div>
            </div>

            <div className="skill-category">
              <h4>⚙️ Backend Basics</h4>
              <div className="skill-tags">
                <span>Node.js</span>
                <span>Express</span>
                <span>Python</span>
                <span>REST APIs</span>
              </div>
            </div>

            <div className="skill-category">
              <h4>🗄️ Database</h4>
              <div className="skill-tags">
                <span>MySQL</span>
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>Firebase</span>
              </div>
            </div>

            <div className="skill-category">
              <h4>🛠️ Tools & Version Control</h4>
              <div className="skill-tags">
                <span>Git</span>
                <span>GitHub</span>
                <span>VS Code</span>
                <span>Figma</span>
                <span>Postman</span>
                <span>Vite</span>
              </div>
            </div>

            <div className="skill-category">
              <h4>📋 Other Skills</h4>
              <div className="skill-tags">
                <span>Problem Solving</span>
                <span>Debugging</span>
                <span>Team Collaboration</span>
                <span>UI/UX Principles</span>
                <span>Agile Methodology</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
<section id="certificates" className="certificates section">
  <div className="container">
    <h2 className="section-title">Certificates</h2>
    <div className="certificates-list">
      <div className="cert-item">
        <span className="cert-badge">🏆</span>
        <div className="cert-info">
          <h3>Responsive Web Design</h3>
          <p>FreeCodeCamp · 2025</p>
        </div>
        <a 
          href="https://www.freecodecamp.org/certification/fccecfd5d56-3120-4d9c-bfdf-aca2594cb8b9/responsive-web-design"
          target="_blank" 
          rel="noopener noreferrer"
          className="cert-view"
        >
          View →
        </a>
      </div>

      <div className="cert-item">
        <span className="cert-badge">💻</span>
        <div className="cert-info">
          <h3>JavaScript Algorithms & Data Structures</h3>
          <p>FreeCodeCamp · 2025</p>
        </div>
        <a 
          href="https://www.freecodecamp.org/certification/fccecfd5d56-3120-4d9c-bfdf-aca2594cb8b9/javascript-algorithms-and-data-structures"
          target="_blank" 
          rel="noopener noreferrer"
          className="cert-view"
        >
          View →
        </a>
      </div>

      <div className="cert-item">
        <span className="cert-badge">⚛️</span>
        <div className="cert-info">
          <h3>Front End Development Libraries</h3>
          <p>FreeCodeCamp · 2025</p>
        </div>
        <a 
          href="https://www.freecodecamp.org/certification/fccecfd5d56-3120-4d9c-bfdf-aca2594cb8b9/front-end-development-libraries"
          target="_blank" 
          rel="noopener noreferrer"
          className="cert-view"  
        >
          View →
        </a>
      </div>
 
 
      {/* NC III Events Management */}
      <div className="cert-item">
        <span className="cert-badge">📋</span>
        <div className="cert-info">
          <h3>NC III Events Management</h3>
          <p>TESDA · 2024</p>
        </div>
        <span className="cert-view">(Available upon request)</span>
      </div>

      {/* NC II Contact Center Services */}
      <div className="cert-item">
        <span className="cert-badge">🎧</span>
        <div className="cert-info">
          <h3>NC II Contact Center Services</h3>
          <p>TESDA · 2024</p>
        </div>
        <span className="cert-view">(Available upon request)</span>
      </div>
    </div>
  </div>
</section>
      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            
            {/* Project 1 - Asian Library System */}
            <div className="project-card">
              <div className="project-icon">📚</div>
              <h3>Asian Library System</h3>
              <p>A comprehensive library management system for Asian colleges featuring:</p>
              <ul className="project-features">
                <li>✓ Book cataloging & inventory</li>
                <li>✓ Student borrowing records</li>
                <li>✓ Return tracking with due dates</li>
                <li>✓ Automatic late fee calculation</li>
              </ul>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>MySQL</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">📂 GitHub</a>
              </div>
            </div>

            {/* Project 2 - Santander System */}
            <div className="project-card">
              <div className="project-icon">🏡</div>
              <h3>Santander System</h3>
              <p>A digital platform showcasing my hometown Santander featuring:</p>
              <ul className="project-features">
                <li>✓ Local tourism information</li>
                <li>✓ Barangay services directory</li>
                <li>✓ Resident information system</li>
                <li>✓ Community announcements</li>
              </ul>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>Replit</span>
                <span>CSS3</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">📂 GitHub</a>
              </div>
            </div>

            {/* Project 3 - Ambulance Booking System */}
            <div className="project-card">
              <div className="project-icon">🚑</div>
              <h3>Ambulance Booking System</h3>
              <p>An emergency ambulance booking system for Bayawan City featuring:</p>
              <ul className="project-features">
                <li>✓ Real-time ambulance tracking</li>
                <li>✓ Emergency request management</li>
                <li>✓ Driver dispatch system</li>
                <li>✓ Response time monitoring</li>
              </ul>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>Visual Studio</span>
                <span>Firebase</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">📂 GitHub</a>
              </div>
            </div>

            {/* Project 4 - Portfolio Website */}
            <div className="project-card">
              <div className="project-icon">💼</div>
              <h3>Personal Portfolio Website</h3>
              <p>A modern, responsive portfolio website featuring:</p>
              <ul className="project-features">
                <li>✓ Clean, modern UI design</li>
                <li>✓ Responsive layout for all devices</li>
                <li>✓ Interactive components & animations</li>
                <li>✓ Showcase of skills & certificates</li>
              </ul>
              <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>CSS3</span>
                <span>Vite</span>
              </div>
              <div className="project-links">
                <a href="#" target="_blank" rel="noopener noreferrer">🔗 Live Demo</a>
                <a href="#" target="_blank" rel="noopener noreferrer">📂 GitHub</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>💬 Let's Connect</h3>
              <p>I'm always interested in hearing about new opportunities, collaborations, or just having a chat about web development.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>jaburtanog.student@asiancollege.edu.ph</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+63 963 774 8024</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Philippines 🇵🇭</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleInputChange}
              />
              <textarea 
                name="message"
                rows={5} 
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending... ✉️' : 'Send Message ✨'}
              </button>
              {formStatus === 'success' && (
                <div className="form-success">✅ Message sent successfully! I'll get back to you soon.</div>
              )}
              {formStatus === 'error' && (
                <div className="form-error">❌ Please fill in all required fields.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 Judelyn A. Burtanog. Built with 💜 using React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
};

export default App;