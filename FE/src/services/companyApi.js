const BASE_URL = "http://localhost:8080";

export async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`데이터 요청 실패: ${res.status}`);
  }

  return res.json();
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

export async function updateCompanyInvestment({
  companyId,
  investmentId,
  data,
}) {
  return request(`/companies/${companyId}/investments/${investmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteCompanyInvestment({ companyId, investmentId }) {
  return request(`/companies/${companyId}/investments/${investmentId}`, {
    method: "DELETE",
  });
}
