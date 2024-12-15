const cards = document.querySelectorAll(".portfolio-box");

const timeline = gsap.timeline();

cards.forEach((card, index) => {
  timeline.fromTo(
    card,
    { y: 50, opacity: 0 },
    { y: -20, opacity: 1 },
    index + 1
  );
});