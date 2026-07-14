const DEEPSEEK_API_URL =
    process.env.DEEPSEEK_API_URL ||
    "https://api.deepseek.com/chat/completions";

const DEFAULT_MODEL =
    "deepseek-chat";

const REQUEST_TIMEOUT_MS =
    35000;

const MAX_REQUEST_BODY_SIZE =
    12000;

const DIMENSION_KEYS = [
    "strategicAlignment",
    "valueFeasibility",
    "responsibleAI",
    "stakeholderLeadership",
    "implementationReadiness"
];

const SCENARIOS = {
    readiness: {
        title:
            "Intelligent Network and AI Readiness",

        context:
            "TNM is considering an AI initiative to improve network reliability and service quality, but leaders do not yet share a priority use case, consolidated data-readiness view or agreed measures of success.",

        decisions: {
            priority: {
                A:
                    "Purchase a widely promoted AI platform and identify possible uses afterwards.",

                B:
                    "Define a priority business problem, affected users, baseline performance and measurable outcomes.",

                C:
                    "Ask the technology team to automate as many existing processes as possible.",

                D:
                    "Wait until competitors disclose their complete AI strategies."
            },

            data: {
                A:
                    "Combine all available data immediately without reviewing access rights or ownership.",

                B:
                    "Complete a focused assessment of data quality, relevance, ownership, privacy and access.",

                C:
                    "Proceed with historical data even when its quality and context are uncertain.",

                D:
                    "Treat data readiness as the vendor's responsibility."
            },

            leadership: {
                A:
                    "Allow the technology vendor to own all business and governance decisions.",

                B:
                    "Assign the initiative only to the IT department.",

                C:
                    "Create accountable executive sponsorship supported by business, data, technology, risk, legal and affected employees.",

                D:
                    "Avoid formal ownership until a working prototype is available."
            }
        }
    },

    pilot: {
        title:
            "Mpamba Pilot Design and Financial Inclusion",

        context:
            "TNM has selected Mpamba fraud reduction and agent liquidity support as a priority. A vendor proposes an AI system, but leaders disagree about pilot scope, autonomy, inclusion, human oversight and success measures.",

        decisions: {
            design: {
                A:
                    "Replace the complete customer-service operation with an autonomous AI system.",

                B:
                    "Test a bounded human-in-the-loop co-pilot in one defined workflow with clear escalation rules.",

                C:
                    "Build a visually impressive demonstration that is not connected to a real workflow.",

                D:
                    "Allow the AI system to make final high-impact customer decisions from the first day."
            },

            value: {
                A:
                    "Count the number of AI features included in the solution.",

                B:
                    "Compare service time, quality, user adoption, cost, customer outcomes and monitored risk against a baseline.",

                C:
                    "Measure success mainly through positive media coverage.",

                D:
                    "Measure speed only, regardless of quality or customer impact."
            },

            workforce: {
                A:
                    "Keep the pilot confidential from employees until the launch.",

                B:
                    "Involve frontline users in design, testing, training, role-impact discussions and escalation planning.",

                C:
                    "Use the pilot primarily to identify roles that can be removed immediately.",

                D:
                    "Allow the vendor to manage all workforce communication."
            }
        }
    },

    scale: {
        title:
            "Responsible AI, Governance and Future Readiness",

        context:
            "A TNM AI prototype shows promise, but performance varies across customer groups and regions. Leaders want rapid scaling while governance, data ownership, vendor accountability and human-review responsibilities remain unclear.",

        decisions: {
            scaling: {
                A:
                    "Roll the solution out organisation-wide immediately because the initial demonstration succeeded.",

                B:
                    "Scale in controlled stages after validating evidence, readiness, controls, resources and local operating conditions.",

                C:
                    "Stop all further development because the results are not perfectly consistent.",

                D:
                    "Allow each department to copy the pilot independently without shared standards."
            },

            governance: {
                A:
                    "Use the vendor's standard policy as the organisation's complete governance framework.",

                B:
                    "Establish accountable executive oversight, decision rights, risk thresholds, auditability and an incident-response process.",

                C:
                    "Assign governance to a junior developer who maintains the technical system.",

                D:
                    "Remove formal governance once the solution moves beyond the pilot."
            },

            monitoring: {
                A:
                    "Complete one final approval review and then stop monitoring.",

                B:
                    "Continuously monitor performance, benefits, fairness, privacy, security, drift, adoption and agreed stop criteria.",

                C:
                    "Investigate the system only after a serious customer complaint.",

                D:
                    "Monitor only whether the project remains within its annual budget."
            }
        }
    }
};

const SYSTEM_PROMPT = `
You are an executive education evaluator for a UCT GSB
AI Leadership in Action simulation prepared for Telekom Networks Malawi.

This is a multiple-choice-only simulation.

Evaluate only the executive actions selected by the participant.
There is no written explanation, comment, textbox response or rationale.

Do not request, expect, evaluate or refer to a written response.

Evaluate the selected decisions using five dimensions.
Score each dimension from 0 to 20.

1. strategicAlignment
- Clear business priority
- Strategic relevance
- Appropriate outcomes and success measures
- Evidence-based executive decision-making

2. valueFeasibility
- Practical scope
- Measurable organisational value
- Data readiness
- Resource and operational realism
- Appropriate pilot boundaries

3. responsibleAI
- Privacy
- Fairness
- Transparency
- Security
- Accountability
- Human oversight
- Governance
- Risk monitoring

4. stakeholderLeadership
- Employee involvement
- Customer impact
- Executive ownership
- Cross-functional participation
- Communication
- Change leadership

5. implementationReadiness
- Pilot design
- Monitoring
- Escalation
- Success measures
- Organisational learning
- Controlled implementation
- Responsible scaling

Scoring rules:
- Score only the selected multiple-choice actions.
- Strong, balanced and responsible actions must score higher.
- Risky, ungoverned, vendor-dependent or unrealistic actions
  must reduce the relevant dimension scores.
- Use the complete 0 to 20 range where justified.
- Keep feedback specific to the actions selected.
- Do not say that more written information is required.
- Do not mention a missing rationale.
- Do not ask the participant to submit additional information.
- Do not invent organisation-specific facts.
- Do not claim that the evaluation is legal, regulatory,
  financial, employment or professional advice.
- Return valid JSON only.
- Do not return markdown.
- Do not return code fences.
- Do not include text before or after the JSON.

Return exactly this structure:

{
  "dimensions": {
    "strategicAlignment": 0,
    "valueFeasibility": 0,
    "responsibleAI": 0,
    "stakeholderLeadership": 0,
    "implementationReadiness": 0
  },
  "executiveSummary": "A concise two to four sentence evaluation of the selected actions.",
  "strengths": [
    "Specific strength one",
    "Specific strength two",
    "Specific strength three"
  ],
  "improvements": [
    "Specific improvement one",
    "Specific improvement two",
    "Specific improvement three"
  ],
  "likelyConsequence": "A realistic consequence of the selected actions.",
  "recommendedAction": "One practical action that would improve the approach.",
  "followUpQuestion": "One thoughtful executive reflection question."
}
`.trim();

export const handler =
    async event => {
        if (
            event.httpMethod ===
            "OPTIONS"
        ) {
            return jsonResponse(
                204,
                null
            );
        }

        const apiKey =
            process.env
                .DEEPSEEK_API_KEY;

        const model =
            String(
                process.env
                    .DEEPSEEK_MODEL ||
                DEFAULT_MODEL
            ).trim();

        if (
            event.httpMethod ===
            "GET"
        ) {
            return jsonResponse(
                200,
                {
                    ok:
                        true,

                    service:
                        "UCT GSB Executive Simulation Scoring",

                    configured:
                        Boolean(
                            apiKey
                        ),

                    model:
                        model ||
                        DEFAULT_MODEL,

                    inputType:
                        "multiple-choice"
                }
            );
        }

        if (
            event.httpMethod !==
            "POST"
        ) {
            return jsonResponse(
                405,
                {
                    error:
                        "Method not allowed."
                }
            );
        }

        if (!apiKey) {
            console.error(
                "DEEPSEEK_API_KEY is not configured in Netlify."
            );

            return jsonResponse(
                500,
                {
                    error:
                        "AI scoring has not been configured. Add DEEPSEEK_API_KEY to the Netlify environment variables."
                }
            );
        }

        const rawBody =
            event.body ||
            "";

        if (
            rawBody.length >
            MAX_REQUEST_BODY_SIZE
        ) {
            return jsonResponse(
                413,
                {
                    error:
                        "The simulation request is too large."
                }
            );
        }

        let requestBody;

        try {
            requestBody =
                JSON.parse(
                    rawBody ||
                    "{}"
                );
        } catch (error) {
            return jsonResponse(
                400,
                {
                    error:
                        "The simulation sent an invalid request."
                }
            );
        }

        const validation =
            validateSubmission(
                requestBody
            );

        if (!validation.valid) {
            return jsonResponse(
                400,
                {
                    error:
                        validation.error
                }
            );
        }

        const prompt =
            buildEvaluationPrompt(
                validation.submission
            );

        const controller =
            new AbortController();

        const timeout =
            setTimeout(
                () =>
                    controller.abort(),

                REQUEST_TIMEOUT_MS
            );

        try {
            let providerResult =
                await callDeepSeek({
                    apiKey,
                    model,
                    prompt,

                    signal:
                        controller.signal,

                    useJsonFormat:
                        true
                });

            if (
                providerResult
                    .response
                    .status ===
                    400 &&
                providerResult
                    .providerMessage
                    .toLowerCase()
                    .includes(
                        "response_format"
                    )
            ) {
                providerResult =
                    await callDeepSeek({
                        apiKey,
                        model,
                        prompt,

                        signal:
                            controller.signal,

                        useJsonFormat:
                            false
                    });
            }

            if (
                !providerResult
                    .response
                    .ok
            ) {
                console.error(
                    "DeepSeek simulation request failed.",
                    providerResult
                        .response
                        .status,
                    providerResult
                        .providerMessage
                );

                return providerErrorResponse(
                    providerResult
                        .response
                        .status
                );
            }

            const rawContent =
                providerResult
                    .data
                    ?.choices?.[0]
                    ?.message
                    ?.content;

            if (
                typeof rawContent !==
                    "string" ||
                !rawContent.trim()
            ) {
                console.error(
                    "DeepSeek returned empty simulation content."
                );

                return jsonResponse(
                    502,
                    {
                        error:
                            "The AI scoring service returned an empty response. Please try again."
                    }
                );
            }

            let parsedResult;

            try {
                parsedResult =
                    parseJsonContent(
                        rawContent
                    );
            } catch (error) {
                console.error(
                    "Could not parse DeepSeek simulation JSON.",
                    rawContent.slice(
                        0,
                        500
                    )
                );

                return jsonResponse(
                    502,
                    {
                        error:
                            "The AI scoring service returned an invalid response. Please try again."
                    }
                );
            }

            const normalized =
                normalizeEvaluation(
                    parsedResult
                );

            if (!normalized) {
                console.error(
                    "DeepSeek simulation response did not match the expected structure.",
                    parsedResult
                );

                return jsonResponse(
                    502,
                    {
                        error:
                            "The AI scoring service returned incomplete scoring information. Please try again."
                    }
                );
            }

            return jsonResponse(
                200,
                normalized
            );
        } catch (error) {
            if (
                error?.name ===
                "AbortError"
            ) {
                return jsonResponse(
                    504,
                    {
                        error:
                            "The AI evaluation took too long. Please try again."
                    }
                );
            }

            console.error(
                "Simulation function error:",
                error
            );

            return jsonResponse(
                500,
                {
                    error:
                        "The AI evaluation is temporarily unavailable."
                }
            );
        } finally {
            clearTimeout(
                timeout
            );
        }
    };

function validateSubmission(
    input
) {
    const scenarioId =
        cleanText(
            input?.scenarioId,
            40
        );

    const scenario =
        SCENARIOS[
            scenarioId
        ];

    if (!scenario) {
        return {
            valid:
                false,

            error:
                "The selected simulation scenario is invalid."
        };
    }

    if (
        !input.responses ||
        typeof input.responses !==
            "object" ||
        Array.isArray(
            input.responses
        )
    ) {
        return {
            valid:
                false,

            error:
                "Simulation answers are missing."
        };
    }

    const selectedResponses =
        {};

    for (
        const decisionId
        of Object.keys(
            scenario.decisions
        )
    ) {
        const selectedOption =
            cleanText(
                input.responses[
                    decisionId
                ],
                2
            ).toUpperCase();

        const optionText =
            scenario
                .decisions[
                    decisionId
                ][
                    selectedOption
                ];

        if (!optionText) {
            return {
                valid:
                    false,

                error:
                    "Please answer every multiple-choice question."
            };
        }

        selectedResponses[
            decisionId
        ] = {
            option:
                selectedOption,

            text:
                optionText
        };
    }

    return {
        valid:
            true,

        submission: {
            scenarioId,
            scenario,
            selectedResponses
        }
    };
}

function buildEvaluationPrompt(
    submission
) {
    const decisions =
        Object.entries(
            submission
                .selectedResponses
        )
            .map(
                (
                    [
                        decisionId,
                        response
                    ],
                    index
                ) => {
                    return `
Decision ${index + 1}
Decision category: ${decisionId}
Selected option: ${response.option}
Selected action: ${response.text}
                    `.trim();
                }
            )
            .join(
                "\n\n"
            );

    return `
Evaluate the following multiple-choice executive simulation.

SCENARIO
Title: ${submission.scenario.title}

Context:
${submission.scenario.context}

SELECTED EXECUTIVE ACTIONS
${decisions}

Evaluate only the selected actions.

There is no written rationale or additional information.

Do not expect or refer to a written response.

Do not reduce the score because no written response was provided.

Return the required JSON evaluation only.
    `.trim();
}

async function callDeepSeek({
    apiKey,
    model,
    prompt,
    signal,
    useJsonFormat
}) {
    const requestBody = {
        model,

        messages: [
            {
                role:
                    "system",

                content:
                    SYSTEM_PROMPT
            },

            {
                role:
                    "user",

                content:
                    prompt
            }
        ],

        temperature:
            0.15,

        max_tokens:
            1200,

        stream:
            false
    };

    if (useJsonFormat) {
        requestBody
            .response_format = {
                type:
                    "json_object"
            };
    }

    const response =
        await fetch(
            DEEPSEEK_API_URL,
            {
                method:
                    "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${apiKey}`
                },

                body:
                    JSON.stringify(
                        requestBody
                    ),

                signal
            }
        );

    const responseText =
        await response.text();

    let data = {};

    try {
        data =
            JSON.parse(
                responseText
            );
    } catch (error) {
        data = {};
    }

    return {
        response,
        data,

        providerMessage:
            String(
                data?.error
                    ?.message ||
                responseText ||
                ""
            ).slice(
                0,
                500
            )
    };
}

function parseJsonContent(
    content
) {
    const cleaned =
        String(content)
            .replace(
                /```json\s*/gi,
                ""
            )
            .replace(
                /```\s*/g,
                ""
            )
            .trim();

    try {
        return JSON.parse(
            cleaned
        );
    } catch (error) {
        const firstBrace =
            cleaned.indexOf(
                "{"
            );

        const lastBrace =
            cleaned.lastIndexOf(
                "}"
            );

        if (
            firstBrace ===
                -1 ||
            lastBrace ===
                -1 ||
            lastBrace <=
                firstBrace
        ) {
            throw error;
        }

        return JSON.parse(
            cleaned.slice(
                firstBrace,
                lastBrace + 1
            )
        );
    }
}

function normalizeEvaluation(
    input
) {
    if (
        !input ||
        typeof input !==
            "object" ||
        !input.dimensions ||
        typeof input.dimensions !==
            "object"
    ) {
        return null;
    }

    const dimensions =
        {};

    for (
        const key
        of DIMENSION_KEYS
    ) {
        const numericValue =
            Number(
                input.dimensions[
                    key
                ]
            );

        if (
            !Number.isFinite(
                numericValue
            )
        ) {
            return null;
        }

        dimensions[
            key
        ] =
            clamp(
                Math.round(
                    numericValue
                ),
                0,
                20
            );
    }

    const overallScore =
        DIMENSION_KEYS
            .reduce(
                (
                    total,
                    key
                ) =>
                    total +
                    dimensions[
                        key
                    ],

                0
            );

    const strengths =
        normalizeStringArray(
            input.strengths,
            3
        );

    const improvements =
        normalizeStringArray(
            input.improvements,
            3
        );

    const executiveSummary =
        cleanText(
            input.executiveSummary,
            800
        );

    const likelyConsequence =
        cleanText(
            input.likelyConsequence,
            500
        );

    const recommendedAction =
        cleanText(
            input.recommendedAction,
            500
        );

    const followUpQuestion =
        cleanText(
            input.followUpQuestion,
            400
        );

    if (
        !executiveSummary ||
        strengths.length ===
            0 ||
        improvements.length ===
            0 ||
        !likelyConsequence ||
        !recommendedAction ||
        !followUpQuestion
    ) {
        return null;
    }

    return {
        overallScore,

        performanceBand:
            calculatePerformanceBand(
                overallScore
            ),

        dimensions,
        executiveSummary,
        strengths,
        improvements,
        likelyConsequence,
        recommendedAction,
        followUpQuestion
    };
}

function normalizeStringArray(
    value,
    maximumItems
) {
    if (
        !Array.isArray(
            value
        )
    ) {
        return [];
    }

    return value
        .slice(
            0,
            maximumItems
        )
        .map(
            item =>
                cleanText(
                    item,
                    350
                )
        )
        .filter(
            Boolean
        );
}

function calculatePerformanceBand(
    score
) {
    if (
        score >=
        85
    ) {
        return "Advanced";
    }

    if (
        score >=
        70
    ) {
        return "Proficient";
    }

    if (
        score >=
        50
    ) {
        return "Developing";
    }

    return "Emerging";
}

function providerErrorResponse(
    status
) {
    if (
        status ===
        400
    ) {
        return jsonResponse(
            502,
            {
                error:
                    "DeepSeek rejected the scoring request. Check the configured model and try again."
            }
        );
    }

    if (
        status ===
        401
    ) {
        return jsonResponse(
            502,
            {
                error:
                    "The DeepSeek API key is invalid. Check DEEPSEEK_API_KEY in Netlify."
            }
        );
    }

    if (
        status ===
        402
    ) {
        return jsonResponse(
            502,
            {
                error:
                    "The DeepSeek account does not currently have sufficient API credit."
            }
        );
    }

    if (
        status ===
        429
    ) {
        return jsonResponse(
            429,
            {
                error:
                    "The AI scoring service is receiving too many requests. Please wait briefly and try again."
            }
        );
    }

    if (
        [
            500,
            502,
            503,
            504
        ].includes(
            status
        )
    ) {
        return jsonResponse(
            502,
            {
                error:
                    "DeepSeek is temporarily unavailable. Please try again shortly."
            }
        );
    }

    return jsonResponse(
        502,
        {
            error:
                "The AI scoring service could not evaluate the answers."
        }
    );
}

function cleanText(
    value,
    maximumLength
) {
    return String(
        value ??
        ""
    )
        .replace(
            /\u0000/g,
            ""
        )
        .trim()
        .slice(
            0,
            maximumLength
        );
}

function clamp(
    value,
    minimum,
    maximum
) {
    return Math.min(
        maximum,

        Math.max(
            minimum,
            value
        )
    );
}

function jsonResponse(
    statusCode,
    body
) {
    return {
        statusCode,

        headers: {
            "Content-Type":
                "application/json; charset=utf-8",

            "Cache-Control":
                "no-store",

            "X-Content-Type-Options":
                "nosniff",

            "Access-Control-Allow-Headers":
                "Content-Type",

            "Access-Control-Allow-Methods":
                "GET, POST, OPTIONS"
        },

        body:
            body === null
                ? ""
                : JSON.stringify(
                    body
                )
    };
}