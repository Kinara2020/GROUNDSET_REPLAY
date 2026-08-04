export default function ApplicantPicker({ applicants, selectedApplicant, setSelectedApplicant }) {
  return (
    <div className="picker">
      {applicants.map((a) => (
        <button
          key={a.id}
          className={`pickBtn ${selectedApplicant.id === a.id ? "active" : ""}`}
          onClick={() => setSelectedApplicant(a)}
        >
          <span className="pickName">{a.name}</span>
          <span className="pickMeta">{a.profile}</span>
        </button>
      ))}
    </div>
  );
}