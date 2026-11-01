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
      current += 1;

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
      case 0:
        return <EvidencePanel applicant={selectedApplicant} />;
      case 1:
        return <SlmPanel applicant={selectedApplicant} />;
      case 2:
        return <RuleEngine applicant={selectedApplicant} />;
      case 3:
        return <RoutingPanel applicant={selectedApplicant} />;
      case 4:
        return <AuditPanel applicant={selectedApplicant} />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="/" aria-label="GroundSet home">
          <span className="wordmark">GroundSet</span>
          <span className="brandDivider" />
          <span className="brandDescriptor">Decision replay</span>
        </a>

        <div className="topbarRight">
          <span className="liveMark" aria-hidden="true" />
          <span className="tag">
            BPOptima <span className="tagDivider">/</span> Live demo
          </span>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">A clearer view of automated underwriting</p>

          <h1 id="page-title">
            Every decision has a story.
            <br />
            <span className="accent">Follow it back to the evidence.</span>
          </h1>

          <p className="heroSub">
            GroundSet makes each underwriting outcome easier to understand.
            Follow the source document, the fields it produced, the policy checks
            and the route taken — all in one place.
          </p>

          <div className="heroMeta" aria-label="System information">
            <span><b>Decision type</b> Credit underwriting</span>
            <span><b>Policy</b> CR-2026-04</span>
            <span><b>Audit</b> Enabled</span>
            <span><b>Model</b> Client-owned</span>
          </div>
        </section>

        <section
          className="caseSection"
          aria-label="Applicant selection and current decision"
        >
          <div className="caseIntro">
            <div>
              <p className="sectionKicker">Review a case</p>
              <h2 className="sectionHeading">Applicant file</h2>
            </div>
            <p className="caseHint">
              Choose a record to follow its decision trail.
            </p>
          </div>

          <div className="pickerRow">
            <ApplicantPicker
              applicants={applicants}
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
            />
            <DecisionBadge applicant={selectedApplicant} />
          </div>
        </section>

        <section className="replaySection" aria-label="Decision process">
          <div className="processHeading">
            <div>
              <p className="sectionKicker">The decision trail</p>
              <h2 className="sectionHeading">From document to outcome</h2>
            </div>
            <span className="stepCount">05 stages</span>
          </div>

          <nav className="processFlow" aria-label="Decision stages">
            {steps.map((step, index) => (
              <button
                key={step}
                type="button"
                className={`step ${activeStep === index ? "active" : ""} ${
                  index < activeStep ? "done" : ""
                }`}
                onClick={() => setActiveStep(index)}
                aria-current={activeStep === index ? "step" : undefined}
                aria-label={`Stage ${index + 1}: ${step}`}
              >
                <span className="stepNum">0{index + 1}</span>
                <span className="stepLabel">{step}</span>
              </button>
            ))}
          </nav>

          <section className="content" aria-live="polite" aria-atomic="false">
            {renderPanel()}
          </section>

          <div className="actionsRow">
            <div className="replayNote">
              <span className="replayNoteMark" aria-hidden="true">↳</span>
              <span>Watch the five stages run in sequence.</span>
            </div>

            <button
              className="replayBtn"
              type="button"
              onClick={replay}
              disabled={playing}
            >
              {playing ? "Replaying decision…" : "Replay decision"}
              <span aria-hidden="true">{playing ? "···" : "→"}</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
