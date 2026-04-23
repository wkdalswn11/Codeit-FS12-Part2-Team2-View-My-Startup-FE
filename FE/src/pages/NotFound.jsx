import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>

      <button onClick={() => navigate("/")}>메인 페이지로 이동</button>
    </div>
  );
};

export default NotFound;
