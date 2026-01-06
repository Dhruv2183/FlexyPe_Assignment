import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    validateEmail,
    validatePassword,
    validateName,
    validateConfirmPassword,
    getPasswordStrength
} from '../utils/validators';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Sparkles, Check, X } from 'lucide-react';
import './Auth.css';

export default function Signup() {
    const navigate = useNavigate();
    const { signup, loginWithGoogle, loading, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordStrength = getPasswordStrength(formData.password);

    const passwordRequirements = [
        { label: 'At least 8 characters', met: formData.password.length >= 8 },
        { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
        { label: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
        { label: 'One number', met: /[0-9]/.test(formData.password) },
        { label: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = nameError;

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        const confirmError = validateConfirmPassword(formData.password, formData.confirmPassword);
        if (confirmError) newErrors.confirmPassword = confirmError;

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        if (result.success) {
            navigate('/profile');
        }
    };

    const handleGoogleSignup = async () => {
        const result = await loginWithGoogle();
        if (result.success) {
            navigate('/profile');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-gradient-orb auth-orb-1"></div>
                <div className="auth-gradient-orb auth-orb-2"></div>
                <div className="auth-gradient-orb auth-orb-3"></div>
            </div>

            <div className="auth-container">
                <div className="auth-card auth-card-signup animate-scale-in">
                    {/* Header */}
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            <Sparkles className="auth-logo-icon" />
                            <span>FlexyPe</span>
                        </Link>
                        <h1 className="auth-title">Create your account</h1>
                        <p className="auth-subtitle">
                            Join thousands of smart shoppers and unlock personalized insights
                        </p>
                    </div>

                    {/* Google Sign Up */}
                    <button
                        type="button"
                        className="auth-google-btn"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                    >
                        <svg viewBox="0 0 24 24" className="google-icon">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="auth-divider">
                        <span>or sign up with email</span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="auth-error-banner animate-slide-up">
                                {error}
                            </div>
                        )}

                        <div className="input-group">
                            <label className="input-label" htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`input input-with-icon ${errors.name ? 'input-error' : ''}`}
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`input input-with-icon ${errors.email ? 'input-error' : ''}`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className={`input input-with-icon ${errors.password ? 'input-error' : ''}`}
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="password-strength animate-slide-up">
                                    <div className="strength-bar">
                                        <div
                                            className="strength-fill"
                                            style={{
                                                width: `${passwordStrength.percentage}%`,
                                                backgroundColor: passwordStrength.color
                                            }}
                                        ></div>
                                    </div>
                                    <span className="strength-label" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                            )}

                            {/* Password Requirements */}
                            {formData.password && (
                                <ul className="password-requirements animate-slide-up">
                                    {passwordRequirements.map((req, index) => (
                                        <li key={index} className={req.met ? 'met' : ''}>
                                            {req.met ? <Check size={14} /> : <X size={14} />}
                                            {req.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="input-group">
                            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`input input-with-icon ${errors.confirmPassword ? 'input-error' : ''}`}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>

                        <div className="auth-terms">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    className="checkbox"
                                />
                                <span className="checkbox-custom"></span>
                                I agree to the{' '}
                                <Link to="/terms" className="auth-link">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                            </label>
                            {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg auth-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="btn-loading">Creating account...</span>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="auth-footer">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link-bold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
