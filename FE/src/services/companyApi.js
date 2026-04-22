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

export async function getCompanyInvestments({
  id,
  page = 1,
  limit = 10,
  keyword = "",
}) {
  return request(
    `/companies/${id}/investments?page=${page}&limit=${limit}&keyword=${keyword}`,
  );
}

export async function createCompanyInvestment({ companyId, data }) {
  return request(`/companies/${companyId}/investments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateCompanyInvestment({ userId, investmentId, data }) {
  return request(`/users/${userId}/investments/${investmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteCompanyInvestment({ userId, investmentId }) {
  return request(`/users/${userId}/investments/${investmentId}`, {
    method: "DELETE",
  });
}
