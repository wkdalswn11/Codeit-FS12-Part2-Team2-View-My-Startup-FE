const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const text = await res.text();

  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || `요청에 실패했습니다. (${res.status})`,
    );
  }
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

export async function updateCompanyInvestment({ userId, companyId, data }) {
  return request(`/users/${userId}/investments/${companyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteCompanyInvestment({ userId, companyId }) {
  return request(`/users/${userId}/investments/${companyId}`, {
    method: "DELETE",
  });
}

export async function getCompanyInvestment({ userId, investmentId }) {
  return request(`/users/${userId}/investments/${investmentId}`);
}
