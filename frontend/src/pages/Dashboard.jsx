import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Login berhasil 🎉</p>
    </div>
  );
}
