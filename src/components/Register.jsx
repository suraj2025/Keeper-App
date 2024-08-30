import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import "./Register.css";

function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSwitchToLogin(); // Automatically switch to login after successful registration
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
        <p className="switch-text">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="switch-button">
            Switch to Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
