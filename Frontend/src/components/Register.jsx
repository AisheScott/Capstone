import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/productApi";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    name: "",
    email_address: "",
    mailing_address: "",
    phone_number: "",
    billing_address: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({
        ...credentials,
        is_admin: false, // or true if needed
      }).unwrap();

      localStorage.setItem("token", response.token);
      navigate("/dashboard"); // or wherever you go after registration
    } catch (err) {
      console.error("Error while registering user:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <section id="Register">
      <form id="RegisterForm" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Full Name
          <input
            name="name"
            placeholder="Full Name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            name="email_address"
            type="email"
            placeholder="Email"
            value={credentials.email_address}
            onChange={handleChange}
          />
        </label>
        <label>
          Mailing Address
          <input
            name="mailing_address"
            placeholder="Mailing Address"
            value={credentials.mailing_address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone_number"
            placeholder="Phone Number"
            value={credentials.phone_number}
            onChange={handleChange}
          />
        </label>
        <label>
          Billing Address
          <input
            name="billing_address"
            placeholder="Billing Address"
            value={credentials.billing_address}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Registration failed. Please try again.</p>}

      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </section>
  );
}

export default Register;