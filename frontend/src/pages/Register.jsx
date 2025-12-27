import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Create Account 🚀</h2>
        <p>
          Start shortening links in seconds.
          Access your dashboard and manage URLs effortlessly.
        </p>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={submit}>
          <h3>Register</h3>
          {Object.keys(form).map(k => (
            <input
              key={k}
              placeholder={k}
              onChange={e => setForm({ ...form, [k]: e.target.value })}
            />
          ))}
          <button>Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
