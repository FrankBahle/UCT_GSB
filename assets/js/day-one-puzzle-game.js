document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const DATA_URL =
        "assets/data/TNM_Malawi_AI_Reality_Puzzle_Challenge.json";

    const BEST_SCORE_STORAGE_KEY =
        "uctGsbDayOnePuzzleBestScore";

    const elements = {
        openQuizButton:
            document.getElementById("openDayOneQuiz"),

        loadStatus:
            document.getElementById("dayOneLoadStatus"),

        dayOneQuestionCount:
            document.getElementById("dayOneQuestionCount"),

        dayOneMaximumPoints:
            document.getElementById("dayOneMaximumPoints"),

        gameSection:
            document.getElementById("dayOneGameSection"),

        gameError:
            document.getElementById("gameError"),

        gameWelcome:
            document.getElementById("gameWelcome"),

        gamePlayArea:
            document.getElementById("gamePlayArea"),

        gameResults:
            document.getElementById("gameResults"),

        gameTitle:
            document.getElementById("gameTitle"),

        gameTheme:
            document.getElementById("gameTheme"),

        welcomeQuestionCount:
            document.getElementById("welcomeQuestionCount"),

        welcomeMaximumScore:
            document.getElementById("welcomeMaximumScore"),

        startGameButton:
            document.getElementById("startGameButton"),

        liveScore:
            document.getElementById("liveScore"),

        liveMaximumScore:
            document.getElementById("liveMaximumScore"),

        questionCounter:
            document.getElementById("questionCounter"),

        progressPercentage:
            document.getElementById("progressPercentage"),

        gameProgressBar:
            document.getElementById("gameProgressBar"),

        levelBadge:
            document.getElementById("levelBadge"),

        difficultyBadge:
            document.getElementById("difficultyBadge"),

        questionPoints:
            document.getElementById("questionPoints"),

        levelName:
            document.getElementById("levelName"),

        levelFocus:
            document.getElementById("levelFocus"),

        puzzleTitle:
            document.getElementById("puzzleTitle"),

        puzzleScenario:
            document.getElementById("puzzleScenario"),

        puzzleQuestion:
            document.getElementById("puzzleQuestion"),

        puzzleOptions:
            document.getElementById("puzzleOptions"),

        answerValidation:
            document.getElementById("answerValidation"),

        answerFeedback:
            document.getElementById("answerFeedback"),

        feedbackStatus:
            document.getElementById("feedbackStatus"),

        correctAnswerText:
            document.getElementById("correctAnswerText"),

        explanationText:
            document.getElementById("explanationText"),

        teachingPointText:
            document.getElementById("teachingPointText"),

        funAddOnSection:
            document.getElementById("funAddOnSection"),

        funAddOnText:
            document.getElementById("funAddOnText"),

        submitAnswerButton:
            document.getElementById("submitAnswerButton"),

        nextQuestionButton:
            document.getElementById("nextQuestionButton"),

        resultMedal:
            document.getElementById("resultMedal"),

        finalScore:
            document.getElementById("finalScore"),

        finalMaximumScore:
            document.getElementById("finalMaximumScore"),

        resultBand:
            document.getElementById("resultBand"),

        resultSummary:
            document.getElementById("resultSummary"),

        correctAnswerCount:
            document.getElementById("correctAnswerCount"),

        incorrectAnswerCount:
            document.getElementById("incorrectAnswerCount"),

        finalPercentage:
            document.getElementById("finalPercentage"),

        bestScore:
            document.getElementById("bestScore"),

        levelResultsGrid:
            document.getElementById("levelResultsGrid"),

        restartGameButton:
            document.getElementById("restartGameButton"),

        scorePopup:
            document.getElementById("scorePopup"),

        scorePopupHeading:
            document.getElementById("scorePopupHeading"),

        scorePopupTotal:
            document.getElementById("scorePopupTotal")
    };

    let gameData = null;
    let scoredQuestions = [];
    let questionQueue = [];

    let currentQuestionIndex = 0;
    let selectedAnswer = null;
    let questionSubmitted = false;

    let score = 0;
    let correctAnswerTotal = 0;

    let levelResults = {};
    let scorePopupTimer = null;

    function validateRequiredElements() {
        const missing = Object.entries(elements)
            .filter(([, element]) => !element)
            .map(([name]) => name);

        if (missing.length > 0) {
            console.error(
                "The quiz page is missing required elements:",
                missing
            );

            return false;
        }

        return true;
    }

    async function loadQuizData() {
        elements.openQuizButton.disabled = true;

        try {
            const response = await fetch(DATA_URL, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(
                    `Could not load the Day 1 quiz JSON. ` +
                    `Status code: ${response.status}.`
                );
            }

            const data = await response.json();

            validateQuizData(data);

            gameData = data;
            scoredQuestions = flattenScoredQuestions(data);
            questionQueue = [...scoredQuestions];

            if (data.bonus_meta_question) {
                questionQueue.push(
                    createBonusQuestion(
                        data.bonus_meta_question
                    )
                );
            }

            updatePageInformation();

            elements.openQuizButton.disabled = false;
            elements.loadStatus.textContent =
                "Day 1 quiz is ready.";

            checkDirectDayOneLink();
        } catch (error) {
            console.error(
                "Could not load the Day 1 quiz:",
                error
            );

            elements.loadStatus.textContent =
                "The Day 1 quiz could not be loaded.";

            elements.loadStatus.classList.add(
                "quiz-load-status-error"
            );

            elements.gameError.hidden = false;
            elements.gameError.textContent =
                error.message ||
                "The quiz could not be loaded.";
        }
    }

    function validateQuizData(data) {
        if (!data || typeof data !== "object") {
            throw new Error(
                "The Day 1 quiz JSON is invalid."
            );
        }

        if (
            !data.scoring ||
            !Number.isFinite(
                Number(data.scoring.maximum_score)
            )
        ) {
            throw new Error(
                "The JSON does not contain valid scoring information."
            );
        }

        if (
            !Array.isArray(data.levels) ||
            data.levels.length === 0
        ) {
            throw new Error(
                "The JSON does not contain valid quiz levels."
            );
        }

        data.levels.forEach(level => {
            if (
                !Array.isArray(level.puzzles) ||
                level.puzzles.length === 0
            ) {
                throw new Error(
                    `Level ${level.level} contains no questions.`
                );
            }

            level.puzzles.forEach(puzzle => {
                const requiredFields = [
                    "id",
                    "title",
                    "scenario",
                    "question",
                    "options",
                    "correct_answer",
                    "points",
                    "explanation"
                ];

                const missingFields =
                    requiredFields.filter(
                        field =>
                            puzzle[field] === undefined ||
                            puzzle[field] === null
                    );

                if (missingFields.length > 0) {
                    throw new Error(
                        `Puzzle ${puzzle.id} is missing: ` +
                        missingFields.join(", ")
                    );
                }
            });
        });
    }

    function flattenScoredQuestions(data) {
        return data.levels.flatMap(level =>
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
    }

    function createBonusQuestion(bonusQuestion) {
        return {
            id:
                "bonus",

            title:
                bonusQuestion.title,

            scenario:
                "Complete this final executive reflection question.",

            question:
                bonusQuestion.question,

            options:
                bonusQuestion.options,

            correct_answer:
                bonusQuestion.correct_answer,

            points:
                0,

            explanation:
                bonusQuestion.explanation,

            teaching_point:
                "High-impact AI should be paused or redesigned when " +
                "transparency, monitoring, review, appeal and accountable " +
                "ownership are absent.",

            fun_add_on:
                "",

            level:
                "Bonus",

            levelName:
                "Executive Reflection",

            difficulty:
                "Bonus",

            focus:
                "Deciding whether AI should be deployed at all.",

            isBonus:
                true
        };
    }

    function updatePageInformation() {
        const totalQuestions =
            Number(gameData.scoring.total_puzzles) ||
            scoredQuestions.length;

        const maximumScore =
            Number(gameData.scoring.maximum_score);

        elements.dayOneQuestionCount.textContent =
            String(totalQuestions);

        elements.dayOneMaximumPoints.textContent =
            String(maximumScore);

        elements.welcomeQuestionCount.textContent =
            String(totalQuestions);

        elements.welcomeMaximumScore.textContent =
            String(maximumScore);

        elements.liveMaximumScore.textContent =
            String(maximumScore);

        elements.finalMaximumScore.textContent =
            String(maximumScore);

        elements.gameTitle.textContent =
            gameData.game_title ||
            "TNM Malawi AI Reality Puzzle Challenge";

        elements.gameTheme.textContent =
            gameData.theme || "";
    }

    function checkDirectDayOneLink() {
        const parameters =
            new URLSearchParams(window.location.search);

        const requestedDay =
            parameters.get("day");

        if (
            requestedDay === "1" ||
            window.location.hash === "#day-one-quiz"
        ) {
            openDayOneQuiz();
        }
    }

    function openDayOneQuiz() {
        if (!gameData) {
            return;
        }

        elements.gameSection.hidden = false;
        elements.gameError.hidden = true;
        elements.gameWelcome.hidden = false;
        elements.gamePlayArea.hidden = true;
        elements.gameResults.hidden = true;

        window.setTimeout(() => {
            elements.gameSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 50);
    }

    function startGame() {
        resetGameState();

        elements.gameWelcome.hidden = true;
        elements.gameResults.hidden = true;
        elements.gamePlayArea.hidden = false;

        renderCurrentQuestion();

        elements.gamePlayArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function resetGameState() {
        currentQuestionIndex = 0;
        selectedAnswer = null;
        questionSubmitted = false;

        score = 0;
        correctAnswerTotal = 0;

        levelResults = {};

        gameData.levels.forEach(level => {
            levelResults[String(level.level)] = {
                name:
                    level.name,

                correct:
                    0,

                total:
                    level.puzzles.length,

                points:
                    0,

                maximum:
                    level.puzzles.reduce(
                        (total, puzzle) =>
                            total + Number(puzzle.points || 0),

                        0
                    )
            };
        });

        updateLiveScore();
    }

    function getCurrentQuestion() {
        return questionQueue[currentQuestionIndex];
    }

    function renderCurrentQuestion() {
        const puzzle = getCurrentQuestion();

        if (!puzzle) {
            showFinalResults();
            return;
        }

        selectedAnswer = null;
        questionSubmitted = false;

        elements.answerValidation.textContent = "";
        elements.answerValidation.className =
            "game-message";

        elements.answerFeedback.hidden = true;

        elements.submitAnswerButton.hidden = false;
        elements.submitAnswerButton.disabled = true;

        elements.nextQuestionButton.hidden = true;

        elements.levelBadge.textContent =
            puzzle.isBonus
                ? "Bonus Question"
                : `Level ${puzzle.level}`;

        elements.difficultyBadge.textContent =
            puzzle.difficulty;

        elements.questionPoints.textContent =
            puzzle.isBonus
                ? "Unscored"
                : `${puzzle.points} points`;

        elements.levelName.textContent =
            puzzle.levelName;

        elements.levelFocus.textContent =
            puzzle.focus;

        elements.puzzleTitle.textContent =
            puzzle.title;

        elements.puzzleScenario.textContent =
            puzzle.scenario;

        elements.puzzleQuestion.textContent =
            puzzle.question;

        renderOptions(puzzle);
        updateQuestionCounter(puzzle);
        updateProgress(false);
    }

    function updateQuestionCounter(puzzle) {
        if (puzzle.isBonus) {
            elements.questionCounter.textContent =
                "Bonus Question";

            return;
        }

        elements.questionCounter.textContent =
            `Question ${currentQuestionIndex + 1} ` +
            `of ${scoredQuestions.length}`;
    }

    function renderOptions(puzzle) {
        elements.puzzleOptions.replaceChildren();

        Object.entries(puzzle.options)
            .forEach(([letter, answerText]) => {
                const wrapper =
                    document.createElement("div");

                wrapper.className =
                    "game-option-wrapper";

                const input =
                    document.createElement("input");

                const inputId =
                    `puzzle-${puzzle.id}-${letter}`;

                input.type = "radio";
                input.id = inputId;
                input.name = `puzzle-${puzzle.id}`;
                input.value = letter;

                const label =
                    document.createElement("label");

                label.className =
                    "game-answer-option";

                label.htmlFor =
                    inputId;

                const letterElement =
                    document.createElement("span");

                letterElement.className =
                    "game-answer-letter";

                letterElement.textContent =
                    letter;

                const answerElement =
                    document.createElement("span");

                answerElement.textContent =
                    answerText;

                label.append(
                    letterElement,
                    answerElement
                );

                input.addEventListener("change", () => {
                    if (questionSubmitted) {
                        return;
                    }

                    selectedAnswer =
                        input.value;

                    elements.submitAnswerButton.disabled =
                        false;

                    elements.answerValidation.textContent =
                        "";
                });

                wrapper.append(
                    input,
                    label
                );

                elements.puzzleOptions.appendChild(
                    wrapper
                );
            });
    }

    function submitCurrentAnswer() {
        if (
            questionSubmitted ||
            !selectedAnswer
        ) {
            elements.answerValidation.textContent =
                "Please select one answer before submitting.";

            elements.answerValidation.className =
                "game-message game-message-error";

            return;
        }

        const puzzle =
            getCurrentQuestion();

        const isCorrect =
            selectedAnswer === puzzle.correct_answer;

        questionSubmitted = true;

        let awardedPoints = 0;

        if (isCorrect && !puzzle.isBonus) {
            awardedPoints =
                Number(puzzle.points || 0);

            score += awardedPoints;
            correctAnswerTotal += 1;

            const levelResult =
                levelResults[String(puzzle.level)];

            if (levelResult) {
                levelResult.correct += 1;
                levelResult.points += awardedPoints;
            }
        }

        markSubmittedOptions(
            puzzle,
            selectedAnswer
        );

        displayFeedback(
            puzzle,
            isCorrect,
            awardedPoints
        );

        updateLiveScore();
        updateProgress(true);

        showScorePopup(
            puzzle,
            isCorrect,
            awardedPoints
        );

        elements.submitAnswerButton.hidden = true;
        elements.nextQuestionButton.hidden = false;

        const isFinalQuestion =
            currentQuestionIndex ===
            questionQueue.length - 1;

        if (isFinalQuestion) {
            elements.nextQuestionButton.innerHTML = `
                View Final Score
                <i
                    class="bi bi-trophy"
                    aria-hidden="true"
                ></i>
            `;
        } else {
            elements.nextQuestionButton.innerHTML = `
                Next Question
                <i
                    class="bi bi-arrow-right"
                    aria-hidden="true"
                ></i>
            `;
        }
    }

    function markSubmittedOptions(
        puzzle,
        submittedAnswer
    ) {
        const inputs =
            elements.puzzleOptions.querySelectorAll(
                'input[type="radio"]'
            );

        inputs.forEach(input => {
            input.disabled = true;

            const label =
                elements.puzzleOptions.querySelector(
                    `label[for="${input.id}"]`
                );

            if (!label) {
                return;
            }

            if (
                input.value ===
                puzzle.correct_answer
            ) {
                label.classList.add(
                    "game-answer-correct"
                );
            }

            if (
                input.value === submittedAnswer &&
                submittedAnswer !==
                    puzzle.correct_answer
            ) {
                label.classList.add(
                    "game-answer-incorrect"
                );
            }
        });
    }

    function displayFeedback(
        puzzle,
        isCorrect,
        awardedPoints
    ) {
        elements.answerFeedback.hidden = false;

        elements.feedbackStatus.className =
            isCorrect
                ? "game-feedback-status correct"
                : "game-feedback-status incorrect";

        if (puzzle.isBonus) {
            elements.feedbackStatus.textContent =
                isCorrect
                    ? "Correct Bonus Answer"
                    : "Incorrect Bonus Answer";
        } else if (isCorrect) {
            elements.feedbackStatus.textContent =
                `Correct — +${awardedPoints} points`;
        } else {
            elements.feedbackStatus.textContent =
                "Incorrect — no points awarded";
        }

        elements.correctAnswerText.textContent =
            `${puzzle.correct_answer} — ` +
            puzzle.options[puzzle.correct_answer];

        elements.explanationText.textContent =
            puzzle.explanation || "";

        elements.teachingPointText.textContent =
            puzzle.teaching_point ||
            "Review the explanation before continuing.";

        if (puzzle.fun_add_on) {
            elements.funAddOnSection.hidden = false;
            elements.funAddOnText.textContent =
                puzzle.fun_add_on;
        } else {
            elements.funAddOnSection.hidden = true;
            elements.funAddOnText.textContent = "";
        }

        elements.answerFeedback.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    function showScorePopup(
        puzzle,
        isCorrect,
        awardedPoints
    ) {
        window.clearTimeout(scorePopupTimer);

        elements.scorePopup.hidden = false;

        elements.scorePopup.classList.remove(
            "correct",
            "incorrect",
            "bonus"
        );

        if (puzzle.isBonus) {
            elements.scorePopup.classList.add(
                "bonus"
            );

            elements.scorePopupHeading.textContent =
                isCorrect
                    ? "Bonus Answer Correct"
                    : "Bonus Question Complete";

            elements.scorePopupTotal.textContent =
                `Final scored total: ${score} / ` +
                gameData.scoring.maximum_score;
        } else if (isCorrect) {
            elements.scorePopup.classList.add(
                "correct"
            );

            elements.scorePopupHeading.textContent =
                `+${awardedPoints} Points`;

            elements.scorePopupTotal.textContent =
                `Total: ${score} / ` +
                gameData.scoring.maximum_score;
        } else {
            elements.scorePopup.classList.add(
                "incorrect"
            );

            elements.scorePopupHeading.textContent =
                "No Points This Time";

            elements.scorePopupTotal.textContent =
                `Total: ${score} / ` +
                gameData.scoring.maximum_score;
        }

        scorePopupTimer =
            window.setTimeout(() => {
                elements.scorePopup.hidden = true;
            }, 2200);
    }

    function moveToNextQuestion() {
        if (!questionSubmitted) {
            return;
        }

        currentQuestionIndex += 1;

        if (
            currentQuestionIndex >=
            questionQueue.length
        ) {
            showFinalResults();
            return;
        }

        renderCurrentQuestion();

        elements.gamePlayArea.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function updateLiveScore() {
        elements.liveScore.textContent =
            String(score);
    }

    function updateProgress(currentAnswered) {
        const currentPuzzle =
            getCurrentQuestion();

        if (currentPuzzle?.isBonus) {
            elements.progressPercentage.textContent =
                "100%";

            elements.gameProgressBar.style.width =
                "100%";

            return;
        }

        const completedQuestions =
            currentQuestionIndex +
            (currentAnswered ? 1 : 0);

        const percentage =
            Math.round(
                (
                    completedQuestions /
                    scoredQuestions.length
                ) *
                100
            );

        elements.progressPercentage.textContent =
            `${percentage}%`;

        elements.gameProgressBar.style.width =
            `${percentage}%`;
    }

    function showFinalResults() {
        elements.gamePlayArea.hidden = true;
        elements.gameWelcome.hidden = true;
        elements.gameResults.hidden = false;

        const maximumScore =
            Number(gameData.scoring.maximum_score);

        const incorrectAnswers =
            scoredQuestions.length -
            correctAnswerTotal;

        const percentage =
            maximumScore > 0
                ? Math.round(
                    (score / maximumScore) * 100
                )
                : 0;

        const result =
            calculateResultBand(
                score,
                maximumScore
            );

        const previousBestScore =
            Number(
                localStorage.getItem(
                    BEST_SCORE_STORAGE_KEY
                ) || 0
            );

        const updatedBestScore =
            Math.max(
                previousBestScore,
                score
            );

        try {
            localStorage.setItem(
                BEST_SCORE_STORAGE_KEY,
                String(updatedBestScore)
            );
        } catch (error) {
            console.warn(
                "Could not save the best quiz score.",
                error
            );
        }

        elements.resultMedal.textContent =
            result.medal;

        elements.finalScore.textContent =
            String(score);

        elements.resultBand.textContent =
            result.title;

        elements.resultSummary.textContent =
            result.summary;

        elements.correctAnswerCount.textContent =
            String(correctAnswerTotal);

        elements.incorrectAnswerCount.textContent =
            String(incorrectAnswers);

        elements.finalPercentage.textContent =
            `${percentage}%`;

        elements.bestScore.textContent =
            `${updatedBestScore}/${maximumScore}`;

        renderLevelResults();

        elements.gameResults.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function calculateResultBand(
        finalScore,
        maximumScore
    ) {
        if (finalScore === maximumScore) {
            return {
                medal:
                    "🥇",

                title:
                    "Gold Medal — AI Reality Champion",

                summary:
                    "You answered every scored question correctly and " +
                    "demonstrated excellent understanding of practical AI, " +
                    "business value and responsible governance."
            };
        }

        if (finalScore >= 50) {
            return {
                medal:
                    "🥈",

                title:
                    "Silver Medal — AI Strategy Leader",

                summary:
                    "You demonstrated strong judgement across " +
                    "telecommunications, mobile money, customer service " +
                    "and responsible AI implementation."
            };
        }

        if (finalScore >= 25) {
            return {
                medal:
                    "🥉",

                title:
                    "Bronze Medal — AI Practitioner",

                summary:
                    "You have a developing practical understanding of AI. " +
                    "Review the explanations for the questions you missed."
            };
        }

        return {
            medal:
                "🧭",

            title:
                "AI Explorer",

            summary:
                "You have started building your AI literacy foundation. " +
                "Focus on distinguishing AI from automation and on the " +
                "importance of accountable human governance."
        };
    }

    function renderLevelResults() {
        elements.levelResultsGrid.replaceChildren();

        Object.entries(levelResults)
            .forEach(([levelNumber, result]) => {
                const column =
                    document.createElement("div");

                column.className =
                    "col-md-4";

                const card =
                    document.createElement("article");

                card.className =
                    "game-level-result-card";

                const levelLabel =
                    document.createElement("span");

                levelLabel.textContent =
                    `Level ${levelNumber}`;

                const heading =
                    document.createElement("h4");

                heading.textContent =
                    result.name;

                const scoreElement =
                    document.createElement("strong");

                scoreElement.textContent =
                    `${result.points}/${result.maximum}`;

                const answerElement =
                    document.createElement("p");

                answerElement.textContent =
                    `${result.correct} of ` +
                    `${result.total} correct`;

                card.append(
                    levelLabel,
                    heading,
                    scoreElement,
                    answerElement
                );

                column.appendChild(card);

                elements.levelResultsGrid.appendChild(
                    column
                );
            });
    }

    if (!validateRequiredElements()) {
        return;
    }

    elements.openQuizButton.addEventListener(
        "click",
        openDayOneQuiz
    );

    elements.startGameButton.addEventListener(
        "click",
        startGame
    );

    elements.submitAnswerButton.addEventListener(
        "click",
        submitCurrentAnswer
    );

    elements.nextQuestionButton.addEventListener(
        "click",
        moveToNextQuestion
    );

    elements.restartGameButton.addEventListener(
        "click",
        startGame
    );

    loadQuizData();
});