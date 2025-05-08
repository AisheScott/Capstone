/* TODO - add your code to create a functional React component that renders a registration form */

import { useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../api/bookBuddyApi";
import { useEffect, useState } from "react";
// import React, {useState} from "react";

/* TODO - add your code to create a functional React component that renders a registration form */
function Register() {
  const navigate = useNavigate();
  // const [createUser] = useRegisterMutation(credentials);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setCredentials({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //     });
  //     navigate("/");
  //   }
  // }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUser(credentials).unwrap();
      
    } catch {
      console.log("Error while registering user: ", error);
    }
  };

  const handleChange = (event) => {
    const { name, value} = event.target;
    setCredentials((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <section id="Register">
      <form id="RegisterForm" onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
          <input name="firstName" placeholder="First Name" value={credentials.firstName} onChange={handleChange}></input>
        </label>
        <label htmlFor="lastName">
          Last Name
          <input name="lastName" placeholder="Last Name" value={credentials.lastName} onChange={handleChange}></input>
        </label>
        <label htmlFor="email">
          Email
          <input placeholder="Email" name="email" value={credentials.email} onChange={handleChange}></input>
        </label>
        <label htmlFor="password">
          Password
          <input name="password" placeholder="Password" value={credentials.password} onChange={handleChange}></input>
        </label>
      </form>

      <button type="submit">Register</button>

      <div>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </section>
  );
}

export default Register;