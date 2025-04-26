// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // --- Navegación responsive ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Evento para el botón hamburguesa
    hamburger.addEventListener('click', toggleMobileMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Efectos de scroll ---
    // Cambiar estilo de la navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Filtro de proyectos ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Función para filtrar proyectos
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else if (card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Eventos para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            // Filtrar proyectos según la categoría
            const category = button.dataset.filter;
            filterProjects(category);
        });
    });

    // --- Formulario de contacto ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Aquí normalmente enviarías los datos a un servidor
            // Como estamos haciendo un ejemplo educativo, simularemos una respuesta exitosa
            
            // Mostrar confirmación
            alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }

    // --- Animación de entrada para las secciones ---
    // Esta función añade una clase para animar elementos cuando son visibles
    function revealSection() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Ejecutar una vez al cargar la página
    revealSection();
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', revealSection);
});