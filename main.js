// main.js — Renders DATA (from data.js) into the page

/** Strip **bold** markdown used in copy for plain-text/PDF output. */
function stripInlineMd(s) {
  return String(s).replace(/\*\*(.*?)\*\*/g, '$1');
}

/** Resolve jsPDF constructor regardless of UMD global shape (handles different bundle exports). */
function getJsPDFConstructor() {
  const w = typeof window !== 'undefined' ? window : {};
  const fromNamespace = w.jspdf?.jsPDF ?? w.jspdf?.default?.jsPDF;
  if (typeof fromNamespace === 'function') return fromNamespace;
  if (typeof w.jsPDF === 'function') return w.jsPDF;
  return null;
}

/** First Latin letter onward — drops leading emoji/punctuation from skill category labels in PDF. */
function pdfPlainCategoryLabel(s) {
  const m = String(s).match(/[A-Za-z].*/);
  return m ? m[0].trim() : String(s).trim();
}

/**
 * Build and save a PDF résumé from DATA (when no static cvPdfUrl is configured).
 * Layout: summary, experience (title with dates right-aligned), education (stacked, no date column),
 * core skills, certifications.
 */
function downloadResumePDF() {
  const JsPDF = getJsPDFConstructor();
  if (!JsPDF) {
    alert(
      'The CV PDF helper (jsPDF) did not load. If you opened index.html as a file from disk, try serving the folder with a local web server, or hard-refresh (Ctrl+Shift+R).',
    );
    return;
  }
  const doc = new JsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const rightX = pageW - margin;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ink = { body: [35, 35, 38], muted: [85, 85, 90], rule: [45, 45, 50] };

  const ensureSpace = (need) => {
    if (y + need <= pageH - margin) return;
    doc.addPage();
    y = margin;
  };

  const sectionRule = () => {
    doc.setDrawColor(...ink.rule);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentW, y);
    y += 3;
    doc.setLineWidth(0.2);
  };

  const sectionHeading = (label) => {
    const lh = 12;
    ensureSpace(lh + 16);
    y += lh * 0.35;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...ink.rule);
    const up = label.toUpperCase().replace(/\s+/g, ' ').trim();
    doc.text(up, margin, y);
    y += lh + 2;
    sectionRule();
    y += 10;
    doc.setTextColor(...ink.body);
  };

  const addParagraph = (text, fontSize = 9.5, lineHeight = fontSize + 3.5, indent = 0) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    doc.setTextColor(...ink.body);
    const lines = doc.splitTextToSize(stripInlineMd(text), contentW - indent);
    lines.forEach((line) => {
      ensureSpace(lineHeight + 1);
      doc.text(line, margin + indent, y);
      y += lineHeight;
    });
  };

  const addRightRow = (leftText, rightText, leftSize = 10.5, rightSize = 9) => {
    const dateStr = stripInlineMd(rightText || '').trim();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(rightSize);
    const datePad = dateStr ? doc.getTextWidth(dateStr) + 12 : 8;
    const titleMaxW = Math.max(120, contentW - datePad);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(leftSize);
    doc.setTextColor(...ink.body);
    const leftLines = doc.splitTextToSize(stripInlineMd(leftText), titleMaxW);
    const titleLineH = leftSize + 3;

    leftLines.forEach((ln, i) => {
      ensureSpace(titleLineH + 2);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(leftSize);
      doc.setTextColor(...ink.body);
      doc.text(ln, margin, y);
      if (i === 0 && dateStr) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(rightSize);
        doc.setTextColor(...ink.muted);
        doc.text(dateStr, rightX, y, { align: 'right' });
        doc.setTextColor(...ink.body);
      }
      y += titleLineH;
    });
  };

  const addSubhead = (text, size = 9.5, italic = true) => {
    ensureSpace(size + 6);
    doc.setFont('helvetica', italic ? 'italic' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...ink.muted);
    doc.text(stripInlineMd(text), margin, y);
    y += size + 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...ink.body);
  };

  const addHangingBullets = (bullets, textStartX, wrapWidth, lineHeight = 11.5) => {
    const bulletX = textStartX - 5;
    bullets.forEach((b) => {
      const plain = stripInlineMd(b);
      const lines = doc.splitTextToSize(plain, wrapWidth);
      lines.forEach((line, i) => {
        ensureSpace(lineHeight + 1);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(...ink.body);
        if (i === 0) {
          doc.text('•', bulletX, y);
          doc.text(line, textStartX, y);
        } else {
          doc.text(line, textStartX, y);
        }
        y += lineHeight;
      });
    });
  };

  // —— Header (centered) ——
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...ink.rule);
  const nameLines = doc.splitTextToSize(DATA.profile.name, contentW);
  nameLines.forEach((ln) => {
    doc.text(ln, pageW / 2, y, { align: 'center' });
    y += 24;
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...ink.body);
  const tagWrapped = doc.splitTextToSize(stripInlineMd(DATA.profile.tagline), contentW);
  tagWrapped.forEach((ln) => {
    doc.text(ln, pageW / 2, y, { align: 'center' });
    y += 12;
  });
  const contactParts = [
    DATA.contact.email,
    DATA.contact.mobile,
    DATA.contact.location,
    DATA.contact.linkedin.replace(/^https?:\/\//i, ''),
  ].filter(Boolean);
  doc.setFontSize(9);
  doc.setTextColor(...ink.muted);
  const contactLine = contactParts.join('  •  ');
  const contactWrapped = doc.splitTextToSize(contactLine, contentW - 24);
  contactWrapped.forEach((ln) => {
    doc.text(ln, pageW / 2, y, { align: 'center' });
    y += 11;
  });
  y += 10;
  doc.setDrawColor(200, 200, 205);
  doc.setLineWidth(0.35);
  doc.line(margin + contentW * 0.08, y, margin + contentW * 0.92, y);
  y += 14;
  doc.setLineWidth(0.2);
  doc.setTextColor(...ink.body);

  // —— Summary ——
  sectionHeading('Summary');
  addParagraph(DATA.profile.bio, 9.5, 13, 0);
  y += 8;

  // —— Experience ——
  sectionHeading('Experience');
  const bulletTextX = margin + 12;
  const bulletWrapW = rightX - bulletTextX;
  DATA.experience.forEach((job) => {
    addRightRow(job.title, job.duration || '', 10.5, 9);
    addSubhead(job.company, 9.5, true);
    addHangingBullets(job.bullets, bulletTextX, bulletWrapW, 11.5);
    y += 10;
  });

  // —— Education (compact stacked block — dates inline meta, never right-aligned) ——
  sectionHeading('Education');
  DATA.education.forEach((e) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...ink.body);
    doc
      .splitTextToSize(stripInlineMd(e.degree), contentW)
      .forEach((ln) => {
        ensureSpace(13);
        doc.text(ln, margin, y);
        y += 13;
      });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(...ink.muted);
    doc
      .splitTextToSize(stripInlineMd(e.institution), contentW)
      .forEach((ln) => {
        ensureSpace(11);
        doc.text(ln, margin, y);
        y += 11;
      });

    const metaParts = [];
    const dur =
      typeof e.duration === 'string' && e.duration.trim()
        ? e.duration.trim()
        : '';
    if (dur) metaParts.push(dur);
    if (typeof e.gpa === 'string' && e.gpa.trim()) metaParts.push(e.gpa.trim());
    if (e.location && String(e.location).trim()) metaParts.push(String(e.location).trim());
    if (metaParts.length) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...ink.muted);
      doc.splitTextToSize(metaParts.join(' · '), contentW).forEach((ln) => {
        ensureSpace(10);
        doc.text(ln, margin, y);
        y += 10;
      });
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...ink.body);
    e.details.forEach((d) => addParagraph(d, 9, 11.5, 10));

    doc.setTextColor(...ink.body);
    y += 10;
  });

  // —— Skills (stacked rows: bold category title + wrapped comma-separated items) ——
  sectionHeading('Core Skills');
  DATA.skills.forEach((group) => {
    const cat = pdfPlainCategoryLabel(group.category);
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...ink.body);
    doc.text(`${cat}`, margin, y);
    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...ink.muted);
    const itemLines = doc.splitTextToSize(group.items.join(', '), contentW - 14);
    itemLines.forEach((ln) => {
      ensureSpace(11);
      doc.text(ln, margin + 12, y);
      y += 11;
    });
    doc.setTextColor(...ink.body);
    y += 6;
  });

  // —— Certifications (compact bullets) ——
  sectionHeading('Certifications & Training');
  const certLines = [
    ...DATA.certifications.map((c) => `${c.title} · ${c.org}`),
    ...DATA.anthropicCertifications
      .filter((c) => c.status !== 'in_progress')
      .map((c) => {
        const meta = [c.date, c.note].filter(Boolean).join(' · ');
        return meta ? `${c.title} · ${c.org} · ${meta}` : `${c.title} · ${c.org}`;
      }),
  ];
  addHangingBullets(certLines, bulletTextX, bulletWrapW, 11);

  const rawName = (DATA.profile.cvFileName || 'Sethuraman_M_CV.pdf').trim();
  const fileName = rawName.toLowerCase().endsWith('.pdf') ? rawName : `${rawName}.pdf`;
  doc.save(fileName);
}

/** Download a PDF file shipped with the site (same-origin). cvPdfUrl is relative or absolute. */
function triggerStaticCvDownload(cvPdfUrl, fileName) {
  const a = document.createElement('a');
  a.href = cvPdfUrl;
  const base =
    typeof fileName === 'string' && fileName.trim()
      ? fileName.trim()
      : 'resume.pdf';
  a.download = base.toLowerCase().endsWith('.pdf') ? base : `${base}.pdf`;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

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
    <button type="button" class="hero-cta" id="downloadBtn">📄 Download CV</button>
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
    const label = btn.textContent;
    btn.textContent = '⏳ Preparing CV…';
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
    const cvUrl = (DATA.profile.cvPdfUrl || '').trim();
    queueMicrotask(() => {
      try {
        if (cvUrl && cvUrl !== '#') {
          triggerStaticCvDownload(cvUrl, DATA.profile.cvFileName || 'resume.pdf');
        } else {
          downloadResumePDF();
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong while creating the CV. Try again.');
      } finally {
        btn.textContent = label;
        btn.disabled = false;
        btn.style.pointerEvents = '';
      }
    });
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
