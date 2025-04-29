// Animation utilities
const animations = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    fadeOut: (element, duration = 300) => {
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.opacity = Math.max(1 - (progress / duration), 0);
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    slideDown: (element, duration = 300) => {
        element.style.display = 'block';
        const height = element.scrollHeight;
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.height = Math.min(progress / duration * height, height) + 'px';
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.height = '';
                element.style.overflow = '';
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    slideUp: (element, duration = 300) => {
        const height = element.scrollHeight;
        element.style.height = height + 'px';
        element.style.overflow = 'hidden';
        
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            element.style.height = Math.max(height - (progress / duration * height), 0) + 'px';
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                element.style.height = '';
                element.style.overflow = '';
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// Export animations
window.animations = animations;

// Intersection Observer for reveal animations
const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after reveal if you don't want to animate again
                // revealObserver.unobserve(entry.target);
            } else {
                // Optional: Remove active class when element is out of view
                // entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px' // No margin
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
};

// Initialize staggered animations for groups of elements
const initStaggeredAnimations = () => {
    const staggerGroups = document.querySelectorAll('[data-stagger-group]');
    
    staggerGroups.forEach(group => {
        const children = group.children;
        [...children].forEach((child, index) => {
            child.classList.add(`delay-${index + 1}`);
            child.classList.add('reveal');
        });
    });
};

// Initialize all animations
const initAnimations = () => {
    initRevealAnimations();
    initStaggeredAnimations();
    
    // Re-run initialization when new content is dynamically added
    // You can call initAnimations() after adding new content
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Export functions for use in other files
export { initAnimations, initRevealAnimations, initStaggeredAnimations }; 