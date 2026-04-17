import { useState, useRef, useEffect } from "react";
import "../../styles/Auth.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  }, [onLoginSuccess]);

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
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">
          {mode === "login" ? "로그인" : "회원가입"}
        </h2>

        <div className="auth-field-group">
          <label className="auth-label" htmlFor="auth-name">
            이름
          </label>
          <input
            id="auth-name"
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
            placeholder="이름을 입력해 주세요."
            className={`auth-input ${nameError ? "auth-input-error" : ""}`}
          />
          {nameError && <p className="auth-error-text">*{nameError}</p>}
        </div>

        <div className="auth-field-group">
          <label className="auth-label" htmlFor="auth-email">
            이메일
          </label>
          <input
            id="auth-email"
            ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="이메일을 입력해 주세요."
            className={`auth-input ${emailError ? "auth-input-error" : ""}`}
          />
          {emailError && <p className="auth-error-text">*{emailError}</p>}
        </div>

        <div className="auth-btn-row">
          {mode === "login" ? (
            <>
              <button
                type="button"
                className="auth-btn auth-btn-outline"
                onClick={handleConfirm}
              >
                확인
              </button>
              <button
                type="button"
                className="auth-btn auth-btn-fill"
                onClick={() => switchMode("signup")}
              >
                회원가입
              </button>
            </>
          ) : (
            <button
              type="button"
              className="auth-btn auth-btn-fill-center"
              onClick={handleSignup}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
