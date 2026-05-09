// main.js — Renders DATA (from data.js) into the page

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav ────────────────────────────────────────────────────
  const navEl = document.getElementById('navbar');
  navEl.innerHTML = DATA.nav.map(n =>
    `<a href="${n.href}">${n.label}</a>`
  ).join('');

  // ── Hero ───────────────────────────────────────────────────
  document.getElementById('hero-badge').textContent    = DATA.profile.headline;
  document.getElementById('hero-name-first').textContent = 'Sethuraman ';
  document.getElementById('hero-name-last').textContent  = DATA.profile.name.split(' ')[1] || 'M';
  document.getElementById('hero-title').textContent    = DATA.profile.tagline;
  document.getElementById('hero-summary').textContent  = DATA.profile.bio;
  document.getElementById('hero-contacts').innerHTML = `
    <a href="${DATA.profile.cvLink}" id="downloadBtn">📄 Download CV</a>
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
  document.getElementById('certs-list').innerHTML = DATA.certifications.map(c => `
    <div class="cert-card reveal">
      <div class="cert-icon">${c.icon}</div>
      <div>
        <div class="cert-name">${c.title}</div>
        <div class="cert-issuer">${c.org}</div>
      </div>
    </div>
  `).join('');

  // ── Contact ────────────────────────────────────────────────
  const { email, location, linkedin, linkedinHref, openTo } = DATA.contact;
  document.getElementById('contact-grid').innerHTML = `
    <a class="contact-item reveal" href="mailto:${email}">
      <div class="contact-icon">✉️</div>
      <div class="contact-label">Email</div>
      <div class="contact-value">${email}</div>
    </a>
    <div class="contact-item reveal">
      <div class="contact-icon">📍</div>
      <div class="contact-label">Location</div>
      <div class="contact-value">${location}</div>
    </div>
    <div class="contact-item reveal">
      <div class="contact-icon">💼</div>
      <div class="contact-label">LinkedIn</div>
      <div class="contact-value"><a href="${linkedinHref}" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:none;">${linkedin}</a></div>
    </div>
    <div class="contact-item reveal">
      <div class="contact-icon">🌐</div>
      <div class="contact-label">Open To</div>
      <div class="contact-value">${openTo}</div>
    </div>
  `;

  // ── Footer ─────────────────────────────────────────────────
  document.getElementById('footer-text').innerHTML =
    `© ${DATA.footer.year} ${DATA.footer.name} &nbsp;·&nbsp; ${DATA.footer.roles}`;

  // ── Download CV (print) ────────────────────────────────────
  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'downloadBtn') {
      e.preventDefault();
      const style = document.createElement('style');
      style.textContent = 'nav, #downloadBtn { display: none !important; }';
      document.head.appendChild(style);
      window.print();
      document.head.removeChild(style);
    }
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
  const navLinks  = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  });

  // ── Scroll reveal ──────────────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
  }, 50);

});
