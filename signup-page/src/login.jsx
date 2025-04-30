import { useState } from 'react';
import './login.css'; // Optional: if you want to style it with a CSS file

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        facility: ''
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', formData);
        // You can send `formData` to your backend here
        setSuccess(true);
    };

    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <fieldset>

                    {success && (
                        <div className="message success">
                            Log in successful! Thank you.
                        </div>
                    )}

                    <h1>Log in</h1>

                    <p>Email</p>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br/>

                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br/>

                    <p>Facility</p>
                    <input
                        type="text"
                        name="facility"
                        value={formData.facility}
                        onChange={handleChange}
                    />
                    <br/>

                    <button type="submit" id="logInButton">LOG IN</button>
                </fieldset>
            </form>
        </div>
    );
};

export default LoginForm;
