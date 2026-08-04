export default function ReplayTimeline({ step }) {
  const stages = [
    "Evidence Ingestion",
    "SLM Understanding",
    "Policy Decision Core",
    "Routing Engine",
    "Audit Ledger",
  ];

  return (
    <div>
      {stages.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            marginBottom: "8px",
            background: i === step ? "#6d3fdb" : "#18122b",
            borderRadius: "8px",
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}