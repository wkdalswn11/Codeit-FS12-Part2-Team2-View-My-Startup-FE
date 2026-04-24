const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`데이터 요청 실패: ${res.status}`);
  }

  return JSON.parse(text);
}

export async function getTrends({ page = 1, limit = 10, sort }) {
  return request(`/companies/trending?days=${sort}page=${page}&limit=${limit}`);
}
