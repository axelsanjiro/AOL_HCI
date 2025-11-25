function toggleMenu() {
  const navbar = document.querySelector("nav");
  navbar.classList.toggle("active");
}

const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname;

navLinks.forEach(link => {
  if (link.href.includes(currentPage)) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});