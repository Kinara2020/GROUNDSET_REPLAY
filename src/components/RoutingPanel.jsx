import { evaluateApplicant } from "../utils/evaluate.js";

export default function RoutingPanel({ applicant }) {
  if (!applicant) return <div>No applicant selected</div>;
  const { rules, verdict, minConfidence, policyVersion } = evaluateApplicant(applicant);
  const failed = rules.filter((r) => !r.pass);

  return (
    <div>
      <h2 className="panelTitle">Routing Engine</h2>
      <p className="panelSub">Approve · Reject · Escalate — decided by the rules above, not inferred.</p>

      <div className={`verdictCard ${verdict.type}`}>
        <div className="verdictTitle">{verdict.title}</div>
        <div className="verdictRoute">{verdict.route}</div>
        <div className="verdictReason"><strong>Reason:</strong> {verdict.reason}</div>
      </div>

      <div className="docCard" style={{ marginTop: 16 }}>
        <div className="fieldRow"><span>Outcome</span><span>{verdict.title}</span></div>
        <div className="fieldRow">
          <span>Triggered policies</span>
          <span>{failed.length ? failed.map((f) => f.code).join(", ") : "None — all checks passed"}</span>
        </div>
        <div className="fieldRow">
          <span>Supporting factors</span>
          <span>{failed.length ? failed.map((f) => f.label).join("; ") : "All checks passed"}</span>
        </div>
        <div className="fieldRow"><span>Extraction confidence</span><span>{minConfidence}% (lowest field)</span></div>
        <div className="fieldRow"><span>Human override</span><span>No</span></div>
        <div className="fieldRow"><span>Policy version</span><span>{policyVersion}</span></div>
      </div>
    </div>
  );
}