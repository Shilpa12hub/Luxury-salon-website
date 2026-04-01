import { useEffect, useState } from 'react'

import heroImg from './assets/hero.jpg'
import serviceImg from './assets/service1.jpg'
import gallery1 from './assets/gallery1.jpg'
import gallery2 from './assets/gallery2.jpg'
import gallery22 from './assets/gallery22.jpg'
import gallery3 from './assets/gallery3.jpg'
import gallery4 from './assets/gallery4.jpg'

const services = [
  {
    title: 'Haircuts & Styling',
    description:
      'Fresh cuts, smooth finishing, and styling that suits your everyday vibe and special occasions.',
  },
  {
    title: 'Hair Color',
    description:
      'From subtle highlights to full transformations, we help you choose shades that look great on you.',
  },
  {
    title: 'Facials & Skin Care',
    description:
      'Relaxing facials and skin treatments that leave your skin feeling clean, fresh, and glowing.',
  },
]

const galleryImages = [
  { src: gallery1, alt: 'Salon interior and atmosphere' },
  { src: gallery22, alt: 'Hair styling at Velour Salon' },
  { src: gallery3, alt: 'Beauty and care at Velour Salon' },
  { src: gallery4, alt: 'Velour Salon space' },
]

const testimonials = [
  {
    quote:
      'Super friendly team and such a relaxing space. I loved my haircut and blow dry.',
    name: 'Aarohi Kapoor',
    city: 'Chennai',
    rating: 5,
  },
  {
    quote:
      'They really listened to what I wanted and got the color exactly right. Highly recommend.',
    name: 'Smriti Pandey',
    city: 'Bengaluru',
    rating: 4,
  },
  {
    quote:
      'Clean place, great service, and very professional stylists. My facial was amazing.',
    name: 'Vijay Kumar',
    city: 'Mumbai',
    rating: 5,
  },
]

const faqItems = [
  {
    q: 'Do I need to book in advance?',
    a: 'We recommend booking so you get your preferred time, especially on weekends. Walk-ins are welcome when we have space.',
  },
  {
    q: 'What should I bring to my first visit?',
    a: 'Just yourself. If you have reference photos for hair or color, feel free to bring them on your phone.',
  },
  {
    q: 'How long does a typical appointment take?',
    a: 'It depends on the service. A cut might be an hour; color or treatments can take longer. We will give you a rough time when you book.',
  },
  {
    q: 'Do you use products suitable for Indian hair and skin?',
    a: 'Yes. We choose products that work well for a range of hair textures and skin types, and we adjust based on what your hair and skin need.',
  },
]

function StarRow({ count, max = 5 }) {
  return (
    <div className="star-row" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < count ? 'star filled' : 'star'}>
          &#9733;
        </span>
      ))}
    </div>
  )
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '' })

  useEffect(() => {
    const revealElements = document.querySelectorAll('.fade-in')
    const parallaxElements = document.querySelectorAll('[data-parallax]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    revealElements.forEach((el) => observer.observe(el))

    let frameId = 0

    const updateParallax = () => {
      const scrollY = window.scrollY
      parallaxElements.forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.08)
        const offset = scrollY * speed
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      })
      frameId = requestAnimationFrame(updateParallax)
    }

    frameId = requestAnimationFrame(updateParallax)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [modalOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setModalOpen(false)
    setForm({ name: '', phone: '', service: '' })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

        :root {
          --bg: #efe6d7;
          --surface: #f0e7d9;
          --surface-soft: #fbf8f2;
          --gold: #b49a6c;
          --text: #121212;
          --muted: #5d5851;
          --line: rgba(18, 18, 18, 0.12);
        }

        html {
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        body {
          margin: 0;
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
          background:
            radial-gradient(circle at top right, #f8efe0 0%, transparent 42%),
            radial-gradient(circle at bottom left, #f5ead9 0%, transparent 40%),
            var(--bg);
          color: var(--text);
        }

        * {
          box-sizing: border-box;
        }

        .app {
          overflow-x: hidden;
        }

        .container {
          box-sizing: border-box;
          width: 100%;
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
          padding-left: max(1rem, env(safe-area-inset-left));
          padding-right: max(1rem, env(safe-area-inset-right));
        }

        .hero {
          min-height: 92vh;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-content {
          text-align: center;
          color: #fffdf8;
          max-width: 840px;
          padding: 1.5rem;
          z-index: 2;
        }

        .eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.88;
          margin-bottom: 1.5rem;
        }

        .hero h1 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.8rem, 7.2vw, 6.2rem);
          line-height: 1.04;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .hero p {
          margin: 1.25rem auto 2rem;
          max-width: 560px;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          line-height: 1.7;
          color: rgba(255, 251, 242, 0.9);
        }

        .cta {
          border: 1px solid rgba(255, 251, 242, 0.6);
          color: #fffef9;
          background: rgba(180, 154, 108, 0.2);
          padding: 0.95rem 2.1rem;
          font-size: 0.76rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 320ms ease, transform 320ms ease, border-color 320ms ease;
        }

        .cta:hover {
          background: rgba(180, 154, 108, 0.36);
          border-color: rgba(255, 251, 242, 0.9);
          transform: translateY(-2px);
        }

        section {
          padding: clamp(4rem, 7vw, 6rem) 0;
        }

        .section-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.2rem;
          border-bottom: 1px solid var(--line);
          padding-bottom: 1.2rem;
        }

        .section-head h2 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .section-head p {
          max-width: 440px;
          color: var(--muted);
          font-size: 0.98rem;
          line-height: 1.8;
        }

        .services-visual {
          width: 100%;
          margin-bottom: 2rem;
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid rgba(18, 18, 18, 0.08);
          min-height: min(52vw, 420px);
          max-height: 460px;
        }

        .services-visual img {
          width: 100%;
          height: 100%;
          min-height: min(52vw, 420px);
          max-height: 460px;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .service-card {
          background: var(--surface-soft);
          border: 1px solid rgba(18, 18, 18, 0.08);
          padding: 2rem;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: transform 360ms ease, border-color 360ms ease;
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: rgba(180, 154, 108, 0.48);
        }

        .service-card h3 {
          margin: 0 0 1.1rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .service-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.85;
        }

        .about-wrap {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: stretch;
        }

        .about-image {
          min-height: 520px;
          overflow: hidden;
          border-radius: 2px;
          border: 1px solid rgba(18, 18, 18, 0.08);
        }

        .about-image img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.9s ease;
        }

        .about-image:hover img {
          transform: scale(1.03);
        }

        .about-copy {
          background: var(--surface);
          padding: clamp(2.5rem, 5vw, 4.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 520px;
        }

        .about-copy h3 {
          margin: 0 0 1.5rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.1rem, 3.2vw, 2.85rem);
          line-height: 1.15;
          font-weight: 500;
          max-width: 20ch;
        }

        .about-copy p {
          margin: 0;
          color: var(--muted);
          line-height: 1.95;
          font-size: clamp(1.05rem, 1.15vw, 1.2rem);
          max-width: 52ch;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          width: 100%;
        }

        .gallery-item {
          position: relative;
          display: block;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border-radius: 2px;
          border: 1px solid rgba(18, 18, 18, 0.06);
          aspect-ratio: 1 / 1;
          min-height: 0;
          min-width: 0;
        }

        .gallery-item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 720ms ease;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
        }

        .quote-card {
          background: var(--surface-soft);
          border: 1px solid rgba(18, 18, 18, 0.08);
          padding: 1.6rem 1.4rem;
        }

        .star-row {
          margin-bottom: 1rem;
          letter-spacing: 0.12em;
          font-size: 0.95rem;
          line-height: 1;
        }

        .star {
          color: rgba(18, 18, 18, 0.18);
        }

        .star.filled {
          color: var(--gold);
        }

        .quote-card p {
          margin: 0 0 1.4rem;
          color: #2a2723;
          line-height: 1.9;
          font-size: 0.98rem;
        }

        .quote-meta {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: var(--gold);
        }

        .faq-list {
          display: grid;
          gap: 0;
          border-top: 1px solid var(--line);
        }

        .faq-item {
          border-bottom: 1px solid var(--line);
        }

        .faq-item summary {
          list-style: none;
          cursor: pointer;
          padding: 1.25rem 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary::after {
          content: '+';
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--muted);
          flex-shrink: 0;
        }

        .faq-item[open] summary::after {
          content: '−';
        }

        .faq-item p {
          margin: 0;
          padding: 0 0 1.35rem;
          color: var(--muted);
          line-height: 1.85;
          font-size: 0.97rem;
          max-width: 72ch;
        }

        .contact-wrap {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1rem;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 2.2rem 0;
        }

        .contact-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 2.8rem);
          margin: 0;
          font-weight: 500;
          line-height: 1.2;
        }

        .contact-info {
          display: grid;
          gap: 1rem;
          color: var(--muted);
          line-height: 1.85;
        }

        .contact-info strong {
          display: block;
          color: var(--text);
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 0.15rem;
          font-weight: 600;
        }

        footer {
          padding: 1.7rem 0 2.2rem;
          text-align: center;
          color: #3f3830;
          font-size: 0.84rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .fade-in {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.18, 0.7, 0.22, 1);
          will-change: transform, opacity;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(18, 14, 10, 0.45);
          display: grid;
          place-items: center;
          padding: 1.5rem;
          z-index: 1000;
          animation: modalIn 280ms ease;
        }

        @keyframes modalIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: var(--surface-soft);
          border: 1px solid rgba(18, 18, 18, 0.1);
          width: min(420px, 100%);
          padding: 2rem 2rem 1.75rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
        }

        .modal h2 {
          margin: 0 0 0.35rem;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.55rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .modal-sub {
          margin: 0 0 1.5rem;
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.55;
        }

        .modal label {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text);
          margin-bottom: 0.45rem;
          font-weight: 600;
        }

        .modal input,
        .modal select {
          width: 100%;
          padding: 0.75rem 0.85rem;
          margin-bottom: 1.1rem;
          border: 1px solid rgba(18, 18, 18, 0.14);
          background: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--text);
          border-radius: 2px;
        }

        .modal input:focus,
        .modal select:focus {
          outline: none;
          border-color: rgba(180, 154, 108, 0.7);
        }

        .modal-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 0.25rem;
        }

        .modal-actions button {
          font-family: inherit;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.75rem 1.25rem;
          cursor: pointer;
          border-radius: 2px;
          border: 1px solid transparent;
        }

        .modal-actions .ghost {
          background: transparent;
          border-color: rgba(18, 18, 18, 0.2);
          color: var(--muted);
        }

        .modal-actions .primary {
          background: var(--text);
          color: #faf7f2;
          border-color: var(--text);
        }

        .modal-actions .primary:hover {
          opacity: 0.92;
        }

        @media (max-width: 980px) {
          .services-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .about-wrap,
          .contact-wrap {
            grid-template-columns: 1fr;
          }

          .about-wrap {
            grid-template-columns: 1fr;
          }

          .about-image {
            min-height: 360px;
          }

          .about-image img {
            min-height: 360px;
          }

          .about-copy {
            min-height: auto;
          }

          .gallery-grid {
            gap: 0.75rem;
          }

          .section-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {modalOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="book-title">
            <h2 id="book-title">Book a consultation</h2>
            <p className="modal-sub">Share your details and we will get back to you shortly.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="book-name">Name</label>
              <input
                id="book-name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <label htmlFor="book-phone">Phone</label>
              <input
                id="book-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                required
              />
              <label htmlFor="book-service">Service</label>
              <select
                id="book-service"
                name="service"
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                required
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="haircut">Haircut & styling</option>
                <option value="color">Hair colour</option>
                <option value="facial">Facial & skin care</option>
                <option value="other">Other / not sure</option>
              </select>
              <div className="modal-actions">
                <button type="button" className="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="app">
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 12, 8, 0.38), rgba(15, 12, 8, 0.55)), url(${heroImg})`,
          }}
        >
          <div className="hero-content fade-in" data-parallax="0.08">
            <p className="eyebrow">Velour Salon</p>
            <h1>Refined Beauty, Crafted With Quiet Luxury</h1>
            <p>
              We are your go-to salon for great hair, glowing skin, and feel-good self-care.
            </p>
            <button className="cta" type="button" onClick={() => setModalOpen(true)}>
              Book Your Consultation
            </button>
          </div>
        </section>

        <section className="container fade-in" id="services">
          <div className="section-head">
            <h2>Services</h2>
            <p>Everything you need for hair, skin, and confidence in one beautiful space.</p>
          </div>
          <div className="services-visual">
            <img src={serviceImg} alt="Velour Salon services" />
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container fade-in" id="about">
          <div className="about-wrap">
            <div className="about-image" data-parallax="-0.05">
              <img src={gallery2} alt="Happy client with stylist at Velour Salon" />
            </div>
            <div className="about-copy">
              <h3>Good Energy, Skilled Hands</h3>
              <p>
                At Velour Salon, we keep things simple: listen first, suggest what works for you,
                and deliver results you will love. Whether it is a quick trim, a full makeover,
                or a calming facial, we make sure you walk out feeling your best.
              </p>
            </div>
          </div>
        </section>

        <section className="container fade-in" id="gallery">
          <div className="section-head">
            <h2>Gallery</h2>
            <p>A few glimpses of our space and the work we love doing.</p>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <figure className="gallery-item" key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="container fade-in" id="testimonials">
          <div className="section-head">
            <h2>Testimonials</h2>
            <p>What clients from Chennai, Bengaluru, and Mumbai have shared with us.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="quote-card">
                <StarRow count={item.rating} />
                <p>{item.quote}</p>
                <div className="quote-meta">
                  {item.name} - {item.city}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container fade-in" id="faq">
          <div className="section-head">
            <h2>Questions</h2>
            <p>Quick answers before you visit. Tap a question to read more.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container fade-in" id="contact">
          <div className="contact-wrap">
            <h2 className="contact-title">Visit Velour Salon</h2>
            <div className="contact-info">
              <div>
                <strong>Location</strong>
                14, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu 600034
              </div>
              <div>
                <strong>Phone</strong>
                +91 98401 56234
              </div>
              <div>
                <strong>Hours</strong>
                Monday - Saturday: 10:00 AM - 8:30 PM
                <br />
                Sunday: 11:00 AM - 6:30 PM
              </div>
            </div>
          </div>
        </section>

        <footer>Velour Salon - Chennai, India</footer>
      </main>
    </>
  )
}

export default App
