import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Login berhasil 🎉</p>

      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}
