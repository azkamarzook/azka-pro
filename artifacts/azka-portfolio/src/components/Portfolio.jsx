import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUp, BriefcaseBusiness, ChevronUp, Download,
  ExternalLink, GraduationCap, Mail, MapPin, Moon, Send, Sun, Waypoints,
} from 'lucide-react';
import { content } from '../data/content.js';
import TalkingAvatar from './TalkingAvatar.jsx';

const navItems = content.copy.navigation;

function magnet(event) {
  if (!window.matchMedia('(pointer:fine)').matches) return;
  const box = event.currentTarget.getBoundingClientRect();
  const dx = (event.clientX - box.left - box.width / 2) * .08;
  const dy = (event.clientY - box.top - box.height / 2) * .12;
  event.currentTarget.style.transform = `translate(${dx}px,${dy}px)`;
}

function unmagnet(event) {
  event.currentTarget.style.transform = '';
}

function useReveal() {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: reduce ? 0 : .65, ease: [.2, .7, .2, 1] },
  };
}

function Header({ active, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', listener, { passive: true });
    listener();
    return () => window.removeEventListener('scroll', listener);
  }, []);
  return <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
    <div className="container nav-inner">
      <a className="brand" href="#home" aria-label={content.copy.accessibility.home}>
        <span className="brand-mark">A</span><span>{content.name}</span>
      </a>
      <nav className="nav-links" aria-label={content.copy.accessibility.navigation}>
        {navItems.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
      </nav>
      <button className="icon-btn" onClick={() => setDark(!dark)} aria-label={dark ? content.copy.accessibility.themeToggle.light : content.copy.accessibility.themeToggle.dark} title={dark ? content.copy.accessibility.themeToggle.light : content.copy.accessibility.themeToggle.dark}>
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  </header>;
}

function Hero() {
  return <section id="home" className="hero">
    <div className="container hero-grid">
      <TalkingAvatar />
      <div className="hero-copy">
        <span className="status"><i className="status-dot" />{content.status}</span>
        <p className="eyebrow" style={{ marginTop: 26 }}>{content.title}</p>
        <h1>{content.value.split('great companies')[0]}<span className="accent">great companies</span></h1>
        <p className="hero-lead">{content.heroIntro}</p>
        <div className="hero-actions">
          <a className="button button-primary magnetic" href={`${import.meta.env.BASE_URL}Azka_Marzook_CV.pdf`} download onMouseMove={magnet} onMouseLeave={unmagnet}><Download size={16} />{content.copy.hero.cv}</a>
          <a className="button button-ghost magnetic" href={`mailto:${content.email}`} onMouseMove={magnet} onMouseLeave={unmagnet}><Mail size={16} />{content.copy.hero.connect} <ArrowRight size={15} /></a>
        </div>
        <div className="hero-meta"><MapPin size={15} />{content.location}</div>
      </div>
    </div>
    <div className="container connection-board" aria-label={content.copy.accessibility.candidateOpportunity}>
        <div className="connection-card glass"><span className="connection-icon" style={{ background: 'rgba(255,128,110,.12)', color: 'var(--coral)' }}><BriefcaseBusiness size={19} /></span><strong>{content.copy.hero.candidate}</strong></div>
      <svg className="connector" viewBox="0 0 120 30" aria-hidden="true"><path d="M3 15h105m0 0-9-9m9 9-9 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <div className="connection-card glass"><span className="connection-icon" style={{ background: 'rgba(98,211,195,.12)', color: 'var(--teal)' }}><Waypoints size={19} /></span><strong>{content.copy.hero.opportunity}</strong></div>
    </div>
  </section>;
}

function Stats() {
  const reduceMotion = useReducedMotion();
  const [counts, setCounts] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? content.stats.map(item => item.value)
    : [0, 0, 0]);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.disconnect();
        if (reduceMotion) {
          setCounts(content.stats.map(item => item.value));
          return;
        }
        const start = performance.now();
        const animate = now => {
          const progress = Math.min((now - start) / 1150, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCounts(content.stats.map(item => Math.round(item.value * eased)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: .4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduceMotion]);
  return <div className="stats-section container" ref={ref}>
    <div className="stat-grid">
      {content.stats.map((s, i) => <div className="stat" key={s.label}>
        <strong className="stat-number">{counts[i]}{s.suffix}</strong>
        <span className="stat-label">{s.label}{i === 2 && <><br /><small>{s.detail}</small></>}</span>
      </div>)}
    </div>
  </div>;
}

function About() {
  const reveal = useReveal();
  return <section id="about" className="section">
    <div className="container about-grid">
      <motion.div {...reveal}><div className="section-kicker"><span className="eyebrow">{content.copy.about.eyebrow}</span></div><h2 className="section-heading">{content.copy.about.title[0]}<br />{content.copy.about.title[1]}</h2><p className="about-quote">“{content.copy.about.quote}”</p></motion.div>
      <motion.div {...reveal} className="about-copy"><p>{content.aboutSummary}</p><div className="about-tags">{content.copy.about.tags.map(tag => <span key={tag}>{tag}</span>)}</div></motion.div>
    </div>
  </section>;
}

function Approach() {
  const [selected, setSelected] = useState(0);
  const reveal = useReveal();
  return <section id="approach" className="section" style={{ paddingTop: 60 }}>
    <div className="container">
      <motion.div {...reveal}><div className="section-kicker"><span className="eyebrow">{content.copy.approach.eyebrow}</span></div><h2 className="section-heading">{content.copy.approach.title[0]}<br />{content.copy.approach.title[1]}</h2><p className="section-copy">{content.copy.approach.intro}</p></motion.div>
      <motion.div {...reveal} className="pipeline">
        {content.pipeline.map((step, i) => <button key={step.title} className={`pipeline-step ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)} aria-pressed={selected === i}>
          <span className="pipeline-number" /><strong>{step.title}</strong><p>{step.short}</p>
        </button>)}
      </motion.div>
      <div className="pipeline-detail glass" aria-live="polite"><strong style={{ color: 'var(--teal)' }}>{content.pipeline[selected].title}:</strong> {content.pipeline[selected].detail}</div>
    </div>
  </section>;
}

function Skills() {
  const reveal = useReveal();
  return <section id="skills" className="section">
    <div className="container">
      <motion.div {...reveal}><div className="section-kicker"><span className="eyebrow">{content.copy.skills.eyebrow}</span></div><h2 className="section-heading">{content.copy.skills.title[0]}<br />{content.copy.skills.title[1]}</h2></motion.div>
      <div className="skills-layout">
        {content.skills.map((group, i) => <motion.div key={group.title} {...reveal} transition={{ ...reveal.transition, delay: i * .06 }} className="skill-group glass">
          <h3>{group.title}</h3><div className="chips">{group.items.map(item => <span key={item} className="skill-chip">{item}</span>)}</div>
        </motion.div>)}
      </div>
    </div>
  </section>;
}

function Experience() {
  const reveal = useReveal();
  return <section id="experience" className="section">
    <div className="container">
      <motion.div {...reveal}><div className="section-kicker"><span className="eyebrow">{content.copy.experience.eyebrow}</span></div><h2 className="section-heading">{content.copy.experience.title[0]}<br />{content.copy.experience.title[1]}</h2></motion.div>
      <div className="timeline">{content.experience.map((item, i) => <motion.article key={item.role} {...reveal} transition={{ ...reveal.transition, delay: i * .15 }} className="experience">
        <span className="timeline-dot" /><div className="experience-card glass"><div className="experience-head"><div><h3>{item.role}</h3><span className="company">{item.company}</span><span style={{ color: '#8190aa', fontSize: '.79rem' }}> · {item.location}</span></div><span className="date-pill">{item.date}</span></div><ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div>
      </motion.article>)}</div>
    </div>
  </section>;
}

function Education() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();
  return <section id="education" className="section">
    <div className="container">
      <motion.div {...reveal}><div className="section-kicker"><span className="eyebrow">{content.copy.education.eyebrow}</span></div><h2 className="section-heading">{content.copy.education.title[0]}<br />{content.copy.education.title[1]}</h2></motion.div>
      <div className="resume-grid">
        <div><h3 className="eyebrow" style={{ margin: '0 0 17px' }}>{content.copy.education.educationLabel}</h3><div className="education-list">{content.education.map((item, i) => <motion.article key={item.title} {...reveal} transition={{ ...reveal.transition, delay: i * .08 }} className="education-card glass"><GraduationCap size={18} color="var(--coral)" style={{ marginBottom: 15 }} /><h3>{item.title}</h3>{item.focus && <p style={{ color: '#abb8ce', fontSize: '.8rem', margin: '0 0 8px' }}>{item.focus}</p>}<div className="school">{item.school}</div><div className="when">{item.date}</div></motion.article>)}</div></div>
        <div><h3 className="eyebrow" style={{ margin: '0 0 17px' }}>{content.copy.education.researchLabel}</h3><div className="research-list">{content.research.map((item, i) => <motion.article key={item.title} {...reveal} transition={{ ...reveal.transition, delay: i * .08 }} className="research-card glass"><span className="grade">{content.copy.accessibility.grade}: {item.grade}</span><h3>{item.title}</h3><div className="research-meta">{item.module} · {item.role}</div><div className="when">{item.date}</div><p>{item.description}</p></motion.article>)}</div></div>
      </div>
      <motion.div {...reveal} style={{ marginTop: 44 }}><h3 className="eyebrow">{content.copy.education.languageLabel}</h3><div className="languages">{content.languages.map((lang, i) => {
        const amount = { Fluent: 1, Intermediate: .67, Basic: .34 }[lang.level];
        return <motion.div key={lang.name} {...reveal} transition={{ ...reveal.transition, delay: i * .12 }} className="language-card glass">
          <div className="language-top"><strong>{lang.name}</strong><span>{lang.level}</span></div>
          <div className="language-meter" role="img" aria-label={`${lang.name}: ${lang.level}`}><motion.i initial={{ scaleX: reduceMotion ? amount : 0 }} whileInView={{ scaleX: amount }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .8, delay: reduceMotion ? 0 : .25 + i * .12, ease: [.2, .7, .2, 1] }} /></div>
        </motion.div>;
      })}</div></motion.div>
    </div>
  </section>;
}

function Contact() {
  const reveal = useReveal();
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const message = String(form.get('message') || '').trim();
    if (!name || !message) return;
    const subject = encodeURIComponent(`${content.copy.contact.enquirySubject} ${name}`);
    const body = encodeURIComponent(`${content.copy.contact.greeting}\n\n${message}\n\n${name}`);
    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
  }
  return <section id="contact" className="contact-section">
    <div className="container">
      <motion.div {...reveal} className="contact-panel glass">
        <div><div className="section-kicker"><span className="eyebrow">{content.copy.contact.eyebrow}</span></div><h2 className="section-heading">{content.copy.contact.title[0]}<br />{content.copy.contact.title[1]}</h2><p className="section-copy">{content.copy.contact.intro}</p>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${content.email}`}><span className="contact-link-icon"><Mail size={17}/></span>{content.email}<ArrowRight size={14}/></a>
            <a className="contact-link" href={content.linkedin} target="_blank" rel="noreferrer"><span className="contact-link-icon"><ExternalLink size={16}/></span>{content.copy.contact.linkedinAction}<ArrowRight size={14}/></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>{content.copy.contact.formName}<input name="name" autoComplete="name" placeholder={content.copy.contact.namePlaceholder} required /></label>
          <label>{content.copy.contact.formMessage}<textarea name="message" rows="4" placeholder={content.copy.contact.messagePlaceholder} required /></label>
          <button className="button button-primary" type="submit"><Send size={15}/>{content.copy.contact.submit}</button>
          <span className="form-note">{content.copy.contact.formNote}</span>
        </form>
      </motion.div>
    </div>
  </section>;
}

export default function Portfolio() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('azka-theme') !== 'light'; } catch { return true; }
  });
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorEnabled, setCursorEnabled] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !dark);
    try { localStorage.setItem('azka-theme', dark ? 'dark' : 'light'); } catch { /* Storage can be unavailable in private browsing. */ }
  }, [dark]);
  useEffect(() => {
    const pointer = window.matchMedia('(pointer:fine) and (min-width: 900px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCursorEnabled(pointer);
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        setShowTop(window.scrollY > 600);
        const candidates = [...document.querySelectorAll('section[id]')];
        let current = 'home';
        candidates.forEach(section => { if (section.getBoundingClientRect().top <= 160) current = section.id; });
        setActive(current);
        ticking = false;
      });
    };
    const move = e => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if (pointer) window.addEventListener('pointermove', move, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); window.removeEventListener('pointermove', move); };
  }, []);
  return <div className={`site-shell ${dark ? '' : 'light-mode'}`}>
    <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    {cursorEnabled && <div className="custom-cursor" style={{ transform: `translate3d(${cursor.x - 6}px,${cursor.y - 6}px,0)` }} aria-hidden="true" />}
    <Header active={active} dark={dark} setDark={setDark} />
    <main className="portfolio-main">
    <Hero />
    <Stats />
    <About />
    <Approach />
    <Skills />
    <Experience />
    <Education />
    <Contact />
    </main>
    <footer className="footer"><div className="container footer-inner"><span>© {content.name} · {content.location}</span><a className="footer-top" href="#home">{content.copy.footer} <ArrowUp size={14}/></a></div></footer>
    {showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={content.copy.accessibility.backToTop}><ChevronUp size={19}/></button>}
  </div>;
}
