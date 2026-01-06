import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LogOut,
    Edit3,
    Crown,
    Calendar,
    Star,
    ChevronRight,
    Moon,
    Sun,
    X,
    Gift,
    Percent,
    Truck,
    Sparkles,
    Camera,
    Upload,
    User,
    Check
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import './ProfileHeader.css';

// 3D Avatar options
const avatarStyles = [
    { id: '3d-1', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Felix&backgroundColor=b6e3f4', name: 'Felix' },
    { id: '3d-2', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Luna&backgroundColor=c0aede', name: 'Luna' },
    { id: '3d-3', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Max&backgroundColor=ffdfbf', name: 'Max' },
    { id: '3d-4', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Zoe&backgroundColor=ffd5dc', name: 'Zoe' },
    { id: '3d-5', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Leo&backgroundColor=d1f4e0', name: 'Leo' },
    { id: '3d-6', url: 'https://api.dicebear.com/7.x/personas/svg?seed=Mia&backgroundColor=c9e4ff', name: 'Mia' },
];

// Rewards data
const rewardsData = {
    Gold: {
        benefits: [
            { icon: Percent, title: '10% Off All Orders', desc: 'Exclusive discount on every purchase' },
            { icon: Truck, title: 'Free Express Shipping', desc: 'On orders over ₹500' },
            { icon: Gift, title: 'Birthday Bonus', desc: '500 bonus points on your birthday' },
            { icon: Sparkles, title: 'Early Access', desc: 'Shop new collections 24h before everyone' },
        ],
        pointsMultiplier: '1.5x',
        freeReturns: true,
    },
    Bronze: {
        benefits: [
            { icon: Percent, title: '5% Off All Orders', desc: 'Starter discount on purchases' },
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹1000' },
            { icon: Gift, title: 'Birthday Bonus', desc: '100 bonus points on your birthday' },
        ],
        pointsMultiplier: '1x',
        freeReturns: false,
    }
};

export default function ProfileHeader({ user, stats, loyaltyPoints, nextTierPoints }) {
    const navigate = useNavigate();
    const { logout, updateProfile } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [profileImage, setProfileImage] = useState(user?.avatar || null);

    // Name editing state
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || '');
    const nameInputRef = useRef(null);
    const fileInputRef = useRef(null);

    // Load saved avatar from user on mount
    useEffect(() => {
        if (user?.avatar) {
            setProfileImage(user.avatar);
        }
        if (user?.name) {
            setEditedName(user.name);
        }
    }, [user?.avatar, user?.name]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getTierColor = (tier) => {
        switch (tier?.toLowerCase()) {
            case 'gold': return '#f59e0b';
            case 'platinum': return '#a855f7';
            case 'diamond': return '#06b6d4';
            default: return '#94a3b8';
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setSelectedAvatar(null);
                if (updateProfile) {
                    updateProfile({ avatar: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        setProfileImage(avatar.url);
        if (updateProfile) {
            updateProfile({ avatar: avatar.url });
        }
    };

    const handleSaveAvatar = () => {
        setShowAvatarModal(false);
    };

    // Name editing handlers
    const handleStartEditName = () => {
        setIsEditingName(true);
        setTimeout(() => nameInputRef.current?.focus(), 100);
    };

    const handleSaveName = () => {
        if (editedName.trim() && editedName !== user?.name) {
            updateProfile({ name: editedName.trim() });
        }
        setIsEditingName(false);
    };

    const handleCancelEditName = () => {
        setEditedName(user?.name || '');
        setIsEditingName(false);
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveName();
        } else if (e.key === 'Escape') {
            handleCancelEditName();
        }
    };

    const progressPercentage = (loyaltyPoints / nextTierPoints) * 100;
    const memberSince = user?.memberSince
        ? new Date(user.memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
        : 'June 2023';

    const currentTier = user?.loyaltyTier || 'Gold';
    const rewards = rewardsData[currentTier] || rewardsData.Gold;

    return (
        <>
            <header className="profile-header">
                <div className="profile-header-card">
                    {/* Background decoration */}
                    <div className="header-bg-pattern"></div>
                    <div className="header-bg-gradient"></div>

                    <div className="header-content">
                        {/* Left side - Avatar and Info */}
                        <div className="header-main">
                            <div className="avatar-section">
                                <div className="avatar-container">
                                    <div className="avatar avatar-xl">
                                        {profileImage ? (
                                            <img src={profileImage} alt={user?.name} />
                                        ) : (
                                            <span className="avatar-initials">{getInitials(user?.name)}</span>
                                        )}
                                    </div>
                                    <div className="avatar-ring"></div>
                                    <div className="avatar-status online"></div>
                                </div>
                                <button
                                    className="avatar-edit-btn"
                                    onClick={() => setShowAvatarModal(true)}
                                    title="Change profile picture"
                                >
                                    <Camera size={14} />
                                </button>
                            </div>

                            <div className="header-info">
                                <div className="header-name-row">
                                    {isEditingName ? (
                                        <div className="name-edit-container">
                                            <input
                                                ref={nameInputRef}
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                                onKeyDown={handleNameKeyDown}
                                                className="name-edit-input"
                                                placeholder="Enter your name"
                                            />
                                            <button className="name-edit-btn save" onClick={handleSaveName}>
                                                <Check size={14} />
                                            </button>
                                            <button className="name-edit-btn cancel" onClick={handleCancelEditName}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="header-name">{user?.name || 'User'}</h1>
                                            <button
                                                className="name-edit-trigger"
                                                onClick={handleStartEditName}
                                                title="Edit name"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                        </>
                                    )}
                                    <span
                                        className="loyalty-badge"
                                        style={{ background: `linear-gradient(135deg, ${getTierColor(currentTier)} 0%, ${getTierColor(currentTier)}cc 100%)` }}
                                    >
                                        <Crown size={12} />
                                        {currentTier} Member
                                    </span>
                                </div>

                                <p className="header-email">{user?.email || 'demo@flexype.com'}</p>

                                <div className="header-meta">
                                    <span className="meta-item">
                                        <Calendar size={14} />
                                        Member since {memberSince}
                                    </span>
                                    <span className="meta-item">
                                        <Star size={14} />
                                        {stats?.reviewsWritten || 23} reviews written
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Right side - Actions */}
                        <div className="header-actions">
                            <button className="btn btn-secondary" onClick={handleLogout}>
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Loyalty Progress */}
                    <div className="loyalty-section">
                        <div className="loyalty-header">
                            <div className="loyalty-info">
                                <span className="loyalty-points">{loyaltyPoints.toLocaleString()}</span>
                                <span className="loyalty-label">Loyalty Points</span>
                            </div>
                            <div className="loyalty-next">
                                <span className="loyalty-next-label">Next tier: Platinum</span>
                                <span className="loyalty-next-points">{nextTierPoints - loyaltyPoints} points to go</span>
                            </div>
                        </div>

                        <div className="loyalty-progress-container">
                            <div className="loyalty-progress-bar">
                                <div
                                    className="loyalty-progress-fill"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="loyalty-progress-glow"></div>
                                    <div className="loyalty-progress-shine"></div>
                                </div>
                            </div>
                            <div className="loyalty-milestones">
                                <span className="milestone">Bronze</span>
                                <span className="milestone">Silver</span>
                                <span className="milestone active">Gold</span>
                                <span className="milestone">Platinum</span>
                                <span className="milestone">Diamond</span>
                            </div>
                        </div>

                        <button className="loyalty-cta" onClick={() => setShowRewardsModal(true)}>
                            <span>View Rewards & Benefits</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Avatar Selection Modal */}
            {showAvatarModal && (
                <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
                    <div className="avatar-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowAvatarModal(false)}>
                            <X size={20} />
                        </button>

                        <div className="avatar-modal-header">
                            <User size={24} />
                            <h2>Choose Your Avatar</h2>
                            <p>Upload a photo or select a 3D avatar</p>
                        </div>

                        <div className="avatar-upload-section">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                hidden
                            />
                            <button
                                className="upload-photo-btn"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <Upload size={20} />
                                <span>Upload Photo</span>
                            </button>
                            <p className="upload-hint">JPG, PNG or GIF, max 5MB</p>
                        </div>

                        <div className="avatar-divider">
                            <span>or choose a 3D avatar</span>
                        </div>

                        <div className="avatar-grid">
                            {avatarStyles.map(avatar => (
                                <button
                                    key={avatar.id}
                                    className={`avatar-option ${selectedAvatar?.id === avatar.id ? 'selected' : ''}`}
                                    onClick={() => handleAvatarSelect(avatar)}
                                >
                                    <img src={avatar.url} alt={avatar.name} />
                                    <span className="avatar-name">{avatar.name}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleSaveAvatar}
                        >
                            Save Avatar
                        </button>
                    </div>
                </div>
            )}

            {/* Rewards Modal */}
            {showRewardsModal && (
                <div className="modal-overlay" onClick={() => setShowRewardsModal(false)}>
                    <div className="rewards-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowRewardsModal(false)}>
                            <X size={20} />
                        </button>

                        <div className="rewards-modal-header">
                            <div
                                className="rewards-tier-badge"
                                style={{ background: `linear-gradient(135deg, ${getTierColor(currentTier)} 0%, ${getTierColor(currentTier)}dd 100%)` }}
                            >
                                <Crown size={24} />
                            </div>
                            <h2 className="rewards-modal-title">{currentTier} Member Benefits</h2>
                            <p className="rewards-modal-subtitle">
                                You're earning {rewards.pointsMultiplier} points on every purchase!
                            </p>
                        </div>

                        <div className="rewards-benefits-list">
                            {rewards.benefits.map((benefit, index) => (
                                <div key={index} className="reward-benefit-card">
                                    <div className="benefit-icon">
                                        <benefit.icon size={20} />
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">{benefit.title}</h3>
                                        <p className="benefit-desc">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="rewards-modal-footer">
                            <div className="points-summary">
                                <span className="points-label">Your Points</span>
                                <span className="points-value">{loyaltyPoints.toLocaleString()}</span>
                            </div>
                            <button className="btn btn-primary" onClick={() => setShowRewardsModal(false)}>
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
