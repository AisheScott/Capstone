import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/productApi";

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      const result = await login({ username: email, password }).unwrap();
      localStorage.setItem("token", result.token);
      navigate("/dashboard"); // or wherever you want to go after login
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <section id="Login">
      <form id="LoginForm" onSubmit={handleLogin}>
        <label htmlFor="email">
          Email
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Login failed. Please try again.</p>}

      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </section>
  );
}

export default Login;