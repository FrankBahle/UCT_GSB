/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * Vercel serverless function that serves the whole /api surface.
 *
 * vercel.json rewrites every /api/... request to this file and passes
 * the remaining path in the "route" query parameter:
 *
 *   /api/register          ->  /api/handler?route=register
 *   /api/admin/users/u1    ->  /api/handler?route=admin/users/u1
 *
 * Nothing heavy happens while this module loads: the game catalogue
 * and the store are created on the first request, so a missing hosted
 * store is reported as clean JSON instead of crashing the function.
 */

import { ADMIN_LOGINS } from "../lib/admin-seed.mjs";
import { dayOneGame, dayTwoGame } from "../lib/game-data.mjs";
import { createApi } from "../lib/api-core.mjs";
import { buildCatalog } from "../lib/game-catalog.mjs";
import { createRestStore } from "../lib/kv-rest.mjs";

let cachedApi = null;

function getApi() {
    if (!cachedApi) {
        cachedApi = createApi({
            catalog: buildCatalog({
                dayOne: dayOneGame,
                dayTwo: dayTwoGame
            }),

            kv: createRestStore(),

            config: {
                adminUsername:
                    process.env.ADMIN_USERNAME || "admin",

                adminPassword:
                    process.env.ADMIN_PASSWORD || "GLA@2026",

                adminLogins: ADMIN_LOGINS,

                siteName: "Game Testing - GLA"
            }
        });
    }

    return cachedApi;
}

/** The API path, either from the rewrite parameter or the URL itself. */
function routeFrom(url) {
    const route = url.searchParams.get("route");

    if (route) {
        return (
            "/api/" +
            route.replace(/^\/+/, "")
        );
    }

    const pathname = String(url.pathname || "");

    return pathname || "/api/health";
}

function queryFrom(url) {
    const query = Object.fromEntries(
        url.searchParams.entries()
    );

    delete query.route;

    return query;
}

function bodyFrom(request) {
    const body = request.body;

    if (!body) {
        return null;
    }

    if (typeof body === "object") {
        return body;
    }

    try {
        return JSON.parse(String(body));
    } catch (error) {
        return null;
    }
}

export default async function handler(request, response) {
    const host =
        request.headers["x-forwarded-host"] ||
        request.headers.host ||
        "localhost";

    const url = new URL(
        request.url || "/",
        "https://" + host
    );

    let result = null;

    try {
        result = await getApi().handle({
            method: request.method,
            path: routeFrom(url),
            query: queryFrom(url),
            body: bodyFrom(request),

            cookie: request.headers.cookie || "",

            secure: true
        });
    } catch (error) {
        result = {
            status: 500,

            headers: {
                "content-type":
                    "application/json; charset=utf-8"
            },

            json: {
                ok: false,

                message:
                    "The game API could not start: " +
                    (
                        error?.message ||
                        String(error)
                    )
            }
        };
    }

    const headers = {
        "cache-control": "no-store",
        ...result.headers
    };

    headers["content-type"] =
        headers["content-type"] ||
        (
            result.json !== undefined
                ? "application/json; charset=utf-8"
                : "text/plain; charset=utf-8"
        );

    Object.entries(headers).forEach(([name, value]) => {
        response.setHeader(name, value);
    });

    response.statusCode = result.status;

    response.end(
        result.json !== undefined
            ? JSON.stringify(result.json)
            : String(result.text ?? "")
    );
}
