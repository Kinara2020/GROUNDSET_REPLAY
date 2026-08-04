export default function Footer() {
  return (
    <div className="siteFooter">
      <strong>How to read this: </strong>
      confidence below 90% on any field always routes to human review, regardless of what the rules decide.
      Every verdict here carries a decision ID and timestamp that would, in production, be permanent and exportable for audit.
    </div>
  );
}