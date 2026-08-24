/*
 changes made => 1. result_mark will now have live marks for 20-mark partition
                 2. added category selection for different student types (elite, pep, general)
                 3. calculation adjusts dynamically based on the category  
                 ...
*/

let result_mark = {
  first_10: 0,
  second_10: 0,
  bonus: false,
  pt1: 0,
  pt2: 0,
  pt3: 0,
  final_result: 0,
  external: 0,
  category: 'general',
  m1: 0,
  m2: 0,
  m3: 0,
};

function category_changer() {
  const hopeElite = document.getElementById('cat_hope_elite').checked;
  const pep = document.getElementById('cat_pep').checked;

  document.getElementById('container_hope_elite').style.display = 'none';
  document.getElementById('container_pep').style.display = 'none';
  document.getElementById('container_general').style.display = 'none';

  if (hopeElite) {
    document.getElementById('container_hope_elite').style.display = 'block';
    result_mark.category = 'hope_elite';
  } else if (pep) {
    document.getElementById('container_pep').style.display = 'block';
    result_mark.category = 'pep';
  } else {
    document.getElementById('container_general').style.display = 'block';
    result_mark.category = 'general';
  }
}

function input_box_error_handler(mark, element_id, max_val = 100) {
  if (mark < 0 || mark > max_val || isNaN(mark)) {
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

  for (let i = 0; i < args.length; i++) {
    // check if any button is checked
    if (document.getElementById(args[i]).checked) {
      isINVALID = false;
      break;
    }
  }

  if (isINVALID) {
    // enters when there is no button checked.
    navigator.vibrate(200);
    for (let i = 0; i < args.length; i++) {
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

// Send analytics request on page load
function sendAnalyticsRequest() {
  let trafficType = window.trafficType || 'normal';
  fetch(
    `https://api.ashwinsi.in/personal-server/website/add-analytics?trafficType=${trafficType}&website=internalmarkcalculator`,
    {
      method: 'GET',
    }
  );
}

window.addEventListener('DOMContentLoaded', () => {
  sendAnalyticsRequest();
  
  // Handle info modal
  const infoModal = document.getElementById('info_modal');
  const infoModalOverlay = document.getElementById('info_modal_overlay');
  const closeInfoModal = document.getElementById('close_info_modal');
  
  if (infoModal && infoModalOverlay && closeInfoModal) {
    infoModal.style.display = 'block';
    infoModalOverlay.style.display = 'block';
    
    closeInfoModal.addEventListener('click', () => {
      infoModal.style.display = 'none';
      infoModalOverlay.style.display = 'none';
    });
  }
});

function celebration_effect() {
  document.getElementById('congrs-lottie-animation').style.visibility = 'visible';
  if (window.innerWidth > 768) {
    document.getElementById('congrs-lottie-animation').classList.add('add_width_pc');
  } else {
    document.getElementById('congrs-lottie-animation').classList.add('add_width_mobile');
  }
  setInterval(() => {
    document.getElementById('congrs-lottie-animation').style.visibility = 'hidden';
    if (window.innerWidth > 768) {
      document.getElementById('congrs-lottie-animation').classList.remove('add_width_pc');
    } else {
      document.getElementById('congrs-lottie-animation').classList.remove('add_width_mobile');
    }
  }, 3000);
}

function mark_calculator(m1_mark, m2_mark, m3_mark, bonus_flag) {
  let bonus_mark = bonus_flag ? 1.5 : 1;
  let first_10 = (m1_mark * bonus_mark + m2_mark * bonus_mark) * 0.05;
  let second_10 = m3_mark * bonus_mark * 0.1;
  first_10 = first_10 > 10 ? 10 : first_10;
  second_10 = second_10 > 10 ? 10 : second_10;
  result_mark.first_10 = parseFloat(first_10.toFixed(2));
  result_mark.second_10 = parseFloat(second_10.toFixed(2));
}

function extra_activity_cal() {
  const hopeElite = document.getElementById('cat_hope_elite').checked;
  const pep = document.getElementById('cat_pep').checked;

  if (hopeElite) {
    result_mark.category = 'hope_elite';
    result_mark.pt1 = parseFloat(document.getElementById('he_cert').value) || 0;
    result_mark.pt2 = parseFloat(document.getElementById('he_assessment').value) || 0;
    result_mark.pt3 = parseFloat(document.getElementById('he_perf').value) || 0;
  } else if (pep) {
    result_mark.category = 'pep';
    result_mark.pt1 = parseFloat(document.getElementById('pep_cert').value) || 0;
    result_mark.pt2 = parseFloat(document.getElementById('pep_assessment').value) || 0;
    result_mark.pt3 = parseFloat(document.getElementById('pep_nptel').value) || 0;
  } else {
    result_mark.category = 'general';
    result_mark.pt1 = parseFloat(document.getElementById('gen_nptel').value) || 0;
    result_mark.pt2 = parseFloat(document.getElementById('gen_cert').value) || 0;
    result_mark.pt3 = parseFloat(document.getElementById('gen_extra').value) || 0;
  }
}

//first_10,second_10,bonus,nptel,course,extra,final_result,external
function internal_mark_calculation() {
  let result = result_mark.first_10 + result_mark.second_10;
  if (result_mark.pt1) {
    //nptel
    result += result_mark.pt1;
  }
  if (result_mark.pt2) {
    //courrse (by default result_mark[4] is 0, if(0) -> false)
    result += result_mark.pt2;
  }
  if (result_mark.pt3) {
    //competition(extra)
    result += result_mark.pt3;
  }
  result_mark.final_result = parseFloat(result.toFixed(2));
  external_mark_calculation();
}

function external_mark_calculation() {
  //calcualtes the external mark
  let external_mark = 91;
  if (result_mark.final_result >= 23) {
    external_mark = 45;
  } else {
    external_mark = (50 - result_mark.final_result) * 1.667;
  }
  result_mark.external = Math.floor(external_mark);
}

function display_changer() {
  let bonus_or_not = result_mark.bonus ? 'WITH BONUS' : 'WITHOUT BONUS';
  let pt1 = result_mark.pt1;
  let pt2 = result_mark.pt2;
  let pt3 = result_mark.pt3;

  let label1, label2, label3, max1, max2, max3;
  if (result_mark.category === 'hope_elite') {
    label1 = 'CERTIFICATION';
    max1 = 7;
    label2 = 'ASSESSMENT';
    max2 = 6;
    label3 = 'PERFORMANCE';
    max3 = 7;
  } else if (result_mark.category === 'pep') {
    label1 = 'CERT / COURSE';
    max1 = 7;
    label2 = 'ASSESSMENT';
    max2 = 6;
    label3 = 'NPTEL';
    max3 = 7;
  } else {
    label1 = 'NPTEL';
    max1 = 8;
    label2 = 'COURSE';
    max2 = 7;
    label3 = 'EXTRA';
    max3 = 5;
  }

  document.querySelector('.result-mark-container').style.visibility = 'visible';
  document.querySelector('.result-mark-container').innerHTML = `
    
      <p style="font-weight: 700; font-size: 18px; margin: 0 0 24px 0; color: #fff; text-align: center;">${bonus_or_not}</p>

      <div style="space-y: 0;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2d2d2d;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">MODEL 1 & 2</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${result_mark.first_10} / 10</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2d2d2d;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">MODEL 3</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${result_mark.second_10} / 10</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2d2d2d;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">${label1}</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${pt1} / ${max1}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2d2d2d;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">${label2}</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${pt2} / ${max2}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #2d2d2d;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">${label3}</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${pt3} / ${max3}</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-top: 2px solid #ff8c00; border-bottom: 2px solid #ff8c00; margin: 12px 0;">
          <span style="font-size: 15px; color: #fff; font-weight: 700;">TOTAL INTERNAL</span>
          <span style="font-size: 18px; color: #ff8c00; font-weight: 700;">${result_mark.final_result} / 40</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
          <span style="font-size: 14px; color: #a0a0a0; font-weight: 500;">MARK TO PASS</span>
          <span style="font-size: 16px; color: #fff; font-weight: 600;">${result_mark.external} / 100</span>
        </div>
      </div>

      <button id="possible-mark-button" style="width: 100%; margin-top: 24px; padding: 14px 24px; background: linear-gradient(135deg, #ff8c00 0%, #ff7700 100%); color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3); transition: all 0.3s ease;">
        POSSIBLE MARK
      </button>
   
  `;
  document.getElementById('possible-mark-button').addEventListener('click', () => {
    let intermal_marl_scored = result_mark.final_result;
    localStorage.setItem('internal_mark', JSON.stringify(intermal_marl_scored));
    window.location.href = 'result_page.html';
    window.location.href = 'result_page/result_page.html';
  });
}

function show_special_case_dialog() {
  let exam_only_internal = result_mark.first_10 + result_mark.second_10;
  exam_only_internal = parseFloat(exam_only_internal.toFixed(2));

  // Calculate external marks needed based on special case internal only
  let external_mark = 91;
  if (exam_only_internal >= 23) {
    external_mark = 45;
  } else {
    external_mark = (50 - exam_only_internal) * 1.667;
  }
  let marks_to_pass = Math.floor(external_mark);

  document.getElementById('special_case_text').innerHTML = `
    <div style="background: linear-gradient(135deg, #ff9800 0%, #ff7700 100%); padding: 32px 28px; border-radius: 12px; color: #000; box-shadow: 0 8px 24px rgba(255, 152, 0, 0.3); margin-top: 20px; text-align: center;">
      <p style="font-weight: 700; font-size: 22px; margin: 0 0 20px 0; line-height: 1.3;">⚠️ SPECIAL CASE</p>
      <p style="margin-bottom: 12px; line-height: 1.6; font-size: 15px; font-weight: 500; color: #000;">
        No decision has been taken regarding the special case.
      </p>
      <p style="margin-bottom: 24px; line-height: 1.6; font-size: 14px; color: #1a1a1a; opacity: 0.9;">
        As per last year's norms: No bonus marks will be added.
      </p>

      <div style="background: rgba(0,0,0,0.08); border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; text-align: left;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
          <span style="font-size: 15px; color: #1a1a1a; font-weight: 500;">Your Internal Mark (Without Bonus):</span>
          <span style="font-size: 18px; font-weight: 700; color: #000;">${exam_only_internal} / 40</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px solid rgba(0,0,0,0.1); margin-top: 8px; padding-top: 12px;">
          <span style="font-size: 15px; color: #1a1a1a; font-weight: 500;">Mark Needed in External Exam:</span>
          <span style="font-size: 18px; font-weight: 700; color: #000;">${marks_to_pass} / 100</span>
        </div>
      </div>

      <button id="special_case_view_button" style="background-color: white; color: #ff8c00; border: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); transition: all 0.3s ease;">
        VIEW POSSIBLE MARK
      </button>
    </div>
  `;

  document.getElementById('special_case_view_button').addEventListener('click', () => {
    let exam_only_internal = result_mark.first_10 + result_mark.second_10;
    exam_only_internal = parseFloat(exam_only_internal.toFixed(2));

    // Make API call with special case flag
    fetch('https://api.ashwinsi.in/personal-server/internalMark/addMark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mark: exam_only_internal,
        category: result_mark.category,
        pt1: 0,
        pt2: 0,
        pt3: 0,
        bonus: result_mark.bonus ? 'yes' : 'no',
        m1Mark: result_mark.m1,
        m2Mark: result_mark.m2,
        m3Mark: result_mark.m3,
        isSpecialCase: true,
        specialCaseExamOnlyMark: exam_only_internal,
      }),
    });

    localStorage.setItem('internal_mark', JSON.stringify(exam_only_internal));
    window.location.href = 'result_page/result_page.html';
  });
}

function main(m1_mark, m2_mark, m3_mark) {
  mark_calculator(m1_mark, m2_mark, m3_mark, result_mark.bonus);
  result_mark.m1 = m1_mark;
  result_mark.m2 = m2_mark;
  result_mark.m3 = m3_mark;

  if (m1_mark + m2_mark + m3_mark >= 100) {
    extra_activity_cal();
    internal_mark_calculation();
    display_changer();
    dbStore(m1_mark, m2_mark, m3_mark);
  } else {
    // Special case: no bonus marks - but still show results + warning
    internal_mark_calculation();
    display_changer();
    show_special_case_dialog();
    dbStore(m1_mark, m2_mark, m3_mark);
  }
}

document.getElementById('calculate_button').addEventListener('click', () => {
  result_mark = {
    first_10: 0,
    second_10: 0,
    bonus: false,
    pt1: 0,
    pt2: 0,
    pt3: 0,
    final_result: 0,
    external: 0,
    category: 'general',
    m1: 0,
    m2: 0,
    m3: 0,
  };
  document.getElementById('special_case_text').innerHTML = ``;
  let m1_mark = parseFloat(document.getElementById('mark_m1').value);
  let m2_mark = parseFloat(document.getElementById('mark_m2').value);
  let m3_mark = parseFloat(document.getElementById('mark_m3').value);

  let isValid = true;
  isValid = input_box_error_handler(m1_mark, 'mark_m1', 100) && isValid;
  isValid = input_box_error_handler(m2_mark, 'mark_m2', 100) && isValid;
  isValid = input_box_error_handler(m3_mark, 'mark_m3', 100) && isValid;
  isValid = radio_button_checker('yes_bonus', 'no_bonus') && isValid;

  const hopeElite = document.getElementById('cat_hope_elite').checked;
  const pep = document.getElementById('cat_pep').checked;

  let pt1, pt2, pt3;
  if (hopeElite) {
    pt1 = parseFloat(document.getElementById('he_cert').value) || 0;
    pt2 = parseFloat(document.getElementById('he_assessment').value) || 0;
    pt3 = parseFloat(document.getElementById('he_perf').value) || 0;
    isValid = input_box_error_handler(pt1, 'he_cert', 7) && isValid;
    isValid = input_box_error_handler(pt2, 'he_assessment', 6) && isValid;
    isValid = input_box_error_handler(pt3, 'he_perf', 7) && isValid;
  } else if (pep) {
    pt1 = parseFloat(document.getElementById('pep_cert').value) || 0;
    pt2 = parseFloat(document.getElementById('pep_assessment').value) || 0;
    pt3 = parseFloat(document.getElementById('pep_nptel').value) || 0;
    isValid = input_box_error_handler(pt1, 'pep_cert', 7) && isValid;
    isValid = input_box_error_handler(pt2, 'pep_assessment', 6) && isValid;
    isValid = input_box_error_handler(pt3, 'pep_nptel', 7) && isValid;
  } else {
    pt1 = parseFloat(document.getElementById('gen_nptel').value) || 0;
    pt2 = parseFloat(document.getElementById('gen_cert').value) || 0;
    pt3 = parseFloat(document.getElementById('gen_extra').value) || 0;
    isValid = input_box_error_handler(pt1, 'gen_nptel', 8) && isValid;
    isValid = input_box_error_handler(pt2, 'gen_cert', 7) && isValid;
    isValid = input_box_error_handler(pt3, 'gen_extra', 5) && isValid;
  }
  result_mark.pt1 = pt1;
  result_mark.pt2 = pt2;
  result_mark.pt3 = pt3;
  if (isValid) {
    const bonus = document.getElementsByName('bonus');
    bonus.forEach(element => {
      if (element.checked) {
        if (element.value === 'yes') {
          result_mark.bonus = true;
        } else {
          result_mark.bonus = false;
        }
      }
    });
    main(m1_mark, m2_mark, m3_mark);
    celebration_effect();
  }
});

function dbStore(m1_mark, m2_mark, m3_mark) {
  fetch('https://api.ashwinsi.in/personal-server/internalMark/addMark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mark: result_mark.final_result,
      category: result_mark.category,
      pt1: result_mark.pt1,
      pt2: result_mark.pt2,
      pt3: result_mark.pt3,
      bonus: result_mark.bonus ? 'yes' : 'no',
      m1Mark: m1_mark,
      m2Mark: m2_mark,
      m3Mark: m3_mark,
    }),
  });
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
    newTheme = 'light';
  }
  document.documentElement.setAttribute('data-theme', newTheme);
}

// Listen for toggle switch changes
themeToggle.addEventListener('change', toggleTheme);

// Initialize the theme on page load
toggleTheme();
