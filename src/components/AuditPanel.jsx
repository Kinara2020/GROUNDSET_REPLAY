import { evaluateApplicant } from "../utils/evaluate.js";

export default function AuditPanel({ applicant }) {
  if (!applicant) return <div>No applicant selected</div>;
  const { verdict, rules, policyVersion } = evaluateApplicant(applicant);

  return (
    <div>
      <h2 className="panelTitle">Audit Ledger</h2>
      <p className="panelSub">Explainable, traceable — this record is permanent and exportable.</p>

      <div className={`verdictCard ${verdict.type}`}>
        <div className="verdictTitle">{verdict.title}</div>
        <div className="fieldRow"><span>Decision ID</span><span>{applicant.id}-D</span></div>
        <div className="fieldRow"><span>Created</span><span>{applicant.timestamp}</span></div>
        <div className="fieldRow"><span>Policy version</span><span>{policyVersion}</span></div>
        <div className="fieldRow"><span>Rules executed</span><span>{rules.length}</span></div>
        <p className="verdictRoute" style={{ marginTop: "10px" }}>
          Every step above is retained: source document, extracted values, rules fired, and routing decision.
        </p>
      </div>
    </div>
  );
}