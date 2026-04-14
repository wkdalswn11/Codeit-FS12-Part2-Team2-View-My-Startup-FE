import { useState, useRef, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // <--- 정규표현식 (올바른 이메일 형식인지 검사)
const LS_KEY = "mystartup_user";

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  localStorage.setItem(LS_KEY, JSON.stringify(user));
};

// 메인 컴포넌트

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) onLoginSuccess?.(user);
  }, []);

  const clearErrors = () => {
    setNameError("");
    setEmailError("");
  };

  const switchMode = (next) => {
    setMode(next);
    setName("");
    setEmail("");
    clearErrors();
  };

  const validate = () => {
    clearErrors();

    if (!name.trim()) {
      setNameError("이름을 입력해 주세요.");
      nameRef.current?.focus();
      return false;
    }
    if (!email.trim()) {
      setEmailError("이메일을 입력해 주세요.");
      emailRef.current?.focus();
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      emailRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    const user = { name: name.trim(), email: email.trim() };
    saveUser(user);
    onLoginSuccess?.(user);
  };

  const handleSignup = () => {
    if (!validate()) return;
    const user = { name: name.trim(), email: email.trim() };
    saveUser(user);
    onLoginSuccess?.(user);
  };

  return (
    <>
      <style>{css}</style>

      <div style={s.page}>
        <div style={s.card}>
          <h2 style={s.title}>{mode === "login" ? "로그인" : "회원가입"}</h2>

          {/* 이름 필드 */}
          <div style={s.fieldGroup}>
            <label style={s.label}>이름</label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              placeholder="이름을 입력해 주세요"
              style={{ ...s.input, ...(nameError ? s.inputError : {}) }}
            />
            {nameError && <p style={s.errorText}>*{nameError}</p>}
          </div>

          {/* 이메일 필드 */}
          <div style={s.fieldGroup}>
            <label style={s.label}>이메일</label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="이메일을 입력해 주세요"
              style={{ ...s.input, ...(emailError ? s.inputError : {}) }}
            />
            {emailError && <p style={s.errorText}>*{emailError}</p>}
          </div>

          {/* 버튼 영역 */}
          <div style={s.btnRow}>
            {mode === "login" ? (
              <>
                <button style={s.btnOutline} onClick={handleConfirm}>
                  확인
                </button>
                <button style={s.btnFill} onClick={() => switchMode("signup")}>
                  회원가입
                </button>
              </>
            ) : (
              <button style={s.btnFillCenter} onClick={handleSignup}>
                확인
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #111111; }
  input::placeholder { color: #888; font-size: 14px; }
  input:focus { outline: none; border-color: #e05a3a !important; }
`;

const s = {
  page: {
    minHeight: "100vh",
    background: "#111111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Noto Sans KR', sans-serif",
    padding: "40px 16px",
  },
  card: {
    width: "496px",
    minHeight: "370px",
    background: "#1e1e1e",
    borderRadius: 12,
    padding: "32px 28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    textAlign: "left",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 2,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
  },
  input: {
    padding: "12px 14px",
    background: "#111111",
    border: "1.5px solid #747474",
    borderRadius: 8,
    color: "#fff",
    fontSize: 14,
    fontFamily: "'Noto Sans KR', sans-serif",
    transition: "border-color 0.2s",
  },
  inputError: {
    borderColor: "#C41013",
  },
  errorText: {
    fontSize: 13,
    color: "#C41013",
    marginTop: 2,
  },
  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 4,
    width: "100%",
  },
  btnOutline: {
    padding: "10px 40px",
    background: "transparent",
    border: "1.5px solid #EB5230",
    borderRadius: 999,
    color: "#EB5230",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Noto Sans KR', sans-serif",
    transition: "background 0.15s",
  },
  btnFill: {
    padding: "10px 36px",
    background: "#EB5230",
    border: "1.5px solid #EB5230",
    borderRadius: 999,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Noto Sans KR', sans-serif",
    transition: "background 0.15s",
  },
  btnFillCenter: {
    padding: "10px 40px",
    background: "transparent",
    border: "1.5px solid #EB5230",
    borderRadius: 999,
    color: "#EB5230",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
};
