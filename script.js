let result_mark=[0,0,false,false,false,false,0,0];//first_10,second_10,bonus,nptel,course,extra,final,external

function input_box_error_handler(mark,element_id){
    if(mark<0 || mark>100|| isNaN(mark)){
        navigator.vibrate(200);
        const container = document.getElementById(`${element_id}`);
        container.classList.add('vibrate');
        setTimeout(() => {
             container.classList.remove('vibrate');
        }, 400);
        return false;
    }
    return true;
}

function radio_button_checker(b1, b2) {
    const button1 = document.getElementById(b1);
    const button2 = document.getElementById(b2);

    if (!button1.checked && !button2.checked) {
        navigator.vibrate(200);
        const container1 = document.getElementById(`${b1}`);
        container1.classList.add('vibrate');
        setTimeout(() => {
            container1.classList.remove('vibrate');
        }, 400);
        const container2 = document.getElementById(`${b2}`);
        container2.classList.add('vibrate');
        setTimeout(() => {
            container2.classList.remove('vibrate');
        }, 400);
        return false;
    }
    return true;
}

function celebration_effect(){
    document.getElementById("congrs-lottie-animation").style.visibility='visible';
    if(window.innerWidth>768){
        document.getElementById("congrs-lottie-animation").classList.add('add_width_pc');
    }else{
        document.getElementById("congrs-lottie-animation").classList.add('add_width_mobile');
    }
    setInterval(()=>{
        document.getElementById("congrs-lottie-animation").style.visibility='hidden';
        if(window.innerWidth>768){
            document.getElementById("congrs-lottie-animation").classList.remove('add_width_pc');
        }else{
            document.getElementById("congrs-lottie-animation").classList.remove('add_width_mobile');
        }
    },3000);
}

document.getElementById("calculate_button").addEventListener('click',()=>{
    result_mark=[0,0,false,false,false,false,0,0];
    document.getElementById('special_case_text').innerHTML=``;
    let m1_mark=parseInt(document.getElementById('mark_m1').value)
    let m2_mark=parseInt(document.getElementById('mark_m2').value)
    let m3_mark=parseInt(document.getElementById('mark_m3').value)
    if(input_box_error_handler(m1_mark,'mark_m1') && input_box_error_handler(m2_mark,'mark_m2') && input_box_error_handler(m3_mark,'mark_m3') && radio_button_checker('yes_bonus','no_bonus') && radio_button_checker('nptel_yes','nptel_no') && radio_button_checker('course_yes','course_no') &&radio_button_checker('extra_yes','extra_no')){
        console.log(m1_mark);
        const bonus=document.getElementsByName('bonus');
        bonus.forEach((element)=>{
            if(element.checked){
                if(element.value==='yes'){
                    result_mark[2]=true;
                    }
            }
        })
        main(m1_mark,m2_mark,m3_mark);
        celebration_effect();
        document.getElementById('nptel_alert_container').style.visibility='visible';
    }
})

function mark_calculator(m1_mark,m2_mark,m3_mark,bonus_flag){
    let bonus_mark=(bonus_flag)?1.5:1;
    let first_10=((m1_mark*bonus_mark)+(m2_mark*bonus_mark))*0.05;
    let second_10=(m3_mark*bonus_mark)*0.1;
    first_10=(first_10>10)?10:first_10;
    second_10=(second_10>10)?10:second_10;
    result_mark[0]=parseFloat(first_10.toFixed(2));
    result_mark[1]=parseFloat(second_10.toFixed(2));
}

function extra_activity_cal(){
    const nptel_buttons=document.getElementsByName('nptel');
    const course=document.getElementsByName('course');
    const extra=document.getElementsByName('extra');
    nptel_buttons.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[3]=true;
            }
        }
    })
    course.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[4]=true;
            }
        }
    })
    extra.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[5]=true;
            }
        }
    })
}
//first_10,second_10,bonus,nptel,course,extra,final_result,external
function internal_mark_calculation(){
    let result=result_mark[0]+result_mark[1];
    if(result_mark[3]){
        result+=8;
    }
    if(result_mark[4]){
        result+=7;
    }
    if(result_mark[5]){
        result+=5;
    }
    result_mark[6]=parseFloat(result.toFixed(2));
    external_mark_calculation()
}
function external_mark_calculation(){ //calcualtes the external mark
    let external_mark = 91;
    if (result_mark[6] >= 23) {
        external_mark = 45;
    } else {
        external_mark = (50-result_mark[6])*1.667;
    }
    result_mark[7]=Math.floor(external_mark);
}

function display_changer(){
    let bonus_or_not=(result_mark[2])?"WITH BONUS":"WITHOUT BONUS";
    let nptel=(result_mark[3])?"8":"0";
    let extra=(result_mark[5])?"5":"0";
    let course=(result_mark[4])?"7":"0";
    document.querySelector('.result-mark-container').style.visibility='visible';
    document.querySelector('.result-mark-container').innerHTML=`<div class="row">
                    <p class="result-mark-header">${bonus_or_not}</p>
                </div>
                <div class="row">
                    <div class="col"><p >MODEL 1 & 2 </p></div>
                    <div class="col"><p>${result_mark[0]} / 10</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>MODEL 3 </p></div>
                    <div class="col"><p>${result_mark[1]} / 10</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>NPTEL </p></div>
                    <div class="col"><p>${nptel} / 8</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>COURSE </p></div>
                    <div class="col"><p>${course} / 7</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>EXTRA </p></div>
                    <div class="col"><p>${extra} / 5</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>TOTAL INTERNAL</p></div>
                    <div class="col"><p>${result_mark[6]} / 40</p></div>
                </div>
                <div class="row">
                    <div class="col"><p>MARK TO PASS </p></div>
                    <div class="col"><p>${result_mark[7]} / 100</p></div>
                </div>
                <button id="possible-mark-button">POSSIBLE MARK</button>`
        document.getElementById('possible-mark-button').addEventListener('click',()=>{
                    let intermal_marl_scored=result_mark[6];
                    localStorage.setItem('internal_mark', JSON.stringify(intermal_marl_scored));
                    window.location.href = "result_page.html";
                    window.location.href="result_page/result_page.html";
                });
}
function main(m1_mark,m2_mark,m3_mark){
    mark_calculator(m1_mark,m2_mark,m3_mark,result_mark[2]);
    if(m1_mark+m2_mark+m3_mark>=100){
        extra_activity_cal();
    }else{
        document.getElementById('special_case_text').innerHTML=`<p style=" background-color: tomato;width: 150px; padding: 3px;border-radius: 5px; font-weight: bold; color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 1);">SPECIAL CASE</p>`;
    }
    internal_mark_calculation();
    display_changer();
    console.log(result_mark);
}

//theme changer
// Define the toggle switch and initialize the theme variable
const themeToggle = document.querySelector('.switch .input');

// Function to switch themes based on the current toggle position and theme state
function toggleTheme() {
    let newTheme;

    // Check the toggle switch and set the theme
    if (themeToggle.checked) {
        // If toggle is on, switch to dark theme by default
        newTheme = 'dark';
    } else {
        // Otherwise, switch to light or green theme based on current state
        const currentTheme = document.documentElement.getAttribute('data-theme');
        newTheme = "light";
    }

    // Apply the new theme by setting a data attribute on the HTML element
    console.log("Switching to theme:", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
}

// Listen for toggle switch changes
themeToggle.addEventListener('change', toggleTheme);

// Initialize the theme on page load
toggleTheme();


