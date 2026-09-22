/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * End-to-end check of the shared API: accounts, server-side scoring
 * and the admin views. Runs without any dependency and without a
 * network connection, using an in-memory store.
 *
 *   node scripts/smoke-test.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildCatalog } from "../lib/game-catalog.mjs";
import { createApi } from "../lib/api-core.mjs";

const root = path.resolve(
    fileURLToPath(new URL("..", import.meta.url))
);

function readGameFile(name) {
    return JSON.parse(
        fs.readFileSync(
            path.join(root, "assets", "data", name),
            "utf8"
        )
    );
}

const catalog = buildCatalog({
    dayOne: readGameFile(
        "TNM_Malawi_AI_Reality_Puzzle_Challenge.json"
    ),

    dayTwo: readGameFile(
        "TNM_Malawi_AI_Solution_Match_Game_10_Scenarios.json"
    )
});

function memoryStore() {
    const map = new Map();

    return {
        async get(key) {
            return map.has(key)
                ? structuredClone(map.get(key))
                : null;
        },

        async set(key, value) {
            map.set(key, structuredClone(value));

            return true;
        },

        async remove(key) {
            map.delete(key);

            return true;
        }
    };
}

const api = createApi({
    catalog,
    kv: memoryStore(),
    config: {
        adminUsername: "admin",
        adminPassword: "GLA@2026"
    }
});

let passed = 0;
let failed = 0;

function check(title, condition, detail) {
    if (condition) {
        passed += 1;
        console.log("  PASS  " + title);

        return;
    }

    failed += 1;

    console.log(
        "  FAIL  " + title +
        (detail ? "  -> " + detail : "")
    );
}

async function call(method, url, options = {}) {
    const response = await api.handle({
        method,
        path: url.split("?")[0],

        query: Object.fromEntries(
            new URLSearchParams(
                url.split("?")[1] || ""
            )
        ),

        body: options.body || null,
        cookie: options.cookie || "",
        secure: false
    });

    const setCookie =
        response.headers?.["set-cookie"] ||
        response.headers?.["Set-Cookie"] ||
        "";

    return {
        status: response.status,
        body: response.json ?? response.text,
        headers: response.headers || {},

        cookie:
            options.cookie ||
            setCookie.split(";")[0] ||
            ""
    };
}

function scenarioOne() {
    return catalog.games.day2.questions["1"];
}

console.log(
    "\nGame Testing - GLA - API smoke test\n" +
    "=====================================\n"
);

/* ------------------------------ catalogue ------------------------------ */

console.log("Catalogue");

check(
    "Game 1 has 15 scored questions worth 75 points",
    catalog.games.day1.questionCount === 15 &&
    catalog.games.day1.maximum === 75,
    JSON.stringify({
        questions: catalog.games.day1.questionCount,
        maximum: catalog.games.day1.maximum
    })
);

check(
    "Game 2 has 10 scenarios worth 100 points",
    catalog.games.day2.questionCount === 10 &&
    catalog.games.day2.maximum === 100,

    JSON.stringify({
        scenarios: catalog.games.day2.questionCount,
        maximum: catalog.games.day2.maximum
    })
);

check(
    "Total maximum is 175 points",
    catalog.maximumTotal === 175,
    String(catalog.maximumTotal)
);

check(
    "Game 2 round rules are 5 + 2 + 2 + 1",
    catalog.games.day2.roundRules.maximum === 10,
    JSON.stringify(catalog.games.day2.roundRules)
);

/* -------------------------------- health -------------------------------- */

const health = await call("GET", "/api/health");

check(
    "GET /api/health answers with the two games",
    health.status === 200 &&
    health.body.ok === true &&
    health.body.games.length === 2
);

/* ------------------------------ accounts ------------------------------- */

console.log("\nAccounts");

const weak = await call("POST", "/api/register", {
    body: {
        fullName: "Weak Password",
        email: "weak@example.com",
        password: "short",
        confirmPassword: "short"
    }
});

check(
    "A weak password is refused",
    weak.status === 400 &&
    /password/i.test(weak.body.message || "")
);

const register = await call("POST", "/api/register", {
    body: {
        fullName: "Thandi Mwale",
        email: "Thandi@GritLabAfrica.org",
        password: "Ghost1234",
        confirmPassword: "Ghost1234",
        remember: true
    }
});

check(
    "A new account is created and signed in",
    register.status === 201 &&
    register.body.ok === true &&
    register.body.user.email === "Thandi@GritLabAfrica.org" &&
    register.cookie.startsWith("gla_sid=")
);

let cookie = register.cookie;

const duplicate = await call("POST", "/api/register", {
    body: {
        fullName: "Thandi Mwale",
        email: "thandi@gritlabafrica.org",
        password: "Ghost1234",
        confirmPassword: "Ghost1234"
    }
});

check(
    "A duplicate email (different case) is refused",
    duplicate.status === 409
);

const wrongPassword = await call("POST", "/api/login", {
    body: {
        email: "thandi@gritlabafrica.org",
        password: "Wrong12345"
    }
});

check(
    "A wrong password is refused",
    wrongPassword.status === 401
);

const login = await call("POST", "/api/login", {
    body: {
        email: "thandi@gritlabafrica.org",
        password: "Ghost1234",
        remember: false
    }
});

check(
    "Signing in works with the correct password",
    login.status === 200 &&
    login.body.ok === true,
    JSON.stringify(login.body)
);

const me = await call("GET", "/api/me", { cookie });

check(
    "GET /api/me returns the account with 0 of 175 points",
    me.status === 200 &&
    me.body.user.points.total === 0 &&
    me.body.user.points.maximum === 175,
    JSON.stringify(me.body)
);

const anonymousAnswers = await call("POST", "/api/answers", {
    body: {
        gameId: "day1",
        questionId: "1",
        answer: "C"
    }
});

check(
    "Answers cannot be scored without a session",
    anonymousAnswers.status === 401
);

/* ------------------------------- scoring ------------------------------- */

console.log("\nScoring");

const questionOne = catalog.games.day1.questions["1"];
const rightAnswer = questionOne.answer;

const wrongAnswer =
    rightAnswer === "A"
        ? "B"
        : "A";

const firstAnswer = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day1",
        questionId: "1",
        answer: rightAnswer
    }
});

check(
    "A correct Game 1 answer scores 5 points",
    firstAnswer.status === 200 &&
    firstAnswer.body.awarded === 5 &&
    firstAnswer.body.correct === true &&
    firstAnswer.body.user.points.games.day1.points === 5,
    JSON.stringify(firstAnswer.body.record)
);

const replay = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day1",
        questionId: "1",
        answer: wrongAnswer
    }
});

check(
    "A wrong retry scores 0 but keeps the best 5 points",
    replay.body.awarded === 0 &&
    replay.body.record.points === 5 &&
    replay.body.record.plays === 2 &&
    replay.body.user.points.games.day1.points === 5,
    JSON.stringify(replay.body.record)
);

const bonus = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day1",
        questionId: "bonus",
        answer: "A"
    }
});

check(
    "The bonus reflection question scores 0 and is not counted",
    bonus.status === 200 &&
    bonus.body.awarded === 0 &&
    bonus.body.user.points.games.day1.answered === 1
);

const scenario = scenarioOne();

const perfect = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day2",
        questionId: "1",
        card: scenario.card,
        data: scenario.data.slice(0, 3),
        controls: scenario.controls.slice(0, 2),
        success: [scenario.success[0]]
    }
});

check(
    "A perfect Game 2 round scores all 10 points",
    perfect.status === 200 &&
    perfect.body.awarded === 10 &&
    perfect.body.correct === true,
    JSON.stringify(perfect.body.breakdown)
);

const partial = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day2",
        questionId: "1",
        card: scenario.card,
        data: scenario.data.slice(0, 2),
        controls: [],
        success: []
    }
});

check(
    "A partial Game 2 round scores 5 + 1 = 6 points",
    partial.body.awarded === 6,
    JSON.stringify(partial.body.breakdown)
);

const stillBest = await call("GET", "/api/me", { cookie });

check(
    "The account keeps the best score per question (5 + 10 = 15)",
    stillBest.body.user.points.total === 15 &&
    stillBest.body.user.points.games.day1.points === 5 &&
    stillBest.body.user.points.games.day2.points === 10,
    JSON.stringify(stillBest.body.user.points.games)
);

const unknownQuestion = await call("POST", "/api/answers", {
    cookie,

    body: {
        gameId: "day1",
        questionId: "999",
        answer: "A"
    }
});

check(
    "An unknown question is rejected",
    unknownQuestion.status === 400
);

/* -------------------------------- admin -------------------------------- */

console.log("\nAdmin");

const badAdmin = await call("POST", "/api/admin/login", {
    body: {
        username: "admin",
        password: "not-the-password"
    }
});

check(
    "A wrong admin password is refused",
    badAdmin.status === 401
);

const adminLogin = await call("POST", "/api/admin/login", {
    body: {
        username: "admin",
        password: "GLA@2026",
        remember: true
    }
});

const adminCookie = adminLogin.cookie;

check(
    "The admin can sign in with the default credentials",
    adminLogin.status === 200 &&
    adminLogin.body.ok === true &&
    adminCookie.startsWith("gla_admin_sid=")
);

const blocked = await call("GET", "/api/admin/users");

check(
    "The user list is protected",
    blocked.status === 401
);

const users = await call("GET", "/api/admin/users", {
    cookie: adminCookie
});

check(
    "The admin sees every registered user with their points",
    users.status === 200 &&
    users.body.users.length === 1 &&
    users.body.users[0].email === "Thandi@GritLabAfrica.org" &&
    users.body.users[0].points.total === 15 &&
    users.body.summary.users === 1,
    JSON.stringify(users.body.summary)
);

const detail = await call(
    "GET",
    "/api/admin/users/u1",
    { cookie: adminCookie }
);

check(
    "The admin can open one user and see every question",
    detail.status === 200 &&
    detail.body.questions.length === 3 &&
    detail.body.questions[0].maximum === 5,
    JSON.stringify(
        detail.body.questions.map(row => ({
            game: row.gameId,
            question: row.questionId,
            points: row.points
        }))
    )
);

const summaryCsv = await call(
    "GET",
    "/api/admin/users.csv",
    { cookie: adminCookie }
);

check(
    "The summary CSV export has a header and one row per user",
    summaryCsv.status === 200 &&
    /^Name,Email/m.test(
        String(summaryCsv.body).replace(/^\uFEFF/, "")
    ) &&
    String(summaryCsv.body).includes("Thandi Mwale")
);

const questionsCsv = await call(
    "GET",
    "/api/admin/users.csv?view=questions",
    { cookie: adminCookie }
);

check(
    "The per-question CSV export lists the answered questions",
    questionsCsv.status === 200 &&
    /Points earned/.test(String(questionsCsv.body)) &&
    String(questionsCsv.body).includes("Game 2")
);

const adminLogout = await call("POST", "/api/admin/logout", {
    cookie: adminCookie
});

check(
    "The admin can sign out",
    adminLogout.status === 200 &&
    adminLogout.body.ok === true
);

const signedOut = await call("GET", "/api/admin/users", {
    cookie: adminLogout.cookie
});

check(
    "The admin session is gone after signing out",
    signedOut.status === 401
);

const userLogout = await call("POST", "/api/logout", {
    cookie
});

const afterLogout = await call("GET", "/api/me", {
    cookie: userLogout.cookie
});

check(
    "A signed-out player can no longer read their account",
    afterLogout.status === 401
);

/* ------------------------------- summary ------------------------------- */

console.log(
    "\n-------------------------------------\n" +
    "Passed: " + passed + "\n" +
    "Failed: " + failed + "\n"
);

process.exit(failed ? 1 : 0);
