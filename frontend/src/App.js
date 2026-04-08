import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">
        Task Manager App
      </h1>

      {/* 🔐 AUTH FLOW */}
      {!token ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <Login />
          <hr className="my-4" />
          <Signup />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <Dashboard />
        </div>
      )}

    </div>
  );
}

export default App;