// Simplified animation enhancements - keeping only entry animations
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effect to mark results
    const markCells = document.querySelectorAll('.div4, .div6, .div8, .div10, .div12, .div14, .div16');
    markCells.forEach(cell => {
        // Highlight one after another with delay
        setTimeout(() => {
            cell.style.transition = 'all 0.3s ease';
            cell.style.color = '#bb86fc';
            
            setTimeout(() => {
                cell.style.color = '';
            }, 300);
        }, Array.from(markCells).indexOf(cell) * 200 + 2000); // Start after main animations finish
    });

    // Special effect for the internal mark display
    const internalMark = document.querySelector('.sub_head span');
    if (internalMark) {
        setTimeout(() => {
            internalMark.style.transition = 'all 0.5s ease';
            internalMark.style.textShadow = '0 0 10px rgba(255, 99, 71, 0.7)';
        }, 1500);
    }
});