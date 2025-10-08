"use client";
import { useState } from "react";
import { supabase } from "@/services/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const redirectURL = "http://ai-recruiter-azure.vercel.app/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = redirectURL;
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectURL },
      });

      if (error) {
        setMessage(error.message);
      } else {
        const { error: insertError } = await supabase
          .from("Users")
          .insert([{ email, name, credits: 0, picture: "" }]);
        if (insertError) setMessage(insertError.message);
        else setMessage("Signup successful! Please verify your email.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectURL },
    });
    if (error) setMessage(error.message);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center px-4 font-inter">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Account"}
        </h1>
        <p className="text-gray-500 mb-6">
          {isLogin
            ? "Login to continue to AIcruiter"
            : "Sign up to get started with AIcruiter"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && <p className="text-red-500 mt-3 text-sm">{message}</p>}

        <div className="my-6 text-gray-400 text-sm flex items-center gap-2 justify-center">
          <div className="w-1/4 h-px bg-gray-300"></div>
          <span>OR</span>
          <div className="w-1/4 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-all"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="mt-6 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
