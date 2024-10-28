import React, { useState } from 'react';
import axios from 'axios';

interface LoginProps {
    showLogin: boolean;
    onLoginSuccess: () => void;
    onCloseOverlay: () => void;
}

const Login: React.FC<LoginProps> = ({ showLogin, onLoginSuccess, onCloseOverlay }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { username, password });
            if (response.data.success) {
                onLoginSuccess();
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        showLogin && (
            <div className="login-overlay">
                <div className="login-container">
                    <button className="close-btn" onClick={onCloseOverlay}>X</button>
                    <h1>Login</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button id="login" onClick={handleLogin}>Login</button>
                </div>
            </div>
        )
    );
};

export default Login;