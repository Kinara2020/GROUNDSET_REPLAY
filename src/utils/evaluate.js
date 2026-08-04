export function evaluateApplicant(a) {
  const dti = (a.debt / a.income) * 100;
  const loanRatio = a.loanAmount / a.income;
  const minConfidence = Math.min(...Object.values(a.confidence));
  const policyVersion = "CR-2026-04";

  const rules = [
    { code: "CR-04", label: "Debt-to-income ratio ≤ 40%", detail: `₹${a.debt.toLocaleString("en-IN")} / ₹${a.income.toLocaleString("en-IN")} = ${dti.toFixed(1)}%`, pass: dti <= 40 },
    { code: "CR-11", label: "Requested amount ≤ 5× monthly income", detail: `₹${a.loanAmount.toLocaleString("en-IN")} / ₹${a.income.toLocaleString("en-IN")} = ${loanRatio.toFixed(2)}×`, pass: loanRatio <= 5 },
    { code: "CR-19", label: "Credit score ≥ 650", detail: `${a.creditScore} ${a.creditScore >= 650 ? "≥" : "<"} 650`, pass: a.creditScore >= 650 },
    { code: "CR-22", label: "All field confidence ≥ 90%", detail: `lowest field: ${minConfidence}%`, pass: minConfidence >= 90 }
  ];

  const allPass = rules.every((r) => r.pass);
  const hardFail = !rules[0].pass && !rules[1].pass && !rules[2].pass;

let verdict;
if (allPass) {
  verdict = { type:"approve", title:"Approved — Fast Path", route:"Auto-approved. No human review required under current policy.", reason:`All policy checks passed and minimum confidence score was ${minConfidence}%.` };
} else if (hardFail) {
  verdict = { type:"reject", title:"Rejected", route:"Auto-rejected. Multiple policy thresholds breached — see rule trace. No further routing needed.", reason: rules.filter(r=>!r.pass).map(r=>r.label).join("; ") + "." };
} else {
  verdict = { type:"review", title:"Routed for Human Review", route:"Routed to: Senior Credit Officer — one or more thresholds require judgment beyond automated policy.", reason: rules.filter(r=>!r.pass).map(r=>r.label + ` (${r.detail})`).join("; ") + "." };
}

  return { dti, loanRatio, minConfidence, rules, verdict, policyVersion };
}