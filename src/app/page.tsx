"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const ASSETS = "https://talasilacaterers.com/wp-content/uploads/2024/09";

const menuImages = [
  "/menu1.webp",
  "/menu2.webp",
  "/menu3.webp",
  "/menu4.webp",
  "/menu5.webp",
  "/menu6.webp",
];

function MenuCarousel() {
  const [current, setCurrent] = useState(0);
  const dragState = useRef({ start: 0, current: 0, isDragging: false });
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    if (index < 0) index = menuImages.length - 1;
    if (index >= menuImages.length) index = 0;
    setCurrent(index);
    if (trackRef.current) trackRef.current.style.transform = "";
  }, []);

  const handleDragStart = (x: number) => {
    dragState.current = { start: x, current: x, isDragging: true };
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const handleDragMove = (x: number) => {
    if (!dragState.current.isDragging) return;
    dragState.current.current = x;
    const dx = x - dragState.current.start;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${dx * 0.4}px)`;
  };

  const handleDragEnd = () => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    const diff = dragState.current.start - dragState.current.current;
    if (trackRef.current) trackRef.current.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    if (Math.abs(diff) > 25) {
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
    } else {
      if (trackRef.current) trackRef.current.style.transform = "";
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();
  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  return (
    <div className="menu-carousel-wrap">
      <div
        ref={containerRef}
        className="menu-carousel-scene"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { if (dragState.current.isDragging) handleDragEnd(); }}
      >
        <div className="menu-carousel-track" ref={trackRef}>
          {menuImages.map((src, i) => {
            const len = menuImages.length;
            let offset = i - current;
            if (offset > len / 2) offset -= len;
            if (offset < -len / 2) offset += len;
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <img
                key={i}
                src={src}
                alt={`Menu ${i + 1}`}
                draggable={false}
                loading="lazy"
                className={`menu-carousel-slide ${isActive ? "active" : ""}`}
                style={{
                  transform: isActive
                    ? "translateX(0) translateZ(0) scale(1)"
                    : `translateX(${offset > 0 ? "40" : "-40"}px) translateZ(-120px) scale(0.8)`,
                  opacity: Math.max(0, 1 - absOffset * 0.3),
                  zIndex: 10 - absOffset,
                  filter: isActive ? "none" : "brightness(0.5)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={() => goTo(current - 1)}
        className="menu-carousel-btn menu-carousel-btn-prev"
        aria-label="Previous"
      >&#8249;</button>
      <button
        onClick={() => goTo(current + 1)}
        className="menu-carousel-btn menu-carousel-btn-next"
        aria-label="Next"
      >&#8250;</button>

      <div className="menu-carousel-dots">
        {menuImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`menu-carousel-dot ${i === current ? "active" : "inactive"}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src="/vcaters.webp" alt="V Catering & Events" width={150} height={60} />
        </div>
        <div className="header-right">
          <a href="https://wa.me/918686860658" target="_blank" rel="noopener noreferrer" className="phone-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30">
              <g transform="translate(-1607 -84)">
                <path d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Z" transform="translate(1607 84)" fill="#d4301a"/>
                <path d="M17.371,13.655V15.8a1.428,1.428,0,0,1-1.557,1.428,14.133,14.133,0,0,1-6.163-2.192,13.926,13.926,0,0,1-4.285-4.285A14.133,14.133,0,0,1,3.174,4.557,1.428,1.428,0,0,1,4.595,3H6.737A1.428,1.428,0,0,1,8.165,4.228a9.17,9.17,0,0,0,.5,2.007,1.428,1.428,0,0,1-.321,1.507l-.907.907a11.426,11.426,0,0,0,4.285,4.285l.907-.907a1.428,1.428,0,0,1,1.507-.321,9.169,9.169,0,0,0,2.007.5,1.428,1.428,0,0,1,1.228,1.45Z" transform="translate(1611.73 88.884)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
              </g>
            </svg>
            086868 60658
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/vcaters.webp">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <img src="/vcaters.webp" alt="V Catering & Events" className="hero-logo" fetchPriority="high" />
          <div className="hero-badge">
            <span className="hero-stars">★★★★★</span>
            <span className="hero-rating">4.9</span>
            <span className="hero-reviews">2K+ Google Reviews</span>
          </div>
          <h1 className="hero-title">Authentic Flavours</h1>
          <h2 className="hero-subtitle">For Every Celebration</h2>
          <a href="#form" className="hero-btn">BOOK ON WHATSAPP</a>
        </div>
      </section>

      {/* About Us - Red Aesthetic Section */}
      <section style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8ECEF 100%)", padding: 0 }}>
        <div className="about-red-wrap">
          {/* Left: About Us Heading */}
          <div className="about-red-left">
            <h2>About Us</h2>
          </div>

          {/* Right: Red Aesthetic Area */}
          <div className="about-red-right">
            <div className="about-red-content">
              <p className="about-red-desc">
                Celebrations are the perfect time to create lasting memories, and our delicious dishes turn every bite into a delightful experience. With our roots in Andhra Pradesh and Telangana, where we started as Sri Padmavathi Catering and Events in Vijayawada, we bring over a decade of culinary excellence to your special occasions. We blend authentic flavours with a dash of innovation, ensuring each meal is a cherished part of your special moments. Our menu showcases classic South Indian specialities along with a varied range of cuisines, crafted to please every palate and enhance your celebrations.
              </p>

              <div className="about-red-subrow">
                <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
                <h3 className="about-red-subheading">About Us</h3>
                <img src={`${ASSETS}/Group-32.svg`} alt="" width={327} height={5} style={{ maxWidth: "70%" }} />
              </div>

              <p className="about-red-offer">
                At V Catering & Events, we offer a full spectrum of catering services designed to make every event extraordinary. From intimate gatherings to grand celebrations, our experienced team provides:
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards - overlaps the red area */}
      <section className="services-section">
        <div className="services-grid">
          {[
            { img: "145964-66e156c0e5d94.webp", title: "Celebrations", desc: "Turn your special occasion into a delightful feast with gourmet catering and attentive service that make every moment extraordinary." },
            { img: "142444-66e156bfad7b5.webp", title: "Corporate Events", desc: "Enhance your business gatherings with our expansive cuisine expertise, ensuring a seamless and holistic experience for you and your guests." },
            { img: "142539-66e156bf8912c.webp", title: "Private Events", desc: "From intimate gatherings to grand celebrations, we tailor every aspect of your culinary experience to exceed your expectations and create unforgettable moments." },
            { img: "142539-66e156bf8912c.webp", title: "Themed Parties", desc: "Make your themed parties unforgettable with innovative dishes and a flair for detail that perfectly brings your theme to life." },
          ].map((card, i) => (
            <div key={i} className="service-card">
              <img src={`${ASSETS}/${card.img}`} alt={card.title} />
              <div className="service-card-overlay">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="approach-section">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">Our Approach</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-32-1.svg`} alt="" width={327} height={5} /></span>
        </div>
        <p className="approach-text">
          We are dedicated to making sure every meal, big or small, is not only delicious but also prepared with the utmost care and quality. For us, it&apos;s more than just serving food; it&apos;s about fostering meaningful connections and turning every meal into a celebration of flavour, culture, and togetherness.
        </p>
      </section>

      {/* Why V Catering & Events */}
      <section className="why-section">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">Why V Catering &amp; Events</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} /></span>
        </div>
        <div className="why-grid">
          {[
            { icon: "Group-21.svg", title: "Event Planning", desc: "We bring warmth and excellence to make your event stress-free with personalised care." },
            { icon: "Group-23.svg", title: "Customised Menus", desc: "We perfectly match your unique preferences, making every dining experience unique." },
            { icon: "Group-35.svg", title: "Authentic Flavours", desc: "We infuse every dish with authentic flavours, ensuring each one is true to its roots." },
            { icon: "Group-37.svg", title: "Consistent Quality", desc: "We uphold the highest standards to bring you a dining experience you can always count on." },
          ].map((item, i) => (
            <div key={i} className="why-item">
              <div className="why-item-icon">
                <img src={`${ASSETS}/${item.icon}`} alt="" width={35} height={35} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Banner */}
      <section className="banner-image">
        <img src={`${ASSETS}/mask-group-2-66e278db4b969.webp`} alt="" />
      </section>

      {/* Cuisine */}
      <section className="cuisine-section">
        <div className="cuisine-grid">
          {[
            { img: "145964-66f3dd9526547.webp", title: "North Indian" },
            { img: "142444.png", title: "South Indian" },
            { img: "142539-66f3dd921cc29.webp", title: "Chinese" },
            { img: "148123-66f3dd97851fb.webp", title: "Japanese" },
          ].map((item, i) => (
            <div key={i} className="cuisine-card">
              <img src={`${ASSETS}/${item.img}`} alt={item.title} />
              <div className="cuisine-card-overlay">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="video-gallery">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">Video Gallery</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} /></span>
        </div>
        <div className="video-gallery-banner">
          <img src={`${ASSETS}/Banner.webp`} alt="Banner" />
        </div>
      </section>

      {/* Menu Carousel */}
      <section className="menu-section">
        <div className="section-title-row" style={{ padding: "0 40px" }}>
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">Our Menu</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} /></span>
        </div>
        <MenuCarousel />
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">What Our Happy Clients Say</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} /></span>
        </div>
        <div className="testimonials-grid">
          {[
            { text: "They made my brother's wedding truly special, all of our guests enjoyed the traditional South Indian food served on banana leaf. I highly recommend it!", name: "Ms. Vineetha", role: "Designer" },
            { text: "They did an exceptional job in providing lunch at our corporate seminar. The customised menu with chat and pasta definitely satisfied my team's cravings. We would opt for them again.", name: "Mr. Kumar", role: "Designer" },
          ].map((t, i) => (
            <div key={i} className="testimonial-item">
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Get in Touch */}
      <section id="form" className="form-section">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title" style={{ color: "#fff" }}>Book via WhatsApp</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} style={{ filter: "brightness(0) invert(1)" }} /></span>
        </div>
        <div className="form-wrapper" style={{ textAlign: "center" }}>
          <p style={{ color: "#ccc", marginBottom: 20, fontSize: 15, lineHeight: 1.6 }}>
            Tap the button below to chat with us on WhatsApp and book V Catering &amp; Events for your occasion.
          </p>
          <a
            href="https://wa.me/918686860658?text=I'd%20like%20to%20book%20V%20Catering%20%26%20Events"
            target="_blank"
            rel="noopener noreferrer"
            className="submit-btn"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            BOOK ON WHATSAPP
          </a>
        </div>
      </section>

      {/* Locations */}
      <section className="locations-section">
        <div className="section-title-row">
          <img src="/justv.webp" alt="" width={90} height={90} loading="lazy" />
          <h2 className="section-title">Locations</h2>
          <span className="section-title-line"><img src={`${ASSETS}/Group-33.svg`} alt="" width={327} height={5} /></span>
        </div>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <p style={{ fontSize: 16, color: "#333", lineHeight: 1.6 }}>
              Beside LIne L.V Prasad Eye Hospital Road, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034
            </p>
            <p style={{ fontSize: 14, color: "#666", marginTop: 5 }}>Open 24 hours</p>
          </div>
          <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <iframe
              src="https://maps.google.com/maps?q=V+Catering+%26+Events+Banjara+Hills+Hyderabad&output=embed"
              width="100%"
              height="350"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="V Catering & Events Location"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col footer-brand">
            <img src="/vcaters.webp" alt="V Catering & Events" width={150} height={60} style={{ marginBottom: 12 }} />
            <p className="footer-desc">
              Hyderabad's premier catering service with 2K+ Google reviews. Authentic flavours for every celebration — weddings, corporate events, and private gatherings.
            </p>
            <div className="footer-social">
              <a href="https://wa.me/918686860658" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <a href="#about">About Us</a>
            <a href="#menu">Our Menu</a>
            <a href="#locations">Locations</a>
            <a href="#form">Book Now</a>
          </div>

          <div className="footer-col footer-contact">
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-phone">
              <a href="tel:+918686860658">086868 60658</a>
            </p>
            <p className="footer-address">
              Beside LIne L.V Prasad Eye Hospital Road,<br />
              Road No. 2, Banjara Hills,<br />
              Hyderabad, Telangana 500034
            </p>
            <p className="footer-hours">Open 24 hours</p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-credit">All Rights Reserved &copy; 2025 V Catering & Events</p>
          <div className="footer-bottom-links">
            <button onClick={() => setShowPrivacy(true)} className="footer-link-btn">Privacy Policy</button>
            <button onClick={() => setShowTerms(true)} className="footer-link-btn">Terms &amp; Conditions</button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Popup */}
      {showPrivacy && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={() => setShowPrivacy(false)} className="popup-close">&times;</button>
            <div className="popup-logo">
              <img src="/vcaters.webp" alt="" width={175} height={80} />
            </div>
            <h2 className="popup-heading">PRIVACY POLICY</h2>
            <p className="popup-subheading">
              This privacy policy governs how V Catering & Events and its subsidiaries, partners, agents, and affiliates collect, use, maintain, and disclose information collected from users of this website and microsite.
            </p>
            <div className="popup-body">
              <h2>PERSONAL IDENTIFICATION INFORMATION</h2>
              <p>We may collect personal identification information from users in a variety of ways, including, but not limited to when users visit our site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features, or resources we make available on our site. Users may be asked for an appropriate name, email address, mailing address, and phone number. Users may, however, visit our site anonymously. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain site-related activities.</p>
              <h2>NON-PERSONAL IDENTIFICATION INFORMATION</h2>
              <p>We may collect non-personal identification information about users whenever they interact with our site. Non-personal identification information may include the browser name, the type of computer, technical information about users, the type of connection to our site, such as the operating system and the Internet service providers utilised, and other similar information.</p>
              <h2>WEB BROWSER COOKIES</h2>
              <p>Our site may use &ldquo;cookies&rdquo; to enhance user experience. User&apos;s web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browser to refuse cookies or to alert them when cookies are being sent. If they do so, note that some parts of the site may not function properly.</p>
              <h2>HOW WE USE COLLECTED INFORMATION</h2>
              <p>V Catering & Events may collect and use the user&apos;s personal information for the following purposes:</p>
              <div style={{ marginLeft: 20, marginBottom: 15 }}>
                <p><strong>To improve customer service</strong> - Information provided by users helps us respond to customer service requests and support needs, more efficiently.</p>
                <p><strong>To personalise user experience</strong> - We may use information in the aggregate to understand how our users as a group use the services and resources provided on our site.</p>
                <p><strong>To improve our site</strong> - We may use feedback provided by the user(s) to improve our products and services.</p>
                <p>To run a promotion, contest, survey, or other site feature. To send the user/s information they agreed to receive about topics of interest to them. To send periodic emails.</p>
              </div>
              <h2>HOW WE PROTECT USER&apos;S INFORMATION</h2>
              <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorised access, alteration, disclosure, or destruction of the user&apos;s personal information and data stored on our site. As with data security, there are limits to its effectiveness, and we indemnify ourselves in the event of an attack that is difficult to defend against. We also will do our best to retrieve any data that is lost as per available resources.</p>
              <h2>SHARING PERSONAL INFORMATION OF USERS</h2>
              <p>We do not sell, trade, or rent a user&apos;s personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding users with our subsidiaries, our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>
              <h2>CHANGES TO THIS PRIVACY POLICY</h2>
              <p>V Catering & Events shall update this privacy policy at its sole discretion. Users are advised to check this page for any changes in the privacy policy and to stay informed about how the personal information of the users is protected by us.</p>
              <h2>YOUR ACCEPTANCE OF THESE TERMS</h2>
              <p>By using this site, the users signify their acceptance of this policy, as may be modified from time to time.</p>
              <h2>CONTACT US:</h2>
              <p>If you have any questions about this privacy policy, the practices of this site, or your dealings with this site, please contact us at: (email@example.com)</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Popup */}
      {showTerms && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={() => setShowTerms(false)} className="popup-close">&times;</button>
            <div className="popup-logo">
              <img src="/vcaters.webp" alt="" width={175} height={80} />
            </div>
            <h2 className="popup-heading">Terms &amp; Conditions</h2>
            <p className="popup-subheading">
              Welcome to V Catering & Events&apos; website. By accessing and using our website or app, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <div className="popup-body">
              <h2>1. Use of Website</h2>
              <p>The content on this website is for general information purposes only. It is subject to change without notice and should not be used as the sole basis for making decisions.</p>
              <h2>2. Intellectual Property</h2>
              <p>All content, including text, images, and graphics on this website, is the property of V Catering & Events. Unauthorized use or reproduction of any content is prohibited.</p>
              <h2>3. Third-Party Links</h2>
              <p>Our website may include links to third-party websites for your convenience. We do not endorse or take responsibility for the content or privacy practices of these third-party websites.</p>
              <h2>4. Liability</h2>
              <p>V Catering & Events will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or app, or from any inaccuracies or omissions in the content provided.</p>
              <h2>5. App Usage</h2>
              <p>If you are using our app (app.talasilacaterers.com), you agree to abide by the specific terms and conditions related to its use, including account creation, data usage, and service updates.</p>
              <h2>6. Termination</h2>
              <p>We reserve the right to terminate or suspend access to the website or app without prior notice if we find any violations of these terms.</p>
              <h2>7. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes arising from the use of this website or app will be subject to the jurisdiction of the courts in Andhra Pradesh.</p>
              <h2>8. Changes to Terms</h2>
              <p>We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this page with an updated revision date.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
