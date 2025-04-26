// Skills Component
class Skills {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        // Animate skill bars on scroll
        this.observeSkills();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    // Reset width to 0
                    progressBar.style.width = '0';
                    
                    // Animate to target width
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 100);
                    
                    // Unobserve after animation
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });

        this.skillBars.forEach(bar => observer.observe(bar));
    }
}

// Initialize skills
document.addEventListener('DOMContentLoaded', () => {
    new Skills();
}); 