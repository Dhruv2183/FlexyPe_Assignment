import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    User, Bell, Shield, Palette,
    Save, Check, X, Plus,
    Mail, MessageSquare, Tag, Sparkles,
    Download, Trash2, AlertTriangle,
    BarChart3, ShoppingCart, Wallet, Award, TrendingUp, Calendar, Package
} from 'lucide-react';
import {
    mockShoppingStats,
    mockSpendingByCategory,
    mockOrders,
    mockAchievements,
    mockPreferences,
    CURRENCY
} from '../../data/mockApi';
import './Preferences.css';

export default function Preferences({ initialPreferences }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [preferences, setPreferences] = useState(initialPreferences);
    const [activeSection, setActiveSection] = useState('sizes');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatsModal, setShowStatsModal] = useState(false);

    const handleNotificationChange = (key) => {
        setPreferences(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handlePrivacyChange = (key) => {
        setPreferences(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: !prev.privacy[key]
            }
        }));
    };

    const handleSizeChange = (category, value) => {
        setPreferences(prev => ({
            ...prev,
            sizes: {
                ...prev.sizes,
                [category]: value
            }
        }));
    };

    const removeColor = (color) => {
        setPreferences(prev => ({
            ...prev,
            favoriteColors: prev.favoriteColors.filter(c => c !== color)
        }));
    };

    const removeBrand = (brand) => {
        setPreferences(prev => ({
            ...prev,
            favoriteBrands: prev.favoriteBrands.filter(b => b !== brand)
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // Show visual stats report
    const handleViewStats = () => {
        setShowStatsModal(true);
    };

    // Download stats as printable format
    const handleDownloadStats = () => {
        // Create a printable HTML content with savings highlighted
        const printContent = `
<!DOCTYPE html>
<html>
<head>
    <title>FlexyPe - Your Shopping Rewards</title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; background: #fff; color: #1a1f36; }
        h1 { color: #1a1f36; font-size: 28px; margin-bottom: 5px; }
        .subtitle { color: #64748b; font-size: 14px; margin-bottom: 30px; }
        h2 { color: #1a1f36; font-size: 18px; margin-top: 30px; display: flex; align-items: center; gap: 8px; }
        
        /* Hero Savings Card */
        .savings-hero {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: white;
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
        }
        .savings-hero h2 { color: white; justify-content: center; font-size: 16px; margin: 0 0 10px; }
        .savings-amount { font-size: 48px; font-weight: 800; margin: 10px 0; }
        .savings-percent { font-size: 18px; opacity: 0.9; }
        
        /* Stats Grid */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 25px 0; }
        .stat-card { background: #f8fafc; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #e2e8f0; }
        .stat-value { font-size: 24px; font-weight: 700; color: #1a1f36; }
        .stat-label { font-size: 12px; color: #64748b; margin-top: 5px; }
        
        /* Category List */
        .category-list { background: #f8fafc; border-radius: 12px; padding: 20px; }
        .category-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
        .category-row:last-child { border-bottom: none; }
        .category-name { font-weight: 500; }
        .category-amount { font-weight: 600; }
        .category-percent { color: #64748b; font-size: 13px; }
        
        /* Table */
        table { width: 100%; border-collapse: collapse; margin-top: 15px; background: #f8fafc; border-radius: 12px; overflow: hidden; }
        th, td { padding: 14px 16px; text-align: left; }
        th { background: #e2e8f0; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        td { border-bottom: 1px solid #e2e8f0; }
        tr:last-child td { border-bottom: none; }
        .status-delivered { color: #22c55e; font-weight: 500; }
        .status-shipped { color: #3b82f6; font-weight: 500; }
        .status-processing { color: #f59e0b; font-weight: 500; }
        
        /* Profile */
        .profile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 15px; }
        .profile-item { background: #f8fafc; padding: 15px; border-radius: 10px; text-align: center; }
        .profile-label { font-size: 12px; color: #64748b; }
        .profile-value { font-size: 16px; font-weight: 600; margin-top: 5px; }
        .profile-value.gold { color: #f59e0b; }
        
        /* Footer */
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 13px; }
        
        @media print {
            body { padding: 20px; }
            .savings-hero { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <h1>🎉 Your FlexyPe Rewards Summary</h1>
    <p class="subtitle">Generated on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    
    <!-- Hero Savings Card -->
    <div class="savings-hero">
        <h2>💰 Your Total Savings</h2>
        <div class="savings-amount">${CURRENCY.format(mockShoppingStats.savedAmount)}</div>
        <div class="savings-percent">You saved ${Math.round((mockShoppingStats.savedAmount / mockShoppingStats.totalSpent) * 100)}% on your purchases!</div>
    </div>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value">${mockShoppingStats.totalOrders}</div>
            <div class="stat-label">Total Orders</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${mockAchievements.filter(a => a.unlocked).length}/${mockAchievements.length}</div>
            <div class="stat-label">Achievements Unlocked</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${mockShoppingStats.reviewsWritten}</div>
            <div class="stat-label">Reviews Written</div>
        </div>
    </div>
    
    <h2>� Shopping Categories</h2>
    <div class="category-list">
    ${mockSpendingByCategory.map(cat => `
        <div class="category-row">
            <span class="category-name">${cat.category}</span>
            <span><span class="category-amount">${CURRENCY.format(cat.amount)}</span> <span class="category-percent">(${cat.percentage}%)</span></span>
        </div>
    `).join('')}
    </div>
    
    <h2>� Recent Orders</h2>
    <table>
        <thead>
            <tr><th>Order ID</th><th>Date</th><th>Status</th><th>Amount</th></tr>
        </thead>
        <tbody>
            ${mockOrders.slice(0, 5).map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${new Date(order.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td class="status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                    <td><strong>${CURRENCY.format(order.total)}</strong></td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <h2>👤 Your Profile</h2>
    <div class="profile-grid">
        <div class="profile-item">
            <div class="profile-label">Member Since</div>
            <div class="profile-value">${user?.memberSince ? new Date(user.memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'June 2023'}</div>
        </div>
        <div class="profile-item">
            <div class="profile-label">Loyalty Tier</div>
            <div class="profile-value gold">${user?.loyaltyTier || 'Gold'} ⭐</div>
        </div>
        <div class="profile-item">
            <div class="profile-label">Total Value</div>
            <div class="profile-value">${CURRENCY.format(mockShoppingStats.totalSpent)}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for being a valued FlexyPe member! 💚</p>
        <p>Keep shopping smart and saving more.</p>
    </div>
</body>
</html>
        `;

        // Open in new window for printing/saving
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    // Delete account
    const handleDeleteAccount = async () => {
        // Simulate account deletion
        await new Promise(resolve => setTimeout(resolve, 1000));
        logout();
        navigate('/');
    };

    const sections = [
        { id: 'sizes', label: 'Sizes & Fit', icon: User },
        { id: 'style', label: 'Style', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
    ];

    return (
        <>
            <div className="preferences section-card">
                <div className="section-header">
                    <h2 className="section-title">
                        <User className="title-icon settings" />
                        Preferences & Settings
                    </h2>
                    <button
                        className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {saved ? (
                            <>
                                <Check size={16} />
                                Saved!
                            </>
                        ) : isSaving ? (
                            'Saving...'
                        ) : (
                            <>
                                <Save size={16} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

                <div className="preferences-layout">
                    {/* Sidebar */}
                    <nav className="preferences-nav">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`pref-nav-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <section.icon size={18} />
                                <span>{section.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Content */}
                    <div className="preferences-content">
                        {/* Sizes & Fit */}
                        {activeSection === 'sizes' && (
                            <div className="pref-section animate-fade-in">
                                <h3 className="pref-section-title">Your Sizes</h3>
                                <p className="pref-section-desc">
                                    Save your sizes for faster checkout and better recommendations.
                                </p>

                                <div className="sizes-grid">
                                    {Object.entries(preferences.sizes).map(([category, size]) => (
                                        <div key={category} className="size-input-group">
                                            <label className="size-label">
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </label>
                                            <select
                                                className="size-select"
                                                value={size}
                                                onChange={(e) => handleSizeChange(category, e.target.value)}
                                            >
                                                {category === 'shoes' ? (
                                                    ['7 US', '8 US', '9 US', '10 US', '11 US', '12 US'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))
                                                ) : category === 'bottoms' ? (
                                                    ['28', '30', '32', '34', '36', '38'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))
                                                ) : (
                                                    ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Style Preferences */}
                        {activeSection === 'style' && (
                            <div className="pref-section animate-fade-in">
                                <h3 className="pref-section-title">Favorite Colors</h3>
                                <p className="pref-section-desc">
                                    We'll show you more products in these colors.
                                </p>

                                <div className="tags-container">
                                    {preferences.favoriteColors.map(color => (
                                        <span key={color} className="pref-tag">
                                            <span
                                                className="color-dot"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                            ></span>
                                            {color}
                                            <button
                                                className="tag-remove"
                                                onClick={() => removeColor(color)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <button className="add-tag-btn">
                                        <Plus size={14} />
                                        Add Color
                                    </button>
                                </div>

                                <h3 className="pref-section-title" style={{ marginTop: 'var(--space-6)' }}>
                                    Favorite Brands
                                </h3>
                                <p className="pref-section-desc">
                                    Get notified about new arrivals and sales from your favorite brands.
                                </p>

                                <div className="tags-container">
                                    {preferences.favoriteBrands.map(brand => (
                                        <span key={brand} className="pref-tag">
                                            {brand}
                                            <button
                                                className="tag-remove"
                                                onClick={() => removeBrand(brand)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <button className="add-tag-btn">
                                        <Plus size={14} />
                                        Add Brand
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <div className="pref-section animate-fade-in">
                                <h3 className="pref-section-title">Email Notifications</h3>

                                <div className="toggle-list">
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <Mail size={18} className="toggle-icon" />
                                            <div>
                                                <span className="toggle-label">Order Updates</span>
                                                <span className="toggle-desc">Shipping confirmations and delivery updates</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications.orderUpdates}
                                                onChange={() => handleNotificationChange('orderUpdates')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <Tag size={18} className="toggle-icon" />
                                            <div>
                                                <span className="toggle-label">Promotions & Deals</span>
                                                <span className="toggle-desc">Exclusive offers and flash sales</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications.promotions}
                                                onChange={() => handleNotificationChange('promotions')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <Sparkles size={18} className="toggle-icon" />
                                            <div>
                                                <span className="toggle-label">Price Drop Alerts</span>
                                                <span className="toggle-desc">Notify when wishlist items go on sale</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications.priceDrops}
                                                onChange={() => handleNotificationChange('priceDrops')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <MessageSquare size={18} className="toggle-icon" />
                                            <div>
                                                <span className="toggle-label">Newsletter</span>
                                                <span className="toggle-desc">Weekly digest and style tips</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications.newsletter}
                                                onChange={() => handleNotificationChange('newsletter')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy */}
                        {activeSection === 'privacy' && (
                            <div className="pref-section animate-fade-in">
                                <h3 className="pref-section-title">Privacy Settings</h3>
                                <p className="pref-section-desc">
                                    Control how your data is used and shared.
                                </p>

                                <div className="toggle-list">
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <div>
                                                <span className="toggle-label">Personalized Recommendations</span>
                                                <span className="toggle-desc">Allow us to use your data to provide better recommendations</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.privacy.shareDataForRecommendations}
                                                onChange={() => handlePrivacyChange('shareDataForRecommendations')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <div>
                                                <span className="toggle-label">Show Purchase History</span>
                                                <span className="toggle-desc">Display your purchase history in your profile</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.privacy.showPurchaseHistory}
                                                onChange={() => handlePrivacyChange('showPurchaseHistory')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <div>
                                                <span className="toggle-label">Public Reviews</span>
                                                <span className="toggle-desc">Allow your reviews to be visible to others</span>
                                            </div>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={preferences.privacy.allowReviews}
                                                onChange={() => handlePrivacyChange('allowReviews')}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="privacy-actions">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleViewStats}
                                    >
                                        <BarChart3 size={16} />
                                        View My Stats
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        <Trash2 size={16} />
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Account Modal */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="delete-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div className="delete-modal-icon">
                            <AlertTriangle size={32} />
                        </div>
                        <h2 className="delete-modal-title">Delete Account?</h2>
                        <p className="delete-modal-desc">
                            This action cannot be undone. All your data, including order history,
                            preferences, and loyalty points will be permanently deleted.
                        </p>
                        <div className="delete-modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDeleteAccount}
                            >
                                Yes, Delete My Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Visual Stats Report Modal */}
            {showStatsModal && (
                <div className="modal-overlay" onClick={() => setShowStatsModal(false)}>
                    <div className="stats-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowStatsModal(false)}>
                            <X size={20} />
                        </button>

                        <div className="stats-modal-header">
                            <TrendingUp size={32} className="stats-header-icon success" />
                            <h2>Your Savings Report</h2>
                            <p>See how much you've saved with FlexyPe!</p>
                        </div>

                        <div className="stats-modal-content">
                            {/* Quick Stats Cards - Savings First */}
                            <div className="stats-quick-cards">
                                <div className="stats-quick-card success featured">
                                    <TrendingUp size={24} />
                                    <div className="stats-quick-value">{CURRENCY.format(mockShoppingStats.savedAmount)}</div>
                                    <div className="stats-quick-label">Total Saved 🎉</div>
                                </div>
                                <div className="stats-quick-card">
                                    <ShoppingCart size={24} />
                                    <div className="stats-quick-value">{mockShoppingStats.totalOrders}</div>
                                    <div className="stats-quick-label">Total Orders</div>
                                </div>
                                <div className="stats-quick-card">
                                    <Award size={24} />
                                    <div className="stats-quick-value">{mockAchievements.filter(a => a.unlocked).length}</div>
                                    <div className="stats-quick-label">Achievements</div>
                                </div>
                                <div className="stats-quick-card muted">
                                    <Wallet size={24} />
                                    <div className="stats-quick-value">{CURRENCY.format(mockShoppingStats.totalSpent)}</div>
                                    <div className="stats-quick-label">Lifetime Value</div>
                                </div>
                            </div>

                            {/* Spending by Category */}
                            <div className="stats-section">
                                <h3><Package size={18} /> Spending by Category</h3>
                                <div className="stats-category-bars">
                                    {mockSpendingByCategory.map((cat, idx) => (
                                        <div key={idx} className="stats-category-item">
                                            <div className="stats-category-info">
                                                <span className="stats-category-name">{cat.category}</span>
                                                <span className="stats-category-amount">{CURRENCY.format(cat.amount)}</span>
                                            </div>
                                            <div className="stats-category-bar">
                                                <div
                                                    className="stats-category-fill"
                                                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                                                ></div>
                                            </div>
                                            <span className="stats-category-percent">{cat.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Orders Table */}
                            <div className="stats-section">
                                <h3><Calendar size={18} /> Recent Orders</h3>
                                <div className="stats-table-wrapper">
                                    <table className="stats-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockOrders.slice(0, 5).map((order, idx) => (
                                                <tr key={idx}>
                                                    <td className="order-id">{order.id}</td>
                                                    <td>{new Date(order.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    <td>
                                                        <span className={`order-status ${order.status}`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="order-total">{CURRENCY.format(order.total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Profile Summary */}
                            <div className="stats-profile-summary">
                                <div className="stats-profile-item">
                                    <span className="stats-profile-label">Member Since</span>
                                    <span className="stats-profile-value">
                                        {user?.memberSince
                                            ? new Date(user.memberSince).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
                                            : 'June 2023'
                                        }
                                    </span>
                                </div>
                                <div className="stats-profile-item">
                                    <span className="stats-profile-label">Loyalty Tier</span>
                                    <span className="stats-profile-value tier">{user?.loyaltyTier || 'Gold'}</span>
                                </div>
                                <div className="stats-profile-item">
                                    <span className="stats-profile-label">Reviews Written</span>
                                    <span className="stats-profile-value">{mockShoppingStats.reviewsWritten}</span>
                                </div>
                            </div>
                        </div>

                        <div className="stats-modal-footer">
                            <button className="btn btn-secondary" onClick={handleDownloadStats}>
                                <Download size={16} />
                                Download / Print
                            </button>
                            <button className="btn btn-primary" onClick={() => setShowStatsModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
