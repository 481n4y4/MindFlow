import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // GET todos
  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post("/todos", { title });
      setTitle("");
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">My Todo</h1>

      <form onSubmit={addTodo} className="mb-4 flex gap-2">
        <input
          className="flex-1 rounded border p-2"
          placeholder="Tambah todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="rounded bg-blue-600 px-4 text-white">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between rounded border p-2"
          >
            <span>{todo.title}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
