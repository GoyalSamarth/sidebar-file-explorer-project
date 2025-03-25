import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  //state to store username, password and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (
      (username === "admin" && password === "password") ||
      (username === "demo" && password === "demo")
    ) {
      localStorage.setItem("isAuthenticated", "true");
      onLogin();  // Update the authentication state in App.js
      navigate("/dashboard");  // Redirect to the dashboard
    } else {
      setError("Invalid username or password"); // Show error message
    }
  };


  const handleForgotPassword = () => {
    alert("Under construction.");
  };

  const handleRequestAccount = () => {
    alert("Under construction.");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleLogin}> 
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={handleForgotPassword} 
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </button>
          <span className="mx-2">|</span>
          <button 
            onClick={handleRequestAccount} 
            className="text-blue-500 hover:underline text-sm"
          >
            Request Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
