export default function EvidencePanel({ applicant }) {
  if (!applicant) return <div>No applicant selected</div>;

  return (
    <div>
      <h2 className="panelTitle">Evidence Ingestion</h2>
      <p className="panelSub">Source document, as received — nothing extracted yet.</p>

      <div className="docCard">
        <div className="docFileBar">📄 Salary_Slip_{applicant.id}.pdf — Document Received</div>
        <div className="fieldRow"><span>Employer</span><span>{applicant.employmentType}</span></div>
        <div className="fieldRow"><span>Gross monthly income</span><span>₹{applicant.income.toLocaleString("en-IN")}</span></div>
        <div className="fieldRow"><span>Existing monthly debt</span><span>₹{applicant.debt.toLocaleString("en-IN")}</span></div>
        <div className="fieldRow"><span>Requested loan amount</span><span>₹{applicant.loanAmount.toLocaleString("en-IN")}</span></div>
        <div className="fieldRow"><span>Credit score (bureau)</span><span>{applicant.creditScore}</span></div>
        <div className="fieldRow"><span>PAN verified</span><span>✓</span></div>
      </div>
    </div>
  );
}