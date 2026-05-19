const BASE_URL = "/api";

const apiFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (res.status === 401 && path !== "/auth/refresh") {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const retryRes = await fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!retryRes.ok) {
        const err = await retryRes.json().catch(() => ({}));
        throw new Error((err as { message?: string })?.message ?? `Request failed: ${retryRes.status}`);
      }

      return retryRes.json() as Promise<T>;
    }

    throw new Error("SESSION_EXPIRED");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string })?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
};

export default apiFetch;
