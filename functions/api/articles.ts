
// Define Cloudflare Workers types locally to avoid compilation errors if types are missing
interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  error?: string;
  meta: any;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec<T = unknown>(query: string): Promise<D1Result<T>>;
}

interface EventContext<Env, P extends string, Data> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

type PagesFunction<Env = unknown, P extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> = (
  context: EventContext<Env, P, Data>
) => Response | Promise<Response>;

interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const projectId = url.searchParams.get("project_id");
  const status = url.searchParams.get("status");
  const slug = url.searchParams.get("slug");

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!env.DB) {
      throw new Error("Database binding 'DB' not found.");
    }

    // Build query
    const conditions: string[] = [];
    const params: any[] = [];

    if (projectId) {
      conditions.push("project_id = ?");
      // Cast to number to ensure DB matches correctly if column is INTEGER
      params.push(Number(projectId));
    }

    if (status) {
      conditions.push("status = ?");
      params.push(status);
    }

    if (slug) {
      conditions.push("slug = ?");
      params.push(slug);
    }

    let query = "SELECT * FROM articles";
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY date_published DESC";

    // Debug logging to Cloudflare console
    console.log("Executing SQL:", query);
    console.log("With params:", params);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (e: any) {
    console.error("Database Error:", e);
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500, 
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      } 
    });
  }
}
