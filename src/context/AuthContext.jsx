import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user data for demonstration
const mockUsers = {
    'demo@flexype.com': {
        id: '1',
        email: 'demo@flexype.com',
        password: 'Demo@123',
        name: 'Sarah Johnson',
        avatar: null,
        memberSince: '2023-06-15',
        loyaltyTier: 'Gold',
        phone: '+1 (555) 123-4567',
    }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('flexype_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('flexype_user');
            }
        }
        setLoading(false);
    }, []);

    // Login with email and password
    const login = async (email, password, rememberMe = false) => {
        setError(null);
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            const existingUser = mockUsers[email.toLowerCase()];

            if (!existingUser) {
                throw new Error('No account found with this email address');
            }

            if (existingUser.password !== password) {
                throw new Error('Incorrect password. Please try again.');
            }

            const userData = {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                avatar: existingUser.avatar,
                memberSince: existingUser.memberSince,
                loyaltyTier: existingUser.loyaltyTier,
                phone: existingUser.phone,
            };

            setUser(userData);

            if (rememberMe) {
                localStorage.setItem('flexype_user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('flexype_user', JSON.stringify(userData));
            }

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Signup with email and password
    const signup = async (userData) => {
        setError(null);
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { email, password, name } = userData;

            // Check if user already exists
            if (mockUsers[email.toLowerCase()]) {
                throw new Error('An account with this email already exists');
            }

            // Create new user (in real app, this would be an API call)
            const newUser = {
                id: Date.now().toString(),
                email: email.toLowerCase(),
                name,
                avatar: null,
                memberSince: new Date().toISOString().split('T')[0],
                loyaltyTier: 'Bronze',
                phone: '',
            };

            // Add to mock database
            mockUsers[email.toLowerCase()] = { ...newUser, password };

            setUser(newUser);
            localStorage.setItem('flexype_user', JSON.stringify(newUser));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Google OAuth login (mock - ready for Firebase integration)
    const loginWithGoogle = async () => {
        setError(null);
        setLoading(true);

        try {
            // Simulate OAuth popup delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            /* 
             * Firebase Integration Point:
             * 
             * import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
             * import { auth } from '../config/firebase';
             * 
             * const provider = new GoogleAuthProvider();
             * const result = await signInWithPopup(auth, provider);
             * const credential = GoogleAuthProvider.credentialFromResult(result);
             * const user = result.user;
             */

            // Check if there's a saved Google user with profile modifications
            const savedUser = localStorage.getItem('flexype_google_user');
            let googleUser;

            if (savedUser) {
                // Restore the previously saved Google user (with their profile changes)
                googleUser = JSON.parse(savedUser);
            } else {
                // Create new Google user
                googleUser = {
                    id: 'google_' + Date.now(),
                    email: 'google.user@gmail.com',
                    name: 'Google User',
                    avatar: null,
                    memberSince: new Date().toISOString().split('T')[0],
                    loyaltyTier: 'Bronze',
                    phone: '',
                    provider: 'google',
                };
            }

            setUser(googleUser);
            localStorage.setItem('flexype_user', JSON.stringify(googleUser));
            localStorage.setItem('flexype_google_user', JSON.stringify(googleUser));

            return { success: true };
        } catch (err) {
            setError(err.message || 'Google sign-in failed');
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setError(null);
        localStorage.removeItem('flexype_user');
        sessionStorage.removeItem('flexype_user');
    };

    // Update user profile
    const updateProfile = async (updates) => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('flexype_user', JSON.stringify(updatedUser));

            // Also save to Google user storage if this is a Google user
            if (updatedUser.provider === 'google') {
                localStorage.setItem('flexype_google_user', JSON.stringify(updatedUser));
            }

            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateProfile,
        clearError: () => setError(null),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
