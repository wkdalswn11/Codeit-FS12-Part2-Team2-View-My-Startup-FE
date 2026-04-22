import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../components/modal/AlertModal";
import "../../styles/Auth.css";
import { loginUser, signupUser } from "../../services/userApi";
import useUserStore from "../../store/userStore";

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

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const setUser = useUserStore((state) => state.setUser);

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

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      emailRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleConfirm = async () => {
    if (!validate()) return;

    try {
      const result = await loginUser({
        name: name.trim(),
        email: email.trim(),
      });

      setUser(result.data);
      onLoginSuccess?.(result.data);

      setIsSignupSuccess(false);
      setModalMessage("로그인이 완료됐습니다.");
    } catch (error) {
      setIsSignupSuccess(false);
      setModalMessage(error.message);
    }
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      await signupUser({
        name: name.trim(),
        email: email.trim(),
      });

      setIsSignupSuccess(true);
      setModalMessage("회원가입이 완료됐습니다.");
    } catch (error) {
      setIsSignupSuccess(false);
      setModalMessage(error.message);
    }
  };

  const handleModalClose = () => {
    setModalMessage("");

    if (isSignupSuccess) {
      setMode("login");
      setName("");
      setEmail("");
      clearErrors();
    } else if (mode === "login") {
      navigate(redirectPath, { replace: true });
    }
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

      <AlertModal
        isOpen={Boolean(modalMessage)}
        message={modalMessage}
        onClose={handleModalClose}
      />
    </div>
  );
}
