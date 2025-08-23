gsap.registerPlugin(ScrollTrigger);
    
      // Master animation for all cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials",
          start: "top 80%",
          end: "+=50%",
          scrub: 0.7,
          toggleActions: "play none none reverse"
        }
      });
    
      // Individual card animations with staggered drop effect
      gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
        tl.fromTo(card, 
          {
            x: -100,
            y: -50,
            opacity: 0,
            rotation: -5
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: index * 0.2
          }, 
          index * 0.15 // Stagger position in timeline
        );
      });
    
      // Additional scroll trigger for smooth entry
      ScrollTrigger.create({
        animation: tl,
        trigger: ".testimonials",
        start: "top 90%",
        end: "bottom center",
        scrub: 0.5
      });