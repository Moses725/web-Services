gsap.registerPlugin(ScrollTrigger);
  
      gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
          toggleActions: "play reverse play reverse"
        }
      })
      .from(".contact-info h1", { opacity: 0, y: -30 })
      .from(".contact-info p", { opacity: 0, y: -20 }, "-=0.3")
      .from(".info-item", { opacity: 0, x: -30, stagger: 0.2 }, "-=0.3")
      .from(".contact-form input, .contact-form textarea", { opacity: 0, y: 20, stagger: 0.2 }, "-=0.5");