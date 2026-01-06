import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import './Auth.css';

export default function Login() {
    const navigate = useNavigate();
    const { login, loginWithGoogle, loading, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        const newErrors = {};
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData.email, formData.password, formData.rememberMe);
        if (result.success) {
            navigate('/profile');
        }
    };

    const handleGoogleLogin = async () => {
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
                <div className="auth-card animate-scale-in">
                    {/* Header */}
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            <Sparkles className="auth-logo-icon" />
                            <span>FlexyPe</span>
                        </Link>
                        <h1 className="auth-title">Welcome back</h1>
                        <p className="auth-subtitle">
                            Sign in to access your personalized shopping experience
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="auth-google-btn"
                        onClick={handleGoogleLogin}
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
                        <span>or sign in with email</span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="auth-error-banner animate-slide-up">
                                {error}
                            </div>
                        )}

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
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
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
                        </div>

                        <div className="auth-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="checkbox"
                                />
                                <span className="checkbox-custom"></span>
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="auth-link">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg auth-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="btn-loading">Signing in...</span>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="auth-footer">
                        Don't have an account?{' '}
                        <Link to="/signup" className="auth-link-bold">
                            Create one
                        </Link>
                    </p>

                    {/* Demo credentials hint */}
                    <div className="auth-demo-hint">
                        <strong>Demo:</strong> demo@flexype.com / Demo@123
                    </div>
                </div>
            </div>
        </div>
    );
}
