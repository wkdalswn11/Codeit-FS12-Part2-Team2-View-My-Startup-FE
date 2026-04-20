const BASE_URL = "http://localhost:8080";

export const signupUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "회원가입에 실패했습니다.");
  }

  return result;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "로그인에 실패했습니다.");
  }

  return result;
};
