/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * Server-side game catalogue and scoring rules.
 *
 * The browser still renders the games from the JSON files in
 * assets/data, but every submitted answer is re-scored here so the
 * points stored against a user account cannot be faked from the
 * browser console.
 *
 * Game 1 - TNM Malawi AI Reality Puzzle Challenge
 *   15 scored questions x 5 points = 75 points
 *   1 bonus reflection question      (0 points)
 *
 * Game 2 - TNM AI Solution Match
 *   10 scenarios x 10 points = 100 points
 *   Best AI card ................ 5 points
 *   Credible data requirements .. 2 points (1 point for two of three)
 *   Responsible AI control ...... 2 points (1 point for one of two)
 *   Measurable success indicator  1 point
 */

export const DAY_ONE_ID = "day1";
export const DAY_TWO_ID = "day2";
export const GAME_IDS = [DAY_ONE_ID, DAY_TWO_ID];

export const GAME_LABELS = {
    [DAY_ONE_ID]: "Game 1",
    [DAY_TWO_ID]: "Game 2"
};

function toNumber(value, fallback = 0) {
    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;
}

function normalise(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase();
}

function unique(values) {
    const seen = new Set();

    return (Array.isArray(values) ? values : [])
        .filter(value => {
            const key = normalise(value);

            if (!key || seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;
        });
}

function containsValue(list, value) {
    return unique(list)
        .map(normalise)
        .includes(normalise(value));
}

function countMatches(list, selections) {
    const allowed = unique(list).map(normalise);

    return unique(selections)
        .map(normalise)
        .filter(value => allowed.includes(value))
        .length;
}

/**
 * Builds the scoring catalogue from the two published game files.
 *
 * @param {{ dayOne: object, dayTwo: object }} data
 */
export function buildCatalog({ dayOne, dayTwo }) {
    if (!dayOne || !Array.isArray(dayOne.levels)) {
        throw new Error(
            "Game 1 data is missing or invalid."
        );
    }

    if (!dayTwo || !Array.isArray(dayTwo.scenarios)) {
        throw new Error(
            "Game 2 data is missing or invalid."
        );
    }

    const dayOneQuestions = {};
    let dayOneMaximum = 0;
    let dayOneScored = 0;

    dayOne.levels.forEach(level => {
        (level.puzzles || []).forEach(puzzle => {
            const points = toNumber(puzzle.points);
            const id = String(puzzle.id);

            dayOneQuestions[id] = {
                id,
                kind: "puzzle",
                points,

                answer: String(puzzle.correct_answer || "")
                    .trim()
                    .toUpperCase(),

                level: String(level.level ?? ""),
                levelName: String(level.name ?? ""),

                title: String(
                    puzzle.title ||
                    "Question " + id
                )
            };

            dayOneMaximum += points;
            dayOneScored += 1;
        });
    });

    const bonus = dayOne.bonus_meta_question;

    if (bonus) {
        dayOneQuestions.bonus = {
            id: "bonus",
            kind: "bonus",
            points: 0,

            answer: String(bonus.correct_answer || "")
                .trim()
                .toUpperCase(),

            level: "Bonus",
            levelName: "Executive Reflection",

            title: String(
                bonus.title ||
                "Bonus question"
            )
        };
    }

    const scoring =
        dayTwo.recommended_gameplay?.scoring || {};

    const roundRules = {
        card: toNumber(scoring.correct_ai_card, 5),
        data: toNumber(scoring.credible_data_requirements, 2),
        control: toNumber(scoring.responsible_ai_control, 2),
        success: toNumber(scoring.measurable_success_indicator, 1)
    };

    roundRules.maximum =
        roundRules.card +
        roundRules.data +
        roundRules.control +
        roundRules.success;

    const dayTwoQuestions = {};
    let dayTwoMaximum = 0;

    dayTwo.scenarios.forEach(scenario => {
        const id = String(scenario.id);

        dayTwoQuestions[id] = {
            id,
            kind: "scenario",
            points: roundRules.maximum,

            card: String(scenario.correct_card_id || "")
                .trim()
                .toUpperCase(),

            data: unique(scenario.data_needed),
            controls: unique(scenario.responsible_ai_check),
            success: unique(scenario.success_measures),

            category: String(scenario.game_category || ""),

            title: String(
                scenario.title ||
                "Scenario " + id
            )
        };

        dayTwoMaximum += roundRules.maximum;
    });

    return {
        maximumTotal: dayOneMaximum + dayTwoMaximum,

        games: {
            [DAY_ONE_ID]: {
                id: DAY_ONE_ID,
                label: GAME_LABELS[DAY_ONE_ID],

                title: String(
                    dayOne.game_title ||
                    "Game 1"
                ),

                maximum: dayOneMaximum,
                questionCount: dayOneScored,

                pointsPerQuestion: dayOneScored
                    ? dayOneMaximum / dayOneScored
                    : 0,

                questions: dayOneQuestions
            },

            [DAY_TWO_ID]: {
                id: DAY_TWO_ID,
                label: GAME_LABELS[DAY_TWO_ID],

                title: String(
                    dayTwo.game_title ||
                    "Game 2"
                ),

                maximum: dayTwoMaximum,
                questionCount: dayTwo.scenarios.length,
                pointsPerQuestion: roundRules.maximum,
                roundRules,

                questions: dayTwoQuestions
            }
        }
    };
}

function toList(value) {
    if (Array.isArray(value)) {
        return value;
    }

    if (value === null || value === undefined) {
        return [];
    }

    return [value];
}

/** Scores one Game 1 question. Returns null for unknown questions. */
export function scoreDayOneQuestion(catalog, questionId, answer) {
    const question =
        catalog.games[DAY_ONE_ID]
            .questions[String(questionId)];

    if (!question) {
        return null;
    }

    const given = String(answer ?? "")
        .trim()
        .toUpperCase();

    const correct =
        Boolean(given) &&
        given === question.answer;

    const scored =
        question.kind !== "bonus";

    return {
        questionId: question.id,
        kind: question.kind,
        maximum: question.points,

        points:
            correct && scored
                ? question.points
                : 0,

        correct,
        answer: given,

        label:
            question.kind === "bonus"
                ? "Bonus reflection question"
                : question.levelName +
                  " - question " +
                  question.id
    };
}

/** Scores one Game 2 round. Returns null for unknown scenarios. */
export function scoreDayTwoRound(catalog, scenarioId, selections) {
    const game = catalog.games[DAY_TWO_ID];

    const scenario =
        game.questions[String(scenarioId)];

    if (!scenario) {
        return null;
    }

    const card = String(selections?.card ?? "")
        .trim()
        .toUpperCase();

    const dataSelections = toList(selections?.data);
    const controlSelections = toList(selections?.controls);
    const successSelections = toList(selections?.success);

    const cardPoints =
        card && card === scenario.card
            ? game.roundRules.card
            : 0;

    const dataCorrect = countMatches(
        scenario.data,
        dataSelections
    );

    const controlCorrect = countMatches(
        scenario.controls,
        controlSelections
    );

    const successCorrect = successSelections.some(value =>
        containsValue(scenario.success, value)
    );

    const dataPoints =
        dataCorrect >= 3
            ? game.roundRules.data
            : (dataCorrect === 2 ? 1 : 0);

    const controlPoints =
        controlCorrect >= 2
            ? game.roundRules.control
            : (controlCorrect === 1 ? 1 : 0);

    const successPoints =
        successCorrect
            ? game.roundRules.success
            : 0;

    return {
        questionId: scenario.id,
        kind: "scenario",
        maximum: scenario.points,

        points:
            cardPoints +
            dataPoints +
            controlPoints +
            successPoints,

        correct: cardPoints > 0,
        answer: card,

        label: scenario.category
            ? scenario.title +
              " (" +
              scenario.category +
              ")"
            : scenario.title,

        breakdown: {
            cardPoints,
            dataPoints,
            controlPoints,
            successPoints,
            dataCorrect,
            controlCorrect,
            successCorrect
        }
    };
}

/** Scores a submission object: { gameId, questionId, answer | selections }. */
export function scoreSubmission(catalog, submission) {
    const gameId = String(submission?.gameId ?? "")
        .trim();

    if (gameId === DAY_ONE_ID) {
        return scoreDayOneQuestion(
            catalog,
            submission?.questionId,
            submission?.answer
        );
    }

    if (gameId === DAY_TWO_ID) {
        return scoreDayTwoRound(
            catalog,
            submission?.questionId ?? submission?.scenarioId,
            submission
        );
    }

    return null;
}

