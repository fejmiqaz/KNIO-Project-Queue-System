import { useState, useEffect } from 'react';
import './SignUpForm.css'; // Import the CSS file for styling

const SignUpForm = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState({
        countries: false,
        submission: false
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        facilityName: '',
        facilityAddress: '',
        zipCode: '',
        country: '',
        city: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(prev => ({ ...prev, countries: true }));
            setError(null);

            try {
                const response = await fetch('https://api.countrystatecity.in/v1/countries', {
                    headers: {
                        "X-CSCAPI-KEY": "cDVES3VtRHFFVlZ3NzJybUZVRjQ2OWdla0lhMGRFbUlTTG1HTU5Zcg=="
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch countries');
                const data = await response.json();
                setCountries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(prev => ({ ...prev, countries: false }));
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData(prevData => ({ ...prevData, country: selectedCountry }));

        const selectedCountryData = countries.find(c => c.iso2 === selectedCountry);
        if (selectedCountryData) {
            setCities([selectedCountryData.capital]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { facilityName, facilityAddress, zipCode, country, email, password } = formData;

        if (!facilityName || !facilityAddress || !zipCode || !country || !email || !password) {
            setError('Please fill all fields');
            return;
        }

        if (!email.includes('@')) {
            setError('Invalid email format');
            return;
        }

        setLoading(prev => ({ ...prev, submission: true }));
        setError(null);

        try {

            // HERE YOU CAN SEND THE DATA TO THE BACKEND
            console.log('Submitting form data:', formData);
            // HERE YOU CAN SEND THE DATA TO THE BACKEND


            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);

            setFormData({
                facilityName: '',
                facilityAddress: '',
                zipCode: '',
                country: '',
                city: '',
                email: '',
                password: ''
            });

        } catch (err) {
            setError('Failed to submit form. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, submission: false }));
        }
    };

    return (
        <div className="form-container">
            {success && (
                <div className="message success">
                    Registration successful! Thank you.
                </div>
            )}

            {error && (
                <div className="message error">
                    {error}
                </div>
            )}

            {(loading.countries || loading.submission) && (
                <div className="loading">
                    {loading.countries ? 'Loading countries...' : 'Processing...'}
                </div>
            )}

            <form onSubmit={handleSubmit} className="sign-up-form">
                <h2>Sign Up</h2>
                <div className="input-group">
                    <label>Facility Name</label>
                    <input
                        type="text"
                        name="facilityName"
                        value={formData.facilityName}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Facility Address</label>
                    <input
                        type="text"
                        name="facilityAddress"
                        value={formData.facilityAddress}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        className="input"
                    >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                            <option key={country.iso2} value={country.iso2}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>City</label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading.submission}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
