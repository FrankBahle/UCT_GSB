document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const delegates = [
        {
                "name": "Amon Sobhuza Jere",
                "displayName": "Amon Jere",
                "role": "Chief Commercial Officer",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/amon-jere.webp",
                "group": "Group 2: Customer Growth, Commercial Intelligence and Market Leadership",
                "challenge": "How can TNM use AI to grow customers, reduce churn, personalise services and strengthen its competitive position?",
                "description": "Amon Jere participates in the Customer Growth, Commercial Intelligence and Market Leadership challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Chisomo Nyemba",
                "displayName": "Chisomo Nyemba",
                "role": "Legal and Regulatory Director and Company Secretary",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/chisomo-nyemba.webp",
                "group": "Group 4: Responsible AI, Governance and Institutional Trust",
                "challenge": "How should TNM govern AI responsibly while protecting customers, employees, data, intellectual property and institutional reputation?",
                "description": "Chisomo Nyemba participates in the Responsible AI, Governance and Institutional Trust challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Christopher Sukasuka",
                "displayName": "Christopher Sukasuka",
                "role": "General Manager, Mpamba",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/christopher-sukasuka.webp",
                "group": "Group 3: Mpamba, Financial Inclusion and Digital Ecosystems",
                "challenge": "How can AI help Mpamba expand financial inclusion, improve agent performance, reduce fraud and create new digital services?",
                "description": "Christopher Sukasuka participates in the Mpamba, Financial Inclusion and Digital Ecosystems challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Dalitso Nkunika",
                "displayName": "Dalitso Nkunika",
                "role": "Human Resources and Administration Director",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/dalitso-nkunika.webp",
                "group": "Group 2: Customer Growth, Commercial Intelligence and Market Leadership",
                "challenge": "How can TNM use AI to grow customers, reduce churn, personalise services and strengthen its competitive position?",
                "description": "Dalitso Nkunika participates in the Customer Growth, Commercial Intelligence and Market Leadership challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Dr Frank Dalitso Chozenga",
                "displayName": "Dr Frank Chozenga",
                "role": "Non-Executive Director and Board Audit Committee Chair",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/dr-frank-chozenga.webp",
                "group": "Group 1: Intelligent Network and Digital Infrastructure",
                "challenge": "How can TNM use AI to improve network reliability, infrastructure investment, service quality and operational efficiency?",
                "description": "Dr Frank Chozenga participates in the Intelligent Network and Digital Infrastructure challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Dr Lyton Chithambo",
                "displayName": "Dr Lyton Chithambo",
                "role": "Chief Operating Officer",
                "organisation": "Press Corporation Plc",
                "image": "assets/images/delegates/dr-lyton-chithambo.webp",
                "group": "Group 4: Responsible AI, Governance and Institutional Trust",
                "challenge": "How should TNM govern AI responsibly while protecting customers, employees, data, intellectual property and institutional reputation?",
                "description": "Dr Lyton Chithambo participates in the Responsible AI, Governance and Institutional Trust challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Gerald Mayamiko Chungu",
                "displayName": "Gerald Chungu",
                "role": "Group IT Executive",
                "organisation": "Old Mutual Malawi",
                "image": "assets/images/delegates/gerald-chungu.webp",
                "group": "Group 3: Mpamba, Financial Inclusion and Digital Ecosystems",
                "challenge": "How can AI help Mpamba expand financial inclusion, improve agent performance, reduce fraud and create new digital services?",
                "description": "Gerald Chungu participates in the Mpamba, Financial Inclusion and Digital Ecosystems challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Khumbo Phiri",
                "displayName": "Khumbo Phiri",
                "role": "Operations Executive",
                "organisation": "Old Mutual Malawi",
                "image": "assets/images/delegates/khumbo-phiri.webp",
                "group": "Group 1: Intelligent Network and Digital Infrastructure",
                "challenge": "How can TNM use AI to improve network reliability, infrastructure investment, service quality and operational efficiency?",
                "description": "Khumbo Phiri participates in the Intelligent Network and Digital Infrastructure challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Lloyd James Gowera",
                "displayName": "Lloyd Gowera",
                "role": "Chief Technical Officer",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/lloyd-gowera.webp",
                "group": "Group 1: Intelligent Network and Digital Infrastructure",
                "challenge": "How can TNM use AI to improve network reliability, infrastructure investment, service quality and operational efficiency?",
                "description": "Lloyd Gowera participates in the Intelligent Network and Digital Infrastructure challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Madalo Mungapoti Nyambose",
                "displayName": "Madalo Nyambose",
                "role": "Principal Secretary",
                "organisation": "Office of the Second Vice-President, Malawi",
                "image": "assets/images/delegates/madalo-nyambose.webp",
                "group": "Group 4: Responsible AI, Governance and Institutional Trust",
                "challenge": "How should TNM govern AI responsibly while protecting customers, employees, data, intellectual property and institutional reputation?",
                "description": "Madalo Nyambose participates in the Responsible AI, Governance and Institutional Trust challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Michel Hebert",
                "displayName": "Michel Hebert",
                "role": "Chief Executive Officer",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/michel-hebert.webp",
                "group": "Group 2: Customer Growth, Commercial Intelligence and Market Leadership",
                "challenge": "How can TNM use AI to grow customers, reduce churn, personalise services and strengthen its competitive position?",
                "description": "Michel Hebert participates in the Customer Growth, Commercial Intelligence and Market Leadership challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Peter Kadzitche",
                "displayName": "Peter Kadzitche",
                "role": "Chief Finance Officer",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/peter-kadzitche.webp",
                "group": "Group 3: Mpamba, Financial Inclusion and Digital Ecosystems",
                "challenge": "How can AI help Mpamba expand financial inclusion, improve agent performance, reduce fraud and create new digital services?",
                "description": "Peter Kadzitche participates in the Mpamba, Financial Inclusion and Digital Ecosystems challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Peter Munthali",
                "displayName": "Peter Munthali",
                "role": "Chief Information Officer",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/peter-munthali.webp",
                "group": "Group 1: Intelligent Network and Digital Infrastructure",
                "challenge": "How can TNM use AI to improve network reliability, infrastructure investment, service quality and operational efficiency?",
                "description": "Peter Munthali participates in the Intelligent Network and Digital Infrastructure challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Dr Ronald Dadi Mangani",
                "displayName": "Dr Ronald Mangani",
                "role": "Chief Executive Officer",
                "organisation": "Press Corporation Plc",
                "image": "assets/images/delegates/ronald-mangani.webp",
                "group": "Group 3: Mpamba, Financial Inclusion and Digital Ecosystems",
                "challenge": "How can AI help Mpamba expand financial inclusion, improve agent performance, reduce fraud and create new digital services?",
                "description": "Dr Ronald Mangani participates in the Mpamba, Financial Inclusion and Digital Ecosystems challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Ted Sauti-Phiri",
                "displayName": "Ted Sauti-Phiri",
                "role": "Board Chairperson",
                "organisation": "Telekom Networks Malawi (TNM)",
                "image": "assets/images/delegates/ted-sauti-phiri.webp",
                "group": "Group 4: Responsible AI, Governance and Institutional Trust",
                "challenge": "How should TNM govern AI responsibly while protecting customers, employees, data, intellectual property and institutional reputation?",
                "description": "Ted Sauti-Phiri participates in the Responsible AI, Governance and Institutional Trust challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        },
        {
                "name": "Tobias George Jack",
                "displayName": "Tobias Jack",
                "role": "Chief Operating Officer, ATM Technologies; TNM Non-Executive Director",
                "organisation": "ATM Technologies / TNM Board",
                "image": "assets/images/delegates/tobias-jack.webp",
                "group": "Group 2: Customer Growth, Commercial Intelligence and Market Leadership",
                "challenge": "How can TNM use AI to grow customers, reduce churn, personalise services and strengthen its competitive position?",
                "description": "Tobias Jack participates in the Customer Growth, Commercial Intelligence and Market Leadership challenge stream.",
                "relevance": "This role contributes an executive perspective to the group’s TNM-focused challenge and the development of practical, responsible and pilot-ready AI concepts."
        }
];

    const grid = document.getElementById("delegateGrid");
    const searchInput = document.getElementById("delegateSearch");
    const emptyState = document.getElementById("delegateEmpty");

    if (!grid || !searchInput || !emptyState) return;

    const escapeHtml = value => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    function createDelegateCard(delegate) {
        const searchableText = [delegate.name, delegate.displayName, delegate.role, delegate.organisation, delegate.group, delegate.challenge].join(" ").toLowerCase();
        const column = document.createElement("div");
        column.className = "col-md-6 col-xl-4 delegate-item";
        column.dataset.search = searchableText;
        column.innerHTML = `
            <article class="delegate-card">
                <img src="${escapeHtml(delegate.image)}" alt="Professional profile photograph of ${escapeHtml(delegate.displayName)}" loading="lazy">
                <div class="delegate-card-body">
                    <h3>${escapeHtml(delegate.displayName)}</h3>
                    <p class="delegate-role">${escapeHtml(delegate.role)}</p>
                    <p class="delegate-organisation">${escapeHtml(delegate.organisation)}</p>
                    <p class="delegate-description">${escapeHtml(delegate.description)}</p>
                    <details class="delegate-profile-details">
                        <summary><span>View programme group</span><i class="bi bi-chevron-down" aria-hidden="true"></i></summary>
                        <div class="delegate-profile-content">
                            <section><h4>Challenge Group</h4><p>${escapeHtml(delegate.group)}</p></section>
                            <section><h4>Group Challenge</h4><p>${escapeHtml(delegate.challenge)}</p></section>
                            <section class="delegate-ai-relevance"><h4>Programme Relevance</h4><p>${escapeHtml(delegate.relevance)}</p></section>
                        </div>
                    </details>
                </div>
            </article>`;
        return column;
    }

    function renderDelegates(list) {
        grid.replaceChildren();
        list.forEach(delegate => grid.appendChild(createDelegateCard(delegate)));
        emptyState.hidden = list.length !== 0;
    }

    function filterDelegates() {
        const query = searchInput.value.trim().toLowerCase();
        const filtered = delegates.filter(delegate => !query || [delegate.name, delegate.displayName, delegate.role, delegate.organisation, delegate.group, delegate.challenge].join(" ").toLowerCase().includes(query));
        renderDelegates(filtered);
    }

    searchInput.addEventListener("input", filterDelegates);
    renderDelegates(delegates);
});
