let internal_mark = JSON.parse(localStorage.getItem('internal_mark')) || 0;

function update_display(current_mark) {
    let intermal_marl_scored = current_mark;
    let marks_display = [60, 54, 48, 42, 36, 30, 27, current_mark];
    for (let i = 0; i < 7; i++) {
        marks_display[i] += intermal_marl_scored;
        if (marks_display[i] > 100) {
            marks_display[i] = 100;
        }
        marks_display[i] = parseFloat(marks_display[i].toFixed(2));
    }
    
    document.querySelector(".div4").innerHTML = marks_display[0];
    document.querySelector(".div6").innerHTML = marks_display[1];
    document.querySelector(".div8").innerHTML = marks_display[2];
    document.querySelector(".div10").innerHTML = marks_display[3];
    document.querySelector(".div12").innerHTML = marks_display[4];
    document.querySelector(".div14").innerHTML = marks_display[5];
    document.querySelector(".div16").innerHTML = marks_display[6];
    
    document.querySelector(".sub_head").innerHTML = `INTERNAL MARKS : <span>${marks_display[7]}</span>`;
}

// Initial setup
const sliderContainer = document.getElementById('custom_slider_container');
const sliderTrack = document.getElementById('custom_slider_track');
const sliderFill = document.getElementById('custom_slider_fill');
const sliderThumb = document.getElementById('custom_slider_thumb');

if (sliderContainer) {
    let isDragging = false;

    function updateSliderUI(val) {
        const percent = (val / 40) * 100;
        sliderThumb.style.left = `${percent}%`;
        sliderFill.style.width = `${percent}%`;
    }

    function handleDrag(e) {
        if (!isDragging) return;
        const rect = sliderTrack.getBoundingClientRect();
        let clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let x = clientX - rect.left;
        let percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        let new_val = (percent / 100) * 40;
        // round to 1 decimal place
        new_val = Math.round(new_val * 10) / 10;
        updateSliderUI(new_val);
        update_display(new_val);
    }

    // Set initial state
    updateSliderUI(internal_mark);

    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        sliderContainer.classList.add('active');
        handleDrag(e);
    });

    document.addEventListener('mousemove', handleDrag);

    document.addEventListener('mouseup', () => {
        isDragging = false;
        sliderContainer.classList.remove('active');
    });

    // Touch events
    sliderContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        sliderContainer.classList.add('active');
        handleDrag(e);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            handleDrag(e);
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isDragging = false;
        sliderContainer.classList.remove('active');
    });
}
update_display(internal_mark);

function return_page(){
    window.location.href = "../index.html";
}