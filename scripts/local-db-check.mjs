/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * Checks the browser database (assets/js/local-db.js) that takes over
 * when the site runs without the game server: registration, sign in,
 * points per question and the admin views.
 *
 *   node scripts/local-db-check.mjs
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(
    fileURLToPath(new URL("..", import.meta.url))
);

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

/* --------------------------- browser stand-in --------------------------- */

function createStorage() {
    const map = new Map();

    return {
        getItem: key => (map.has(key) ? map.get(key) : null),
        setItem: (key, value) => map.set(key, String(value)),
        removeItem: key => map.delete(key),
        clear: () => map.clear(),
        size: () => map.size
    };
}

const storage = createStorage();
const window = {};

vm.runInNewContext(
    fs.readFileSync(
        path.join(root, "assets/js/local-db.js"),
        "utf8"
    ),
    {
        window,
        localStorage: storage,
        console,
        URLSearchParams
    },
    { filename: "local-db.js" }
);

const LocalDb = window.LocalDb;

function call(method, url, body) {
    return LocalDb.handle(url, {
        method,
        body: body || null
    });
}

/* -------------------------------- checks -------------------------------- */

console.log(
    "\nGame Testing - GLA - browser database check\n" +
    "============================================\n"
);

check(
    "The browser database loads",
    Boolean(LocalDb) && typeof LocalDb.handle === "function"
);

const health = call("GET", "api/health");

check(
    "GET api/health answers locally",
    health.status === 200 &&
    health.data.maximumTotal === 175
);

const weak = call("POST", "api/register", {
    fullName: "Weak Password",
    email: "weak@example.com",
    password: "short",
    confirmPassword: "short"
});

check(
    "A weak password is refused",
    weak.status === 400
);

const register = call("POST", "api/register", {
    fullName: "Makhavhu MJ",
    email: "mbofhenijunior7@gmail.com",
    password: "Ghost1234",
    confirmPassword: "Ghost1234"
});

check(
    "A player can register and is signed in straight away",
    register.status === 201 &&
    register.data.ok === true &&
    register.data.user.points.maximum === 175 &&
    storage.size() > 0
);

const duplicate = call("POST", "api/register", {
    fullName: "Makhavhu MJ",
    email: "MBofhenijunior7@gmail.com",
    password: "Ghost1234",
    confirmPassword: "Ghost1234"
});

check(
    "A duplicate email (different case) is refused",
    duplicate.status === 409
);

const me = call("GET", "api/me");

check(
    "The signed-in player can read their own account",
    me.status === 200 &&
    me.data.user.email === "mbofhenijunior7@gmail.com"
);

const answer = call("POST", "api/answers", {
    gameId: "day1",
    questionId: "1",
    answer: "C",
    points: 5,
    maximum: 5,
    correct: true,
    label: "The Limbe Network Congestion Alarm"
});

check(
    "A correct answer is recorded with its points",
    answer.status === 200 &&
    answer.data.awarded === 5 &&
    answer.data.user.points.games.day1.points === 5
);

const retry = call("POST", "api/answers", {
    gameId: "day1",
    questionId: "1",
    answer: "A",
    points: 0,
    maximum: 5,
    correct: false
});

check(
    "A wrong retry keeps the best 5 points",
    retry.data.awarded === 0 &&
    retry.data.record.points === 5 &&
    retry.data.record.plays === 2 &&
    retry.data.user.points.total === 5
);

const round = call("POST", "api/answers", {
    gameId: "day2",
    questionId: "1",
    card: "A",
    data: ["Site alarms"],
    controls: ["Engineer confirms diagnosis"],
    success: ["Fewer unplanned outages"],
    points: 10,
    maximum: 10,
    correct: true
});

check(
    "A Game 2 round is recorded",
    round.data.user.points.games.day2.points === 10 &&
    round.data.user.points.total === 15
);

const adminBad = call("POST", "api/admin/login", {
    username: "admin",
    password: "nope"
});

check(
    "A wrong admin password is refused",
    adminBad.status === 401
);

const admin = call("POST", "api/admin/login", {
    username: "admin",
    password: "GLA@2026"
});

check(
    "The default admin login works",
    admin.status === 200 &&
    admin.data.admin.name === "GRIT Lab Africa Administrator"
);

const personal = call("POST", "api/admin/login", {
    username: "mbofhenijunior7@gmail.com",
    password: "GRIT@2026"
});

check(
    "The personal admin login works (username or email)",
    personal.status === 200 &&
    personal.data.admin.name === "Makhavhu MJ"
);

const users = call("GET", "api/admin/users");

check(
    "The admin sees every player with their points",
    users.status === 200 &&
    users.data.users.length === 1 &&
    users.data.users[0].points.total === 15 &&
    users.data.summary.users === 1,
    JSON.stringify(users.data.users && users.data.users.length)
);

const detail = call(
    "GET",
    "api/admin/users/" + users.data.users[0].id
);

check(
    "The admin can open one player and see every question",
    detail.status === 200 &&
    detail.data.questions.length === 2
);

const summaryCsv = LocalDb.csv("summary");

check(
    "The CSV export contains the player",
    summaryCsv.includes("Name,Email") &&
    summaryCsv.includes("Makhavhu MJ")
);

const questionsCsv = LocalDb.csv("questions");

check(
    "The per-question CSV export works",
    questionsCsv.includes("Points earned") &&
    questionsCsv.includes("Game 2")
);

const logout = call("POST", "api/logout");

check(
    "Signing out works",
    logout.status === 200 &&
    call("GET", "api/me").status === 401
);

const login = call("POST", "api/login", {
    email: "mbofhenijunior7@gmail.com",
    password: "Ghost1234"
});

check(
    "The player can sign in again and still has 15 points",
    login.status === 200 &&
    login.data.user.points.total === 15
);

console.log(
    "\n--------------------------------------------\n" +
    "Passed: " + passed + "\n" +
    "Failed: " + failed + "\n"
);

process.exit(failed ? 1 : 0);
