import { evaluateApplicant } from "../utils/evaluate.js";

export default function DecisionBadge({ applicant }) {
  const { verdict, minConfidence } = evaluateApplicant(applicant);
  return (
    <div className={`decisionBadge ${verdict.type}`}>
      <span className="badgeLabel">Status</span>
      <span className="badgeValue">{verdict.title}</span>
      <span className="badgeLabel">Confidence</span>
      <span className="badgeValue">{minConfidence}%</span>
    </div>
  );
}