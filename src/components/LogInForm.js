import "./LogInForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function LogInForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [messageForUser, setMessageForUser] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  function handleUser(input) {
    const { name, value } = input.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  function resetStates() {
    setUser({
      email: "",
      password: "",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        console.error("Login failed. Status:", response.status);
        setMessageForUser("Login failed. Please check your credentials.");
        return;
      }

      const json = await response.json();
      const token = json.token;
      const role = JSON.parse(atob(token.split(".")[1])).role;
      formRef.current.reset();
      resetStates();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setMessageForUser(
        "An error occurred during login. Please try again later.",
      );
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            id="email"
            type="email"
            required
            name="email"
            onChange={handleUser}
            value={user.email}
            placeholder="Email"
          />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            required
            name="password"
            onChange={handleUser}
            value={user.password}
          />
        </div>
        <label className="label" htmlFor="showpswd">
          Show Password
          <input
            className="showpswd"
            id="showpswd"
            type="checkbox"
            name="showpswd"
            onChange={() => setShowPassword((show) => !show)}
            checked={showPassword}
          />
        </label>
        <span className="submit-message">{messageForUser}</span>
        <button type="submit">Login</button>

        <Link to="/registration" className="sign-up-link">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account? Click here to register.
        </Link>
      </form>
    </div>
  );
}
export default LogInForm;
