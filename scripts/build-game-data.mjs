/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * Builds lib/game-data.mjs from the two published game files.
 *
 * The browser keeps downloading assets/data/*.json, but the API
 * (server.mjs, the Vercel function and the Netlify function) uses the
 * generated module instead, so no host has to support JSON imports.
 *
 *   node scripts/build-game-data.mjs           write the module
 *   node scripts/build-game-data.mjs --check   fail if it is out of date
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
    fileURLToPath(new URL("..", import.meta.url))
);

const checkOnly = process.argv.includes("--check");

const files = [
    [
        "dayOneGame",
        "TNM_Malawi_AI_Reality_Puzzle_Challenge.json"
    ],
    [
        "dayTwoGame",
        "TNM_Malawi_AI_Solution_Match_Game_10_Scenarios.json"
    ]
];

const header = [
    "/**",
    " * Game Testing - GLA",
    " * ---------------------------------------------------------------",
    " * The two game data files, inlined as JavaScript.",
    " *",
    " * Generated from assets/data/*.json by",
    " *   node scripts/build-game-data.mjs",
    " *",
    " * The browser still downloads the JSON files; the API uses this",
    " * module so the serverless functions never depend on a host's JSON",
    " * import support.",
    " *",
    " * Do not edit by hand - run the script instead.",
    " */",
    ""
].join("\n");

const body = files
    .map(entry => {
        const name = entry[0];
        const file = entry[1];

        const data = JSON.parse(
            fs.readFileSync(
                path.join(root, "assets", "data", file),
                "utf8"
            )
        );

        return (
            "export const " +
            name +
            " = " +
            JSON.stringify(data, null, 2) +
            ";\n"
        );
    })
    .join("\n");

const target = path.join(root, "lib", "game-data.mjs");

if (checkOnly) {
    const current = fs.existsSync(target)
        ? fs.readFileSync(target, "utf8")
        : "";

    if (current !== header + body) {
        console.error(
            "lib/game-data.mjs is out of date. Run: " +
            "node scripts/build-game-data.mjs"
        );

        process.exit(1);
    }

    console.log("lib/game-data.mjs matches assets/data/*.json");

    process.exit(0);
}

fs.writeFileSync(target, header + body, "utf8");

console.log(
    "Wrote lib/game-data.mjs (" +
    (header + body).length +
    " characters)"
);
