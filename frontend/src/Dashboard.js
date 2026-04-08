import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [editId, setEditId] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // 📥 FETCH TASKS
  const fetchTasks = async () => {
    try {
      let url = `http://localhost:5000/api/v1/tasks?`;

      if (statusFilter) url += `status=${statusFilter}&`;
      if (priorityFilter) url += `priority=${priorityFilter}&`;
      if (search) url += `search=${search}&`;

      const res = await axios.get(url, {
        headers: { Authorization: token }
      });

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // 📊 FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/dashboard",
        {
          headers: { Authorization: token }
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ➕ ADD TASK
  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/tasks",
        {
          title,
          description,
          status: "TODO",
          priority: priority || "HIGH"
        },
        {
          headers: { Authorization: token }
        }
      );

      setTitle("");
      setDescription("");
      setPriority("");

      fetchTasks();
      fetchStats();
    } catch {
      alert("Error adding task");
    }
  };

  // ❌ DELETE
  const deleteTask = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/v1/tasks/${id}`,
      { headers: { Authorization: token } }
    );

    fetchTasks();
    fetchStats();
  };

  // ✏️ EDIT
  const editTask = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  };

  // 🔄 UPDATE
  const updateTask = async () => {
    await axios.put(
      `http://localhost:5000/api/v1/tasks/${editId}`,
      { title, description, priority },
      { headers: { Authorization: token } }
    );

    setEditId(null);
    setTitle("");
    setDescription("");
    setPriority("");

    fetchTasks();
    fetchStats();
  };

  // 🔁 STATUS CHANGE
  const changeStatus = async (id, currentStatus) => {
    let newStatus =
      currentStatus === "TODO"
        ? "IN_PROGRESS"
        : currentStatus === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

    await axios.patch(
      `http://localhost:5000/api/v1/tasks/${id}/status`,
      { status: newStatus },
      { headers: { Authorization: token } }
    );

    fetchTasks();
    fetchStats();
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [statusFilter, priorityFilter, search]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            Total: {stats.totalTasks}
          </div>
          <div className="bg-yellow-100 p-4 rounded">
            TODO: {stats.statusBreakdown?.TODO || 0}
          </div>
          <div className="bg-purple-100 p-4 rounded">
            IN_PROGRESS: {stats.statusBreakdown?.IN_PROGRESS || 0}
          </div>
          <div className="bg-green-100 p-4 rounded">
            DONE: {stats.statusBreakdown?.DONE || 0}
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* ADD / EDIT */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-semibold mb-2">
          {editId ? "Edit Task" : "Add Task"}
        </h3>

        <input
          className="border p-2 w-full mb-2 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 w-full mb-2 bg-white outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button
          onClick={editId ? updateTask : addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 shadow rounded">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>

              <p className="text-sm">
                Status: <b>{task.status}</b> | Priority:{" "}
                <b>{task.priority}</b>
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editTask(task)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    changeStatus(task._id, task.status)
                  }
                  className="bg-purple-400 px-2 py-1 rounded"
                >
                  Status
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-400 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Dashboard;