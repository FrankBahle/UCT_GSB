document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const API_URL = "/api/simulation/evaluate";

    const STORAGE_KEY =
        "uctGsbExecutiveSimulationProgressV2";

    const REQUEST_TIMEOUT_MS = 40000;

    const scenarios = [
        {
            id: "readiness",
            level: "Foundation",
            duration: "5–10 minutes",

            title:
                "Strategic Alignment and AI Readiness",

            summary:
                "Your organisation is under pressure to announce an AI initiative. Several departments have proposed ideas, but there is no shared business priority, data-readiness view or agreement about success.",

            role:
                "You are part of the executive steering committee responsible for determining how the organisation should begin its AI journey.",

            objective:
                "Establish a credible foundation for selecting a responsible, measurable and strategically relevant AI opportunity.",

            constraints: [
                "Leadership expects visible progress within six months.",
                "Data is fragmented across several departments.",
                "Employees are concerned about job impact and accountability.",
                "The organisation has limited AI implementation experience."
            ],

            decisions: [
                {
                    id: "priority",

                    title:
                        "What should leadership do first?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Purchase a widely promoted AI platform and identify possible uses afterwards."
                        },

                        {
                            id: "B",

                            text:
                                "Define a priority business problem, affected users, baseline performance and measurable outcomes."
                        },

                        {
                            id: "C",

                            text:
                                "Ask the technology team to automate as many existing processes as possible."
                        },

                        {
                            id: "D",

                            text:
                                "Wait until competitors disclose their complete AI strategies."
                        }
                    ]
                },

                {
                    id: "data",

                    title:
                        "How should the organisation address fragmented data?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Combine all available data immediately without reviewing access rights or ownership."
                        },

                        {
                            id: "B",

                            text:
                                "Complete a focused assessment of data quality, relevance, ownership, privacy and access."
                        },

                        {
                            id: "C",

                            text:
                                "Proceed with historical data even when its quality and context are uncertain."
                        },

                        {
                            id: "D",

                            text:
                                "Treat data readiness as the vendor's responsibility."
                        }
                    ]
                },

                {
                    id: "leadership",

                    title:
                        "What leadership structure should guide the initiative?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Allow the technology vendor to own all business and governance decisions."
                        },

                        {
                            id: "B",

                            text:
                                "Assign the initiative only to the IT department."
                        },

                        {
                            id: "C",

                            text:
                                "Create accountable executive sponsorship supported by business, data, technology, risk, legal and affected employees."
                        },

                        {
                            id: "D",

                            text:
                                "Avoid formal ownership until a working prototype is available."
                        }
                    ]
                }
            ]
        },

        {
            id: "pilot",
            level: "Applied",
            duration: "5–10 minutes",

            title:
                "Pilot Design and Business Value",

            summary:
                "The organisation has selected customer-service response times as a priority. A vendor proposes an AI system that could draft responses and recommend actions, but leaders disagree about scope, autonomy and how value should be measured.",

            role:
                "You are the executive sponsor responsible for turning the opportunity into a controlled and evidence-based pilot.",

            objective:
                "Design a realistic pilot that creates measurable value while maintaining human accountability and organisational learning.",

            constraints: [
                "The pilot must demonstrate useful evidence within twelve weeks.",
                "Frontline staff currently use inconsistent processes.",
                "Some customer interactions contain sensitive information.",
                "The organisation cannot disrupt essential service delivery."
            ],

            decisions: [
                {
                    id: "design",

                    title:
                        "Which pilot design is most appropriate?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Replace the complete customer-service operation with an autonomous AI system."
                        },

                        {
                            id: "B",

                            text:
                                "Test a bounded human-in-the-loop co-pilot in one defined workflow with clear escalation rules."
                        },

                        {
                            id: "C",

                            text:
                                "Build a visually impressive demonstration that is not connected to a real workflow."
                        },

                        {
                            id: "D",

                            text:
                                "Allow the AI system to make final high-impact customer decisions from the first day."
                        }
                    ]
                },

                {
                    id: "value",

                    title:
                        "How should the pilot's value be evaluated?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Count the number of AI features included in the solution."
                        },

                        {
                            id: "B",

                            text:
                                "Compare service time, quality, user adoption, cost, customer outcomes and monitored risk against a baseline."
                        },

                        {
                            id: "C",

                            text:
                                "Measure success mainly through positive media coverage."
                        },

                        {
                            id: "D",

                            text:
                                "Measure speed only, regardless of quality or customer impact."
                        }
                    ]
                },

                {
                    id: "workforce",

                    title:
                        "How should employees be involved?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Keep the pilot confidential from employees until the launch."
                        },

                        {
                            id: "B",

                            text:
                                "Involve frontline users in design, testing, training, role-impact discussions and escalation planning."
                        },

                        {
                            id: "C",

                            text:
                                "Use the pilot primarily to identify roles that can be removed immediately."
                        },

                        {
                            id: "D",

                            text:
                                "Allow the vendor to manage all workforce communication."
                        }
                    ]
                }
            ]
        },

        {
            id: "scale",
            level: "Strategic",
            duration: "5–10 minutes",

            title:
                "Governance, Scaling and Organisational Change",

            summary:
                "The pilot has improved response times and staff adoption is encouraging. However, performance varies between customer groups, managers want a rapid organisation-wide rollout and governance responsibilities remain unclear.",

            role:
                "You are advising the executive committee on whether and how the solution should move from pilot to scaled implementation.",

            objective:
                "Create a controlled scaling decision that protects value, accountability, fairness and long-term organisational capability.",

            constraints: [
                "The board expects a recommendation within four weeks.",
                "Performance evidence is positive but not yet consistent.",
                "Different business units have different levels of readiness.",
                "The organisation must maintain regulatory and public trust."
            ],

            decisions: [
                {
                    id: "scaling",

                    title:
                        "How should the organisation approach scaling?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Roll the solution out organisation-wide immediately because the initial demonstration succeeded."
                        },

                        {
                            id: "B",

                            text:
                                "Scale in controlled stages after validating evidence, readiness, controls, resources and local operating conditions."
                        },

                        {
                            id: "C",

                            text:
                                "Stop all further development because the results are not perfectly consistent."
                        },

                        {
                            id: "D",

                            text:
                                "Allow each department to copy the pilot independently without shared standards."
                        }
                    ]
                },

                {
                    id: "governance",

                    title:
                        "What governance model is required?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Use the vendor's standard policy as the organisation's complete governance framework."
                        },

                        {
                            id: "B",

                            text:
                                "Establish accountable executive oversight, decision rights, risk thresholds, auditability and an incident-response process."
                        },

                        {
                            id: "C",

                            text:
                                "Assign governance to a junior developer who maintains the technical system."
                        },

                        {
                            id: "D",

                            text:
                                "Remove formal governance once the solution moves beyond the pilot."
                        }
                    ]
                },

                {
                    id: "monitoring",

                    title:
                        "What monitoring should continue after deployment?",

                    options: [
                        {
                            id: "A",

                            text:
                                "Complete one final approval review and then stop monitoring."
                        },

                        {
                            id: "B",

                            text:
                                "Continuously monitor performance, benefits, fairness, privacy, security, drift, adoption and agreed stop criteria."
                        },

                        {
                            id: "C",

                            text:
                                "Investigate the system only after a serious customer complaint."
                        },

                        {
                            id: "D",

                            text:
                                "Monitor only whether the project remains within its annual budget."
                        }
                    ]
                }
            ]
        }
    ];

    const dimensionLabels = {
        strategicAlignment:
            "Strategic alignment",

        valueFeasibility:
            "Value and feasibility",

        responsibleAI:
            "Responsible AI",

        stakeholderLeadership:
            "Stakeholder leadership",

        implementationReadiness:
            "Implementation readiness"
    };

    const elements = {
        apiStatusDot:
            document.getElementById("apiStatusDot"),

        apiStatusText:
            document.getElementById("apiStatusText"),

        progressText:
            document.getElementById("progressText"),

        progressPercentage:
            document.getElementById("progressPercentage"),

        progressBar:
            document.getElementById(
                "simulationProgressBar"
            ),

        navigation:
            document.getElementById(
                "scenarioNavigation"
            ),

        scenarioPanel:
            document.getElementById(
                "scenarioPanel"
            ),

        scenarioLevel:
            document.getElementById(
                "scenarioLevel"
            ),

        scenarioDuration:
            document.getElementById(
                "scenarioDuration"
            ),

        scenarioTitle:
            document.getElementById(
                "scenarioTitle"
            ),

        scenarioSummary:
            document.getElementById(
                "scenarioSummary"
            ),

        scenarioRole:
            document.getElementById(
                "scenarioRole"
            ),

        scenarioObjective:
            document.getElementById(
                "scenarioObjective"
            ),

        scenarioConstraints:
            document.getElementById(
                "scenarioConstraints"
            ),

        form:
            document.getElementById(
                "simulationForm"
            ),

        decisionGroups:
            document.getElementById(
                "decisionGroups"
            ),

        status:
            document.getElementById(
                "simulationStatus"
            ),

        submitButton:
            document.getElementById(
                "submitSimulation"
            ),

        submitLabel:
            document.querySelector(
                ".simulation-submit-label"
            ),

        submitLoading:
            document.querySelector(
                ".simulation-submit-loading"
            ),

        resetButton:
            document.getElementById(
                "resetSimulation"
            ),

        result:
            document.getElementById(
                "simulationResult"
            ),

        scoreRing:
            document.getElementById(
                "scoreRing"
            ),

        overallScore:
            document.getElementById(
                "overallScore"
            ),

        performanceBand:
            document.getElementById(
                "performanceBand"
            ),

        executiveSummary:
            document.getElementById(
                "executiveSummary"
            ),

        attemptSummary:
            document.getElementById(
                "attemptSummary"
            ),

        dimensionScores:
            document.getElementById(
                "dimensionScores"
            ),

        strengthsList:
            document.getElementById(
                "strengthsList"
            ),

        improvementsList:
            document.getElementById(
                "improvementsList"
            ),

        likelyConsequence:
            document.getElementById(
                "likelyConsequence"
            ),

        recommendedAction:
            document.getElementById(
                "recommendedAction"
            ),

        followUpQuestion:
            document.getElementById(
                "followUpQuestion"
            ),

        retryButton:
            document.getElementById(
                "retryScenario"
            ),

        nextButton:
            document.getElementById(
                "nextScenario"
            ),

        printButton:
            document.getElementById(
                "printResult"
            ),

        history:
            document.getElementById(
                "simulationHistory"
            ),

        clearProgressButton:
            document.getElementById(
                "clearProgress"
            )
    };

    let currentScenarioIndex = 0;

    let progress =
        loadProgress();

    function loadProgress() {
        try {
            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {
                return {};
            }

            const parsed =
                JSON.parse(saved);

            return (
                parsed &&
                typeof parsed === "object" &&
                !Array.isArray(parsed)
            )
                ? parsed
                : {};
        } catch (error) {
            console.warn(
                "Could not load simulation progress.",
                error
            );

            return {};
        }
    }

    function saveProgress() {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(progress)
            );
        } catch (error) {
            console.warn(
                "Could not save simulation progress.",
                error
            );
        }
    }

    function setStatus(
        message,
        type = ""
    ) {
        elements.status.textContent =
            message || "";

        elements.status.className =
            "simulation-message";

        if (type) {
            elements.status.classList.add(
                `simulation-message-${type}`
            );
        }
    }

    function setApiStatus(
        status,
        message
    ) {
        elements.apiStatusDot.className =
            `simulation-status-dot ${status}`;

        elements.apiStatusText.textContent =
            message;
    }

    function setSubmitting(
        isSubmitting
    ) {
        elements.submitButton.disabled =
            isSubmitting;

        elements.resetButton.disabled =
            isSubmitting;

        elements.submitLabel.hidden =
            isSubmitting;

        elements.submitLoading.hidden =
            !isSubmitting;
    }

    function createElement(
        tagName,
        className = "",
        text = ""
    ) {
        const element =
            document.createElement(
                tagName
            );

        if (className) {
            element.className =
                className;
        }

        if (text) {
            element.textContent =
                text;
        }

        return element;
    }

    function getCurrentScenario() {
        return scenarios[
            currentScenarioIndex
        ];
    }

    function renderScenarioNavigation() {
        elements.navigation
            .replaceChildren();

        scenarios.forEach(
            (
                scenario,
                index
            ) => {
                const button =
                    createElement(
                        "button",
                        "simulation-level-button"
                    );

                button.type =
                    "button";

                if (
                    index ===
                    currentScenarioIndex
                ) {
                    button.classList.add(
                        "active"
                    );

                    button.setAttribute(
                        "aria-current",
                        "step"
                    );
                }

                if (
                    progress[
                        scenario.id
                    ]?.best
                ) {
                    button.classList.add(
                        "completed"
                    );
                }

                const number =
                    createElement(
                        "span",
                        "simulation-level-number",
                        String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )
                    );

                const copy =
                    createElement(
                        "span",
                        "simulation-level-copy"
                    );

                const level =
                    createElement(
                        "small",
                        "",
                        scenario.level
                    );

                const title =
                    createElement(
                        "strong",
                        "",
                        scenario.title
                    );

                copy.append(
                    level,
                    title
                );

                button.append(
                    number,
                    copy
                );

                button.addEventListener(
                    "click",
                    () => {
                        currentScenarioIndex =
                            index;

                        renderCurrentScenario();

                        elements
                            .scenarioPanel
                            .scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });
                    }
                );

                elements.navigation
                    .appendChild(
                        button
                    );
            }
        );
    }

    function renderConstraints(
        scenario
    ) {
        elements
            .scenarioConstraints
            .replaceChildren();

        scenario.constraints.forEach(
            constraint => {
                const item =
                    createElement(
                        "li",
                        "",
                        constraint
                    );

                elements
                    .scenarioConstraints
                    .appendChild(
                        item
                    );
            }
        );
    }

    function renderDecisionGroups(
        scenario
    ) {
        elements
            .decisionGroups
            .replaceChildren();

        scenario.decisions.forEach(
            (
                decision,
                decisionIndex
            ) => {
                const section =
                    createElement(
                        "fieldset",
                        "simulation-question-card"
                    );

                const header =
                    createElement(
                        "div",
                        "simulation-question-header"
                    );

                const number =
                    createElement(
                        "span",
                        "simulation-question-number",
                        String(
                            decisionIndex + 1
                        ).padStart(
                            2,
                            "0"
                        )
                    );

                const headingCopy =
                    createElement(
                        "div"
                    );

                const label =
                    createElement(
                        "span",
                        "simulation-small-label",
                        "Executive decision"
                    );

                const legend =
                    createElement(
                        "legend",
                        "",
                        decision.title
                    );

                headingCopy.append(
                    label,
                    legend
                );

                header.append(
                    number,
                    headingCopy
                );

                section.appendChild(
                    header
                );

                const options =
                    createElement(
                        "div",
                        "simulation-options"
                    );

                decision.options.forEach(
                    option => {
                        const optionId =
                            `${scenario.id}-${decision.id}-${option.id}`;

                        const wrapper =
                            createElement(
                                "div",
                                "simulation-option-wrapper"
                            );

                        const input =
                            document.createElement(
                                "input"
                            );

                        input.type =
                            "radio";

                        input.name =
                            `decision-${decision.id}`;

                        input.id =
                            optionId;

                        input.value =
                            option.id;

                        input.required =
                            true;

                        const optionLabel =
                            createElement(
                                "label",
                                "simulation-option",
                                option.text
                            );

                        optionLabel.setAttribute(
                            "for",
                            optionId
                        );

                        const optionLetter =
                            createElement(
                                "span",
                                "simulation-option-letter",
                                option.id
                            );

                        optionLabel.prepend(
                            optionLetter
                        );

                        input.addEventListener(
                            "change",
                            () => {
                                const error =
                                    document.getElementById(
                                        `error-${decision.id}`
                                    );

                                if (error) {
                                    error.textContent =
                                        "";
                                }
                            }
                        );

                        wrapper.append(
                            input,
                            optionLabel
                        );

                        options.appendChild(
                            wrapper
                        );
                    }
                );

                const error =
                    createElement(
                        "div",
                        "simulation-field-error"
                    );

                error.id =
                    `error-${decision.id}`;

                error.setAttribute(
                    "role",
                    "alert"
                );

                section.append(
                    options,
                    error
                );

                elements
                    .decisionGroups
                    .appendChild(
                        section
                    );
            }
        );
    }

    function renderCurrentScenario() {
        const scenario =
            getCurrentScenario();

        elements.scenarioLevel.textContent =
            scenario.level;

        elements.scenarioDuration.textContent =
            scenario.duration;

        elements.scenarioTitle.textContent =
            scenario.title;

        elements.scenarioSummary.textContent =
            scenario.summary;

        elements.scenarioRole.textContent =
            scenario.role;

        elements.scenarioObjective.textContent =
            scenario.objective;

        elements.nextButton.textContent =
            currentScenarioIndex ===
            scenarios.length - 1
                ? "Return to First Scenario"
                : "Continue to Next Scenario";

        renderConstraints(
            scenario
        );

        renderDecisionGroups(
            scenario
        );

        renderScenarioNavigation();

        elements.form.reset();

        setStatus("");

        hideResult();

        renderProgress();

        renderHistory();
    }

    function clearValidationErrors() {
        document
            .querySelectorAll(
                ".simulation-field-error"
            )
            .forEach(
                element => {
                    element.textContent =
                        "";
                }
            );
    }

    function collectResponses(
        scenario
    ) {
        const responses = {};

        let valid = true;

        scenario.decisions.forEach(
            decision => {
                const selected =
                    elements.form
                        .querySelector(
                            `input[name="decision-${decision.id}"]:checked`
                        );

                const error =
                    document.getElementById(
                        `error-${decision.id}`
                    );

                if (!selected) {
                    valid = false;

                    if (error) {
                        error.textContent =
                            "Please select one answer before submitting.";
                    }
                } else {
                    responses[
                        decision.id
                    ] =
                        selected.value;
                }
            }
        );

        return {
            valid,
            responses
        };
    }

    async function submitForEvaluation(
        event
    ) {
        event.preventDefault();

        clearValidationErrors();

        setStatus("");

        const scenario =
            getCurrentScenario();

        const submission =
            collectResponses(
                scenario
            );

        if (!submission.valid) {
            setStatus(
                "Please answer every multiple-choice question before submitting.",
                "error"
            );

            const firstError =
                elements.form
                    .querySelector(
                        ".simulation-field-error:not(:empty)"
                    );

            firstError?.scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "center"
            });

            return;
        }

        setSubmitting(true);

        setStatus(
            "DeepSeek is evaluating your selected multiple-choice decisions. This may take a few seconds.",
            "loading"
        );

        const controller =
            new AbortController();

        const timeout =
            window.setTimeout(
                () =>
                    controller.abort(),

                REQUEST_TIMEOUT_MS
            );

        try {
            const response =
                await fetch(
                    API_URL,
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                scenarioId:
                                    scenario.id,

                                responses:
                                    submission.responses
                            }),

                        signal:
                            controller.signal
                    }
                );

            const responseData =
                await response
                    .json()
                    .catch(
                        () => null
                    );

            if (!response.ok) {
                throw new Error(
                    responseData?.error ||
                    "The AI scoring service could not evaluate the answers."
                );
            }

            if (
                !responseData ||
                typeof responseData
                    .overallScore !==
                    "number" ||
                !responseData.dimensions
            ) {
                throw new Error(
                    "The AI scoring service returned an invalid response."
                );
            }

            const savedAttempt =
                saveAttempt(
                    scenario,
                    responseData
                );

            renderResult(
                responseData,
                savedAttempt
            );

            setStatus(
                "Your AI evaluation has been completed.",
                "success"
            );

            renderProgress();

            renderScenarioNavigation();

            renderHistory();

            elements.result
                .scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start"
                });
        } catch (error) {
            console.error(
                "Simulation evaluation failed:",
                error
            );

            const message =
                error?.name ===
                "AbortError"
                    ? "The AI evaluation took too long. Please check your connection and try again."
                    : error?.message ||
                      "The AI evaluation is temporarily unavailable.";

            setStatus(
                message,
                "error"
            );
        } finally {
            window.clearTimeout(
                timeout
            );

            setSubmitting(false);
        }
    }

    function saveAttempt(
        scenario,
        evaluation
    ) {
        const previous =
            progress[
                scenario.id
            ] || {
                attempts: 0,
                best: null,
                latest: null
            };

        const attempt = {
            score:
                evaluation.overallScore,

            band:
                evaluation.performanceBand,

            timestamp:
                new Date().toISOString(),

            evaluation
        };

        previous.attempts =
            Number(
                previous.attempts ||
                0
            ) + 1;

        previous.latest =
            attempt;

        if (
            !previous.best ||
            attempt.score >
            previous.best.score
        ) {
            previous.best =
                attempt;
        }

        progress[
            scenario.id
        ] =
            previous;

        saveProgress();

        return {
            attempts:
                previous.attempts,

            bestScore:
                previous.best.score,

            isBest:
                previous.best
                    .timestamp ===
                attempt.timestamp
        };
    }

    function renderResult(
        result,
        attempt
    ) {
        elements.result.hidden =
            false;

        elements.overallScore.textContent =
            String(
                result.overallScore
            );

        elements.scoreRing
            .style
            .setProperty(
                "--simulation-score",
                String(
                    result.overallScore
                )
            );

        elements.performanceBand.textContent =
            result.performanceBand ||
            "Completed";

        elements.executiveSummary.textContent =
            result.executiveSummary ||
            "";

        elements.attemptSummary.textContent =
            `Attempt ${attempt.attempts}. Best score: ${attempt.bestScore}/100${
                attempt.isBest
                    ? " — new personal best."
                    : "."
            }`;

        renderDimensionScores(
            result.dimensions
        );

        renderList(
            elements.strengthsList,
            result.strengths
        );

        renderList(
            elements.improvementsList,
            result.improvements
        );

        elements.likelyConsequence.textContent =
            result.likelyConsequence ||
            "";

        elements.recommendedAction.textContent =
            result.recommendedAction ||
            "";

        elements.followUpQuestion.textContent =
            result.followUpQuestion ||
            "";
    }

    function renderDimensionScores(
        dimensions
    ) {
        elements.dimensionScores
            .replaceChildren();

        Object.entries(
            dimensionLabels
        ).forEach(
            (
                [
                    key,
                    label
                ]
            ) => {
                const score =
                    Math.max(
                        0,

                        Math.min(
                            20,

                            Number(
                                dimensions[
                                    key
                                ]
                            ) || 0
                        )
                    );

                const card =
                    createElement(
                        "article",
                        "simulation-dimension-card"
                    );

                const header =
                    createElement(
                        "div",
                        "simulation-dimension-header"
                    );

                const title =
                    createElement(
                        "strong",
                        "",
                        label
                    );

                const value =
                    createElement(
                        "span",
                        "",
                        `${score}/20`
                    );

                header.append(
                    title,
                    value
                );

                const track =
                    createElement(
                        "div",
                        "simulation-dimension-track"
                    );

                const fill =
                    createElement(
                        "span",
                        "simulation-dimension-fill"
                    );

                fill.style.width =
                    `${score * 5}%`;

                track.appendChild(
                    fill
                );

                card.append(
                    header,
                    track
                );

                elements
                    .dimensionScores
                    .appendChild(
                        card
                    );
            }
        );
    }

    function renderList(
        container,
        values
    ) {
        container
            .replaceChildren();

        const items =
            Array.isArray(
                values
            )
                ? values
                : [];

        items.forEach(
            value => {
                container.appendChild(
                    createElement(
                        "li",
                        "",
                        String(value)
                    )
                );
            }
        );
    }

    function hideResult() {
        elements.result.hidden =
            true;
    }

    function resetCurrentScenario() {
        elements.form.reset();

        clearValidationErrors();

        setStatus("");

        hideResult();

        elements.scenarioPanel
            .scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "start"
            });
    }

    function goToNextScenario() {
        currentScenarioIndex =
            (
                currentScenarioIndex +
                1
            ) %
            scenarios.length;

        renderCurrentScenario();

        elements.scenarioPanel
            .scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "start"
            });
    }

    function renderProgress() {
        const completed =
            scenarios.filter(
                scenario =>
                    Boolean(
                        progress[
                            scenario.id
                        ]?.best
                    )
            ).length;

        const percentage =
            Math.round(
                (
                    completed /
                    scenarios.length
                ) *
                100
            );

        elements.progressText.textContent =
            `${completed} of ${scenarios.length} scenarios completed`;

        elements.progressPercentage.textContent =
            `${percentage}%`;

        elements.progressBar.style.width =
            `${percentage}%`;
    }

    function formatDate(
        isoDate
    ) {
        if (!isoDate) {
            return "";
        }

        const date =
            new Date(
                isoDate
            );

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "";
        }

        return new Intl.DateTimeFormat(
            undefined,
            {
                dateStyle:
                    "medium",

                timeStyle:
                    "short"
            }
        ).format(
            date
        );
    }

    function renderHistory() {
        elements.history
            .replaceChildren();

        scenarios.forEach(
            scenario => {
                const record =
                    progress[
                        scenario.id
                    ];

                const column =
                    createElement(
                        "div",
                        "col-md-6 col-xl-4"
                    );

                const card =
                    createElement(
                        "article",
                        "simulation-history-card"
                    );

                const level =
                    createElement(
                        "span",
                        "simulation-level-badge",
                        scenario.level
                    );

                const title =
                    createElement(
                        "h3",
                        "",
                        scenario.title
                    );

                card.append(
                    level,
                    title
                );

                if (record?.best) {
                    card.classList.add(
                        "completed"
                    );

                    const score =
                        createElement(
                            "strong",
                            "simulation-history-score",
                            `${record.best.score}/100`
                        );

                    const band =
                        createElement(
                            "p",
                            "",
                            record.best.band ||
                            "Completed"
                        );

                    const meta =
                        createElement(
                            "small",
                            "",
                            `${record.attempts} attempt${
                                record.attempts === 1
                                    ? ""
                                    : "s"
                            } · Last completed ${formatDate(
                                record.latest
                                    ?.timestamp
                            )}`
                        );

                    card.append(
                        score,
                        band,
                        meta
                    );
                } else {
                    const status =
                        createElement(
                            "p",
                            "simulation-history-pending",
                            "Not completed yet"
                        );

                    card.appendChild(
                        status
                    );
                }

                const button =
                    createElement(
                        "button",
                        "btn btn-sm btn-outline-secondary",
                        record?.best
                            ? "Open Scenario"
                            : "Begin Scenario"
                    );

                button.type =
                    "button";

                button.addEventListener(
                    "click",
                    () => {
                        currentScenarioIndex =
                            scenarios.findIndex(
                                item =>
                                    item.id ===
                                    scenario.id
                            );

                        renderCurrentScenario();

                        elements
                            .scenarioPanel
                            .scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });
                    }
                );

                card.appendChild(
                    button
                );

                column.appendChild(
                    card
                );

                elements.history
                    .appendChild(
                        column
                    );
            }
        );
    }

    async function checkApiStatus() {
        const controller =
            new AbortController();

        const timeout =
            window.setTimeout(
                () =>
                    controller.abort(),

                8000
            );

        try {
            const response =
                await fetch(
                    API_URL,
                    {
                        method:
                            "GET",

                        headers: {
                            Accept:
                                "application/json"
                        },

                        signal:
                            controller.signal
                    }
                );

            const data =
                await response
                    .json()
                    .catch(
                        () => null
                    );

            if (
                response.ok &&
                data?.configured
            ) {
                setApiStatus(
                    "online",

                    `AI scoring service is ready${
                        data.model
                            ? ` · Model: ${data.model}`
                            : ""
                    }.`
                );
            } else if (
                response.ok &&
                data?.configured ===
                false
            ) {
                setApiStatus(
                    "offline",

                    "AI scoring is deployed, but DEEPSEEK_API_KEY has not been configured in Netlify."
                );
            } else {
                setApiStatus(
                    "offline",

                    "The AI scoring service is currently unavailable."
                );
            }
        } catch (error) {
            setApiStatus(
                "warning",

                "AI scoring is available when the site is run through Netlify or Netlify Dev."
            );
        } finally {
            window.clearTimeout(
                timeout
            );
        }
    }

    function clearAllProgress() {
        const confirmed =
            window.confirm(
                "Clear all saved simulation attempts and best scores from this browser?"
            );

        if (!confirmed) {
            return;
        }

        progress = {};

        localStorage.removeItem(
            STORAGE_KEY
        );

        renderCurrentScenario();

        setStatus(
            "Saved simulation progress has been cleared.",
            "success"
        );
    }

    elements.form.addEventListener(
        "submit",
        submitForEvaluation
    );

    elements.resetButton
        .addEventListener(
            "click",
            resetCurrentScenario
        );

    elements.retryButton
        .addEventListener(
            "click",
            resetCurrentScenario
        );

    elements.nextButton
        .addEventListener(
            "click",
            goToNextScenario
        );

    elements.printButton
        .addEventListener(
            "click",
            () =>
                window.print()
        );

    elements.clearProgressButton
        .addEventListener(
            "click",
            clearAllProgress
        );

    renderCurrentScenario();

    checkApiStatus();
});