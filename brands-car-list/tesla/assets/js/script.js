// Navbar color change on scroll
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.model-section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100 && 
            window.pageYOffset < sectionTop + sectionHeight - 100) {
            current = section;
        }
    });

    if (current && current.classList.contains('dark')) {
        navbar.classList.add('dark');
    } else {
        navbar.classList.remove('dark');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});