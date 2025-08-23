  // initialize Masonry after all images have loaded
  const grid = document.querySelector('.grid');
  imagesLoaded(grid, () => {
    new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
    });
  });

  // GSAP Scroll-triggered reveal
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.grid-item').forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        end: 'top 60%',
        scrub: true
      },
      y: 50,
      opacity: 0,
      ease: 'power1.out'
    });
  });

    