// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
};

// Password validation with strength check
export const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return null;
};

// Password strength calculator
export const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;

    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character types
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Patterns
    if (!/(.)\1{2,}/.test(password)) score += 1; // No repeated characters
    if (!/^[a-zA-Z]+$/.test(password)) score += 1; // Not all letters

    const strengthLevels = [
        { min: 0, max: 2, label: 'Very Weak', color: '#ef4444' },
        { min: 3, max: 4, label: 'Weak', color: '#f59e0b' },
        { min: 5, max: 6, label: 'Medium', color: '#eab308' },
        { min: 7, max: 8, label: 'Strong', color: '#22c55e' },
        { min: 9, max: 10, label: 'Very Strong', color: '#14b8a6' },
    ];

    const level = strengthLevels.find(l => score >= l.min && score <= l.max) || strengthLevels[0];

    return {
        score: Math.min(score, 9),
        maxScore: 9,
        percentage: Math.round((Math.min(score, 9) / 9) * 100),
        label: level.label,
        color: level.color,
    };
};

// Name validation
export const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 50) return 'Name must be less than 50 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return null;
};

// Phone validation (optional field)
export const validatePhone = (phone) => {
    if (!phone) return null; // Optional
    const phoneRegex = /^\+?[\d\s\-()]{10,20}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    return null;
};

// Form validation helper
export const validateForm = (fields, validators) => {
    const errors = {};
    let isValid = true;

    Object.keys(validators).forEach(field => {
        const error = validators[field](fields[field], fields);
        if (error) {
            errors[field] = error;
            isValid = false;
        }
    });

    return { isValid, errors };
};
