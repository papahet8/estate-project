import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      dispatch(signInStart());
    // console.log(formData);
    const res = await fetch(`http://localhost:4000/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    // console.log(data)

    if (data.success === false) {
      dispatch(signInFailure(data.message));
      
      return;
    } 
    dispatch(signInSuccess(data));
    navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
    
  };
  // console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none"
        /> */}
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
           {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3">
        <p className="text-black font-semibold">Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>} 
    </div>
  );
}

export default SignIn;
