// Projects Component
class Projects {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterProjects(button));
        });
    }

    filterProjects(button) {
        const filter = button.dataset.filter;
        
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        this.projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('show'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });
    }
}

// Initialize projects
document.addEventListener('DOMContentLoaded', () => {
    new Projects();
}); 