import { useEffect, useState } from "react";
import { evaluateApplicant } from "../utils/evaluate.js";

export default function RuleEngine({ applicant }) {
  const { rules } = evaluateApplicant(applicant);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= rules.length) clearInterval(interval);
    }, 350);
    return () => clearInterval(interval);
  }, [applicant]);

  if (!applicant) return <div>No applicant selected</div>;

  return (
    <div>
      <h2 className="panelTitle">Policy Decision Core</h2>
      <p className="panelSub">Deterministic, not probabilistic — your rules, applied exactly as configured.</p>
      <p className="engineStatus">{visibleCount < rules.length ? "Running policy engine…" : "Policy engine complete."}</p>

      <div className="docCard">
        {rules.slice(0, visibleCount).map((r) => (
          <div className="ruleRow ruleFire" key={r.code}>
            <span className={`dot ${r.pass ? "pass" : "fail"}`} />
            <div>
              <div className="ruleLabel">[{r.code}] {r.label}</div>
              <div className="ruleDetail">{r.detail}</div>
            </div>
          </div>
        ))}
        {visibleCount >= rules.length && !rules.every(r => r.pass) && (
        <div className="whyBox">
          <strong>Why this matters:</strong> GroundSet policy requires every extracted field to reach 90% confidence, and every rule to pass, before auto-approval. Any single failure — a threshold breach or an uncertain read — routes to a human, by design.
        </div>
          )}
      </div>
    </div>
  );
}