// --- Survey Data Structure ---
const QUESTIONS = [
  {
    type: "group",
    lead: "To receive a quote, please let us know...",
    fields: [
      { label: "Name", key: "Name", type: "text" },
      { label: "Email", key: "Email", type: "text" },
      { label: "Role", key: "Role", type: "text" },
      { label: "Hotel Name", key: "Hotel Name", type: "text" },
    ],
  },
  {
    label: "Physical products we're interested in...",
    key: "Physical products we're interested in...",
    type: "checkbox",
    options: [
      "Check-in welcome Amenities (colouring books, stuffed toys, teen journals, etc.)",
      "In-room amenities (tents, blankets, kids music players, night lights, decoration, etc.)",
      "Meal time amenities (activity placemats, card games, conversation cards, fiddle toys, etc.)",
      "Craft/Activity Packs for rainy days or ‘workshops’ (sticker activities, assembly/construction kits, new activity trends etc)",
      "Board Game Library (including the classics, family favourites and newly-released family and board games)",
      "Infant Toybox (Safety regulation-compliant toys for babies and infants)",
      "Selection of books",
      "Outdoor Activities (lawn games, racket games, binoculars etc.)",
      "Bikes/Scooters for kids and teens",
    ],
  },
  {
    label: "Consultancy services (industry data, marketing opportunities and digital content) we're interested in...",
    key: "Consultancy services (industry data, marketing opportunities and digital content) we're interested in...",
    type: "checkbox",
    options: [
      "Access to our brand partnership and PR catalogue",
      "PR & marketing tips and tricks - how to tell a story and win news cycles about what you’re doing for kids",
      "Neighbourhood guides for families and kids",
      "Toys/games/entertainment news, insights + kids & teens engagement analysis",
      "Hospitality competitor analysis",
      "‘Kids hospitality’ online training/workshop for management and staff (bonbon d'or!) - strategy and know-how for creating a world-class destination and welcome for families",
    ],
  },
  {
    label: "Other services we're interested in...",
    key: "Other services we're interested in...",
    type: "checkbox",
    options: [
      "Bespoke Hospitality Innovations - we design a product, activity, event or experience that is unique to your property, with high PR-ability",
      "Dedicated Playroom Design + Build",
      "Seasonal Activity - Easter Egg Hunt, Halloween Trick & Treat trail, Summer Pool Activity etc.",
      "Holiday entertainers",
      "Childcare staff",
    ],
  },
  {
    label: "Our hotel has the following number of kids per week (off-peak)",
    key: "Our hotel has the following number of kids per week (off-peak)",
    type: "radio",
    options: ["0-20", "20-40", "40+"],
  },
  {
    label: "Our hotel has the following number of kids per week (peak time)",
    key: "Our hotel has the following number of kids per week (peak time)",
    type: "radio",
    options: ["0-20", "20-40", "40-60", "60+"],
  },
  {
    label: "Peak periods/occasions for kids at the hotel:",
    key: "Peak periods/occasions for kids at the hotel:",
    type: "checkbox+other",
    options: [
      "Chinese New Year (January/February)",
      "Valentine's Day (14 February)",
      "February Half Term (February)",
      "Ramadan (Feb-March)",
      "Mother's Day (March)",
      "Easter Holiday + Weekend (March/April)",
      "May Half Term (May)",
      "Father’s Day (June)",
      "Summer Holiday (July - August)",
      "October Half Term (October)",
      "Halloween (October)",
      "Christmas Period (December)",
      "Other",
    ],
  },
  {
    label: "What does the hotel currently offer kids (age 1-10)?",
    key: "What does the hotel currently offer kids (age 1-10)?",
    type: "text",
  },
  {
    label: "What does the hotel currently offer tweens and teens (10+)?",
    key: "What does the hotel currently offer tweens and teens (10+)?",
    type: "text",
  },
  {
    label: "Anything other requirements or preferences?",
    key: "Anything other requirements or preferences?",
    type: "text",
  },
];

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjmVAeVjlpcnw8XYaGd1jQPr_h_41goTxAGIE98hPSPCudj8cRAO62QlK_LwPRJBw_/exec";

function getSessionId() {
  let id = localStorage.getItem("subscriptionSurveySessionId");
  if (!id) {
    id = self.crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 12);
    localStorage.setItem("subscriptionSurveySessionId", id);
  }
  return id;
}

let answers = {};
let currentStep = 0;

function showStep(idx) {
  const steps = document.querySelectorAll('.survey-step');
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === idx);
  });
  document.getElementById('prevBtn').style.display = idx > 0 ? '' : 'none';
  document.getElementById('nextBtn').style.display = idx < steps.length - 1 ? '' : 'none';
  document.getElementById('sendBtn').style.display = idx === steps.length - 1 ? '' : 'none';
  document.getElementById('survey-error').textContent = '';
}

function renderSurvey() {
  const stepsDiv = document.getElementById('survey-steps');
  stepsDiv.innerHTML = '';
  QUESTIONS.forEach((q, idx) => {
    let step = document.createElement('div');
    step.className = 'survey-step';
    if (idx === 0) step.classList.add('active');
    if (q.type === 'group') {
      if (q.lead) {
        let lead = document.createElement('div');
        lead.className = 'survey-lead';
        lead.textContent = q.lead;
        step.appendChild(lead);
      }
      q.fields.forEach(f => {
        let inp = document.createElement('input');
        inp.type = 'text';
        inp.placeholder = f.label;
        inp.className = 'survey-input';
        inp.value = answers[f.key] || '';
        inp.oninput = e => { answers[f.key] = e.target.value; };
        step.appendChild(inp);
      });
    } else if (q.type === 'checkbox' || q.type === 'checkbox+other') {
      let label = document.createElement('div');
      label.className = 'survey-label';
      label.textContent = q.label;
      step.appendChild(label);
      q.options.forEach(opt => {
        let lab = document.createElement('label');
        lab.className = 'survey-checkbox-label';
        let cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = (answers[q.key] || []).includes(opt) || (opt === 'Other' && answers[q.key + '_other']);
        cb.onchange = e => {
          let arr = answers[q.key] ? [...answers[q.key]] : [];
          if (e.target.checked) {
            arr.push(opt);
          } else {
            arr = arr.filter(v => v !== opt && !(opt === 'Other' && v.startsWith('Other: ')));
            if (opt === 'Other') answers[q.key + '_other'] = '';
          }
          answers[q.key] = arr;
        };
        lab.appendChild(cb);
        lab.appendChild(document.createTextNode(opt));
        if (q.type === 'checkbox+other' && opt === 'Other' && ((answers[q.key] || []).includes('Other') || answers[q.key + '_other'])) {
          let txt = document.createElement('input');
          txt.type = 'text';
          txt.placeholder = 'Please specify';
          txt.className = 'survey-input survey-other-input';
          txt.value = answers[q.key + '_other'] || '';
          txt.oninput = e => {
            answers[q.key + '_other'] = e.target.value;
            answers[q.key] = (answers[q.key] || []).filter(v => !v.startsWith('Other: ')).concat([`Other: ${e.target.value}`]);
          };
          lab.appendChild(txt);
        }
        step.appendChild(lab);
      });
    } else if (q.type === 'radio') {
      let label = document.createElement('div');
      label.className = 'survey-label';
      label.textContent = q.label;
      step.appendChild(label);
      q.options.forEach(opt => {
        let lab = document.createElement('label');
        lab.className = 'survey-radio-label';
        let rb = document.createElement('input');
        rb.type = 'radio';
        rb.name = q.key;
        rb.checked = answers[q.key] === opt;
        rb.onchange = () => { answers[q.key] = opt; };
        lab.appendChild(rb);
        lab.appendChild(document.createTextNode(opt));
        step.appendChild(lab);
      });
    } else if (q.type === 'text') {
      let label = document.createElement('div');
      label.className = 'survey-label';
      label.textContent = q.label;
      step.appendChild(label);
      let ta = document.createElement('textarea');
      ta.className = 'survey-textarea';
      ta.value = answers[q.key] || '';
      ta.oninput = e => { answers[q.key] = e.target.value; };
      ta.rows = 3;
      step.appendChild(ta);
    }
    stepsDiv.appendChild(step);
  });
}

function validateStep(idx) {
  const q = QUESTIONS[idx];
  if (q.type === 'group') {
    return q.fields.every(f => answers[f.key] && answers[f.key].trim());
  }
  if (q.type === 'checkbox' || q.type === 'checkbox+other') {
    return (answers[q.key] && answers[q.key].length > 0);
  }
  if (q.type === 'radio') {
    return !!answers[q.key];
  }
  if (q.type === 'text') {
    return answers[q.key] && answers[q.key].trim();
  }
  return true;
}

async function saveToSheet() {
  const payload = { ...answers, sessionId: getSessionId() };
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    document.getElementById('survey-error').textContent = "Could not save to Google Sheet. Please try again later.";
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderSurvey();
  showStep(0);

  document.getElementById('nextBtn').onclick = async function () {
    if (!validateStep(currentStep)) {
      document.getElementById('survey-error').textContent = "Please answer the question before proceeding.";
      return;
    }
    await saveToSheet();
    currentStep++;
    showStep(currentStep);
  };

  document.getElementById('prevBtn').onclick = function () {
    currentStep--;
    showStep(currentStep);
  };

  document.getElementById('subscriptionSurvey').onsubmit = async function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      document.getElementById('survey-error').textContent = "Please answer the question before submitting.";
      return;
    }
    await saveToSheet();
    document.getElementById('survey-confirmation').innerHTML = `Thank you ${answers["Name"] || ""}. We'll get right on it!`;
    document.getElementById('survey-confirmation').style.display = '';
    document.getElementById('survey-steps').style.display = 'none';
    document.querySelector('.survey-nav').style.display = 'none';
    document.getElementById('survey-error').textContent = '';
  };
});
