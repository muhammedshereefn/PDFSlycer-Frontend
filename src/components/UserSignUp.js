import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, Toaster } from 'react-hot-toast';
import { FaBars } from 'react-icons/fa'; 

const UserSignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/user/signup', {
                name,
                email,
                password,
            });

            const { token, userId } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            toast.success("User created");

            navigate('/home');
        } catch {
            toast.error("User not signed up");
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navigation Bar */}
            <nav className="navbar navbar-light" style={{ height: '50px', width: '100%', backgroundColor: 'red' }}>
                <img 
                    src="/signature.png" 
                    alt="Logo"
                    style={{ height: '80px', width: 'auto' }} 
                />
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <FaBars style={{ fontSize: '20px', color: 'black' }} />
                    <FaBars style={{ fontSize: '25px', color: 'red' }} />
                </div>
            </nav>

            {/* Signup Form */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    backgroundSize: 'cover',
                }}
            >
                <div
                    className="modal-content p-4"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        padding: '30px',
                    }}
                >
                    <Toaster position="top-right" reverseOrder={false} />

                    <h2
                        className="text-center text-white mb-4 fw-bold"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                        SIGN UP
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="text-white">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    color: 'white',
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="text-white">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    color: 'white',
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password" className="text-white">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'} 
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: 'none',
                                    color: 'white',
                                }}
                            />
                             <div className="form-check mt-2">
                            <input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="showPassword" 
                                checked={showPassword} 
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                            <label className="form-check-label text-white" htmlFor="showPassword">Show Password</label>
                            </div>
                        </div>



                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                            style={{ borderRadius: '30px' }}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="text-center mt-3">
                    <p className="text-white">Already have an account? <a href="/signin" style={{ color: 'yellow' }}>Sign In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSignUp;
