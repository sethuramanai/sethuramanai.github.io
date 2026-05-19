// main.js — Renders DATA (from data.js) into the page

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav ────────────────────────────────────────────────────
  const { githubRepo, githubLabel } = DATA.site;
  const navEl = document.getElementById('navbar');
  navEl.innerHTML = `
    <div class="nav-header">
      <a class="github-repo-link nav-github" href="${githubRepo}" target="_blank" rel="noopener noreferrer" aria-label="${githubLabel}" title="${githubLabel}">
        <svg class="github-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22.135-.303.54-1.523.117-3.176 0 0 .98-.322 3.053 1.235 1.89-.52 3.91-.78 5.93-.78 2.02 0 4.04.26 5.93.78 2.072-1.557 3.052-1.235 3.052-1.235.423 1.653.017 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span class="github-repo-text">${githubLabel}</span>
      </a>
      <button type="button" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
        <span class="nav-toggle-icon" aria-hidden="true"></span>
      </button>
    </div>
    <div class="nav-links" id="nav-links">
      ${DATA.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join('')}
    </div>
  `;

  const navToggle = navEl.querySelector('.nav-toggle');
  navToggle.addEventListener('click', () => {
    const open = navEl.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navEl.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navEl.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Hero ───────────────────────────────────────────────────
  document.getElementById('hero-badge').textContent    = DATA.profile.headline;
  document.getElementById('hero-name-first').textContent = 'Sethuraman ';
  document.getElementById('hero-name-last').textContent  = DATA.profile.name.split(' ')[1] || 'M';
  document.getElementById('hero-title').textContent    = DATA.profile.tagline;
  document.getElementById('hero-summary').textContent  = DATA.profile.bio;
  document.getElementById('hero-contacts').innerHTML = `
    <a href="#" id="downloadBtn" role="button">📄 Download CV</a>
    <a href="${DATA.profile.awardsLink}">🏆 Regents' Award Nominee</a>
    <a href="${DATA.profile.contactLink}">💬 Open to Opportunities</a>
    <a href="${DATA.profile.speakerLink}">🎤 Conference Speaker</a>
  `;

  // ── Experience ─────────────────────────────────────────────
  document.getElementById('exp-list').innerHTML = DATA.experience.map(job => `
    <div class="exp-card reveal">
      <div class="exp-top">
        <div>
          <div class="exp-role">${job.title}</div>
          <div class="exp-company">${job.company}</div>
        </div>
        ${job.duration ? `<span class="tag">${job.duration}</span>` : ''}
      </div>
      <ul class="exp-list">
        ${job.bullets.map(b => `<li>${b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // ── Skills ─────────────────────────────────────────────────
  document.getElementById('skills-grid').innerHTML = DATA.skills.map(group => `
    <div class="skill-group reveal">
      <div class="skill-group-title">${group.category}</div>
      <div class="tags">
        ${group.items.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // ── Projects ───────────────────────────────────────────────
  document.getElementById('projects-grid').innerHTML = DATA.projects.map(p => `
    <div class="proj-card reveal">
      <div class="proj-title">${p.icon} ${p.title}</div>
      <p class="proj-desc">${p.description}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  // ── Education ──────────────────────────────────────────────
  document.getElementById('edu-list').innerHTML = DATA.education.map(e => `
    <div class="edu-card reveal">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-school">${e.institution}</div>
      <div class="edu-detail">${e.details.join('<br>')}</div>
      ${e.gpa ? `<span class="gpa-badge">${e.gpa}</span>` : ''}
    </div>
  `).join('');

  // ── Certifications ─────────────────────────────────────────
  const renderCertCard = (c) => {
    const inProgress = c.status === 'in_progress';
    const meta = [c.date, c.note].filter(Boolean).join(' · ');
    const verify = c.verifyUrl
      ? '<span class="cert-verify">Verify certificate ↗</span>'
      : '';
    const inner = `
      <div class="cert-icon">${c.icon}</div>
      <div class="cert-body">
        <div class="cert-name">${c.title}</div>
        <div class="cert-issuer">${c.org}</div>
        ${meta ? `<div class="cert-meta">${meta}</div>` : ''}
        ${verify}
      </div>
    `;
    const cls = 'cert-card reveal' + (inProgress ? ' cert-card--progress' : '');
    if (c.verifyUrl) {
      return `<a class="${cls}" href="${c.verifyUrl}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    return `<div class="${cls}">${inner}</div>`;
  };

  const renderCertGroup = (label, items) => `
    <div class="cert-group reveal">
      <h3 class="cert-group-title">${label}</h3>
      <div class="cert-list">${items.map(renderCertCard).join('')}</div>
    </div>
  `;

  document.getElementById('certs-container').innerHTML =
    renderCertGroup('Leadership & Recognition', DATA.certifications) +
    renderCertGroup('Anthropic Academy — Claude', DATA.anthropicCertifications);


  // ── Contact ────────────────────────────────────────────────
  const { email, mobile, location, linkedin, linkedinHref, openTo } = DATA.contact;
  const mobileHref = `tel:${mobile.replace(/[^\d+]/g, '')}`;
  document.getElementById('contact-grid').innerHTML = `
    <a class="contact-item contact-item-email reveal" href="mailto:${email}">
      <div class="contact-icon">✉️</div>
      <div class="contact-label">Email</div>
      <div class="contact-value">${email}</div>
    </a>
    <div class="contact-row reveal">
      <div class="contact-item">
        <div class="contact-icon">📍</div>
        <div class="contact-label">Location</div>
        <div class="contact-value">${location}</div>
      </div>
      <a class="contact-item" href="${mobileHref}">
        <div class="contact-icon">📱</div>
        <div class="contact-label">Mobile</div>
        <div class="contact-value">${mobile}</div>
      </a>
      <a class="contact-item" href="${linkedinHref}" target="_blank" rel="noopener noreferrer">
        <div class="contact-icon">💼</div>
        <div class="contact-label">LinkedIn</div>
        <div class="contact-value">${linkedin}</div>
      </a>
      <div class="contact-item">
        <div class="contact-icon">🌐</div>
        <div class="contact-label">Open To</div>
        <div class="contact-value">${openTo}</div>
      </div>
    </div>
  `;

  // ── Footer ─────────────────────────────────────────────────
  const { year, name, roles } = DATA.footer;
  document.getElementById('footer-text').innerHTML =
    `© ${year} ${name} &nbsp;·&nbsp; ${roles}`;

  // ── Download CV (PDF) ──────────────────────────────────────
  document.addEventListener('click', e => {
    const btn = e.target.closest('#downloadBtn');
    if (!btn) return;
    e.preventDefault();
    const label = btn.textContent;
    btn.textContent = '⏳ Generating PDF…';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      try {
        downloadResumePDF();
      } finally {
        btn.textContent = label;
        btn.style.pointerEvents = '';
      }
    }, 50);
  });

  // ── Smooth scroll ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Active nav highlight ───────────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const scrollNavOffset = () => navEl.offsetHeight + 24;
  window.addEventListener('scroll', () => {
    let cur = '';
    const offset = scrollNavOffset();
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - offset) cur = s.id; });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navEl.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Scroll reveal ──────────────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
  }, 50);

});
