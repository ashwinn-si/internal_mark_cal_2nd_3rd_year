/*
 changes made => 1. result_mark will now have live marks(0, 4, 8) for nptel, course and extra wins
                    instead of having true/ false
                 2. radio_button_checker can now take variable number of arguements. (2 or more)
                    initally it only took 2 arguements.
                 3. changes were made in internal_mark_calculation() to reflect on the new result_mark style  
                
                 4. changes were made in display_change(), to display appropriate results. 
                    (previously, it checked the boolean value of the array, now it will update the result straight ah) 
                 */         


let result_mark=[0, 0, 1, 0, 0, 0, 0, 0];//first_10,second_10,bonus,nptel,course,extra,final,external
/* 
    0 -> first_10 [0 to 10]
    1 -> second_10 [0 to 10]
    2 -> bonus [1 or 1.5]
    3 -> NPTEL [0 or 4 or 8]
    4 -> course [0 or 7]
    5 -> extra (competiton win or mini project) [0 or 5]
*/

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

function radio_button_checker(...args) {
    let isINVALID = true;

    for(let i=0; i<args.length; i++){   // check if any button is checked
        if(document.getElementById(args[i]).checked){
            isINVALID = false;
            break;
        }
    }

    if(isINVALID){  // enters when there is button checked.
        navigator.vibrate(200);
        for(let i=0; i<args.length; i++){
            const container = document.getElementById(`${args[i]}`);
            container.classList.add('vibrate');
            setTimeout(() => {
              container.classList.remove('vibrate');
            }, 400);
        }
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

function mark_calculator(m1_mark,m2_mark,m3_mark,bonus_flag){
    let bonus_mark = (bonus_flag) ? 1.5 : 1;
    let first_10 = ((m1_mark*bonus_mark) + (m2_mark*bonus_mark))*0.05;
    let second_10 = (m3_mark*bonus_mark) * 0.1;
    first_10 = (first_10 > 10) ? 10 : first_10;
    second_10 = (second_10 > 10) ? 10 : second_10;
    result_mark[0] = parseFloat(first_10.toFixed(2));
    result_mark[1] = parseFloat(second_10.toFixed(2));
}

function extra_activity_cal(){
    const nptel_buttons=document.getElementsByName('nptel');
    const course=document.getElementsByName('course');
    const extra=document.getElementsByName('extra');
    nptel_buttons.forEach((element)=>{
        if(element.checked){
            const NPTEL_SCORE = parseInt(element.value);
            result_mark[3] = NPTEL_SCORE; //update nptel in result array
        }
    })
    course.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[4] = 7; // ONLINE CERTIFICATE MARKS
            }
        }
    })
    extra.forEach((element)=>{
        if(element.checked){
            if(element.value==='yes'){
                result_mark[5] = 5;// EXTRA WORK CERTIFICATE MARKS
            }
        }
    })
}

//first_10,second_10,bonus,nptel,course,extra,final_result,external
function internal_mark_calculation(){
    let result=result_mark[0]+result_mark[1];
    if(result_mark[3]){ //nptel
        result += result_mark[3];
    }
    if(result_mark[4]){ //courrse (by default result_mark[4] is 0, if(0) -> false)
        result += result_mark[4];
    }
    if(result_mark[5]){ //competition(extra)
        result += result_mark[5];
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
    let nptel = result_mark[3];
    let course = result_mark[4];
    let extra = result_mark[5];

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
    dbStore();
}

document.getElementById("calculate_button").addEventListener("click", () => {
    result_mark = [0, 0, 1, 0, 0, 0, 0, 0];
    document.getElementById("special_case_text").innerHTML = ``;
    let m1_mark = parseInt(document.getElementById("mark_m1").value);
    let m2_mark = parseInt(document.getElementById("mark_m2").value);
    let m3_mark = parseInt(document.getElementById("mark_m3").value);
    if (
        input_box_error_handler(m1_mark, "mark_m1") &&
        input_box_error_handler(m2_mark, "mark_m2") &&
        input_box_error_handler(m3_mark, "mark_m3") &&
        radio_button_checker("yes_bonus", "no_bonus") &&
        radio_button_checker("nptel_0", "nptel_4", "nptel_8") &&
        radio_button_checker("course_yes", "course_no") &&
        radio_button_checker("extra_yes", "extra_no")
    ) {
        const bonus = document.getElementsByName("bonus");
        bonus.forEach((element) => {
            if (element.checked) {
                if (element.value === "yes") {
                    result_mark[2] = true;
                }
            }
        });
        main(m1_mark, m2_mark, m3_mark);
        celebration_effect();
    }
});


function dbStore(){
    fetch("https://ashwinsiserver.onrender.com/internalMark/addMark",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mark: result_mark[6],
            nptel: result_mark[3] === 8 ? "yes" : "no",
            bonus: result_mark[2] ? "yes" : "no"
        }),
    })
}

//theme changer
// Define the toggle switch and initialize the theme variable
const themeToggle = document.querySelector('.switch .input');

// Function to switch themes based on the current toggle position and theme state
function toggleTheme() {
    let newTheme;

   
    if (themeToggle.checked) {
        newTheme = 'dark';
    } else {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        newTheme = "light";
    }
    document.documentElement.setAttribute('data-theme', newTheme);
}

// Listen for toggle switch changes
themeToggle.addEventListener('change', toggleTheme);

// Initialize the theme on page load
toggleTheme();


