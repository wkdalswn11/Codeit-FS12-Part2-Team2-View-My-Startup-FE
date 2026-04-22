const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyCompany = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/favorites`);

  if (!res.ok) {
    throw new Error("나의 기업 조회 실패");
  }

  const result = await res.json();
  const companies = result.data || [];
  return companies[0] ?? null;
};

export const getCompareCompanies = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/compares`);

  if (!res.ok) {
    throw new Error("비교 기업 조회 실패");
  }

  const result = await res.json();
  return result.data || [];
};

export const deleteMyCompany = async (userId, companyId) => {
  const res = await fetch(
    `${BASE_URL}/users/${userId}/favorites/${companyId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("나의 기업 선택 취소 실패");
  }

  return true;
};

export const deleteCompareCompany = async (userId, companyId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/compares/${companyId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("비교 기업 선택 해제 실패");
  }

  return true;
};

export const resetAllSelections = async (userId, compareCompanies) => {
  await Promise.all(
    compareCompanies.map(() =>
      fetch(`${BASE_URL}/users/${userId}/selections`, {
        method: "DELETE",
      }),
    ),
  );

  return true;
};

export const selectFavoriteCompany = async (userId, companyId) => {
  if (!userId) throw new Error("userId가 없습니다.");

  const res = await fetch(`${BASE_URL}/users/${userId}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ companyId }),
  });

  if (!res.ok) {
    throw new Error("나의 기업 선택 실패");
  }

  return true;
};

export const unselectFavoriteCompany = async (userId, companyId) => {
  if (!userId) throw new Error("userId가 없습니다.");

  const res = await fetch(
    `${BASE_URL}/users/${userId}/favorites/${companyId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error("나의 기업 선택 취소 실패");
  }

  return true;
};

export const selectCompareCompany = async (userId, companyId) => {
  if (!userId) throw new Error("userId가 없습니다.");

  const res = await fetch(`${BASE_URL}/users/${userId}/compares`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ companyId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "에러 발생");
  }

  return true;
};

export const unselectCompareCompany = async (userId, companyId) => {
  if (!userId) throw new Error("userId가 없습니다.");

  const res = await fetch(`${BASE_URL}/users/${userId}/compares/${companyId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("삭제 실패");
  }

  return true;
};
