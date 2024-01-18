import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
    console.log(formData);
    const res = await fetch(`http://localhost:4000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)

    if (data.success === false) {
      setLoading(false);
      setError(data.message);
      
      return;
    } 
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
  };
  // console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-none"
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase opacity-95 disabled:opacity-80">
           {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3">
        <p className="text-black font-semibold">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>} 
    </div>
  );
}

export default SignUp;
