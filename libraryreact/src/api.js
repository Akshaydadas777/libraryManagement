import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        const url = isLogin
            ? "http://127.0.0.1:7000/admin/login/"
            : "http://127.0.0.1:7000/admin/signup/";
    
        try {
            const response = await axios.post(url, { email, password });
            setMessage("Success!");
    
            if (isLogin) {
                navigate("/books"); 
            } else {
                setIsLogin(true);
                setMessage("Signup successful! Please log in.");
                setEmail(""); 
                setPassword("");
            }
        } catch (error) {
            setMessage(error.response?.data?.error || "An error occurred.");
        }
    };  

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">{isLogin ? "Admin Login" : "Admin Signup"}</h2>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Enter password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">{isLogin ? "Login" : "Signup"}</button>
                        </form>
                        <div className="text-center mt-3">
                            <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Switch to Signup" : "Switch to Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuth;
