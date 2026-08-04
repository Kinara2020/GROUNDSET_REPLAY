import { useState } from "react";

import applicants from "./data/applicants.js";

import ApplicantPicker from "./components/ApplicantPicker.jsx";
import EvidencePanel from "./components/EvidencePanel.jsx";
import SlmPanel from "./components/SlmPanel.jsx";
import RuleEngine from "./components/RuleEngine.jsx";
import RoutingPanel from "./components/RoutingPanel.jsx";
import AuditPanel from "./components/AuditPanel.jsx";
import Footer from "./components/Footer.jsx";
import DecisionBadge from "./components/DecisionBadge.jsx";

import "./App.css";

const steps = [
  "Evidence Ingestion",
  "SLM Understanding",
  "Policy Decision Core",
  "Routing Engine",
  "Audit Ledger"
];

export default function App() {
  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const replay = () => {
    if (playing) return;
    setPlaying(true);
    setActiveStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setPlaying(false);
      } else {
        setActiveStep(current);
      }
    }, 1100);
  };

  const renderPanel = () => {
    switch (activeStep) {
      case 0: return <EvidencePanel applicant={selectedApplicant} />;
      case 1: return <SlmPanel applicant={selectedApplicant} />;
      case 2: return <RuleEngine applicant={selectedApplicant} />;
      case 3: return <RoutingPanel applicant={selectedApplicant} />;
      case 4: return <AuditPanel applicant={selectedApplicant} />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="wordmark">GroundSet <span>Decision Replay</span></div>
        <div className="tag">BPOptima · Live Demo</div>
      </header>

      <div className="hero">
        <h1>Every decision, <span className="accent">traced back</span> to the evidence that produced it.</h1>
        <p className="heroSub">
          <p className="heroMeta">Decision Type: Credit Underwriting &nbsp;·&nbsp; 
            Policy Version: CR-2026-04 &nbsp;·&nbsp; 
            Audit Enabled ✓ &nbsp;·&nbsp;
            Client-Owned Model ✓</p>
          Pick an applicant below. GroundSet reads the source document, extracts each field with a
          confidence score, and runs it through your rules — not a model's guess.
        </p>
      </div>
{/* 
      <ApplicantPicker
        applicants={applicants}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
      /> */}
      <div className="pickerRow">
        <ApplicantPicker applicants={applicants} selectedApplicant={selectedApplicant} setSelectedApplicant={setSelectedApplicant} />
        <DecisionBadge applicant={selectedApplicant} />
      </div>

      <div className="processFlow">
        {steps.map((step, index) => (
          <button
            key={step}
            className={`step ${activeStep === index ? "active" : ""} ${index < activeStep ? "done" : ""}`}
            onClick={() => setActiveStep(index)}
          >
            <span className="stepNum">0{index + 1}</span> {step}
          </button>
        ))}
      </div>

      <div className="content">{renderPanel()}</div>

      <div className="actionsRow">
        <button className="replayBtn" onClick={replay}>▶ Replay Decision</button>
      </div>

      <Footer />
    </div>
  );
}