/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * The two game data files, inlined as JavaScript.
 *
 * Generated from assets/data/*.json by
 *   node scripts/build-game-data.mjs
 *
 * The browser still downloads the JSON files; the API uses this
 * module so the serverless functions never depend on a host's JSON
 * import support.
 *
 * Do not edit by hand - run the script instead.
 */
export const dayOneGame = {
  "game_title": "TNM Malawi AI Reality Puzzle Challenge",
  "audience": "Telekom Networks Malawi executives, managers, specialists, and strategic partners participating in the UCT GSB AI Leadership in Action programme",
  "theme": "Understanding what AI is, where it creates value, and how it should be governed in telecommunications, mobile money, customer service, and the Malawian operating context",
  "scoring": {
    "points_per_puzzle": 5,
    "total_puzzles": 15,
    "maximum_score": 75
  },
  "levels": [
    {
      "level": 1,
      "name": "Is This AI or Not?",
      "difficulty": "Easy",
      "focus": "Distinguishing AI from fixed rules, scheduled automation, reporting, and ordinary digitisation",
      "puzzles": [
        {
          "id": 1,
          "title": "The Limbe Network Congestion Alarm",
          "scenario": "Chikondi Mbewe works in TNM’s network operations team in Blantyre. Customers around Limbe Market often complain that mobile data becomes slow during busy periods. Chikondi introduces a system that checks each nearby base station every five minutes. Whenever utilisation exceeds 85%, the dashboard turns red, an SMS is sent to the engineer, and a support ticket is created. The system always uses the same 85% rule and does not learn from previous traffic patterns.",
          "question": "Is this system Artificial Intelligence?",
          "options": {
            "A": "Yes — it monitors the network automatically, so it is AI",
            "B": "Yes — creating a ticket is a form of generative AI",
            "C": "No — it is fixed-threshold monitoring and automation",
            "D": "No — AI cannot be used in telecommunications"
          },
          "correct_answer": "C",
          "points": 5,
          "explanation": "The system follows a fixed rule written by people: if utilisation exceeds 85%, issue an alert. It does not learn, predict, classify, or adapt. An AI version could learn traffic patterns and forecast congestion before it occurs.",
          "teaching_point": "Automatic reaction to a fixed threshold is useful automation, but it is not necessarily AI.",
          "fun_add_on": "The dashboard is dramatic, but turning red does not qualify it for a machine-learning certificate."
        },
        {
          "id": 2,
          "title": "The Mzuzu Apology Machine",
          "scenario": "At a TNM customer-service office in Mzuzu, Tiwonge Phiri sets up a system that sends the same message whenever a complaint is logged: “Pepani chifukwa cha vutoli. TNM is attending to your complaint.” The reply is sent whether the customer reported slow internet, a failed bundle activation, an Mpamba issue, or a SIM-registration problem. The team proudly calls it a generative-AI customer assistant.",
          "question": "What is this system most likely to be?",
          "options": {
            "A": "Generative AI because it sends written messages",
            "B": "Template-based automation because the response is fixed",
            "C": "Predictive AI because it predicts that the customer is unhappy",
            "D": "Computer vision because the message can be read on a screen"
          },
          "correct_answer": "B",
          "points": 5,
          "explanation": "A fixed, pre-written response is template automation. Generative AI would produce context-sensitive content based on the customer’s actual complaint, while still requiring safeguards and review for sensitive cases.",
          "teaching_point": "Sending text automatically is not the same as generating text intelligently from context.",
          "fun_add_on": "The machine has mastered one sentence and is now requesting a communications allowance."
        },
        {
          "id": 3,
          "title": "The Lilongwe Dashboard That Called Itself AI",
          "scenario": "Memory Gondwe presents a colourful TNM dashboard at the Lilongwe office. It shows Mxit Mxit bundle sales, district revenue, customer satisfaction, dropped calls, complaints, and churn for the previous six months. The charts are interactive, but the dashboard only displays and filters historical data. It does not make predictions or recommendations.",
          "question": "Which statement is most accurate?",
          "options": {
            "A": "It is definitely AI because it contains many charts",
            "B": "It is business intelligence and reporting, not necessarily AI",
            "C": "It is AI because the data belongs to a telecommunications company",
            "D": "It is generative AI because the dashboard has colours"
          },
          "correct_answer": "B",
          "points": 5,
          "explanation": "Dashboards help people explore and understand information, but reporting alone is not AI. AI would add capabilities such as churn prediction, anomaly detection, recommendation, language generation, or automated pattern recognition.",
          "teaching_point": "A dashboard can support intelligent decisions without being an intelligent system itself.",
          "fun_add_on": "A pie chart remains a pie chart, even when it wears an executive title."
        },
        {
          "id": 4,
          "title": "The Area 25 Monday Bundle Reminder",
          "scenario": "Kondwani Banda, a university student living in Area 25, usually buys a weekly data bundle. TNM configures a system to send him the same reminder every Monday at 7:00 a.m.: “Moni Kondwani. Dial *202# to purchase your weekly bundle.” The system does not examine his balance, usage, purchase history, or current bundle.",
          "question": "What best describes the system?",
          "options": {
            "A": "Predictive AI because it knows Monday will arrive",
            "B": "Machine learning because Kondwani receives the message repeatedly",
            "C": "Scheduled automation because it follows a fixed time and message",
            "D": "An autonomous AI agent because it sends an SMS"
          },
          "correct_answer": "C",
          "points": 5,
          "explanation": "The system performs a scheduled action without learning from data. An AI-enabled version could estimate when Kondwani’s bundle is likely to run out and recommend a suitable offer based on his usage and affordability.",
          "teaching_point": "A scheduled action is automation; prediction requires evidence from changing data.",
          "fun_add_on": "The system’s greatest prediction is that Monday follows Sunday."
        },
        {
          "id": 5,
          "title": "The Face at the Mzuzu Office Door",
          "scenario": "TNM installs a camera at an access-controlled office in Mzuzu. When an employee approaches, the system detects a face, converts facial features into a numerical representation, compares it with authorised employee records, and estimates whether there is a match. Security staff review uncertain cases.",
          "question": "Is this a credible example of AI?",
          "options": {
            "A": "Yes — it uses computer vision to recognise and compare facial patterns",
            "B": "No — cameras can never be part of AI systems",
            "C": "No — it is only AI when the employee speaks to the camera",
            "D": "Yes — but only because the office is in Mzuzu"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "Face detection and recognition are computer-vision tasks commonly performed using trained AI models. Because biometric systems can make mistakes and affect privacy, access decisions should include security, data-protection, and human-review controls.",
          "teaching_point": "AI can recognise patterns in images, but technical capability does not remove governance responsibilities.",
          "fun_add_on": "The camera recognises faces, but it still cannot remember who borrowed the office stapler."
        }
      ]
    },
    {
      "level": 2,
      "name": "Where Should AI Be Used?",
      "difficulty": "Medium",
      "focus": "Selecting appropriate AI capabilities for realistic TNM, Mpamba, and customer-experience situations",
      "puzzles": [
        {
          "id": 6,
          "title": "The Mpamba Transaction That Did Not Look Right",
          "scenario": "At 10:17 p.m., an Mpamba account normally used for small transactions in Mchinji suddenly attempts several large transfers to newly created recipients. The customer’s device, location pattern, transaction speed, and usual behaviour all appear different. A fixed-rule system checks only whether a transaction exceeds a single monetary limit, so the activity may not be stopped.",
          "question": "Which AI capability is most suitable for identifying this type of risk?",
          "options": {
            "A": "Image generation to create a picture of the transaction",
            "B": "Anomaly detection that compares the activity with normal behavioural patterns",
            "C": "A scheduled SMS sent to every customer every Friday",
            "D": "A dashboard that displays the transaction after month-end"
          },
          "correct_answer": "B",
          "points": 5,
          "explanation": "Anomaly-detection models can combine several signals and identify behaviour that differs from a customer’s or agent’s normal pattern. Alerts should support investigation rather than automatically treating every unusual transaction as fraud.",
          "teaching_point": "AI is valuable when risk appears as a pattern across many variables rather than one simple rule.",
          "fun_add_on": "Fraud rarely sends a calendar invitation before arriving."
        },
        {
          "id": 7,
          "title": "The Zomba Customer Who May Quietly Leave",
          "scenario": "Thoko Chirwa manages customer retention. She notices that some TNM customers in Zomba gradually reduce bundle purchases, experience repeated service problems, contact support several times, and then stop using their TNM SIM. She wants to identify vulnerable customers before they become inactive.",
          "question": "What is the strongest AI use case for this situation?",
          "options": {
            "A": "A predictive model that estimates churn risk and identifies the factors behind the score",
            "B": "A spreadsheet that lists customers alphabetically",
            "C": "A fixed message sent to every customer regardless of behaviour",
            "D": "A 3D printer that produces replacement SIM cards"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "A churn model can learn from historical behaviour and estimate which customers are at risk. The result should be used with explainability, affordability considerations, and appropriate offers rather than manipulative targeting.",
          "teaching_point": "Prediction becomes useful when it leads to a timely, fair, and measurable intervention.",
          "fun_add_on": "A customer should not have to disappear before the retention team discovers invisibility."
        },
        {
          "id": 8,
          "title": "Call-Centre Traffic in Blantyre",
          "scenario": "It is Monday morning at the TNM contact centre in Blantyre. Customers are asking about bundle depletion, Mpamba reversals, SIM registration, network outages, and account balances. Agents search several systems and sometimes give inconsistent answers. The queue is growing faster than the tea is cooling.",
          "question": "Which solution is the best responsible use of AI?",
          "options": {
            "A": "Replace all human agents and prevent customers from requesting a person",
            "B": "Use an AI copilot to retrieve approved information, draft responses, classify complaints, and escalate complex cases to trained agents",
            "C": "Send every customer to the same static FAQ page",
            "D": "Automatically close complaints after five minutes"
          },
          "correct_answer": "B",
          "points": 5,
          "explanation": "A customer-service copilot can reduce search time, improve consistency, route cases, and draft responses. Human agents should remain responsible for complex, disputed, financial, or emotionally sensitive matters.",
          "teaching_point": "The best service design often combines AI speed with human judgement and accountability.",
          "fun_add_on": "The tea may still get cold, but the customer should not."
        },
        {
          "id": 9,
          "title": "The Chichewa and Chitumbuka Support Assistant",
          "scenario": "A TNM digital team wants customers to ask common service questions in English, Chichewa, or Chitumbuka. The proposed system identifies the language, interprets the question, retrieves an approved answer, and translates the response into the customer’s chosen language. Human reviewers test accuracy, especially for financial and legal wording.",
          "question": "Which combination of AI capabilities is being used?",
          "options": {
            "A": "Natural-language processing, information retrieval, and machine translation",
            "B": "Only cloud storage",
            "C": "Only scheduled automation",
            "D": "Computer-aided manufacturing"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "The system must recognise language, interpret text, locate relevant information, and produce a translated response. These are established natural-language AI tasks, although quality assurance is essential for lower-resource languages and sensitive content.",
          "teaching_point": "Language AI can improve inclusion when it is tested with the people and languages it is intended to serve.",
          "fun_add_on": "The assistant must understand the customer—not simply translate confusion into three languages."
        },
        {
          "id": 10,
          "title": "The Mangochi Mxit Mxit Campaign",
          "scenario": "Pemphero Nkhoma is preparing a campaign for customers in Mangochi. She gives a system the bundle features, target audience, tone, and language requirements. The system drafts several new SMS messages, social-media captions, and radio-script options. Pemphero checks prices, claims, cultural appropriateness, and regulatory wording before publication.",
          "question": "What kind of technology is this?",
          "options": {
            "A": "Generative AI used with human review",
            "B": "A fixed threshold alarm",
            "C": "A traditional dashboard",
            "D": "A barcode scanner"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "The system creates new text based on a prompt and supplied context, which is a generative-AI capability. Human review is necessary because the generated material could contain incorrect prices, unsupported claims, inappropriate language, or compliance problems.",
          "teaching_point": "Generative AI can accelerate creative work, but publication accountability remains with people.",
          "fun_add_on": "The model can draft ten slogans before lunch; it still cannot approve the marketing budget."
        }
      ]
    },
    {
      "level": 3,
      "name": "Strategic AI, Governance, and Other 4IR Technologies",
      "difficulty": "Hard",
      "focus": "Distinguishing advanced technologies, evaluating AI-enabled decisions, and applying governance to high-impact use cases",
      "puzzles": [
        {
          "id": 11,
          "title": "The Rural Site Investment Committee",
          "scenario": "TNM is considering new network sites in Neno, Chitipa, and parts of Mangochi. Each location has different population density, demand forecasts, road access, power reliability, terrain, expected revenue, social value, equipment costs, and foreign-currency requirements. A proposed model learns from previous site performance and estimates demand, outage risk, cost, and likely return for each candidate location. It then ranks the sites for executive review.",
          "question": "What is the best judgement about this proposal?",
          "options": {
            "A": "It is a credible AI decision-support use case, but executives should review assumptions, uncertainty, inclusion, and social obligations before approving investments",
            "B": "It is not AI because finance and geography cannot be analysed together",
            "C": "The model should make the final investment decision automatically because numbers are always neutral",
            "D": "It is only a dashboard because it produces a ranking"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "The proposal combines prediction and optimisation using multiple data sources. However, rural coverage decisions involve uncertainty, public value, inclusion, regulation, and strategic judgement. The model should support—not replace—accountable executive decisions.",
          "teaching_point": "AI can improve capital allocation, but optimisation must reflect the organisation’s full responsibilities, not only short-term revenue.",
          "fun_add_on": "A model can rank sites; it cannot attend the community meeting on behalf of leadership."
        },
        {
          "id": 12,
          "title": "The Missing Kwacha Between GSM and Mpamba",
          "scenario": "Finance teams observe small but persistent differences between billing records, Mpamba transactions, promotions, partner settlements, and general-ledger entries. Each difference is too small to trigger existing rules, but together they may represent substantial revenue leakage. The proposed system learns normal reconciliation patterns, detects unusual combinations, and groups likely root causes for investigation.",
          "question": "Which design is most appropriate?",
          "options": {
            "A": "Anomaly detection and intelligent reconciliation, followed by investigation and controlled financial adjustment",
            "B": "A generative image model that draws a picture of the missing money",
            "C": "Automatic deletion of every transaction that does not match immediately",
            "D": "A monthly presentation with no transaction-level analysis"
          },
          "correct_answer": "A",
          "points": 5,
          "explanation": "AI can identify subtle inconsistencies across large transaction volumes and help investigators prioritise likely causes. Financial corrections should still follow approved controls, evidence requirements, segregation of duties, and audit trails.",
          "teaching_point": "Detection may be automated; accountable financial action should remain controlled and auditable.",
          "fun_add_on": "The missing kwacha may be small individually, but they have excellent teamwork."
        },
        {
          "id": 13,
          "title": "The Mpamba Model with Too Much Authority",
          "scenario": "A vendor proposes an AI model that instantly freezes any Mpamba account it considers suspicious. Customers receive no explanation, agents cannot challenge the decision, there is no appeal process, and the model has not been tested for errors affecting rural customers, shared devices, or people who frequently change locations for work. The vendor says that speed is more important than review.",
          "question": "What is the best executive response?",
          "options": {
            "A": "Approve it because fraud prevention justifies any level of automation",
            "B": "Approve it if the vendor promises that the algorithm is advanced",
            "C": "Pause or redesign it to include testing, proportional action, explanations, human review, appeals, monitoring, and clear accountability",
            "D": "Use it only on customers with low balances because mistakes would matter less"
          },
          "correct_answer": "C",
          "points": 5,
          "explanation": "Fraud controls can protect customers, but an unreviewable model can also block legitimate access to money and create unfair outcomes. High-impact decisions require validation, proportional responses, transparency, escalation, appeal, monitoring, and accountable ownership.",
          "teaching_point": "A technically powerful AI system can still be an unacceptable system when governance is weak.",
          "fun_add_on": "An algorithm that cannot explain itself should not be given the keys to everyone’s wallet."
        },
        {
          "id": 14,
          "title": "The 4IR Buzzword Buffet",
          "scenario": "A project team announces: “We moved customer data to the cloud, connected tower batteries using Internet-of-Things sensors, recorded selected transactions on a blockchain, and introduced virtual-reality safety training. TNM has therefore implemented four new types of AI.” The presentation has arrows, glowing icons, and excellent animation.",
          "question": "Which response is most accurate?",
          "options": {
            "A": "Correct — cloud, IoT, blockchain, and virtual reality are all forms of AI",
            "B": "Incorrect — they are important digital or 4IR technologies, but none is automatically AI",
            "C": "Correct — any technology with an acronym becomes AI",
            "D": "Incorrect — AI can only exist in humanoid robots"
          },
          "correct_answer": "B",
          "points": 5,
          "explanation": "Cloud computing, IoT, blockchain, and virtual reality are distinct technologies. They can provide data, infrastructure, security mechanisms, or interfaces for an AI system, but they do not become AI merely by being advanced or connected.",
          "teaching_point": "AI is part of the wider technology landscape; it is not a replacement name for every modern technology.",
          "fun_add_on": "The glowing icons were advanced. The classification was not."
        },
        {
          "id": 15,
          "title": "The Executive Agent That Can Act",
          "scenario": "TNM tests an AI agent that can read approved operational reports, identify a likely service issue, draft an incident summary, open a technical ticket, schedule a review meeting, and prepare a customer-notification draft. A project sponsor proposes giving it unrestricted access to send public messages, approve supplier payments, change network configurations, and close regulatory incidents without human approval.",
          "question": "Which statement best distinguishes a responsible AI agent from unsafe automation?",
          "options": {
            "A": "An AI agent should receive every available permission so that it can demonstrate intelligence",
            "B": "The agent is safe as long as it produces professional-looking text",
            "C": "The agent may plan and use tools, but permissions, approval thresholds, logging, monitoring, and human control must match the risk of each action",
            "D": "It is not AI because software cannot open tickets or schedule meetings"
          },
          "correct_answer": "C",
          "points": 5,
          "explanation": "Agentic AI can interpret goals, plan steps, and call tools. Those capabilities increase both value and risk. Low-risk actions may be automated, while financial, public, technical, legal, or regulatory actions need strict permissions and appropriate human approval.",
          "teaching_point": "The more an AI system can do, the more carefully its authority must be designed.",
          "fun_add_on": "A helpful assistant needs a job description; a powerful agent needs one plus access controls."
        }
      ]
    }
  ],
  "bonus_meta_question": {
    "title": "Should TNM Use AI Here at All?",
    "question": "Which situation provides the strongest reason to pause or redesign an AI deployment?",
    "options": {
      "A": "The task is repetitive, data-rich, measurable, and reviewed by trained people",
      "B": "The system makes high-impact financial or service decisions with no explanation, monitoring, appeal, or accountable owner",
      "C": "The organisation already has cloud infrastructure",
      "D": "The team wants to begin with a small, controlled pilot"
    },
    "correct_answer": "B",
    "explanation": "AI should be paused or redesigned when its decisions can materially affect customers or the organisation but there is no transparency, validation, monitoring, human review, appeal process, or accountable owner."
  }
};

export const dayTwoGame = {
  "game_title": "TNM AI Solution Match",
  "subtitle": "Match the right AI Card to a real TNM Malawi pain point",
  "audience": "TNM Malawi executives, managers and specialists participating in the UCT GSB AI Leadership in Action programme",
  "game_objective": "Diagnose the root cause, compare four AI solution cards, select the best first intervention, and defend the required data, governance and success measures.",
  "important_note": "The challenges are grounded in public TNM, regulatory or Malawi-sector evidence. Names, exact incidents, sample outputs and internal workflows are fictionalised for training. This file does not claim access to confidential TNM information.",
  "recommended_gameplay": {
    "players": "Individuals or teams of 3–6",
    "time_per_round_minutes": 6,
    "scoring": {
      "correct_ai_card": 5,
      "credible_data_requirements": 2,
      "responsible_ai_control": 2,
      "measurable_success_indicator": 1,
      "maximum_per_round": 10,
      "maximum_total": 100
    },
    "round_sequence": [
      "Read the scenario",
      "Identify the root cause",
      "Review four AI Cards",
      "Select and defend one card",
      "Name required data",
      "Identify one control",
      "Choose a success measure",
      "Reveal and discuss"
    ]
  },
  "coverage": {
    "number_of_scenarios": 10,
    "business_areas": [
      "Telecommunications",
      "Mobile Money",
      "Customer Operations",
      "Network Management",
      "Finance",
      "Human Resources",
      "Legal and Regulatory Compliance",
      "Governance and Enterprise Risk",
      "Board Reporting"
    ]
  },
  "sources": {
    "S1": {
      "title": "TNM summarised audited financial statements for the year ended 31 December 2025",
      "publisher": "Telekom Networks Malawi Plc",
      "url": "https://www.tnm.co.mw/website-api/storage/405/Summarised-audited-consolidated-and-separate-financial-statements-for-the-year-ended-31-December-2025.pdf",
      "basis": "Documents network investment, mobile-money and data growth, and pressure from foreign-currency scarcity, fuel prices and inflation."
    },
    "S2": {
      "title": "Revenue Assurance Analyst and Business Intelligence Specialist vacancy announcement",
      "publisher": "Telekom Networks Malawi Plc",
      "url": "https://www.tnm.co.mw/website-api/storage/348/RA-%26-BI-VANCACIES.pdf",
      "basis": "Documents revenue leakage, GSM and Mobile Money fraud, reconciliations, rate assurance and BI requirements."
    },
    "S3": {
      "title": "Q1 2025 TNM and Airtel Quality of Service Report",
      "publisher": "Malawi Communications Regulatory Authority",
      "url": "https://macra.mw/wpfd_file/q1-2025-tnm-and-airtel-qos-report/",
      "basis": "Confirms that mobile-network quality is formally measured and regulated in Malawi."
    },
    "S4": {
      "title": "TNM vacancies page",
      "publisher": "Telekom Networks Malawi Plc",
      "url": "https://www.tnm.co.mw/vacancies/",
      "basis": "Shows continuing recruitment across customer experience, billing, mobile money, network, finance, risk, compliance and legal roles."
    },
    "S5": {
      "title": "Communications rules and regulations",
      "publisher": "Malawi Communications Regulatory Authority",
      "url": "https://macra.mw/rules-regulations/",
      "basis": "Documents quality-of-service, consumer-protection, licensing and telecommunications obligations."
    },
    "S6": {
      "title": "TNM Plc annual-report and public-company filings page",
      "publisher": "Malawi Stock Exchange",
      "url": "https://mse.co.mw/company/MWTNM0010126",
      "basis": "Provides TNM annual reports, public-company reporting context and governance disclosures."
    },
    "S7": {
      "title": "TNM introduces SIM-swap security feature on Mpamba",
      "publisher": "Maravi Express",
      "url": "https://www.maraviexpress.com/tnm-introduces-sim-swap-security-feature-on-mpamba-as-innovation-to-curb-mobile-money-fraud/",
      "basis": "Reports TNM action to curb mobile-money fraud and SIM-swap abuse."
    },
    "S8": {
      "title": "Social cash transfers spur financial inclusion",
      "publisher": "UNICEF Malawi",
      "url": "https://www.unicef.org/malawi/stories/social-cash-transfers-spur-financial-inclusion",
      "basis": "Documents mobile-money agent liquidity challenges in hard-to-reach parts of Malawi."
    },
    "S9": {
      "title": "TNM customer-support contacts",
      "publisher": "Telekom Networks Malawi Plc",
      "url": "https://tnm.co.mw/personal/support/contacts/",
      "basis": "Confirms TNM call-centre and WhatsApp customer-support channels."
    },
    "S10": {
      "title": "Competition-law process involving TNM Mpamba agent arrangements",
      "publisher": "Competition and Fair Trading Commission of Malawi",
      "url": "https://www.cftc.mw/2023/02/01/proposed-exclusive-dealing-arrangements-by-tnm-mpamba-limited-on-competition-in-the-mobile-money-services-market-and-the-economy-of-malawi/",
      "basis": "Demonstrates the competition and agent-network compliance environment around Mpamba."
    }
  },
  "scenarios": [
    {
      "id": 1,
      "title": "Keep the Northern Region Connected",
      "game_category": "Network Management",
      "location": "Mzimba and Rumphi",
      "difficulty": "Foundation",
      "tnm_role": "Tadala Nyirenda, Regional Network Operations Manager",
      "pain_point_theme": "Unplanned site outages and costly emergency maintenance",
      "grounding": {
        "source_ids": [
          "S1",
          "S3"
        ],
        "note": "Publicly grounded; names and operational details are fictionalised."
      },
      "pain_point_scenario": "Several TNM sites serving communities between Mzimba and Rumphi experience intermittent disruptions. Engineers receive many battery, generator and cooling alarms but often act after equipment fails. Emergency visits consume fuel, replacement parts may require foreign currency, and customers experience slow data or loss of service.",
      "player_task": "Choose the AI Card TNM should implement first to address the root cause.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Predictive Site-Maintenance AI",
          "type_of_ai": "Time-series prediction and anomaly detection",
          "what_it_can_do": [
            "Analyse battery voltage and charging patterns",
            "Detect abnormal generator and cooling behaviour",
            "Estimate component failure",
            "Prioritise preventive visits"
          ],
          "sample_output": "Site MZ-042 has an 82% likelihood of battery failure within 48 hours."
        },
        {
          "card_id": "B",
          "name": "Network-Traffic Forecasting AI",
          "type_of_ai": "Demand forecasting",
          "what_it_can_do": [
            "Predict high-traffic periods",
            "Estimate congestion",
            "Recommend temporary capacity actions"
          ],
          "sample_output": "Traffic near Mzuzu Stadium may rise by 38% on Saturday."
        },
        {
          "card_id": "C",
          "name": "Customer-Churn Prediction AI",
          "type_of_ai": "Predictive classification",
          "what_it_can_do": [
            "Identify customers likely to become inactive",
            "Explain churn drivers"
          ],
          "sample_output": "Customers affected by repeated outages have elevated churn risk."
        },
        {
          "card_id": "D",
          "name": "Generative Incident Copilot",
          "type_of_ai": "Generative AI and summarisation",
          "what_it_can_do": [
            "Summarise alarms",
            "Draft incident reports",
            "Prepare customer-notification drafts"
          ],
          "sample_output": "Three sites experienced power-related interruptions between 14:00 and 16:30."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The root problem is late detection of equipment deterioration. Card A helps prevent the outage.",
      "why_other_cards_are_less_suitable": {
        "B": "Best for congestion, not equipment failure.",
        "C": "Measures a downstream consequence.",
        "D": "Improves reporting after an incident."
      },
      "data_needed": [
        "Site alarms",
        "Battery voltage",
        "Generator runtime",
        "Fuel use",
        "Temperature",
        "Grid outages",
        "Maintenance history"
      ],
      "responsible_ai_check": [
        "Engineer confirms diagnosis",
        "Monitor false alarms",
        "Test older rural equipment",
        "Log every recommendation"
      ],
      "success_measures": [
        "Fewer unplanned outages",
        "Lower downtime",
        "Fewer emergency visits",
        "Reduced fuel and repair cost"
      ],
      "facilitator_debrief": "The best AI solution addresses the root operational cause, not merely its consequences.",
      "bonus_question": "Would Card A remain best if the site equipment were healthy but overloaded every evening?"
    },
    {
      "id": 2,
      "title": "The Kamuzu Stadium Data Surge",
      "game_category": "Telecommunications",
      "location": "Blantyre",
      "difficulty": "Foundation",
      "tnm_role": "Chifundo Mbewe, Radio Network Planning Specialist",
      "pain_point_theme": "Short-duration congestion during major events",
      "grounding": {
        "source_ids": [
          "S1",
          "S3"
        ],
        "note": "Grounded in network-quality priorities; the match-day incident is fictionalised."
      },
      "pain_point_scenario": "During a major match at Kamuzu Stadium, supporters upload videos, use WhatsApp and make mobile-money payments at the same time. Nearby cells perform normally on ordinary days but become congested before kick-off, at half-time and after the final whistle.",
      "player_task": "Select the AI Card most likely to anticipate and manage the congestion.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Event-Aware Traffic Forecasting AI",
          "type_of_ai": "Spatiotemporal demand forecasting",
          "what_it_can_do": [
            "Learn traffic by cell and time",
            "Combine event and historical network data",
            "Forecast demand",
            "Recommend temporary capacity"
          ],
          "sample_output": "Cells BT-118 and BT-121 may exceed safe capacity between 14:40 and 15:20."
        },
        {
          "card_id": "B",
          "name": "Predictive Site-Maintenance AI",
          "type_of_ai": "Failure prediction",
          "what_it_can_do": [
            "Predict equipment failure",
            "Schedule maintenance"
          ],
          "sample_output": "The cooling fan at site BT-118 may fail next week."
        },
        {
          "card_id": "C",
          "name": "Marketing Content Generator",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Draft match-day campaigns",
            "Create social posts"
          ],
          "sample_output": "Enjoy every goal with TNM data bundles."
        },
        {
          "card_id": "D",
          "name": "Monthly QoS Dashboard",
          "type_of_ai": "Business intelligence",
          "what_it_can_do": [
            "Display historical speed and outage KPIs",
            "Compare locations after month-end"
          ],
          "sample_output": "Average Blantyre speed declined during the reporting month."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The problem is a predictable, location-specific demand spike. Card A allows action before service deteriorates.",
      "why_other_cards_are_less_suitable": {
        "B": "Equipment failure is not the problem.",
        "C": "Could increase traffic without solving congestion.",
        "D": "Reports the problem after the event."
      },
      "data_needed": [
        "Cell traffic history",
        "Connection attempts",
        "Throughput",
        "Dropped sessions",
        "Event schedules",
        "Temporary-capacity availability"
      ],
      "responsible_ai_check": [
        "Use aggregated customer data",
        "Engineer approval for configuration changes",
        "Maintain manual fallback"
      ],
      "success_measures": [
        "Lower peak congestion",
        "Higher throughput",
        "Fewer dropped sessions",
        "Fewer complaints"
      ],
      "facilitator_debrief": "AI planning works best when it predicts demand at the right place and time.",
      "bonus_question": "What non-AI actions should TNM combine with the forecast?"
    },
    {
      "id": 3,
      "title": "The Mpamba SIM-Swap Warning",
      "game_category": "Mobile Money",
      "location": "Lilongwe and nationwide",
      "difficulty": "Intermediate",
      "tnm_role": "Thokozani Kachale, Mpamba Fraud-Risk Manager",
      "pain_point_theme": "Mobile-money fraud and suspicious SIM-swap behaviour",
      "grounding": {
        "source_ids": [
          "S2",
          "S7"
        ],
        "note": "Directly grounded in Mpamba fraud controls; transaction details are fictionalised."
      },
      "pain_point_scenario": "A customer SIM is swapped in Lilongwe. Within 20 minutes, the device, location and transaction pattern change. Several transfers are attempted to new recipients, but each remains below the existing fixed threshold.",
      "player_task": "Choose the best first-line AI decision-support card.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Behavioural Fraud and Anomaly AI",
          "type_of_ai": "Anomaly detection, graph analytics and risk scoring",
          "what_it_can_do": [
            "Compare behaviour with the normal pattern",
            "Detect unusual device and recipient sequences",
            "Identify linked suspicious accounts",
            "Produce reason codes"
          ],
          "sample_output": "High risk: recent SIM swap, new device, five new recipients and transaction velocity nine times above normal."
        },
        {
          "card_id": "B",
          "name": "Customer Churn AI",
          "type_of_ai": "Predictive classification",
          "what_it_can_do": [
            "Estimate customer inactivity",
            "Recommend retention offers"
          ],
          "sample_output": "This customer may reduce Mpamba use next month."
        },
        {
          "card_id": "C",
          "name": "Fraud-Awareness Content Writer",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Draft safety messages",
            "Translate awareness content"
          ],
          "sample_output": "Never disclose your Mpamba PIN."
        },
        {
          "card_id": "D",
          "name": "Fixed High-Value Rule",
          "type_of_ai": "Rules-based automation",
          "what_it_can_do": [
            "Block transactions above a set amount"
          ],
          "sample_output": "Decline transfers above the configured limit."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The fraud signal is a linked behavioural sequence, not one large transaction.",
      "why_other_cards_are_less_suitable": {
        "B": "Does not detect active fraud.",
        "C": "Education cannot identify the current attack.",
        "D": "A single threshold is easy to evade and creates false positives."
      },
      "data_needed": [
        "SIM-swap time",
        "Device identifiers",
        "Transaction velocity",
        "Recipient network",
        "Account history",
        "Channel used",
        "Confirmed-fraud outcomes"
      ],
      "responsible_ai_check": [
        "Use step-up verification before freezing",
        "Human review and appeal",
        "Monitor false positives",
        "Protect financial data"
      ],
      "success_measures": [
        "Fraud losses prevented",
        "Detection precision",
        "False-positive rate",
        "Review turnaround time"
      ],
      "facilitator_debrief": "The aim is early, fair risk detection—not automatic punishment.",
      "bonus_question": "Which cases may be safe for automatic verification, and which require an investigator?"
    },
    {
      "id": 4,
      "title": "No Cash at the Lakeshore Agent",
      "game_category": "Mobile Money",
      "location": "Mangochi and Monkey Bay",
      "difficulty": "Intermediate",
      "tnm_role": "Wongani Nkhoma, Mpamba Agent-Network Manager",
      "pain_point_theme": "Agent liquidity shortages and failed cash-outs",
      "grounding": {
        "source_ids": [
          "S1",
          "S8"
        ],
        "note": "Grounded in Malawi agent-liquidity challenges and Mpamba growth; the named agent is fictional."
      },
      "pain_point_scenario": "At month-end, an Mpamba agent near Monkey Bay runs out of cash by midday. Customers receiving salaries or remittances cannot cash out. Other agents hold excess cash, but emergency rebalancing is slow and expensive.",
      "player_task": "Pick the AI Card that best prevents liquidity shortages.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Agent Liquidity Forecasting AI",
          "type_of_ai": "Demand forecasting and optimisation",
          "what_it_can_do": [
            "Forecast cash-in and cash-out demand",
            "Detect likely shortages",
            "Recommend rebalancing routes",
            "Account for pay cycles and market days"
          ],
          "sample_output": "Agent MG-031 may face a MWK 4.2 million cash shortfall by 13:00 tomorrow."
        },
        {
          "card_id": "B",
          "name": "Fraud Anomaly AI",
          "type_of_ai": "Fraud detection",
          "what_it_can_do": [
            "Detect suspicious transactions",
            "Score identity risk"
          ],
          "sample_output": "This wallet pattern is unusual."
        },
        {
          "card_id": "C",
          "name": "Agent Support Chatbot",
          "type_of_ai": "Conversational AI",
          "what_it_can_do": [
            "Answer process questions",
            "Retrieve agent guidelines"
          ],
          "sample_output": "Here are the steps for requesting a float adjustment."
        },
        {
          "card_id": "D",
          "name": "Kiosk Branding Vision AI",
          "type_of_ai": "Computer vision",
          "what_it_can_do": [
            "Check signage visibility",
            "Classify kiosk images"
          ],
          "sample_output": "The Mpamba sign is partially obscured."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The root problem is a predictable mismatch between local demand and available liquidity.",
      "why_other_cards_are_less_suitable": {
        "B": "Protects funds but does not solve liquidity mismatch.",
        "C": "Reacts after the shortage is known.",
        "D": "Branding is unrelated to cash availability."
      },
      "data_needed": [
        "Agent cash-in and cash-out history",
        "Float balances",
        "Pay-day calendars",
        "Accessibility",
        "Nearby-agent balances",
        "Rebalancing lead times"
      ],
      "responsible_ai_check": [
        "Protect customer transaction privacy",
        "Human approval for transfers",
        "Do not deprioritise remote communities"
      ],
      "success_measures": [
        "Fewer failed cash-outs",
        "Lower emergency cost",
        "Improved agent availability",
        "Shorter recovery time"
      ],
      "facilitator_debrief": "Optimisation should improve inclusion, not only urban profitability.",
      "bonus_question": "How should rural-access and social-value goals alter the optimisation objective?"
    },
    {
      "id": 5,
      "title": "The Blantyre Contact-Centre Queue",
      "game_category": "Customer Operations",
      "location": "Blantyre",
      "difficulty": "Foundation",
      "tnm_role": "Mercy Kalua, Customer Experience Manager",
      "pain_point_theme": "Long handling times and inconsistent responses",
      "grounding": {
        "source_ids": [
          "S4",
          "S5",
          "S9"
        ],
        "note": "Grounded in TNM support channels and customer-experience roles; queue details are fictionalised."
      },
      "pain_point_scenario": "Agents receive questions about bundles, Mpamba reversals, outages, SIM registration and balances. They search several systems, copy information manually and sometimes classify escalation cases incorrectly.",
      "player_task": "Choose the AI Card that improves service while preserving human accountability.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Multilingual Customer-Service Copilot",
          "type_of_ai": "Natural-language processing, retrieval and summarisation",
          "what_it_can_do": [
            "Understand English and Chichewa",
            "Retrieve approved answers",
            "Summarise customer history",
            "Classify and route complaints",
            "Draft responses for approval"
          ],
          "sample_output": "Likely issue: failed bundle activation. Escalate to Billing if the approved recovery step fails."
        },
        {
          "card_id": "B",
          "name": "Autonomous Complaint Closer",
          "type_of_ai": "Agentic automation",
          "what_it_can_do": [
            "Close complaints after sending a response"
          ],
          "sample_output": "Complaint closed because a reply was sent."
        },
        {
          "card_id": "C",
          "name": "Marketing Recommendation AI",
          "type_of_ai": "Recommender system",
          "what_it_can_do": [
            "Recommend bundles and promotions"
          ],
          "sample_output": "Offer Mxit 2000."
        },
        {
          "card_id": "D",
          "name": "Call-Volume Dashboard",
          "type_of_ai": "Business intelligence",
          "what_it_can_do": [
            "Display calls by hour and reason",
            "Show historical service levels"
          ],
          "sample_output": "The centre received 2,400 calls yesterday."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The challenge combines language, retrieval, consistency, classification and escalation.",
      "why_other_cards_are_less_suitable": {
        "B": "A response does not prove resolution.",
        "C": "Selling does not solve the complaint.",
        "D": "Helps managers but not the agent handling the case."
      },
      "data_needed": [
        "Approved knowledge base",
        "Complaint categories",
        "Interaction history",
        "Escalation rules",
        "Service-status data",
        "Language test sets"
      ],
      "responsible_ai_check": [
        "Agent approves replies",
        "No invented prices or policies",
        "Sensitive cases go to humans",
        "Test Chichewa accuracy"
      ],
      "success_measures": [
        "Lower handling time",
        "Higher first-contact resolution",
        "Fewer repeat calls",
        "Improved satisfaction"
      ],
      "facilitator_debrief": "A fast wrong answer is still poor customer service.",
      "bonus_question": "Which complaint types should never be handled end-to-end without a person?"
    },
    {
      "id": 6,
      "title": "The Missing Kwacha Across GSM and Mpamba",
      "game_category": "Finance",
      "location": "Blantyre head office",
      "difficulty": "Intermediate",
      "tnm_role": "Dalitso Chiumia, Revenue Assurance Analyst",
      "pain_point_theme": "Revenue leakage, reconciliation differences and incorrect rating",
      "grounding": {
        "source_ids": [
          "S2"
        ],
        "note": "Directly grounded in TNM revenue-assurance responsibilities; amounts are fictional."
      },
      "pain_point_scenario": "Small differences appear between usage records, bundle charging, Mpamba payments, promotions, partner settlements and the general ledger. Each difference is below the current threshold, but together they may represent a meaningful loss.",
      "player_task": "Select the AI Card that best detects leakage while preserving financial controls.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Intelligent Revenue-Reconciliation AI",
          "type_of_ai": "Anomaly detection, entity matching and root-cause clustering",
          "what_it_can_do": [
            "Match records across GSM, Mpamba and billing",
            "Detect recurring discrepancies",
            "Group anomalies by likely cause",
            "Prioritise financial exposure"
          ],
          "sample_output": "Promotion code MX-47 shows 1,842 mismatches with estimated exposure of MWK 18.6 million."
        },
        {
          "card_id": "B",
          "name": "Generative Board-Speech Writer",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Draft finance narratives"
          ],
          "sample_output": "Revenue performance remained resilient."
        },
        {
          "card_id": "C",
          "name": "Customer Sentiment AI",
          "type_of_ai": "Text classification",
          "what_it_can_do": [
            "Classify comments"
          ],
          "sample_output": "Sentiment is negative about bundle depletion."
        },
        {
          "card_id": "D",
          "name": "Automatic Journal-Entry Agent",
          "type_of_ai": "Agentic automation",
          "what_it_can_do": [
            "Post corrections without review"
          ],
          "sample_output": "Journal entry posted to remove the difference."
        }
      ],
      "correct_card_id": "A",
      "why_best": "It addresses matching, anomaly detection and root-cause investigation without bypassing controls.",
      "why_other_cards_are_less_suitable": {
        "B": "Explains results but detects nothing.",
        "C": "Comments cannot reconcile systems.",
        "D": "Unreviewed posting violates financial controls."
      },
      "data_needed": [
        "Usage records",
        "Billing events",
        "Approved tariffs",
        "Promotion configurations",
        "Mpamba references",
        "Partner settlements",
        "Ledger entries"
      ],
      "responsible_ai_check": [
        "No automatic journal posting",
        "Segregation of duties",
        "Full audit trail",
        "Human confirmation"
      ],
      "success_measures": [
        "Leakage detected and recovered",
        "Reduced reconciliation time",
        "Improved billing accuracy",
        "Faster root-cause closure"
      ],
      "facilitator_debrief": "AI accelerates detection; accountable people approve financial action.",
      "bonus_question": "What evidence should be required before an anomaly becomes confirmed leakage?"
    },
    {
      "id": 7,
      "title": "Finding and Growing Scarce Skills",
      "game_category": "Human Resources",
      "location": "TNM offices nationwide",
      "difficulty": "Intermediate",
      "tnm_role": "Madalitso Jere, Human Resources Business Partner",
      "pain_point_theme": "Specialist recruitment, internal skills visibility and succession planning",
      "grounding": {
        "source_ids": [
          "S4"
        ],
        "note": "A reasonable inference from continuing specialist recruitment; not a claim that TNM has publicly declared a skills crisis."
      },
      "pain_point_scenario": "TNM recruits specialist roles while some employees may already have relevant certifications or transferable experience that is not visible in the HR system. Managers repeatedly nominate the same people for opportunities, and training is not always linked to future roles.",
      "player_task": "Choose the AI Card that improves workforce planning without making unreviewable employment decisions.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Skills Intelligence and Internal-Mobility AI",
          "type_of_ai": "Semantic matching and recommendation",
          "what_it_can_do": [
            "Create a verified skills inventory",
            "Match employees to roles",
            "Identify gaps",
            "Recommend learning and career pathways"
          ],
          "sample_output": "Three employees match at least 75% of the Network Surveillance role; the main gaps are Python and advanced radio analytics."
        },
        {
          "card_id": "B",
          "name": "Automatic Hiring and Rejection AI",
          "type_of_ai": "Automated decision system",
          "what_it_can_do": [
            "Reject candidates using an undisclosed score"
          ],
          "sample_output": "Candidate rejected. Explanation unavailable."
        },
        {
          "card_id": "C",
          "name": "Payroll Forecasting AI",
          "type_of_ai": "Financial forecasting",
          "what_it_can_do": [
            "Forecast payroll and overtime"
          ],
          "sample_output": "Overtime may rise next quarter."
        },
        {
          "card_id": "D",
          "name": "Employee Newsletter Generator",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Draft internal communications"
          ],
          "sample_output": "Welcome to this month’s TNM people update."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The root problem is weak visibility of skills and development pathways.",
      "why_other_cards_are_less_suitable": {
        "B": "Creates fairness and legal risk.",
        "C": "Does not identify talent or skills.",
        "D": "Improves communication, not workforce planning."
      },
      "data_needed": [
        "Verified qualifications",
        "Skills profiles",
        "Role requirements",
        "Project history",
        "Training records",
        "Career interests"
      ],
      "responsible_ai_check": [
        "Employees can correct profiles",
        "Do not infer sensitive traits",
        "Bias testing",
        "Human review of recommendations"
      ],
      "success_measures": [
        "Internal-fill rate",
        "Time to identify candidates",
        "Training linked to roles",
        "Succession coverage",
        "Fairness"
      ],
      "facilitator_debrief": "AI should reveal overlooked talent, not become a hidden gatekeeper.",
      "bonus_question": "Which employee data should be excluded even if it might improve prediction?"
    },
    {
      "id": 8,
      "title": "The Regulatory Obligation Maze",
      "game_category": "Legal and Regulatory Compliance",
      "location": "Blantyre and Lilongwe",
      "difficulty": "Advanced",
      "tnm_role": "Tamanda Mwale, Legal and Regulatory Affairs Manager",
      "pain_point_theme": "Tracking obligations across licences, QoS, consumer protection, Mpamba and contracts",
      "grounding": {
        "source_ids": [
          "S4",
          "S5",
          "S10"
        ],
        "note": "Grounded in TNM regulation, legal/compliance roles and a documented Mpamba competition-law matter."
      },
      "pain_point_scenario": "Legal teams monitor licence conditions, QoS duties, consumer-protection rules, contract renewals, Mpamba obligations and competition-law restrictions. Updates arrive in different documents and business units own different actions.",
      "player_task": "Select the AI Card that helps legal staff find and track obligations without replacing legal judgement.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Regulatory and Contract Intelligence AI",
          "type_of_ai": "Document AI, retrieval and obligation extraction",
          "what_it_can_do": [
            "Extract duties, deadlines and owners",
            "Compare rules with policies and contracts",
            "Answer questions with citations",
            "Generate an obligation register"
          ],
          "sample_output": "Clause 8 requires quarterly reporting. Proposed owner: Regulatory Affairs. Source: page 14, paragraph 3."
        },
        {
          "card_id": "B",
          "name": "Autonomous Legal Decision Agent",
          "type_of_ai": "Agentic AI",
          "what_it_can_do": [
            "Approve contracts and submit responses without review"
          ],
          "sample_output": "Contract approved and regulator response submitted."
        },
        {
          "card_id": "C",
          "name": "Customer Churn AI",
          "type_of_ai": "Predictive classification",
          "what_it_can_do": [
            "Estimate inactivity risk"
          ],
          "sample_output": "This customer may stop purchasing bundles."
        },
        {
          "card_id": "D",
          "name": "Network Anomaly AI",
          "type_of_ai": "Network analytics",
          "what_it_can_do": [
            "Detect unusual network behaviour"
          ],
          "sample_output": "Cell utilisation is above normal."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The problem is finding, comparing and tracking obligations across authoritative documents.",
      "why_other_cards_are_less_suitable": {
        "B": "Legal approvals require accountable professional judgement.",
        "C": "Commercial retention is unrelated.",
        "D": "Network monitoring cannot interpret law or contracts."
      },
      "data_needed": [
        "Current regulations",
        "Licences",
        "Contracts",
        "Policies",
        "Regulatory correspondence",
        "Owners and deadlines"
      ],
      "responsible_ai_check": [
        "Always cite authoritative sources",
        "Legal review",
        "Version control",
        "Confidentiality",
        "No fabricated clauses"
      ],
      "success_measures": [
        "Fewer missed deadlines",
        "Faster review",
        "Improved audit readiness",
        "Accurate obligation capture"
      ],
      "facilitator_debrief": "Legal AI should make evidence easier to find, not pretend to be the accountable lawyer.",
      "bonus_question": "How should the system respond when two legal documents appear to conflict?"
    },
    {
      "id": 9,
      "title": "The Risk Committee's Early-Warning System",
      "game_category": "Governance and Enterprise Risk",
      "location": "TNM head office",
      "difficulty": "Advanced",
      "tnm_role": "Ellen Kamanga, Enterprise Risk Manager",
      "pain_point_theme": "Fragmented risk signals and delayed escalation",
      "grounding": {
        "source_ids": [
          "S1",
          "S6"
        ],
        "note": "Directly grounded in TNM macroeconomic risk and governance disclosures; meeting details are fictional."
      },
      "pain_point_scenario": "Risk indicators are spread across finance, network operations, procurement, Mpamba, customer service, legal and cybersecurity. Reports arrive at different times, so a growing risk may only become visible after impact has increased.",
      "player_task": "Choose the AI Card that strengthens risk sensing while keeping risk ownership with management and the Board.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Enterprise Risk-Sensing AI",
          "type_of_ai": "Anomaly detection, forecasting and knowledge graph",
          "what_it_can_do": [
            "Combine approved risk indicators",
            "Detect correlated warning signals",
            "Forecast threshold breaches",
            "Map risks to owners and controls"
          ],
          "sample_output": "Foreign-currency lead times, fuel costs and delayed equipment orders jointly indicate rising network-continuity risk."
        },
        {
          "card_id": "B",
          "name": "Board-Minutes Generator",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Draft minutes from transcripts"
          ],
          "sample_output": "The Committee noted the increase in operational risk."
        },
        {
          "card_id": "C",
          "name": "Automatic Risk Acceptance Agent",
          "type_of_ai": "Agentic automation",
          "what_it_can_do": [
            "Accept or close risks without approval"
          ],
          "sample_output": "Risk accepted because expected loss is below the model threshold."
        },
        {
          "card_id": "D",
          "name": "Poster Generator",
          "type_of_ai": "Generative image AI",
          "what_it_can_do": [
            "Create corporate campaign images"
          ],
          "sample_output": "A visual illustrating resilience."
        }
      ],
      "correct_card_id": "A",
      "why_best": "The need is earlier detection of connected risk signals and clearer ownership.",
      "why_other_cards_are_less_suitable": {
        "B": "Minutes document discussion after the fact.",
        "C": "Risk acceptance is a governance decision.",
        "D": "Communications content does not manage risk."
      },
      "data_needed": [
        "Risk register",
        "Key risk indicators",
        "Control assessments",
        "Financial indicators",
        "Network incidents",
        "Complaints",
        "Regulatory events"
      ],
      "responsible_ai_check": [
        "Named human risk owner",
        "Board-approved thresholds",
        "Evidence for alerts",
        "No automatic closure",
        "Regular validation"
      ],
      "success_measures": [
        "Earlier escalation",
        "Fewer unexpected losses",
        "Improved mitigation follow-up",
        "Timelier risk reports"
      ],
      "facilitator_debrief": "AI can connect signals; governance determines who decides and remains accountable.",
      "bonus_question": "When should an AI risk alert go directly to the Board?"
    },
    {
      "id": 10,
      "title": "The Board Pack That Arrives Too Late",
      "game_category": "Board Reporting",
      "location": "Blantyre",
      "difficulty": "Advanced",
      "tnm_role": "Yamikani Phiri, Company Secretariat and Strategy Reporting Lead",
      "pain_point_theme": "Slow preparation, inconsistent narratives and weak evidence traceability",
      "grounding": {
        "source_ids": [
          "S1",
          "S2",
          "S6"
        ],
        "note": "Grounded in TNM public-company reporting, BI needs and board oversight; workflow details are fictional."
      },
      "pain_point_scenario": "The Board pack combines finance, Mpamba, network quality, customer operations, legal, people and enterprise risk. Teams use different definitions and submit late changes. Directors need concise explanations, but every claim must be traceable to approved evidence.",
      "player_task": "Choose the AI Card that improves the pack without allowing AI to invent or approve Board information.",
      "solution_cards": [
        {
          "card_id": "A",
          "name": "Evidence-Grounded Board Reporting Copilot",
          "type_of_ai": "Retrieval-augmented generation, validation and summarisation",
          "what_it_can_do": [
            "Pull approved KPIs",
            "Check definition and period consistency",
            "Draft variance narratives",
            "Link every statement to evidence",
            "Highlight unresolved discrepancies"
          ],
          "sample_output": "Data revenue increased against plan. Evidence: Finance Table 4 and Network KPI Report 7."
        },
        {
          "card_id": "B",
          "name": "Unrestricted Board Narrative Generator",
          "type_of_ai": "Generative AI",
          "what_it_can_do": [
            "Write persuasive narratives without validation"
          ],
          "sample_output": "TNM achieved record satisfaction across all regions."
        },
        {
          "card_id": "C",
          "name": "Customer Recommendation Engine",
          "type_of_ai": "Recommender system",
          "what_it_can_do": [
            "Recommend bundles to customers"
          ],
          "sample_output": "Offer Mxit 5000."
        },
        {
          "card_id": "D",
          "name": "Predictive Maintenance AI",
          "type_of_ai": "Failure prediction",
          "what_it_can_do": [
            "Predict equipment failure"
          ],
          "sample_output": "Site BT-022 needs battery inspection."
        }
      ],
      "correct_card_id": "A",
      "why_best": "Board reporting requires synthesis, consistency and traceability across approved information.",
      "why_other_cards_are_less_suitable": {
        "B": "Fluent unsupported statements are unacceptable.",
        "C": "Customer recommendations do not solve reporting.",
        "D": "Provides only one operational input."
      },
      "data_needed": [
        "Approved financial tables",
        "Governed KPI definitions",
        "Network and customer reports",
        "Risk register",
        "Legal updates",
        "HR indicators",
        "Previous Board decisions"
      ],
      "responsible_ai_check": [
        "Management signs off each section",
        "Every claim links to evidence",
        "No unapproved data",
        "Confidential access controls",
        "Track generated text"
      ],
      "success_measures": [
        "Shorter preparation time",
        "Fewer late corrections",
        "Better traceability",
        "Consistent KPI definitions",
        "More decision-focused Board time"
      ],
      "facilitator_debrief": "A Board copilot should improve the quality of evidence, not manufacture confidence.",
      "bonus_question": "Which parts of a Board pack should remain fully human-authored?"
    }
  ]
};
