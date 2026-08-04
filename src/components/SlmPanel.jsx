export default function SlmPanel({ applicant }) {
  if (!applicant) return <div>No applicant selected</div>;

  const fields = [
    { label: "Employment type", value: applicant.employmentType, conf: applicant.confidence.employmentType },
    { label: "Monthly income", value: `₹${applicant.income.toLocaleString("en-IN")}`, conf: applicant.confidence.income },
    { label: "Existing monthly debt", value: `₹${applicant.debt.toLocaleString("en-IN")}`, conf: applicant.confidence.debt },
    { label: "Credit score (bureau)", value: applicant.creditScore, conf: applicant.confidence.creditScore }
  ];

  const barClass = (c) => (c >= 95 ? "high" : c >= 90 ? "mid" : "low");

  return (
    <div>
      <h2 className="panelTitle">SLM Understanding</h2>
      <p className="panelSub">Domain-trained model reads the document and scores its own certainty per field.</p>

      <div className="docCard">
        {fields.map((f) => (
          <div className="fieldRow confRow" key={f.label}>
            <span>{f.label}</span>
            <span className="confCell">
              <strong>{f.value}</strong>
              <span className="confBarTrack">
                <span className={`confBarFill ${barClass(f.conf)}`} style={{ width: `${f.conf}%` }} />
              </span>
              <span className={`confBadge ${barClass(f.conf)}`}>{f.conf}%</span>
            </span>
            <div className="sourceLine">Source: Salary_Slip_{applicant.id}.pdf — Page 1, Line {fields.indexOf(f) + 4}</div>
          </div>
        ))}
      </div>
    </div>
  );
}