import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (currentUser) {
    navigate(from, { replace: true });
    return null;
  }
  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login or Sign Up</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="space-y-4">
        <button
          onClick={() => handleSocialLogin(new GoogleAuthProvider())}
          className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <i className="ri-google-fill"></i> Continue with Google
        </button>
        <button
          onClick={() => handleSocialLogin(new GithubAuthProvider())}
          className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <i className="ri-github-fill"></i> Continue with GitHub
        </button>
      </div>
      <div className="my-6 flex items-center">
        <hr className="flex-grow" />
        <span className="mx-4 text-gray-500"></span>
        <hr className="flow-grow" />
      </div>
      <form className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="w-full p-3 border rounded-lg"
        />
        <div className="flex gap-4">
          <button
            onClick={handleEmailLogin}
            className="w-full p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleEmailSignUp}
            className="w-full p-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg cursor-pointer"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
