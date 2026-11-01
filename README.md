GroundSet

Making automated credit decisions easier to follow.

GroundSet is a small React project built around one idea: a decision should not just show its final result. It should also make it possible to understand how that result was reached.

In credit underwriting, an applicant’s information goes through several checks before a decision is made. Instead of showing only an approval, rejection, or review status, GroundSet lets you go through the entire process step by step.

You can select an applicant, see the information associated with their application, follow the confidence checks and policy rules, understand why the application was routed in a particular way, and finally view its audit record.

The aim is to make the decision process easier to understand, rather than treating the final outcome as a black box.


What does GroundSet do?

GroundSet demonstrates a five-stage credit underwriting workflow:

1. Evidence Ingestion
2. SLM Understanding
3. Policy Decision Core
4. Routing Engine
5. Audit Ledger

Each stage has its own panel, and you can move between stages manually or use Replay Decision to watch the process run in sequence.

The project includes three sample applicant profiles, each with different financial details and a different decision outcome. Selecting another applicant updates the information and decision trail throughout the interface.

How it works

1. Evidence Ingestion

This is where the process begins.

The application displays the source-document information associated with the selected applicant. It includes details such as:

* Employment type
* Gross monthly income
* Existing monthly debt
* Requested loan amount
* Credit score
* PAN verification status

The purpose of this stage is to show the information that the rest of the decision process will use.

2. SLM Understanding

In this stage, the application displays the fields understood from the source document, along with a confidence score for each field.

For example, the system shows how confident it is about the extracted employment type, income, debt, and credit score.

Each field has its own confidence percentage and visual indicator. This makes it easier to see which information is reliable and which might need another look.

One important part of the workflow is that a high overall confidence should not hide an uncertain individual field. The lowest field-confidence score is also considered during the decision process.

3. Policy Decision Core

This is where the actual policy checks happen.

GroundSet uses a deterministic rule engine, meaning that the same applicant information and policy rules produce the same result.

The current demo evaluates four checks:

Rule	Condition
CR-04	Debt-to-income ratio must be 40% or lower
CR-11	Requested loan amount must not exceed 5 times the monthly income
CR-19	Credit score must be at least 650
CR-22	Confidence for every extracted field must be at least 90%

Each rule is displayed with its result and supporting calculation.

The checks are revealed one after another so that the user can follow what the policy engine is evaluating.

If a rule fails, the application also explains why that matters.

4. Routing Engine

Once the rules have been evaluated, the application determines what should happen next.

There are three possible outcomes:

* Approved — Fast Path: All four policy checks pass.
* Rejected: The debt-to-income, loan amount, and credit score checks all fail.
* Routed for Human Review: The application does not qualify for automatic approval or rejection under the current rules.

This is an important part of the idea behind GroundSet. Not every application should be forced into an automatic yes-or-no decision.

If the information is uncertain or the policy checks need further judgment, the application can be sent for human review.

The routing panel also shows the failed policies, supporting factors, minimum extraction confidence, and policy version.

5. Audit Ledger

The final stage brings the decision trail together.

It displays:

* Final decision
* Decision ID
* Application timestamp
* Policy version
* Number of rules executed

The idea is simple: someone reviewing a decision later should be able to understand what information was used, which rules were evaluated, and why the application reached its outcome.

The demo illustrates an audit record that could be retained and exported in a production system.



A closer look at the decision logic

The decision logic is implemented separately from the UI in src/utils/evaluate.js.

For every applicant, it calculates:

Debt-to-income ratio

(Existing monthly debt / Monthly income) × 100

Loan-to-income ratio

Requested loan amount / Monthly income

Minimum confidence

The lowest confidence percentage among the extracted fields.

These values are checked against the four policy rules described above.

The routing logic follows this order:

1. If every rule passes, the application is approved.
2. If the debt-to-income, loan amount, and credit score rules all fail, the application is rejected.
3. Otherwise, the application is routed for human review.

The policy version used in the current demo is CR-2026-04.

There is also an important confidence safeguard: if any extracted field has confidence below 90%, the application cannot qualify for automatic approval. It needs human review unless the rejection condition is met.



Features

* Three sample applicants: Switch between different applicant profiles and see their decision information update.
* Five-stage decision trail: Follow the underwriting process from source information to the final audit record.
* Field-level confidence: View confidence scores for individual extracted fields.
* Rule-based evaluation: Check financial information against clearly defined policy conditions.
* Explainable routing: See why an application is approved, rejected, or sent for human review.
* Decision replay: Watch all five stages run in sequence using the Replay Decision button.
* Stage navigation: Select any stage directly instead of replaying the entire process.
* Responsive interface: Use the application on desktop, tablet, or mobile screens.



Tech stack

The project is built using:

* React – For building the interface and reusable components.
* JavaScript (ES6+) – For the application logic and decision calculations.
* CSS3 – For styling, layout, and responsive design.
* Vite – For the development server and production build.
* React Hooks – useState and useEffect for managing application state and timed stage updates.

No external UI framework is required.


Project structure
```text
GROUNDSET_REPLAY/
├── public/
├── src/
│   ├── components/
│   │   ├── ApplicantPicker.jsx
│   │   ├── DecisionBadge.jsx
│   │   ├── EvidencePanel.jsx
│   │   ├── SlmPanel.jsx
│   │   ├── RuleEngine.jsx
│   │   ├── RoutingPanel.jsx
│   │   └── AuditPanel.jsx
│   ├── data/
│   │   └── applicants.js
│   ├── utils/
│   │   └── evaluate.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

What the main files are responsible for

* App.jsx – Holds the main application state, stage navigation, and replay functionality.
* ApplicantPicker.jsx – Displays the available applicants and handles selection.
* DecisionBadge.jsx – Shows the current decision status and minimum confidence.
* EvidencePanel.jsx – Displays the applicant’s source-document information.
* SlmPanel.jsx – Displays extracted fields and their confidence scores.
* RuleEngine.jsx – Runs and displays the policy checks.
* RoutingPanel.jsx – Shows the final routing outcome and its explanation.
* AuditPanel.jsx – Displays the decision record.
* applicants.js – Contains the sample applicant data used by the demo.
* evaluate.js – Contains the calculations, policy rules, and decision-routing logic.
* App.css – Contains the application’s visual styling and responsive layouts.



Getting started

If you want to run GroundSet on your own machine, follow these steps.

Requirements

Make sure you have:

* Node.js installed
* npm installed
* Git installed (if cloning the repository)

1. Clone the repository

git clone https://github.com/Kinara2020/GROUNDSET_REPLAY.git

2. Open the project folder

cd GROUNDSET_REPLAY

3. Install dependencies

npm install

4. Start the development server

npm run dev

Vite will provide a local URL in the terminal, usually:

http://localhost:5173

Open that URL in your browser to use the application.

5. Create a production build

To generate a production-ready build, run:

npm run build

To preview the production build locally:

npm run preview



Current scope and limitations

GroundSet is currently a frontend demonstration of an explainable underwriting workflow.

The applicant records and their confidence values are predefined in the project. The document and SLM stages display sample information rather than processing newly uploaded documents through a live extraction model.

Similarly, the policy engine uses the rules implemented in the project; it is not connected to a bank’s live underwriting system or an external credit bureau.

The audit stage demonstrates the information that an audit record can contain, but it does not currently write records to a permanent database or provide an actual export facility.

I have kept these boundaries clear because the purpose of this version is to demonstrate the workflow, the decision logic, and how each outcome can be explained.


Why I built it

I wanted to explore how an automated decision process could be presented in a way that people can actually follow.

A final status alone does not tell the whole story. It is useful to know what information was considered, how confident the system was about that information, which rules passed or failed, and what caused the final outcome.

That is the idea behind GroundSet.

It is a React project, but I also wanted it to be more than a collection of screens. The five stages are connected through the same applicant data and decision logic, so changing an applicant changes the complete decision trail.

There is still plenty of room to extend the project, but this is the working foundation I wanted to build.


Built with React, JavaScript, and a focus on making automated decisions easier to understand.
