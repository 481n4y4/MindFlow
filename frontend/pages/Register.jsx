import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Register berhasil, silakan login");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Register gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-80 rounded-lg bg-white p-6 shadow"
      >
        <h2 className="mb-4 text-xl font-bold">Register</h2>

        {error && <p className="mb-2 text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Nama"
          className="mb-3 w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="w-full rounded bg-green-600 p-2 text-white">
          Register
        </button>

        <p className="mt-3 text-sm text-center">
          Sudah punya akun?{" "}
          <span
            className="cursor-pointer text-blue-600"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
