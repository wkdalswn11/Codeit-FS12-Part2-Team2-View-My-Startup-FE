import "../../styles/skeleton.css";

function Skeleton({ className = "" }) {
  return <div className={`skeleton ${className}`}></div>;
}

export default Skeleton;
