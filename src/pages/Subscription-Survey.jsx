import React, { useState, useRef, useEffect } from "react";
import "../styles/SubscriptionSurvey.css";

const QUESTIONS = [
  {
    type: "group",
    fields: [
      { label: "Name", key: "Name", type: "text" },
      { label: "Email", key: "Email", type: "text" },
      { label: "Role", key: "Role", type: "text" },
      { label: "Hotel Name", key: "Hotel Name", type: "text" },
    ],
    lead: "To receive a quote, please let us know...",
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

// Formspree form ID for handling survey submissions
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbloyawk";

// Generate a unique session ID for tracking submissions
function getSessionId() {
  let id = localStorage.getItem("subscriptionSurveySessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("subscriptionSurveySessionId", id);
  }
  return id;
}

const IntroSection = () => (
  <div className="survey-intro">
    <h1>Kids Hospitality Subscription Service by Wanderland - UPDATED VERSION</h1>
    <p>
      1. Monthly Subscription Box - a monthly kids and teens amenities, gifts and activities subscription box, adapting to season, holidays, themes, and peak weeks.<br/>
      2. Kids Consultancy Subscription - family guest strategy, brand partnership opportunities, expertise, insights and digital assets
    </p>
    <h2 className="survey-special-title">🎁 Monthly Subscription Box</h2>
    <p>
      Segmented by age range and gender, our monthly deliveries will cover you for your welcome amenities, birthday treats, VIP & loyal guests or rainy day ‘stay and play’.<br/><br/>
      Providing the right gift at the right time can be the making of a holiday.<br/><br/>
      Our kids and teen expertise, network of leading partners from the world of toys and games, and ‘family play’ know-how, will help your team to delight kids from 18 months - 18 years, and their parents too.
    </p>
    <h2 className="survey-special-title">🛎️ Kids Consultancy Subscription</h2>
    <p>
      We are your ‘in-house team’ or your ‘one-stop shop’ for everything related to families, kids and teens. Industry data, competitive round-ups, marketing opportunities, digital content, best practice and workshops.
    </p>
  </div>
);

function SubscriptionSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [submitError, setSubmitError] = useState(""); // Only used for final submit errors
  const [validationError, setValidationError] = useState(""); // Only used for validation errors
  const scrollRef = useRef(null);
  
  // Reset errors on any state change
  useEffect(() => {
    setSubmitError("");
  }, [answers, step]);

  // For scroll/gradient effect
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step]);

  const handleInput = (fieldKey, value) => {
    setAnswers((prev) => ({ ...prev, [fieldKey]: value }));
    if (fieldKey === "Name") setNameValue(value);
  };

  const handleGroupInput = (fields) => {
    const newAnswers = { ...answers };
    fields.forEach(({ key, value }) => {
      newAnswers[key] = value;
      if (key === "Name") setNameValue(value);
    });
    setAnswers(newAnswers);
  };

  const handleNext = async (groupValues) => {
    // Only validate group fields
    if (QUESTIONS[step].type === "group") {
      let allFilled = true;
      QUESTIONS[step].fields.forEach((f, idx) => {
        if (!groupValues[idx]) allFilled = false;
      });
      if (!allFilled) {
        setValidationError("Please fill out all fields.");
        return;
      }
      handleGroupInput(
        QUESTIONS[step].fields.map((f, idx) => ({ key: f.key, value: groupValues[idx] }))
      );
    }
    setStep((s) => Math.min(s + 1, QUESTIONS.length));
  };

  const handlePrev = () => {
    // Reset any errors
    setValidationError("");
    setSubmitError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSend = async () => {
    setSending(true);
    setValidationError("");
    setSubmitError("");
    
    try {
      // Prepare data for Formspree
      const formData = {
        ...answers,
        sessionId: getSessionId(),
        timestamp: new Date().toISOString()
      };
      
      // Convert arrays to comma-separated strings for better readability in emails
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key] = formData[key].join(", ");
        }
      });
      
      // Send to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        console.log("Form submitted successfully!");
        setSent(true);
      } else {
        console.error("Form submission failed:", await response.text());
        setSubmitError("Formspree submission failed. Please try again or contact us directly.");
      }
    } catch (e) {
      console.error("Error during submission:", e);
      setSubmitError("Could not submit your response. Please try again later.");
    }
    
    setSending(false);
  };

  function renderQuestion(q, idx) {
    if (q.type === "group") {
      const vals = q.fields.map((f) => answers[f.key] || "");
      return (
        <div className="survey-question-group" ref={scrollRef}>
          {q.lead && <div className="survey-lead">{q.lead}</div>}
          {q.fields.map((f, i) => (
            <input
              key={f.key}
              type="text"
              placeholder={f.label}
              value={vals[i]}
              onChange={(e) => {
                // No error handling during input
                const newVals = [...vals];
                newVals[i] = e.target.value;
                handleGroupInput(q.fields.map((ff, idx) => ({ key: ff.key, value: newVals[idx] })));
              }}
              className="survey-input survey-answer"
            />
          ))}
        </div>
      );
    }
    if (q.type === "checkbox" || q.type === "checkbox+other") {
      const vals = answers[q.key] || [];
      const isOther = q.type === "checkbox+other";
      return (
        <div className="survey-question" ref={scrollRef}>
          <div className="survey-label survey-question-label">{q.label}</div>
          {q.options.map((opt, i) => (
            <label key={opt} className="survey-checkbox-label">
              <input
                type="checkbox"
                checked={vals.includes(opt)}
                onChange={(e) => {
                  // No error handling during input
                  let newVals = vals.includes(opt)
                    ? vals.filter((v) => v !== opt)
                    : [...vals, opt];
                  if (isOther && opt === "Other" && !e.target.checked) {
                    newVals = newVals.filter((v) => v !== "Other: " + (answers[q.key + "_other"] || ""));
                  }
                  setAnswers((prev) => ({ ...prev, [q.key]: newVals }));
                }}
                className="survey-answer"
              />
              {opt}
              {isOther && opt === "Other" && vals.includes("Other") && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={answers[q.key + "_other"] || ""}
                  className="survey-input survey-other-input survey-answer"
                  onChange={(e) => {
                    // No error handling during input
                    setAnswers((prev) => ({
                      ...prev,
                      [q.key + "_other"]: e.target.value,
                      [q.key]: vals.filter((v) => !v.startsWith("Other"))
                        .concat(["Other: " + e.target.value]),
                    }));
                  }}
                />
              )}
            </label>
          ))}
        </div>
      );
    }
    if (q.type === "radio") {
      const val = answers[q.key] || "";
      return (
        <div className="survey-question" ref={scrollRef}>
          <div className="survey-label survey-question-label">{q.label}</div>
          {q.options.map((opt) => (
            <label key={opt} className="survey-radio-label">
              <input
                type="radio"
                checked={val === opt}
                onChange={(e) => {
                  // No error handling during input
                  setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }));
                }}
                className="survey-answer"
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }
    if (q.type === "text") {
      const val = answers[q.key] || "";
      return (
        <div className="survey-question" ref={scrollRef}>
          <div className="survey-label survey-question-label">{q.label}</div>
          <textarea
            value={val}
            onChange={(e) => {
              // No error handling during input
              setAnswers((prev) => ({ ...prev, [q.key]: e.target.value }));
            }}
            rows={3}
            className="survey-input survey-answer"
          />
        </div>
      );
    }
    return null;
  }

  // Fading gradient effect (shows part of prev/next)
  function renderGradientSteps() {
    const prev = step > 0 ? renderQuestion(QUESTIONS[step - 1], step - 1) : null;
    const curr = renderQuestion(QUESTIONS[step], step);
    const next = step < QUESTIONS.length - 1 ? renderQuestion(QUESTIONS[step + 1], step + 1) : null;
    return (
      <div className="survey-gradient-wrapper">
        {prev && <div className="survey-fade-prev">{prev}</div>}
        <div className="survey-current">{curr}</div>
        {next && <div className="survey-fade-next">{next}</div>}
      </div>
    );
  }

  if (sent) {
    return (
      <div className="survey-confirmation">
        Thank you {answers["Name"] || ""}. We'll get right on it!
      </div>
    );
  }

  return (
    <div className="subscription-survey">
      <IntroSection />
      <div className="survey-container">
        {renderGradientSteps()}
        <div className="survey-nav">
          {/* Navigation buttons removed as requested */}
          {step === QUESTIONS.length - 1 ? (
            <button className="survey-send" onClick={handleSend} disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>
          ) : (
            <button className="survey-next" onClick={() => {
              setValidationError("");
              setSubmitError("");
              setStep((s) => Math.min(s + 1, QUESTIONS.length - 1));
            }}>Next</button>
          )}
        </div>
        {validationError && <div className="survey-error">{validationError}</div>}
        {submitError && <div className="survey-error">{submitError}</div>}
      </div>
    </div>
  );
}

export default SubscriptionSurvey;
