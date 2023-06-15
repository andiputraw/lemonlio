import { createClient } from "$supabase";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { decode, encode } from "$std/encoding/base64.ts";

import CONFIG from "../config.ts";

export const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_KEY,
);

export function supabaseSSR(req: Request, res: Response) {
  return createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY, {
    auth: {
      detectSessionInUrl: false,
      flowType: "pkce",
      storageKey: "pkce",
      storage: {
        setItem: (key, value) => {
          const val = encode(value);
          setCookie(res.headers, {
            name: key,
            value: val,
            sameSite: "Lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
        },
        getItem: (key) => {
          const cookie = getCookies(req.headers);
          const value = cookie[key];
          if (!value) {
            return null;
          }
          const decoded = decode(value);
          const decodedValue = new TextDecoder("utf-8").decode(decoded);
          return decodedValue;
        },
        removeItem: (key) => {
          setCookie(res.headers, {
            name: key,
            value: "",
            sameSite: "Lax",
            expires: new Date(0),
            path: "/",
          });
        },
      },
    },
  });
}

export async function getUserFromSession(req: Request) {
  const cookie = getCookies(req.headers);
  const access = cookie.token;

  if (!access) {
    return null;
  }

  const { data } = await supabase.auth.getUser(access);
  return data.user;
}

export function getAccessTokenFromSession(req: Request) {
  const cookie = getCookies(req.headers);
  const access = cookie.token;

  if (!access) {
    return null;
  }

  return access;
}

export function accessTokenExpired(req: Request) {
  const cookie = getCookies(req.headers);
  const token = cookie.token;

  if (!token) {
    return null;
  }
  const jwt = token.split(".")[1];
  const decodedValue = JSON.parse(atob(jwt));
  const exp = decodedValue.exp;
  const now = new Date().getTime() / 1000;
  return exp < now;
}

export async function refreshAccessToken(req: Request) {
  const cookie = getCookies(req.headers);
  const refresh = cookie.refresh;

  if (!refresh) {
    return null;
  }
  const { data } = await supabase.auth.refreshSession({
    refresh_token: refresh,
  });
  return data;
}

export function setAuthCookie(
  res: Response,
  refresh: string,
  access: string,
) {
  const expires = new Date(Date.now() + 60 * 60 * 24 * 7 * 30);
  setCookie(res.headers, {
    name: "token",
    value: access,
    path: "/",
    httpOnly: true,
    expires,
  });
  setCookie(res.headers, {
    name: "refresh",
    value: refresh,
    path: "/",
    httpOnly: true,
    expires,
  });
}

export async function isLoggedUserIsAdministrator(
  req: Request,
): Promise<boolean> {
  const user = await getUserFromSession(req);

  if (!user) {
    return false;
  }
  const result = await supabase.from("user_role").select("*").filter(
    "user_id",
    "eq",
    user.id,
  ).filter("roles_id", "eq", "2");

  if (result.error) {
    return false;
  }

  if (result.count) {
    return false;
  }
  return true;
}
