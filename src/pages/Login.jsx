
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Coffee POS</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
