import { useNavigate } from "react-router-dom";
//import { useLoginMutation } from "../api/productApi";

function Login() {
  const navigate = useNavigate();
  
  
  
  return (
    <section id="Login">
      <form id="LoginForm">
        <label htmlFor="email">
          Email
          <input placeholder="Email" type="email"></input>
        </label>
        <label htmlFor="password">
          Password
          <input type="Password" placeholder="password"></input>
        </label>
      </form>

      <button>Login</button>

      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </section>
  );
}

export default Login;