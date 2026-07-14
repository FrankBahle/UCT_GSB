document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const delegates = [
        {
            name: "Amon Sobhuza Jere",
            displayName: "Amon Jere",
            role: "Chief Commercial Officer",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/amon-jere.webp",

            description:
                "A multidisciplinary commercial executive responsible for TNM's growth-facing functions, including strategy, customer acquisition, marketing, sales, channels, product adoption and revenue performance.",

            education: [
                "Bachelor of Laws (LLB), University of Zambia",
                "Postgraduate study in economics and business administration",
                "Executive education references include Edinburgh Business School, Heriot-Watt University and London Business School"
            ],

            highlights: [
                "Leads TNM's commercial strategy and market-growth functions",
                "Combines experience in law, economics and business",
                "Connects customer needs, products, channels and revenue"
            ],

            aiRelevance:
                "His experience is relevant to customer segmentation, churn prediction, personalised offers, sales analytics, digital-channel optimisation and the responsible use of customer data."
        },

        {
            name: "Chisomo Nyemba-Governor",
            displayName: "Chisomo Nyemba",
            role: "Legal and Regulatory Director and Company Secretary",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/chisomo-nyemba.webp",

            description:
                "A corporate lawyer, governance professional and human-rights advocate whose work spans regulation, compliance, legal risk, board governance and engagement with public institutions.",

            education: [
                "LLM in Commercial and Corporate Law, University of London",
                "LLM in Human Rights and Democratisation, University of Pretoria",
                "Postgraduate Diploma in International Business Law, University of London",
                "LLB Honours, University of Malawi"
            ],

            highlights: [
                "Leads TNM's legal and regulatory portfolio",
                "Has served on infrastructure and access-to-justice boards",
                "Has supported pro bono advocacy training across several African countries"
            ],

            aiRelevance:
                "Her experience supports discussions on data protection, algorithmic accountability, intellectual property, contracting, regulation and board oversight of emerging technology risk."
        },

        {
            name: "Christopher Sukasuka",
            displayName: "Christopher Sukasuka",
            role: "General Manager",
            organisation: "TNM Mpamba Limited",
            image: "assets/images/delegates/christopher-sukasuka.webp",

            description:
                "A mobile-money and fintech leader responsible for expanding accessible digital financial services through the Mpamba platform and its national agent network.",

            education: [
                "MSc in Strategic Management, University of Derby",
                "Professional experience in mobile money, fintech strategy and digital financial services"
            ],

            highlights: [
                "Leads one of Malawi's major mobile-money platforms",
                "Has overseen digital-credit, remittance and electronic-payment services",
                "Promotes financial inclusion through national agent-network reach"
            ],

            aiRelevance:
                "His experience is relevant to alternative credit assessment, fraud and anomaly detection, agent-network analytics, transaction personalisation and responsible financial-data use."
        },

        {
            name: "Dalitso Nkunika",
            displayName: "Dalitso Nkunika",
            role: "Human Resources and Administration Director",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/dalitso-nkunika.webp",

            description:
                "A strategic human-resources leader with more than 16 years of experience in talent management, organisational development, workforce planning and business transformation.",

            education: [
                "Master of Business Administration, University of Malawi",
                "Professional experience in strategic HR, talent development and organisational transformation"
            ],

            highlights: [
                "Leads TNM's people, culture and administration portfolio",
                "Supports leadership development and organisational capability",
                "Advocates for employee development and women's leadership"
            ],

            aiRelevance:
                "She brings an important perspective on workforce redesign, AI literacy, job and workflow change, responsible role transformation, employee engagement and adoption."
        },

        {
            name: "Dr Frank Dalitso Chozenga",
            displayName: "Dr Frank Chozenga",
            role: "Non-Executive Director and Board Audit Committee Chair",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/dr-frank-chozenga.webp",

            description:
                "A finance, telecommunications and fintech executive with international experience in audit, financial planning, strategy, performance management and mobile financial services.",

            education: [
                "Bachelor of Accountancy with distinction, University of Malawi",
                "Master's degree in Telecommunications Management, University of Strathclyde",
                "Fellow of the Association of Chartered Certified Accountants",
                "Public professional profile lists doctoral-level study"
            ],

            highlights: [
                "Has held senior assignments across Malawi, Kenya, Mozambique and Ethiopia",
                "Has extensive finance experience in major African telecommunications groups",
                "Chairs TNM's Board Audit Committee"
            ],

            aiRelevance:
                "His experience is relevant to AI-assisted forecasting, audit analytics, fraud detection, fintech, performance management and governance of technology investments."
        },

        {
            name: "Dr Lyton Chithambo",
            displayName: "Dr Lyton Chithambo",
            role: "Chief Operating Officer and Non-Executive Director",
            organisation: "Press Corporation Plc; TNM and National Bank of Malawi Boards",
            image: "assets/images/delegates/dr-lyton-chithambo.webp",

            description:
                "A finance, risk and operations executive with more than 20 years of experience across financial markets, regulation, academia, corporate strategy and group operations.",

            education: [
                "PhD in Finance",
                "MSc in Finance and Risk with distinction, Bournemouth University",
                "Bachelor of Accountancy, University of Malawi",
                "FCCA",
                "INSEAD Advanced Management Programme",
                "Oxford Saïd Bank Governance Programme"
            ],

            highlights: [
                "Former central-bank supervisor and university lecturer",
                "Has board responsibilities in telecommunications and banking",
                "Has completed senior programmes at INSEAD, Oxford and Harvard"
            ],

            aiRelevance:
                "His experience supports discussions on model risk, financial analytics, operational resilience, banking governance, strategic portfolio management and controls for high-stakes automated decisions."
        },

        {
            name: "Gerald Mayamiko Chungu",
            displayName: "Gerald Chungu",
            role: "Group IT Executive",
            organisation: "Old Mutual Malawi",
            image: "assets/images/delegates/gerald-chungu.webp",

            description:
                "An information-technology executive with more than 15 years of experience across banking, microfinance, insurance and asset management.",

            education: [
                "Master of Business Administration, ESAMI",
                "Professional development focused on ICT leadership and management",
                "Career experience across banking, microfinance, insurance and asset management"
            ],

            highlights: [
                "Leads group-level IT strategy and transformation at Old Mutual Malawi",
                "Oversees enterprise systems, infrastructure and technology risk",
                "Contributes to Malawi's technology and higher-education community"
            ],

            aiRelevance:
                "His experience is relevant to responsible AI in financial services, cybersecurity, enterprise architecture, data governance, digital channels and secure scaling."
        },

        {
            name: "Khumbo Phiri",
            displayName: "Khumbo Phiri",
            role: "Operations Executive",
            organisation: "Old Mutual Malawi",
            image: "assets/images/delegates/khumbo-phiri.webp",

            description:
                "A senior financial-services executive with more than 20 years of experience in insurance, investments, asset management, operations and digital financial services.",

            education: [
                "Master of Financial Services, University of New England",
                "Chartered Insurer, Chartered Insurance Institute, London",
                "Bachelor of Education in Humanities, University of Malawi"
            ],

            highlights: [
                "Helped establish Malawi's first unit-trust company",
                "Has served as a managing director and regional operations executive",
                "Contributed to mobile-money and investment integration through Mpamba Fesa"
            ],

            aiRelevance:
                "His experience supports practical AI applications in automation, customer analytics, digital distribution, fraud controls and personalised financial services."
        },

        {
            name: "Lloyd James Gowera",
            displayName: "Lloyd Gowera",
            role: "Chief Technical Officer",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/lloyd-gowera.webp",

            description:
                "A telecommunications engineering executive with more than two decades of experience in network planning, radio and transmission engineering, infrastructure operations and technology transformation.",

            education: [
                "Master of Business Administration, ESAMI",
                "Bachelor of Science in Information Technology",
                "Diploma in Telecommunications and Electronics Engineering",
                "Project-management credentials listed in his public profile"
            ],

            highlights: [
                "Has telecommunications experience across four countries",
                "Has led or supported major radio, transmission, 4G and 5G initiatives",
                "Served as Acting Chief Executive Officer of TNM in 2022"
            ],

            aiRelevance:
                "His technical and operational background is relevant to AI-enabled network management, predictive maintenance, resilience, customer-experience analytics and digital infrastructure."
        },

        {
            name: "Madalo Mungapoti Nyambose",
            displayName: "Madalo Nyambose",
            role: "Principal Secretary and Non-Executive Director",
            organisation: "Government of Malawi; TNM Board",
            image: "assets/images/delegates/madalo-nyambose.webp",

            description:
                "A senior public administrator with more than 26 years of experience across national budgeting, policy, planning, transport, public works, debt, aid management and institutional governance.",

            education: [
                "Bachelor of Business Administration, University of Malawi",
                "MSc in Finance, University of Essex",
                "Postgraduate Diploma in Accounting and Finance, University of Essex"
            ],

            highlights: [
                "Has more than 26 years of public-administration experience",
                "Has managed national policy, planning, debt and aid portfolios",
                "Brings non-executive governance experience from the TNM Board"
            ],

            aiRelevance:
                "She brings a public-sector perspective on aligning AI with public value, accountability, fiscal constraints, inclusive development, infrastructure priorities and service delivery."
        },

        {
            name: "Michel A. Hébert",
            displayName: "Michel Hébert",
            role: "Chief Executive Officer",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/michel-hebert.webp",

            description:
                "An international telecommunications engineer and TMT executive with approximately 25 years of leadership experience across Africa, the Middle East and other global markets.",

            education: [
                "Electrical-engineering background",
                "Business and executive education associated with the University of Chicago Booth School of Business",
                "Advanced professional courses in leadership, sales strategy and problem solving"
            ],

            highlights: [
                "Has led major telecommunications, 5G, fibre and broadband transformation programmes",
                "Has experience in mobile financial services and customer-experience transformation",
                "Brings international executive leadership across several markets"
            ],

            aiRelevance:
                "His experience supports AI strategy in network automation, customer analytics, digital platforms, fintech and converting advanced technologies into sustainable commercial performance."
        },

        {
            name: "Peter Kadzitche",
            displayName: "Peter Kadzitche",
            role: "Chief Finance Officer",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/peter-kadzitche.webp",

            description:
                "A chartered management-accounting professional with experience in financial leadership, audit, risk management, fraud investigation, controls and corporate performance.",

            education: [
                "Bachelor of Accountancy in Accounting and Finance",
                "Fellow Chartered Management Accountant",
                "Chartered Global Management Accountant",
                "Professional education through CIMA"
            ],

            highlights: [
                "Has executive responsibility for TNM's finance function",
                "Has expertise in audit, controls, risk and fraud investigation",
                "Links financial analysis with strategic executive decisions"
            ],

            aiRelevance:
                "His experience is relevant to AI-assisted forecasting, scenario modelling, revenue assurance, fraud detection, investment appraisal and explainable financial decision support."
        },

        {
            name: "Peter Munthali",
            displayName: "Peter Munthali",
            role: "Chief Information Officer",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/peter-munthali.webp",

            description:
                "An enterprise-technology leader with senior experience in telecommunications and banking, responsible for platforms, systems, data capabilities and digital-transformation programmes.",

            education: [
                "MBA, UCT Graduate School of Business",
                "MSc in Advanced Computer Science, University of East Anglia",
                "Undergraduate degree, University of Malawi",
                "Ongoing executive development in enterprise technology"
            ],

            highlights: [
                "Leads TNM's enterprise IT and digital-transformation agenda",
                "Has technology-leadership experience across telecommunications and banking",
                "Contributes to conversations on ICT innovation and entrepreneurship"
            ],

            aiRelevance:
                "His experience is relevant to enterprise AI readiness, legacy-system integration, data quality, cloud platforms, cybersecurity, automation and production governance."
        },

        {
            name: "Dr Ronald Dadi Mangani",
            displayName: "Dr Ronald Mangani",
            role: "Chief Executive Officer and Executive Director",
            organisation: "Press Corporation Plc",
            image: "assets/images/delegates/ronald-mangani.webp",

            description:
                "An economist, academic and corporate leader whose career combines university scholarship, public financial management, board governance and executive leadership.",

            education: [
                "PhD in Economics, University of Cape Town",
                "MSc in Project Analysis, Finance and Investment, University of York",
                "Bachelor of Social Science in Economics with distinction, University of Malawi",
                "Visiting-scholar exposure at the IMF Institute and University of Oxford"
            ],

            highlights: [
                "Former Secretary to the Treasury of Malawi",
                "Former Associate Professor of Economics",
                "Has extensive board experience across finance, markets and development institutions"
            ],

            aiRelevance:
                "His experience supports strategic discussions on AI investment, capital allocation, productivity, risk, economic transformation and adoption across diversified corporate portfolios."
        },

        {
            name: "Ted Sauti-Phiri",
            displayName: "Ted Sauti-Phiri",
            role: "Board Chairperson",
            organisation: "Telekom Networks Malawi Plc (TNM)",
            image: "assets/images/delegates/ted-sauti-phiri.webp",

            description:
                "A telecommunications, finance and digital-media executive with more than two decades of leadership experience across African markets.",

            education: [
                "MBA, University of Liverpool",
                "BSc Honours in Chemistry and Computer Science, University of Malawi",
                "Fellow of the Association of Chartered Certified Accountants"
            ],

            highlights: [
                "Has executive experience across several African countries",
                "Has held senior roles spanning finance, infrastructure, operations and strategy",
                "Provides board leadership for Malawi's pioneer mobile operator"
            ],

            aiRelevance:
                "His board and executive experience is relevant to AI oversight, investment prioritisation, regional scaling, organisational transformation and enterprise-risk governance."
        },

        {
            name: "Tobias George Jack",
            displayName: "Tobias Jack",
            role: "Chief Operating Officer and Non-Executive Director",
            organisation: "ATM Technologies; TNM Board",
            image: "assets/images/delegates/tobias-jack.webp",

            description:
                "A telecommunications and digital-infrastructure executive with more than 30 years of experience in network expansion, greenfield operations, organisational turnaround and large-scale service delivery.",

            education: [
                "BTech in Electronics and Communication Engineering, IIT BHU",
                "Harvard programme in Cybersecurity: Managing Risk in the Information Age",
                "Ericsson Sweden leadership-development programme",
                "MBA studies in Artificial Intelligence and Blockchain"
            ],

            highlights: [
                "Has held senior leadership assignments across multiple African markets",
                "Has experience in P&L, EBITDA improvement and operational transformation",
                "Is a registered engineer in Tanzania and Zambia"
            ],

            aiRelevance:
                "His experience supports discussions on infrastructure automation, cybersecurity governance, predictive network management, enterprise architecture and scaling technology-intensive businesses."
        }
    ];

    const grid =
        document.getElementById("delegateGrid");

    const searchInput =
        document.getElementById("delegateSearch");

    const emptyState =
        document.getElementById("delegateEmpty");

    if (
        !grid ||
        !searchInput ||
        !emptyState
    ) {
        return;
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function renderList(items) {
        return items
            .map(
                item =>
                    `<li>${escapeHtml(item)}</li>`
            )
            .join("");
    }

    function createDelegateCard(delegate) {
        const searchableText = [
            delegate.name,
            delegate.displayName,
            delegate.role,
            delegate.organisation,
            delegate.description,
            delegate.aiRelevance,
            ...delegate.education,
            ...delegate.highlights
        ]
            .join(" ")
            .toLowerCase();

        const column =
            document.createElement("div");

        column.className =
            "col-md-6 col-xl-4 delegate-item";

        column.dataset.search =
            searchableText;

        column.innerHTML = `
            <article class="delegate-card">
                <img
                    src="${escapeHtml(delegate.image)}"
                    alt="Professional profile photograph of ${escapeHtml(delegate.displayName)}"
                    loading="lazy"
                >

                <div class="delegate-card-body">
                    <h3>
                        ${escapeHtml(delegate.displayName)}
                    </h3>

                    <p class="delegate-role">
                        ${escapeHtml(delegate.role)}
                    </p>

                    <p class="delegate-organisation">
                        ${escapeHtml(delegate.organisation)}
                    </p>

                    <p class="delegate-description">
                        ${escapeHtml(delegate.description)}
                    </p>

                    <details class="delegate-profile-details">
                        <summary>
                            <span>
                                View profile
                            </span>

                            <i
                                class="bi bi-chevron-down"
                                aria-hidden="true"
                            ></i>
                        </summary>

                        <div class="delegate-profile-content">
                            <section>
                                <h4>
                                    Education and Professional Qualifications
                                </h4>

                                <ul>
                                    ${renderList(delegate.education)}
                                </ul>
                            </section>

                            <section>
                                <h4>
                                    Leadership Highlights
                                </h4>

                                <ul>
                                    ${renderList(delegate.highlights)}
                                </ul>
                            </section>

                            <section class="delegate-ai-relevance">
                                <h4>
                                    Relevance to Practical AI
                                </h4>

                                <p>
                                    ${escapeHtml(delegate.aiRelevance)}
                                </p>
                            </section>
                        </div>
                    </details>
                </div>
            </article>
        `;

        return column;
    }

    function renderDelegates(list) {
        grid.replaceChildren();

        list.forEach(delegate => {
            grid.appendChild(
                createDelegateCard(delegate)
            );
        });

        emptyState.hidden =
            list.length !== 0;
    }

    function filterDelegates() {
        const query =
            searchInput.value
                .trim()
                .toLowerCase();

        const filtered =
            delegates.filter(delegate => {
                if (!query) {
                    return true;
                }

                const text = [
                    delegate.name,
                    delegate.displayName,
                    delegate.role,
                    delegate.organisation,
                    delegate.description,
                    delegate.aiRelevance,
                    ...delegate.education,
                    ...delegate.highlights
                ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(query);
            });

        renderDelegates(filtered);
    }

    searchInput.addEventListener(
        "input",
        filterDelegates
    );

    renderDelegates(delegates);
});