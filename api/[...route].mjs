/**
 * Game Testing - GLA
 * ---------------------------------------------------------------
 * Vercel serverless function that serves the whole /api surface.
 *
 * The catch-all file name (api/[...route].mjs) makes Vercel send
 * every /api/... request here, so the browser code does not change
 * between local development, Netlify and Vercel.
 *
 * Data lives in the Upstash Redis / Vercel KV store when the
 * KV_REST_API_URL and KV_REST_API_TOKEN variables are present,
 * otherwise the reply explains what to configure.
 */

import dayOne from "../assets/data/TNM_Malawi_AI_Reality_Puzzle_Challenge.json";
import dayTwo from "../assets/data/TNM_Malawi_AI_Solution_Match_Game_10_Scenarios.json";

import { ADMIN_LOGINS } from "../lib/admin-seed.mjs";
import { createApi } from "../lib/api-core.mjs";
import { buildCatalog } from "../lib/game-catalog.mjs";
import { createRestStore } from "../lib/kv-rest.mjs";

const catalog = buildCatalog({ dayOne, dayTwo });

let cachedApi = null;

function getApi() {
    if (!cachedApi) {
        cachedApi = createApi({
            catalog,
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

function requestPath(request, url) {
    const pathname = String(url.pathname || "");

    if (pathname.startsWith("/api/")) {
        return pathname;
    }

    // Vercel may hand over the catch-all segments instead.
    const route = request.query?.route;

    if (route) {
        const parts = Array.isArray(route) ? route : [route];

        return "/api/" + parts.join("/");
    }

    return pathname;
}

function requestBody(request) {
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

    const query = Object.fromEntries(
        url.searchParams.entries()
    );

    let result = null;

    try {
        const api = getApi();

        result = await api.handle({
            method: request.method,
            path: requestPath(request, url),
            query,
            body: requestBody(request),

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
                    "The API could not start: " +
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
