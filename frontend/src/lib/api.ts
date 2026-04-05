const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
};

export async function submitContact(
  payload: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  const ctrl = new AbortController();
  const t = window.setTimeout(() => ctrl.abort(), 20000);
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
  } catch {
    return { ok: false, error: "Network error or timeout. Try again." };
  } finally {
    window.clearTimeout(t);
  }

  let data: { ok?: boolean; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* ignore */
  }

  if (!res.ok) {
    return { ok: false, error: data.error || "Something went wrong." };
  }
  if (!data.ok) {
    return { ok: false, error: data.error || "Request failed." };
  }
  return { ok: true };
}
