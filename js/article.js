  // Show the modal on "Read Full Article" click
  document.querySelectorAll(".read-more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Set modal display to block immediately
      document.querySelector(".article-modal").style.display = "block";

      // Animate overlay and modal content
      gsap.fromTo(
        ".modal-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        ".modal-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    });
  });

  // Function to close the modal with fade out animation using autoAlpha
  function closeModal() {
    gsap.to(".article-modal", {
      duration: 0.3,
      autoAlpha: 0,
      onComplete: function () {
        // Hide modal and reset autoAlpha for next open
        document.querySelector(".article-modal").style.display = "none";
        gsap.set(".article-modal", { autoAlpha: 1 });
      }
    });
  }

  // Close modal when clicking the close button or the overlay
  document.querySelector(".close-modal").addEventListener("click", closeModal);
  document
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);