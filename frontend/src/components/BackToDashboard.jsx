import { useNavigate } from "react-router-dom";

export default function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <button
      className="uk-button uk-button-default uk-margin-bottom"
      onClick={() => navigate("/dashboard")}
      style={{
        borderRadius: "10px",
        fontWeight: "600"
      }}
    >
      ⬅ Volver al Dashboard
    </button>
  );
}
