import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faSignOutAlt,
  faPlus,
  faEdit,
  faTrash,
  faClock,
  faCheck,
  faTimes,
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faListCheck,
  faCircleCheck,
  faHourglassHalf,
  faChartLine,
  faArrowTrendUp,
  faExclamationTriangle,
  faFilter,
  faXmark,
  faSpinner,
  faLayerGroup,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, active, completed
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
    setError("");
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data todos");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id) => {
    if (!editingTitle.trim()) {
      setError("Judul todo tidak boleh kosong");
      return;
    }

    try {
      await api.put(`/todos/${id}`, { title: editingTitle });
      setEditingId(null);
      setEditingTitle("");
      setSuccessMessage("Todo berhasil diperbarui!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal mengupdate todo");
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post("/todos", { title });
      setTitle("");
      setSuccessMessage("Todo berhasil ditambahkan!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal menambahkan todo");
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus todo ini?")) return;

    try {
      await api.delete(`/todos/${id}`);
      setSuccessMessage("Todo berhasil dihapus!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus todo");
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      await api.put(`/todos/${id}`, { completed: !currentStatus });
      const statusText = !currentStatus ? "diselesaikan" : "dibuka kembali";
      setSuccessMessage(`Todo berhasil ${statusText}!`);
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal mengubah status todo");
    }
  };

  const getFilteredTodos = () => {
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeFilter === "active") {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (activeFilter === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    }

    return filtered;
  };

  const clearCompleted = async () => {
    if (!window.confirm("Hapus semua todo yang sudah selesai?")) return;

    const completedTodos = todos.filter((todo) => todo.completed);
    try {
      await Promise.all(
        completedTodos.map((todo) => api.delete(`/todos/${todo._id}`))
      );
      setSuccessMessage("Semua todo selesai telah dihapus!");
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus todo selesai");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-white text-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    MindFlow
                  </h1>
                  <p className="text-xs text-slate-500">Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-5 w-5 text-slate-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cari todo..."
                  className="pl-10 pr-4 py-2.5 w-64 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Profil"
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2.5 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-xl hover:from-slate-200 hover:to-slate-100 transition-all shadow-sm border border-slate-200 flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
                  <span className="font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Selamat datang di Dashboard
          </h2>
          <p className="text-slate-600">
            Kelola workflow dan produktivitas Anda dengan mudah
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Todo</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {todos.length}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faListCheck}
                  className="w-7 h-7 text-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium text-blue-600">
                  {todos.length > 0
                    ? Math.round((completedCount / todos.length) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      todos.length > 0
                        ? (completedCount / todos.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Selesai</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {completedCount}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="w-7 h-7 text-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <FontAwesomeIcon
                  icon={faArrowTrendUp}
                  className="w-4 h-4 mr-1"
                />
                <span>Produktivitas tinggi</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Belum Selesai
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {activeCount}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <FontAwesomeIcon
                  icon={faHourglassHalf}
                  className="w-7 h-7 text-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-orange-600">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="w-4 h-4 mr-1"
                />
                <span>Perlu perhatian</span>
              </div>
            </div>
          </div>
        </div>

        {/* Todo Management Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Todo Manager
                </h2>
                <p className="text-slate-600 mt-1">
                  Kelola daftar tugas dan produktivitas Anda
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative md:hidden">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="h-5 w-5 text-slate-400"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-lg hover:from-slate-200 hover:to-slate-100 transition-all border border-slate-200 flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                    Hapus Selesai
                  </button>
                )}

                <button
                className={`px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all transform hover:scale-[1.02] bg-slate-400`}
                onClick={() => navigate('/addTodoList')}
              >
                Tambah
              </button>
              </div>

              
            </div>
          </div>

          {/* Messages */}
          <div className="px-6 pt-4">
            {error && (
              <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="w-5 h-5 text-red-500 mr-2"
                  />
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl animate-fade-in">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="w-5 h-5 text-green-500 mr-2"
                  />
                  <span className="text-green-700 font-medium">
                    {successMessage}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Form */}
          <div className="px-6 py-4 border-b border-slate-200 bg-blue-50/50">
            <form onSubmit={addTodo} className="flex gap-3">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="h-5 w-5 text-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Tambahkan todo baru..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!title.trim() || isLoading}
                className={`px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all transform hover:scale-[1.02] ${
                  !title.trim() || isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200"
                }`}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Tambah"
                )}
              </button>
            </form>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex space-x-4">
              {[
                { id: "all", label: "Semua", count: todos.length },
                { id: "active", label: "Aktif", count: activeCount },
                { id: "completed", label: "Selesai", count: completedCount },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      filter.id === "all"
                        ? faFilter
                        : filter.id === "active"
                        ? faHourglassHalf
                        : faCircleCheck
                    }
                    className="w-4 h-4"
                  />
                  {filter.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeFilter === filter.id
                        ? "bg-white/30"
                        : "bg-slate-200"
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Todo List */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 font-medium">Memuat todos...</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl">
                  {searchTerm ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="w-12 h-12 text-slate-400"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faListCheck}
                      className="w-12 h-12 text-slate-400"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {searchTerm ? "Todo tidak ditemukan" : "Belum ada todo"}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  {searchTerm
                    ? `Tidak ada todo yang cocok dengan "${searchTerm}". Coba kata kunci lain.`
                    : "Mulai dengan menambahkan todo pertama Anda di atas!"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTodos.map((todo) => (
                  <div
                    key={todo._id}
                    className={`group relative rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                      todo.completed
                        ? "bg-gradient-to-r from-green-50/80 to-green-100/50 border-green-200"
                        : "bg-white border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {editingId === todo._id ? (
                      /* Edit Mode */
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            toggleComplete(todo._id, todo.completed)
                          }
                          className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                            todo.completed
                              ? "bg-gradient-to-br from-green-500 to-green-600 border-green-600"
                              : "border-slate-300 hover:border-green-500"
                          }`}
                          disabled
                        >
                          {todo.completed && (
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="w-4 h-4 text-white"
                            />
                          )}
                        </button>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") updateTodo(todo._id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateTodo(todo._id)}
                            className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-sm flex items-center gap-2"
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="w-4 h-4"
                            />
                            Simpan
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-sm flex items-center gap-2"
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              className="w-4 h-4"
                            />
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              toggleComplete(todo._id, todo.completed)
                            }
                            className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 ${
                              todo.completed
                                ? "bg-gradient-to-br from-green-500 to-green-600 border-green-600"
                                : "border-slate-300 hover:border-green-500"
                            }`}
                          >
                            {todo.completed && (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="w-4 h-4 text-white"
                              />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-medium text-lg ${
                                todo.completed
                                  ? "text-green-800 line-through decoration-2"
                                  : "text-slate-800"
                              }`}
                            >
                              {todo.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-slate-500 flex items-center">
                                <FontAwesomeIcon
                                  icon={faClock}
                                  className="w-3 h-3 mr-1"
                                />
                                {new Date(todo.createdAt).toLocaleDateString(
                                  "id-ID",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                              {todo.updatedAt !== todo.createdAt && (
                                <span className="text-xs text-blue-500 flex items-center">
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="w-3 h-3 mr-1"
                                  />
                                  Diperbarui
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEdit(todo)}
                              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="w-5 h-5"
                              />
                            </button>
                            <button
                              onClick={() => deleteTodo(todo._id)}
                              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            {!isLoading && filteredTodos.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                      <span className="text-sm text-slate-600">
                        Selesai:{" "}
                        <span className="font-semibold">{completedCount}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                      <span className="text-sm text-slate-600">
                        Aktif:{" "}
                        <span className="font-semibold">{activeCount}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    Menampilkan{" "}
                    <span className="font-semibold">
                      {filteredTodos.length}
                    </span>{" "}
                    dari <span className="font-semibold">{todos.length}</span>{" "}
                    todo
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-white text-sm"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    MindFlow Dashboard
                  </h3>
                  <p className="text-sm text-slate-600">
                    Streamline your workflow
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Bantuan
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Syarat Layanan
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
              >
                Kontak
              </a>
            </div>
          </div>
          <div className="text-center py-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MindFlow. Dibangun dengan ❤️ untuk
              produktivitas yang lebih baik.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
