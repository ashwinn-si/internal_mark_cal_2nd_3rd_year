let internal_mark = JSON.parse(localStorage.getItem('internal_mark'));
let intermal_marl_scored=internal_mark;
let marks_display=[60,54,48,42,36,30,27,internal_mark];
for(let i=0;i<7;i++){
    marks_display[i]+=intermal_marl_scored;
    if(marks_display[i]>100){
        marks_display[i]=100;
    }
}        
if (marks_display) {
    document.querySelector(".div4").innerHTML = marks_display[0];
    document.querySelector(".div6").innerHTML = marks_display[1];
    document.querySelector(".div8").innerHTML = marks_display[2];
    document.querySelector(".div10").innerHTML = marks_display[3];
    document.querySelector(".div12").innerHTML = marks_display[4];
    document.querySelector(".div14").innerHTML = marks_display[5];
    document.querySelector(".div16").innerHTML = marks_display[6];
}
document.querySelector(".sub_head").innerHTML="INTERNAL MARKS : "+marks_display[7];
function return_page(){
    window.location.href = "../index.html";
}