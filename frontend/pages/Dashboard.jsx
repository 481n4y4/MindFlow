import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <button
        onClick={() => navigate("/todos")}
        className="mr-2 mt-4 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Todo List
      </button>

      <button
        onClick={logout}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}
