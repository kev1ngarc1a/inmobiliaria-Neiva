
import "../styles/MyRequests.css";
import BackToDashboard from "../components/BackToDashboard";


export default function MyRequests() {
  return (
    <div className="uk-container">
      <BackToDashboard />
      <h2 className="uk-heading-medium">Mis Peticiones</h2>
            <h2>Mis Peticiones</h2>

      <div className="request-empty">
        <p>Aún no tienes solicitudes.</p>
      </div>
    </div>

  );
}
