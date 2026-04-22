const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`데이터 요청 실패: ${res.status}`);
  }

  return JSON.parse(text);
}

export async function getCompanies({
  page = 1,
  limit = 10,
  sort,
  keyword = "",
}) {
  return request(
    `/companies?page=${page}&limit=${limit}&sort=${sort}&keyword=${keyword}`,
  );
}

export async function getCompanyDetail(id) {
  return request(`/companies/${id}`);
}

export async function searchCompanies({ keyword = "", page = 1, limit = 5 }) {
  return request(`/companies?keyword=${keyword}&page=${page}&limit=${limit}`);
}

export async function getRecentFavoriteCompanies(userId) {
  if (!userId) {
    throw new Error("userId가 없습니다.");
  }

  return request(`/users/${userId}/favorites/last`);
}

export async function getSelectedCompareCompanies(userId) {
  if (!userId) {
    throw new Error("userId가 없습니다.");
  }

  return request(`/users/${userId}/compares`);
}
