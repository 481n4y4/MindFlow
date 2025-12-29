import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;

      // simpan token
      localStorage.setItem("token", token);

      alert("Login berhasil");
      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      setError("Login gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-80 rounded-lg bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-bold">Login</h2>

        {error && <p className="mb-2 text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-3 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded bg-blue-600 p-2 text-white">
          Login
        </button>
      </form>
    </div>
  );
}
