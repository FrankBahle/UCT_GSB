document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const DAY_ONE_URL =
        new URL(
            "assets/data/TNM_Malawi_AI_Reality_Puzzle_Challenge.json",
            document.baseURI
        ).href;

    const DAY_TWO_URL =
        new URL(
            "assets/data/TNM_Malawi_AI_Solution_Match_Game_10_Scenarios.json",
            document.baseURI
        ).href;

    const dayOneElements = {
        button:
            document.getElementById("openDay1Game"),

        status:
            document.getElementById("day1LoadStatus"),

        section:
            document.getElementById("day1GameSection"),

        mount:
            document.getElementById("day1GameMount"),

        cardQuestions:
            document.getElementById("day1CardQuestions"),

        cardScore:
            document.getElementById("day1CardScore")
    };

    const dayTwoElements = {
        button:
            document.getElementById("openDay2Game"),

        status:
            document.getElementById("day2LoadStatus"),

        section:
            document.getElementById("day2GameSection"),

        mount:
            document.getElementById("day2GameMount"),

        cardScenarios:
            document.getElementById("day2CardScenarios"),

        cardScore:
            document.getElementById("day2CardScore")
    };

    const toast = {
        element:
            document.getElementById("gameScoreToast"),

        heading:
            document.getElementById("gameScoreToastHeading"),

        copy:
            document.getElementById("gameScoreToastCopy")
    };

    let toastTimer = null;
    let dayOneGame = null;
    let dayTwoGame = null;

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function normalise(value) {
        return String(value ?? "")
            .trim()
            .toLowerCase();
    }

    function shuffle(values) {
        const copy = [...values];

        for (
            let index = copy.length - 1;
            index > 0;
            index -= 1
        ) {
            const randomIndex =
                Math.floor(
                    Math.random() * (index + 1)
                );

            [
                copy[index],
                copy[randomIndex]
            ] = [
                copy[randomIndex],
                copy[index]
            ];
        }

        return copy;
    }

    function unique(values) {
        const seen = new Set();

        return values.filter(value => {
            const key = normalise(value);

            if (!key || seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;
        });
    }

    async function fetchJson(url) {
        const response = await fetch(url, {
            method:
                "GET",

            headers: {
                Accept:
                    "application/json"
            },

            cache:
                "no-store"
        });

        if (!response.ok) {
            throw new Error(
                `File not found. Status code: ${response.status}.`
            );
        }

        const text =
            await response.text();

        if (!text.trim()) {
            throw new Error(
                "The JSON file is empty."
            );
        }

        try {
            return JSON.parse(
                text.replace(/^\uFEFF/, "")
            );
        } catch (error) {
            console.error(
                "Invalid JSON:",
                error
            );

            throw new Error(
                "The file was found, but it does not contain valid JSON."
            );
        }
    }

    function showToast(
        heading,
        copy,
        type = "correct"
    ) {
        window.clearTimeout(toastTimer);

        toast.element.className =
            `game-score-toast ${type}`;

        toast.heading.textContent =
            heading;

        toast.copy.textContent =
            copy;

        toast.element.hidden =
            false;

        toastTimer =
            window.setTimeout(() => {
                toast.element.hidden = true;
            }, 2200);
    }

    function openGame(dayNumber) {
        dayOneElements.section.hidden =
            dayNumber !== 1;

        dayTwoElements.section.hidden =
            dayNumber !== 2;

        const section =
            dayNumber === 1
                ? dayOneElements.section
                : dayTwoElements.section;

        window.setTimeout(() => {
            section.scrollIntoView({
                behavior:
                    "smooth",

                block:
                    "start"
            });
        }, 50);
    }

    function setLoadingError(
        elements,
        message
    ) {
        elements.button.disabled =
            true;

        elements.status.textContent =
            message;

        elements.status.classList.add(
            "quiz-load-status-error"
        );
    }

    function initialiseDayOne(data) {
        if (
            !data ||
            !Array.isArray(data.levels) ||
            !data.scoring
        ) {
            throw new Error(
                "The Day 1 JSON structure is invalid."
            );
        }

        const scoredQuestions =
            data.levels.flatMap(level =>
                level.puzzles.map(puzzle => ({
                    ...puzzle,

                    level:
                        level.level,

                    levelName:
                        level.name,

                    difficulty:
                        level.difficulty,

                    focus:
                        level.focus,

                    isBonus:
                        false
                }))
            );

        const questions =
            [...scoredQuestions];

        if (data.bonus_meta_question) {
            const bonus =
                data.bonus_meta_question;

            questions.push({
                id:
                    "bonus",

                title:
                    bonus.title,

                scenario:
                    "Complete this final executive reflection question.",

                question:
                    bonus.question,

                options:
                    bonus.options,

                correct_answer:
                    bonus.correct_answer,

                points:
                    0,

                explanation:
                    bonus.explanation,

                teaching_point:
                    "High-impact AI should be paused or redesigned " +
                    "when transparency, monitoring, review, appeal " +
                    "and accountable ownership are absent.",

                fun_add_on:
                    "",

                level:
                    "Bonus",

                levelName:
                    "Executive Reflection",

                difficulty:
                    "Bonus",

                focus:
                    "Deciding whether AI should be used at all.",

                isBonus:
                    true
            });
        }

        const maximumScore =
            Number(data.scoring.maximum_score);

        dayOneElements.cardQuestions.textContent =
            String(scoredQuestions.length);

        dayOneElements.cardScore.textContent =
            String(maximumScore);

        const state = {
            index:
                0,

            score:
                0,

            correct:
                0,

            submitted:
                false,

            levels:
                {}
        };

        data.levels.forEach(level => {
            state.levels[String(level.level)] = {
                name:
                    level.name,

                correct:
                    0,

                total:
                    level.puzzles.length,

                score:
                    0,

                maximum:
                    level.puzzles.reduce(
                        (sum, puzzle) =>
                            sum +
                            Number(puzzle.points || 0),

                        0
                    )
            };
        });

        function resetState() {
            state.index = 0;
            state.score = 0;
            state.correct = 0;
            state.submitted = false;

            Object.values(state.levels)
                .forEach(level => {
                    level.correct = 0;
                    level.score = 0;
                });
        }

        function renderWelcome() {
            dayOneElements.mount.innerHTML = `
                <section class="game-card game-welcome">
                    <div class="game-large-icon">
                        <i
                            class="bi bi-puzzle-fill"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <span class="game-eyebrow">
                        Day 1 Knowledge Challenge
                    </span>

                    <h2>
                        ${escapeHtml(data.game_title)}
                    </h2>

                    <p>
                        ${escapeHtml(data.theme)}
                    </p>

                    <div class="game-stat-grid three">
                        <article>
                            <strong>
                                ${scoredQuestions.length}
                            </strong>

                            <span>
                                Scored questions
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${maximumScore}
                            </strong>

                            <span>
                                Maximum points
                            </span>
                        </article>

                        <article>
                            <strong>
                                1
                            </strong>

                            <span>
                                Question at a time
                            </span>
                        </article>
                    </div>

                    <div class="game-instructions">
                        <h3>
                            How the game works
                        </h3>

                        <ul>
                            <li>
                                Select one answer and submit it.
                            </li>

                            <li>
                                Correct answers immediately add the
                                points specified in the JSON file.
                            </li>

                            <li>
                                Review the explanation before continuing.
                            </li>

                            <li>
                                Complete all 15 scored questions.
                            </li>

                            <li>
                                The final bonus question does not affect
                                the score out of 75.
                            </li>
                        </ul>
                    </div>

                    <button
                        id="day1Start"
                        class="btn btn-gsb-primary btn-lg"
                        type="button"
                    >
                        Begin Day 1 Challenge

                        <i
                            class="bi bi-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </button>
                </section>
            `;

            dayOneElements.mount
                .querySelector("#day1Start")
                .addEventListener(
                    "click",
                    start
                );
        }

        function start() {
            resetState();
            renderQuestion();
        }

        function currentQuestion() {
            return questions[state.index];
        }

        function renderQuestion() {
            const puzzle =
                currentQuestion();

            if (!puzzle) {
                renderResults();
                return;
            }

            state.submitted =
                false;

            const displayedNumber =
                Math.min(
                    state.index + 1,
                    scoredQuestions.length
                );

            const progress =
                puzzle.isBonus
                    ? 100
                    : Math.round(
                        (
                            state.index /
                            scoredQuestions.length
                        ) *
                        100
                    );

            const options =
                Object.entries(puzzle.options)
                    .map(([letter, text]) => `
                        <div class="game-choice-wrapper">
                            <input
                                id="d1-${escapeHtml(puzzle.id)}-${letter}"
                                type="radio"
                                name="d1-${escapeHtml(puzzle.id)}"
                                value="${letter}"
                            >

                            <label
                                class="game-choice"
                                for="d1-${escapeHtml(puzzle.id)}-${letter}"
                                data-letter="${letter}"
                            >
                                <span class="game-choice-letter">
                                    ${letter}
                                </span>

                                <span>
                                    ${escapeHtml(text)}
                                </span>
                            </label>
                        </div>
                    `)
                    .join("");

            dayOneElements.mount.innerHTML = `
                <div class="game-scorebar">
                    <div>
                        <span>
                            Current Score
                        </span>

                        <strong>
                            ${state.score}/${maximumScore}
                        </strong>
                    </div>

                    <div class="game-scorebar-right">
                        <span>
                            ${
                                puzzle.isBonus
                                    ? "Bonus Question"
                                    : `Question ${displayedNumber} of ${scoredQuestions.length}`
                            }
                        </span>

                        <strong>
                            ${progress}%
                        </strong>
                    </div>
                </div>

                <div class="game-progress-track">
                    <span
                        class="game-progress-fill"
                        style="width: ${progress}%"
                    ></span>
                </div>

                <article class="game-card game-question-card">
                    <div class="game-question-meta">
                        <div>
                            <span class="game-badge navy">
                                ${
                                    puzzle.isBonus
                                        ? "Bonus"
                                        : `Level ${puzzle.level}`
                                }
                            </span>

                            <span class="game-badge cyan">
                                ${escapeHtml(puzzle.difficulty)}
                            </span>
                        </div>

                        <strong>
                            ${
                                puzzle.isBonus
                                    ? "Unscored"
                                    : `${puzzle.points} points`
                            }
                        </strong>
                    </div>

                    <div class="game-level-context">
                        <strong>
                            ${escapeHtml(puzzle.levelName)}
                        </strong>

                        <p>
                            ${escapeHtml(puzzle.focus)}
                        </p>
                    </div>

                    <h2>
                        ${escapeHtml(puzzle.title)}
                    </h2>

                    <div class="game-scenario-box">
                        <span>
                            Scenario
                        </span>

                        <p>
                            ${escapeHtml(puzzle.scenario)}
                        </p>
                    </div>

                    <fieldset>
                        <legend>
                            ${escapeHtml(puzzle.question)}
                        </legend>

                        <div
                            id="day1Options"
                            class="game-choice-list"
                        >
                            ${options}
                        </div>
                    </fieldset>

                    <div
                        id="day1Message"
                        class="game-message"
                        role="alert"
                    ></div>

                    <section
                        id="day1Feedback"
                        class="game-feedback"
                        hidden
                    ></section>

                    <div class="game-actions">
                        <button
                            id="day1Submit"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                            disabled
                        >
                            Submit Answer
                        </button>

                        <button
                            id="day1Next"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                            hidden
                        >
                            Next Question

                            <i
                                class="bi bi-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                </article>
            `;

            const submit =
                dayOneElements.mount
                    .querySelector("#day1Submit");

            const next =
                dayOneElements.mount
                    .querySelector("#day1Next");

            dayOneElements.mount
                .querySelectorAll(
                    '#day1Options input[type="radio"]'
                )
                .forEach(input => {
                    input.addEventListener(
                        "change",
                        () => {
                            submit.disabled = false;

                            dayOneElements.mount
                                .querySelector("#day1Message")
                                .textContent = "";
                        }
                    );
                });

            submit.addEventListener(
                "click",
                submitAnswer
            );

            next.addEventListener(
                "click",
                () => {
                    state.index += 1;
                    renderQuestion();

                    dayOneElements.section
                        .scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "start"
                        });
                }
            );
        }

        function submitAnswer() {
            if (state.submitted) {
                return;
            }

            const puzzle =
                currentQuestion();

            const selected =
                dayOneElements.mount
                    .querySelector(
                        '#day1Options input[type="radio"]:checked'
                    );

            const message =
                dayOneElements.mount
                    .querySelector("#day1Message");

            if (!selected) {
                message.textContent =
                    "Please select one answer.";

                message.className =
                    "game-message error";

                return;
            }

            state.submitted =
                true;

            const correct =
                selected.value ===
                puzzle.correct_answer;

            let awarded = 0;

            if (correct && !puzzle.isBonus) {
                awarded =
                    Number(puzzle.points || 0);

                state.score += awarded;
                state.correct += 1;

                const level =
                    state.levels[
                        String(puzzle.level)
                    ];

                if (level) {
                    level.correct += 1;
                    level.score += awarded;
                }
            }

            dayOneElements.mount
                .querySelectorAll(
                    '#day1Options input[type="radio"]'
                )
                .forEach(input => {
                    input.disabled = true;

                    const label =
                        dayOneElements.mount
                            .querySelector(
                                `label[for="${input.id}"]`
                            );

                    if (
                        input.value ===
                        puzzle.correct_answer
                    ) {
                        label.classList.add(
                            "answer-correct"
                        );
                    }

                    if (
                        input.checked &&
                        input.value !==
                        puzzle.correct_answer
                    ) {
                        label.classList.add(
                            "answer-incorrect"
                        );
                    }
                });

            const feedback =
                dayOneElements.mount
                    .querySelector("#day1Feedback");

            feedback.hidden =
                false;

            feedback.innerHTML = `
                <div class="game-feedback-status ${
                    correct ? "correct" : "incorrect"
                }">
                    ${
                        puzzle.isBonus
                            ? (
                                correct
                                    ? "Correct Bonus Answer"
                                    : "Incorrect Bonus Answer"
                            )
                            : (
                                correct
                                    ? `Correct — +${awarded} points`
                                    : "Incorrect — no points awarded"
                            )
                    }
                </div>

                <article class="game-feedback-block">
                    <h3>
                        Correct Answer
                    </h3>

                    <p>
                        <strong>
                            ${escapeHtml(puzzle.correct_answer)} —
                        </strong>

                        ${escapeHtml(
                            puzzle.options[
                                puzzle.correct_answer
                            ]
                        )}
                    </p>
                </article>

                <article class="game-feedback-block">
                    <h3>
                        Explanation
                    </h3>

                    <p>
                        ${escapeHtml(puzzle.explanation)}
                    </p>
                </article>

                <article class="game-feedback-block teaching">
                    <h3>
                        Key Learning
                    </h3>

                    <p>
                        ${escapeHtml(
                            puzzle.teaching_point || ""
                        )}
                    </p>
                </article>

                ${
                    puzzle.fun_add_on
                        ? `
                            <article class="game-feedback-block fun">
                                <h3>
                                    Fun Note
                                </h3>

                                <p>
                                    ${escapeHtml(puzzle.fun_add_on)}
                                </p>
                            </article>
                        `
                        : ""
                }
            `;

            const submit =
                dayOneElements.mount
                    .querySelector("#day1Submit");

            const next =
                dayOneElements.mount
                    .querySelector("#day1Next");

            submit.hidden =
                true;

            next.hidden =
                false;

            if (
                state.index ===
                questions.length - 1
            ) {
                next.innerHTML = `
                    View Final Score

                    <i
                        class="bi bi-trophy"
                        aria-hidden="true"
                    ></i>
                `;
            }

            showToast(
                puzzle.isBonus
                    ? (
                        correct
                            ? "Bonus Correct"
                            : "Bonus Complete"
                    )
                    : (
                        correct
                            ? `+${awarded} Points`
                            : "No Points This Time"
                    ),

                `Total: ${state.score}/${maximumScore}`,

                puzzle.isBonus
                    ? "bonus"
                    : (
                        correct
                            ? "correct"
                            : "incorrect"
                    )
            );
        }

        function renderResults() {
            const incorrect =
                scoredQuestions.length -
                state.correct;

            const percentage =
                Math.round(
                    (
                        state.score /
                        maximumScore
                    ) *
                    100
                );

            let medal = "🧭";
            let band = "AI Explorer";
            let summary =
                "Continue building your understanding of AI, " +
                "automation and responsible governance.";

            if (state.score === maximumScore) {
                medal = "🥇";
                band =
                    "Gold — AI Reality Champion";
                summary =
                    "You answered every scored question correctly.";
            } else if (state.score >= 50) {
                medal = "🥈";
                band =
                    "Silver — AI Strategy Leader";
                summary =
                    "You demonstrated strong practical AI judgement.";
            } else if (state.score >= 25) {
                medal = "🥉";
                band =
                    "Bronze — AI Practitioner";
                summary =
                    "You have a developing practical understanding of AI.";
            }

            let previousBest = 0;

            try {
                previousBest =
                    Number(
                        localStorage.getItem(
                            "uctGsbDay1BestScore"
                        ) || 0
                    );
            } catch (error) {
                console.warn(error);
            }

            const best =
                Math.max(
                    previousBest,
                    state.score
                );

            try {
                localStorage.setItem(
                    "uctGsbDay1BestScore",
                    String(best)
                );
            } catch (error) {
                console.warn(error);
            }

            const levelCards =
                Object.entries(state.levels)
                    .map(([number, level]) => `
                        <div class="col-md-4">
                            <article class="game-result-mini-card">
                                <span>
                                    Level ${escapeHtml(number)}
                                </span>

                                <h3>
                                    ${escapeHtml(level.name)}
                                </h3>

                                <strong>
                                    ${level.score}/${level.maximum}
                                </strong>

                                <p>
                                    ${level.correct} of
                                    ${level.total} correct
                                </p>
                            </article>
                        </div>
                    `)
                    .join("");

            dayOneElements.mount.innerHTML = `
                <section class="game-card game-results">
                    <div class="game-medal">
                        ${medal}
                    </div>

                    <span class="game-eyebrow">
                        Day 1 Quiz Complete
                    </span>

                    <h2>
                        Your Final Score
                    </h2>

                    <div class="game-final-score">
                        <strong>
                            ${state.score}
                        </strong>

                        <span>
                            /${maximumScore}
                        </span>
                    </div>

                    <span class="game-result-band">
                        ${escapeHtml(band)}
                    </span>

                    <p>
                        ${escapeHtml(summary)}
                    </p>

                    <div class="game-stat-grid four">
                        <article>
                            <strong>
                                ${state.correct}
                            </strong>

                            <span>
                                Correct
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${incorrect}
                            </strong>

                            <span>
                                Incorrect
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${percentage}%
                            </strong>

                            <span>
                                Percentage
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${best}/${maximumScore}
                            </strong>

                            <span>
                                Best score
                            </span>
                        </article>
                    </div>

                    <div class="game-result-section">
                        <h3>
                            Performance by Level
                        </h3>

                        <div class="row g-4">
                            ${levelCards}
                        </div>
                    </div>

                    <div class="game-actions centered">
                        <button
                            id="day1Restart"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                        >
                            Attempt Day 1 Again
                        </button>

                        <a
                            href="day-2.html"
                            class="btn btn-outline-secondary btn-lg"
                        >
                            Continue to Day 2
                        </a>
                    </div>
                </section>
            `;

            dayOneElements.mount
                .querySelector("#day1Restart")
                .addEventListener(
                    "click",
                    start
                );
        }

        renderWelcome();

        return {
            open:
                () => {
                    openGame(1);
                },

            resetToWelcome:
                renderWelcome
        };
    }

    function initialiseDayTwo(data) {
        if (
            !data ||
            !Array.isArray(data.scenarios) ||
            !data.recommended_gameplay?.scoring
        ) {
            throw new Error(
                "The Day 2 JSON structure is invalid."
            );
        }

        const scenarios =
            data.scenarios;

        const scoring =
            data.recommended_gameplay.scoring;

        const maximumScore =
            Number(scoring.maximum_total);

        const maximumPerRound =
            Number(scoring.maximum_per_round);

        dayTwoElements.cardScenarios.textContent =
            String(scenarios.length);

        dayTwoElements.cardScore.textContent =
            String(maximumScore);

        const state = {
            index:
                0,

            score:
                0,

            correctCards:
                0,

            submitted:
                false,

            categories:
                {},

            optionSets:
                null
        };

        function initialiseCategories() {
            state.categories = {};

            scenarios.forEach(scenario => {
                const name =
                    scenario.game_category;

                if (!state.categories[name]) {
                    state.categories[name] = {
                        score:
                            0,

                        maximum:
                            0,

                        rounds:
                            0
                    };
                }

                state.categories[name].maximum +=
                    maximumPerRound;

                state.categories[name].rounds +=
                    1;
            });
        }

        function resetState() {
            state.index = 0;
            state.score = 0;
            state.correctCards = 0;
            state.submitted = false;

            initialiseCategories();
        }

        function renderWelcome() {
            dayTwoElements.mount.innerHTML = `
                <section class="game-card game-welcome">
                    <div class="game-large-icon">
                        <i
                            class="bi bi-diagram-3-fill"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <span class="game-eyebrow">
                        Day 2 Applied AI Challenge
                    </span>

                    <h2>
                        ${escapeHtml(data.game_title)}
                    </h2>

                    <strong class="game-subtitle">
                        ${escapeHtml(data.subtitle)}
                    </strong>

                    <p>
                        ${escapeHtml(data.game_objective)}
                    </p>

                    <div class="game-stat-grid four">
                        <article>
                            <strong>
                                ${scenarios.length}
                            </strong>

                            <span>
                                Scenarios
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${maximumScore}
                            </strong>

                            <span>
                                Maximum points
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${maximumPerRound}
                            </strong>

                            <span>
                                Points per round
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${escapeHtml(
                                    data.recommended_gameplay
                                        .time_per_round_minutes
                                )}
                            </strong>

                            <span>
                                Minutes per round
                            </span>
                        </article>
                    </div>

                    <div class="game-scoring-breakdown">
                        <article>
                            <strong>
                                ${scoring.correct_ai_card}
                            </strong>

                            <span>
                                Correct AI card
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${scoring.credible_data_requirements}
                            </strong>

                            <span>
                                Data requirements
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${scoring.responsible_ai_control}
                            </strong>

                            <span>
                                Responsible controls
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${scoring.measurable_success_indicator}
                            </strong>

                            <span>
                                Success measure
                            </span>
                        </article>
                    </div>

                    <button
                        id="day2Start"
                        class="btn btn-gsb-primary btn-lg"
                        type="button"
                    >
                        Begin Day 2 Game

                        <i
                            class="bi bi-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </button>
                </section>
            `;

            dayTwoElements.mount
                .querySelector("#day2Start")
                .addEventListener(
                    "click",
                    start
                );
        }

        function start() {
            resetState();
            renderScenario();
        }

        function currentScenario() {
            return scenarios[state.index];
        }

        function buildMixedOptions(
            scenario,
            field,
            correctCount,
            distractorCount
        ) {
            const correct =
                shuffle(
                    unique(scenario[field] || [])
                )
                    .slice(0, correctCount)
                    .map(value => ({
                        value,
                        correct:
                            true
                    }));

            const correctSet =
                new Set(
                    (scenario[field] || [])
                        .map(normalise)
                );

            const distractorPool =
                unique(
                    scenarios
                        .filter(
                            item =>
                                item.id !== scenario.id
                        )
                        .flatMap(
                            item =>
                                item[field] || []
                        )
                )
                    .filter(
                        value =>
                            !correctSet.has(
                                normalise(value)
                            )
                    );

            const distractors =
                shuffle(distractorPool)
                    .slice(0, distractorCount)
                    .map(value => ({
                        value,
                        correct:
                            false
                    }));

            return shuffle([
                ...correct,
                ...distractors
            ]);
        }

        function createChoiceOptions(
            options,
            group,
            type
        ) {
            return options
                .map((option, index) => {
                    const id =
                        `${group}-${state.index}-${index}`;

                    return `
                        <div class="game-choice-wrapper">
                            <input
                                id="${id}"
                                type="${type}"
                                name="${
                                    type === "radio"
                                        ? group
                                        : id
                                }"
                                value="${escapeHtml(option.value)}"
                                data-correct="${option.correct}"
                            >

                            <label
                                class="game-choice compact"
                                for="${id}"
                            >
                                <span class="game-choice-check">
                                    ✓
                                </span>

                                <span>
                                    ${escapeHtml(option.value)}
                                </span>
                            </label>
                        </div>
                    `;
                })
                .join("");
        }

        function renderScenario() {
            const scenario =
                currentScenario();

            if (!scenario) {
                renderResults();
                return;
            }

            state.submitted =
                false;

            state.optionSets = {
                data:
                    buildMixedOptions(
                        scenario,
                        "data_needed",
                        3,
                        3
                    ),

                controls:
                    buildMixedOptions(
                        scenario,
                        "responsible_ai_check",
                        2,
                        2
                    ),

                success:
                    buildMixedOptions(
                        scenario,
                        "success_measures",
                        1,
                        3
                    )
            };

            const progress =
                Math.round(
                    (
                        state.index /
                        scenarios.length
                    ) *
                    100
                );

            const cardOptions =
                scenario.solution_cards
                    .map(card => `
                        <div class="solution-card-wrapper">
                            <input
                                id="solution-${scenario.id}-${card.card_id}"
                                type="radio"
                                name="solution-${scenario.id}"
                                value="${card.card_id}"
                            >

                            <label
                                class="solution-card"
                                for="solution-${scenario.id}-${card.card_id}"
                                data-card="${card.card_id}"
                            >
                                <div class="solution-card-header">
                                    <span>
                                        ${card.card_id}
                                    </span>

                                    <small>
                                        ${escapeHtml(card.type_of_ai)}
                                    </small>
                                </div>

                                <h3>
                                    ${escapeHtml(card.name)}
                                </h3>

                                <ul>
                                    ${card.what_it_can_do
                                        .map(item => `
                                            <li>
                                                ${escapeHtml(item)}
                                            </li>
                                        `)
                                        .join("")}
                                </ul>

                                <blockquote>
                                    ${escapeHtml(card.sample_output)}
                                </blockquote>
                            </label>
                        </div>
                    `)
                    .join("");

            const sourceIds =
                scenario.grounding?.source_ids || [];

            dayTwoElements.mount.innerHTML = `
                <div class="game-scorebar">
                    <div>
                        <span>
                            Total Score
                        </span>

                        <strong>
                            ${state.score}/${maximumScore}
                        </strong>
                    </div>

                    <div class="game-scorebar-right">
                        <span>
                            Scenario ${state.index + 1}
                            of ${scenarios.length}
                        </span>

                        <strong>
                            ${progress}%
                        </strong>
                    </div>
                </div>

                <div class="game-progress-track">
                    <span
                        class="game-progress-fill"
                        style="width: ${progress}%"
                    ></span>
                </div>

                <article class="game-card game-question-card">
                    <div class="game-question-meta">
                        <div>
                            <span class="game-badge navy">
                                ${escapeHtml(scenario.difficulty)}
                            </span>

                            <span class="game-badge cyan">
                                ${escapeHtml(scenario.game_category)}
                            </span>
                        </div>

                        <strong>
                            ${maximumPerRound} points
                        </strong>
                    </div>

                    <div class="scenario-detail-row">
                        <span>
                            <i
                                class="bi bi-geo-alt"
                                aria-hidden="true"
                            ></i>

                            ${escapeHtml(scenario.location)}
                        </span>

                        <span>
                            <i
                                class="bi bi-person-badge"
                                aria-hidden="true"
                            ></i>

                            ${escapeHtml(scenario.tnm_role)}
                        </span>
                    </div>

                    <span class="game-eyebrow">
                        ${escapeHtml(scenario.pain_point_theme)}
                    </span>

                    <h2>
                        ${escapeHtml(scenario.title)}
                    </h2>

                    <div class="game-scenario-box">
                        <span>
                            TNM Pain Point
                        </span>

                        <p>
                            ${escapeHtml(
                                scenario.pain_point_scenario
                            )}
                        </p>
                    </div>

                    <p class="game-player-task">
                        ${escapeHtml(scenario.player_task)}
                    </p>

                    <div class="game-grounding">
                        <i
                            class="bi bi-patch-check"
                            aria-hidden="true"
                        ></i>

                        <span>
                            Public grounding:
                            ${escapeHtml(sourceIds.join(", "))}.
                            ${escapeHtml(
                                scenario.grounding?.note || ""
                            )}
                        </span>
                    </div>

                    <section class="game-round-step">
                        <div class="game-step-heading">
                            <span>
                                Step 1
                            </span>

                            <div>
                                <h3>
                                    Select the Best AI Card
                                </h3>

                                <p>
                                    Select the strongest first
                                    intervention for the root cause.
                                </p>
                            </div>

                            <strong>
                                ${scoring.correct_ai_card} points
                            </strong>
                        </div>

                        <div
                            id="day2Cards"
                            class="solution-card-grid"
                        >
                            ${cardOptions}
                        </div>
                    </section>

                    <section class="game-round-step">
                        <div class="game-step-heading">
                            <span>
                                Step 2
                            </span>

                            <div>
                                <h3>
                                    Select Three Data Requirements
                                </h3>

                                <p>
                                    Choose exactly three credible data
                                    requirements.
                                </p>
                            </div>

                            <strong>
                                ${scoring.credible_data_requirements}
                                points
                            </strong>
                        </div>

                        <div
                            id="day2Data"
                            class="game-choice-grid"
                        >
                            ${createChoiceOptions(
                                state.optionSets.data,
                                "day2-data",
                                "checkbox"
                            )}
                        </div>

                        <p
                            id="day2DataCount"
                            class="selection-counter"
                        >
                            0 of 3 selected
                        </p>
                    </section>

                    <section class="game-round-step">
                        <div class="game-step-heading">
                            <span>
                                Step 3
                            </span>

                            <div>
                                <h3>
                                    Select Two Responsible Controls
                                </h3>

                                <p>
                                    Choose exactly two responsible AI
                                    controls.
                                </p>
                            </div>

                            <strong>
                                ${scoring.responsible_ai_control}
                                points
                            </strong>
                        </div>

                        <div
                            id="day2Controls"
                            class="game-choice-grid"
                        >
                            ${createChoiceOptions(
                                state.optionSets.controls,
                                "day2-control",
                                "checkbox"
                            )}
                        </div>

                        <p
                            id="day2ControlCount"
                            class="selection-counter"
                        >
                            0 of 2 selected
                        </p>
                    </section>

                    <section class="game-round-step">
                        <div class="game-step-heading">
                            <span>
                                Step 4
                            </span>

                            <div>
                                <h3>
                                    Choose One Success Measure
                                </h3>

                                <p>
                                    Select one measurable indicator.
                                </p>
                            </div>

                            <strong>
                                ${scoring.measurable_success_indicator}
                                point
                            </strong>
                        </div>

                        <div
                            id="day2Success"
                            class="game-choice-grid"
                        >
                            ${createChoiceOptions(
                                state.optionSets.success,
                                "day2-success",
                                "radio"
                            )}
                        </div>
                    </section>

                    <div
                        id="day2Message"
                        class="game-message"
                        role="alert"
                    ></div>

                    <section
                        id="day2Feedback"
                        class="game-feedback"
                        hidden
                    ></section>

                    <div class="game-actions">
                        <button
                            id="day2Submit"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                            disabled
                        >
                            Submit Round
                        </button>

                        <button
                            id="day2Next"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                            hidden
                        >
                            Next Scenario

                            <i
                                class="bi bi-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                </article>
            `;

            bindScenarioEvents();
        }

        function checked(containerSelector) {
            return [
                ...dayTwoElements.mount
                    .querySelectorAll(
                        `${containerSelector} input:checked`
                    )
            ];
        }

        function enforceLimit(
            containerSelector,
            limit,
            changedInput
        ) {
            const selected =
                checked(containerSelector);

            if (selected.length > limit) {
                changedInput.checked = false;

                const message =
                    dayTwoElements.mount
                        .querySelector("#day2Message");

                message.textContent =
                    `Select only ${limit} options in this section.`;

                message.className =
                    "game-message error";
            }
        }

        function updateCountersAndButton() {
            const dataSelected =
                checked("#day2Data");

            const controlsSelected =
                checked("#day2Controls");

            const hasCard =
                Boolean(
                    dayTwoElements.mount
                        .querySelector(
                            '#day2Cards input[type="radio"]:checked'
                        )
                );

            const hasSuccess =
                Boolean(
                    dayTwoElements.mount
                        .querySelector(
                            '#day2Success input[type="radio"]:checked'
                        )
                );

            dayTwoElements.mount
                .querySelector("#day2DataCount")
                .textContent =
                    `${dataSelected.length} of 3 selected`;

            dayTwoElements.mount
                .querySelector("#day2ControlCount")
                .textContent =
                    `${controlsSelected.length} of 2 selected`;

            dayTwoElements.mount
                .querySelector("#day2Submit")
                .disabled =
                    !(
                        hasCard &&
                        dataSelected.length === 3 &&
                        controlsSelected.length === 2 &&
                        hasSuccess
                    );
        }

        function bindScenarioEvents() {
            dayTwoElements.mount
                .querySelectorAll(
                    "#day2Cards input"
                )
                .forEach(input => {
                    input.addEventListener(
                        "change",
                        updateCountersAndButton
                    );
                });

            dayTwoElements.mount
                .querySelectorAll(
                    "#day2Data input"
                )
                .forEach(input => {
                    input.addEventListener(
                        "change",
                        () => {
                            enforceLimit(
                                "#day2Data",
                                3,
                                input
                            );

                            updateCountersAndButton();
                        }
                    );
                });

            dayTwoElements.mount
                .querySelectorAll(
                    "#day2Controls input"
                )
                .forEach(input => {
                    input.addEventListener(
                        "change",
                        () => {
                            enforceLimit(
                                "#day2Controls",
                                2,
                                input
                            );

                            updateCountersAndButton();
                        }
                    );
                });

            dayTwoElements.mount
                .querySelectorAll(
                    "#day2Success input"
                )
                .forEach(input => {
                    input.addEventListener(
                        "change",
                        updateCountersAndButton
                    );
                });

            dayTwoElements.mount
                .querySelector("#day2Submit")
                .addEventListener(
                    "click",
                    submitRound
                );

            dayTwoElements.mount
                .querySelector("#day2Next")
                .addEventListener(
                    "click",
                    () => {
                        state.index += 1;
                        renderScenario();

                        dayTwoElements.section
                            .scrollIntoView({
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            });
                    }
                );
        }

        function scoreSelectedOptions(
            inputs,
            maximumCorrect,
            fullPoints
        ) {
            const correctSelected =
                inputs.filter(
                    input =>
                        input.dataset.correct === "true"
                ).length;

            if (
                correctSelected ===
                maximumCorrect
            ) {
                return Number(fullPoints);
            }

            if (
                correctSelected ===
                maximumCorrect - 1
            ) {
                return 1;
            }

            return 0;
        }

        function submitRound() {
            if (state.submitted) {
                return;
            }

            const scenario =
                currentScenario();

            const selectedCard =
                dayTwoElements.mount
                    .querySelector(
                        '#day2Cards input[type="radio"]:checked'
                    );

            const dataInputs =
                checked("#day2Data");

            const controlInputs =
                checked("#day2Controls");

            const successInput =
                dayTwoElements.mount
                    .querySelector(
                        '#day2Success input[type="radio"]:checked'
                    );

            if (
                !selectedCard ||
                dataInputs.length !== 3 ||
                controlInputs.length !== 2 ||
                !successInput
            ) {
                const message =
                    dayTwoElements.mount
                        .querySelector("#day2Message");

                message.textContent =
                    "Complete all four steps before submitting.";

                message.className =
                    "game-message error";

                return;
            }

            state.submitted =
                true;

            const cardPoints =
                selectedCard.value ===
                scenario.correct_card_id
                    ? Number(scoring.correct_ai_card)
                    : 0;

            const dataPoints =
                scoreSelectedOptions(
                    dataInputs,
                    3,
                    scoring.credible_data_requirements
                );

            const controlPoints =
                scoreSelectedOptions(
                    controlInputs,
                    2,
                    scoring.responsible_ai_control
                );

            const successPoints =
                successInput.dataset.correct === "true"
                    ? Number(
                        scoring.measurable_success_indicator
                    )
                    : 0;

            const roundScore =
                cardPoints +
                dataPoints +
                controlPoints +
                successPoints;

            state.score += roundScore;

            if (cardPoints > 0) {
                state.correctCards += 1;
            }

            state.categories[
                scenario.game_category
            ].score += roundScore;

            lockAndMarkSelections(
                scenario
            );

            renderRoundFeedback({
                cardPoints,
                dataPoints,
                controlPoints,
                successPoints,
                roundScore
            });

            const submit =
                dayTwoElements.mount
                    .querySelector("#day2Submit");

            const next =
                dayTwoElements.mount
                    .querySelector("#day2Next");

            submit.hidden =
                true;

            next.hidden =
                false;

            if (
                state.index ===
                scenarios.length - 1
            ) {
                next.innerHTML = `
                    View Final Score

                    <i
                        class="bi bi-trophy"
                        aria-hidden="true"
                    ></i>
                `;
            }

            showToast(
                `+${roundScore} Points`,
                `Total: ${state.score}/${maximumScore}`,
                roundScore >= 8
                    ? "correct"
                    : (
                        roundScore >= 5
                            ? "bonus"
                            : "incorrect"
                    )
            );
        }

        function lockAndMarkSelections(
            scenario
        ) {
            dayTwoElements.mount
                .querySelectorAll(
                    ".game-question-card input"
                )
                .forEach(input => {
                    input.disabled = true;

                    const label =
                        dayTwoElements.mount
                            .querySelector(
                                `label[for="${input.id}"]`
                            );

                    if (!label) {
                        return;
                    }

                    if (
                        input.closest("#day2Cards")
                    ) {
                        if (
                            input.value ===
                            scenario.correct_card_id
                        ) {
                            label.classList.add(
                                "answer-correct"
                            );
                        }

                        if (
                            input.checked &&
                            input.value !==
                            scenario.correct_card_id
                        ) {
                            label.classList.add(
                                "answer-incorrect"
                            );
                        }

                        return;
                    }

                    if (
                        input.checked &&
                        input.dataset.correct === "true"
                    ) {
                        label.classList.add(
                            "answer-correct"
                        );
                    }

                    if (
                        input.checked &&
                        input.dataset.correct !== "true"
                    ) {
                        label.classList.add(
                            "answer-incorrect"
                        );
                    }

                    if (
                        !input.checked &&
                        input.dataset.correct === "true"
                    ) {
                        label.classList.add(
                            "answer-recommended"
                        );
                    }
                });
        }

        function renderRoundFeedback(result) {
            const scenario =
                currentScenario();

            const correctCard =
                scenario.solution_cards.find(
                    card =>
                        card.card_id ===
                        scenario.correct_card_id
                );

            const otherCards =
                Object.entries(
                    scenario
                        .why_other_cards_are_less_suitable ||
                    {}
                )
                    .map(([cardId, explanation]) => {
                        const card =
                            scenario.solution_cards.find(
                                item =>
                                    item.card_id === cardId
                            );

                        return `
                            <p>
                                <strong>
                                    ${escapeHtml(cardId)} —
                                    ${escapeHtml(
                                        card?.name || ""
                                    )}:
                                </strong>

                                ${escapeHtml(explanation)}
                            </p>
                        `;
                    })
                    .join("");

            const createList =
                items => `
                    <ul>
                        ${items
                            .map(item => `
                                <li>
                                    ${escapeHtml(item)}
                                </li>
                            `)
                            .join("")}
                    </ul>
                `;

            const feedback =
                dayTwoElements.mount
                    .querySelector("#day2Feedback");

            feedback.hidden =
                false;

            feedback.innerHTML = `
                <div class="round-score-header">
                    <div>
                        <span>
                            Round Score
                        </span>

                        <strong>
                            ${result.roundScore}/${maximumPerRound}
                        </strong>
                    </div>

                    <strong>
                        ${
                            result.roundScore === maximumPerRound
                                ? "Perfect Solution Match"
                                : (
                                    result.roundScore >= 8
                                        ? "Strong Match"
                                        : (
                                            result.roundScore >= 6
                                                ? "Developing Match"
                                                : "Review the Debrief"
                                        )
                                )
                        }
                    </strong>
                </div>

                <div class="game-stat-grid four compact">
                    <article>
                        <strong>
                            ${result.cardPoints}/5
                        </strong>

                        <span>
                            AI Card
                        </span>
                    </article>

                    <article>
                        <strong>
                            ${result.dataPoints}/2
                        </strong>

                        <span>
                            Data
                        </span>
                    </article>

                    <article>
                        <strong>
                            ${result.controlPoints}/2
                        </strong>

                        <span>
                            Controls
                        </span>
                    </article>

                    <article>
                        <strong>
                            ${result.successPoints}/1
                        </strong>

                        <span>
                            Measure
                        </span>
                    </article>
                </div>

                <article class="game-feedback-block">
                    <h3>
                        Best AI Solution
                    </h3>

                    <p>
                        <strong>
                            ${escapeHtml(correctCard.card_id)} —
                            ${escapeHtml(correctCard.name)}
                        </strong>
                    </p>

                    <p>
                        ${escapeHtml(scenario.why_best)}
                    </p>
                </article>

                <article class="game-feedback-block">
                    <h3>
                        Why the Other Cards Are Less Suitable
                    </h3>

                    ${otherCards}
                </article>

                <div class="row g-4 mt-1">
                    <div class="col-lg-4">
                        <article class="game-feedback-list">
                            <h3>
                                Recommended Data
                            </h3>

                            ${createList(scenario.data_needed)}
                        </article>
                    </div>

                    <div class="col-lg-4">
                        <article class="game-feedback-list">
                            <h3>
                                Responsible Controls
                            </h3>

                            ${createList(
                                scenario.responsible_ai_check
                            )}
                        </article>
                    </div>

                    <div class="col-lg-4">
                        <article class="game-feedback-list">
                            <h3>
                                Success Measures
                            </h3>

                            ${createList(
                                scenario.success_measures
                            )}
                        </article>
                    </div>
                </div>

                <article class="game-feedback-block teaching">
                    <h3>
                        Facilitator Debrief
                    </h3>

                    <p>
                        ${escapeHtml(
                            scenario.facilitator_debrief
                        )}
                    </p>
                </article>

                <article class="game-feedback-block fun">
                    <h3>
                        Discussion Question
                    </h3>

                    <p>
                        ${escapeHtml(
                            scenario.bonus_question
                        )}
                    </p>
                </article>
            `;
        }

        function renderResults() {
            const percentage =
                Math.round(
                    (
                        state.score /
                        maximumScore
                    ) *
                    100
                );

            const average =
                (
                    state.score /
                    scenarios.length
                ).toFixed(1);

            let medal = "🧭";
            let band =
                "AI Solution Explorer";
            let summary =
                "Continue strengthening your ability to connect " +
                "business problems with appropriate AI solutions.";

            if (state.score >= 90) {
                medal = "🥇";
                band =
                    "Gold — AI Solution Architect";
                summary =
                    "You consistently matched TNM pain points " +
                    "with strong AI interventions and governance.";
            } else if (state.score >= 75) {
                medal = "🥈";
                band =
                    "Silver — Strategic AI Matcher";
                summary =
                    "You demonstrated strong practical judgement.";
            } else if (state.score >= 60) {
                medal = "🥉";
                band =
                    "Bronze — Developing AI Designer";
                summary =
                    "You understand the foundations of AI solution matching.";
            }

            let previousBest = 0;

            try {
                previousBest =
                    Number(
                        localStorage.getItem(
                            "uctGsbDay2BestScore"
                        ) || 0
                    );
            } catch (error) {
                console.warn(error);
            }

            const best =
                Math.max(
                    previousBest,
                    state.score
                );

            try {
                localStorage.setItem(
                    "uctGsbDay2BestScore",
                    String(best)
                );
            } catch (error) {
                console.warn(error);
            }

            const categoryCards =
                Object.entries(state.categories)
                    .map(([name, category]) => `
                        <div class="col-md-6 col-xl-4">
                            <article class="game-result-mini-card">
                                <h3>
                                    ${escapeHtml(name)}
                                </h3>

                                <strong>
                                    ${category.score}/${category.maximum}
                                </strong>

                                <p>
                                    ${category.rounds}
                                    ${
                                        category.rounds === 1
                                            ? "scenario"
                                            : "scenarios"
                                    }
                                </p>
                            </article>
                        </div>
                    `)
                    .join("");

            dayTwoElements.mount.innerHTML = `
                <section class="game-card game-results">
                    <div class="game-medal">
                        ${medal}
                    </div>

                    <span class="game-eyebrow">
                        Day 2 Game Complete
                    </span>

                    <h2>
                        Your Final Solution Match Score
                    </h2>

                    <div class="game-final-score">
                        <strong>
                            ${state.score}
                        </strong>

                        <span>
                            /${maximumScore}
                        </span>
                    </div>

                    <span class="game-result-band">
                        ${escapeHtml(band)}
                    </span>

                    <p>
                        ${escapeHtml(summary)}
                    </p>

                    <div class="game-stat-grid four">
                        <article>
                            <strong>
                                ${state.correctCards}/${scenarios.length}
                            </strong>

                            <span>
                                Correct AI cards
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${average}/10
                            </strong>

                            <span>
                                Round average
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${percentage}%
                            </strong>

                            <span>
                                Percentage
                            </span>
                        </article>

                        <article>
                            <strong>
                                ${best}/${maximumScore}
                            </strong>

                            <span>
                                Best score
                            </span>
                        </article>
                    </div>

                    <div class="game-result-section">
                        <h3>
                            Performance by Business Area
                        </h3>

                        <div class="row g-4">
                            ${categoryCards}
                        </div>
                    </div>

                    <div class="game-actions centered">
                        <button
                            id="day2Restart"
                            class="btn btn-gsb-primary btn-lg"
                            type="button"
                        >
                            Play Day 2 Again
                        </button>

                        <a
                            href="day-3.html"
                            class="btn btn-outline-secondary btn-lg"
                        >
                            Continue to Day 3
                        </a>
                    </div>
                </section>
            `;

            dayTwoElements.mount
                .querySelector("#day2Restart")
                .addEventListener(
                    "click",
                    start
                );
        }

        initialiseCategories();
        renderWelcome();

        return {
            open:
                () => {
                    openGame(2);
                },

            resetToWelcome:
                renderWelcome
        };
    }

    async function loadDayOne() {
        try {
            const data =
                await fetchJson(DAY_ONE_URL);

            dayOneGame =
                initialiseDayOne(data);

            dayOneElements.button.disabled =
                false;

            dayOneElements.status.textContent =
                "Day 1 quiz is ready.";
        } catch (error) {
            console.error(
                "Day 1 quiz load error:",
                error
            );

            setLoadingError(
                dayOneElements,
                `Day 1 could not load: ${error.message}`
            );
        }
    }

    async function loadDayTwo() {
        try {
            const data =
                await fetchJson(DAY_TWO_URL);

            dayTwoGame =
                initialiseDayTwo(data);

            dayTwoElements.button.disabled =
                false;

            dayTwoElements.status.textContent =
                "Day 2 game is ready.";
        } catch (error) {
            console.error(
                "Day 2 game load error:",
                error
            );

            setLoadingError(
                dayTwoElements,
                `Day 2 could not load: ${error.message}`
            );
        }
    }

    dayOneElements.button.addEventListener(
        "click",
        () => {
            dayOneGame?.open();
        }
    );

    dayTwoElements.button.addEventListener(
        "click",
        () => {
            dayTwoGame?.open();
        }
    );

    Promise.allSettled([
        loadDayOne(),
        loadDayTwo()
    ])
        .then(() => {
            const day =
                new URLSearchParams(
                    window.location.search
                ).get("day");

            if (day === "1" && dayOneGame) {
                dayOneGame.open();
            }

            if (day === "2" && dayTwoGame) {
                dayTwoGame.open();
            }
        });
});