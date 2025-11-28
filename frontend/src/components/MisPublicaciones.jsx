import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function MisPublicaciones() {
  const { user } = useAuth();
  const [props, setProps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/properties/mias", {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setProps(res.data));
  }, []);

  return (
    <div className="uk-grid uk-child-width-1-3@m" uk-grid="true">
      {props.map(p => (
        <div key={p._id} className="uk-card uk-card-default uk-card-body">
          <h3>{p.title}</h3>
          <p>${p.price}</p>
          <button className="uk-button uk-button-danger">Eliminar</button>
        </div>
      ))}
    </div>
  );
}
