// Page loader removed as requested
document.addEventListener('DOMContentLoaded', function() {

    // Add visibility class to result container when it's shown
    const originalDisplayChanger = display_changer;
    if (typeof display_changer === 'function') {
        window.display_changer = function() {
            originalDisplayChanger.apply(this, arguments);
            setTimeout(() => {
                document.querySelector('.result-mark-container').classList.add('visible');
            }, 10);
        };
    }

    // Add active animation effect to inputs
    const inputs = document.querySelectorAll('.input_box');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Enhanced radio buttons animation
    const radioInputs = document.querySelectorAll('.radio-input input');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });

    // Enhanced celebration effect
    const originalCelebrationEffect = celebration_effect;
    if (typeof celebration_effect === 'function') {
        window.celebration_effect = function() {
            // First show original celebration
            originalCelebrationEffect.apply(this, arguments);
            
            // Add additional effects
            const container = document.querySelector('.sub-container');
            container.style.transition = 'transform 0.5s ease';
            container.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                container.style.transform = 'scale(1)';
            }, 500);
        };
    }

    // Add subtle hover effect to calculate button
    const calculateButton = document.getElementById('calculate_button');
    if (calculateButton) {
        calculateButton.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 15px var(--shadow-color)';
        });
        
        calculateButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 8px var(--shadow-color)';
        });
    }

    // Add subtle animation to theme toggle
    const themeToggle = document.querySelector('.switch');
    if (themeToggle) {
        themeToggle.addEventListener('mouseenter', function() {
            const slider = this.querySelector('.slider');
            slider.style.transition = 'all 0.3s ease';
            slider.style.boxShadow = '0 0 8px var(--highlight-color)';
        });
        
        themeToggle.addEventListener('mouseleave', function() {
            const slider = this.querySelector('.slider');
            slider.style.boxShadow = 'none';
        });
    }
});

// Remove typing animation since we're using a more professional reveal effect