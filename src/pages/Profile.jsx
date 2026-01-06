import { useAuth } from '../context/AuthContext';
import {
    mockShoppingStats,
    mockSpendingByCategory,
    mockMonthlySpending,
    mockTopBrands,
    mockSmartInsights,
    mockAchievements,
    mockOrders,
    mockQuickReorder,
    mockPreferences,
    mockShoppingPatterns,
    mockProducts,
    CURRENCY
} from '../data/mockApi';
import ProfileHeader from '../components/profile/ProfileHeader';
import ShoppingDNA from '../components/profile/ShoppingDNA';
import SpendingAnalytics from '../components/profile/SpendingAnalytics';
import SmartInsights from '../components/profile/SmartInsights';
import Achievements from '../components/profile/Achievements';
import OrderTimeline from '../components/profile/OrderTimeline';
import Preferences from '../components/profile/Preferences';
import QuickReorder from '../components/profile/QuickReorder';
import PersonalizedDeals from '../components/profile/PersonalizedDeals';
import { useState, useCallback } from 'react';
import {
    LayoutDashboard,
    PieChart,
    Lightbulb,
    Trophy,
    Package,
    Settings,
    Sparkles,
    ShoppingCart,
    CreditCard,
    Wallet,
    Heart
} from 'lucide-react';
import './Profile.css';

const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'smart', label: 'Smart Tips', icon: Lightbulb },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'deals', label: 'Deals For You', icon: Sparkles },
    { id: 'preferences', label: 'Settings', icon: Settings },
];

export default function Profile() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState(mockOrders);
    const [orderNotification, setOrderNotification] = useState(null);

    // Refresh orders after placing a new one
    const handleOrderPlaced = useCallback((newOrder) => {
        setOrders([...mockOrders]);
        setOrderNotification(newOrder);

        setTimeout(() => {
            setOrderNotification(null);
        }, 5000);
    }, []);

    // Handle order cancellation
    const handleOrderCancelled = useCallback(() => {
        setOrders([...mockOrders]);
    }, []);

    // Navigate to specific tab
    const navigateToTab = useCallback((tabId) => {
        setActiveTab(tabId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="profile-overview stagger-children">
                        {/* Order Notification */}
                        {orderNotification && (
                            <div className="order-notification animate-slide-up">
                                <span className="notification-icon">🎉</span>
                                <div className="notification-content">
                                    <strong>Order {orderNotification.id} placed!</strong>
                                    <span>Go to Orders tab to track your order.</span>
                                </div>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => {
                                        navigateToTab('orders');
                                        setOrderNotification(null);
                                    }}
                                >
                                    View Orders
                                </button>
                            </div>
                        )}

                        {/* Quick Stats Grid - Enhanced Design */}
                        <div className="stats-grid">
                            <div className="stat-card stat-card-primary">
                                <div className="stat-card-decoration primary"></div>
                                <div className="stat-icon stat-icon-purple">
                                    <ShoppingCart size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{mockShoppingStats.totalOrders}</span>
                                    <span className="stat-label">Total Orders</span>
                                    <span className="stat-badge primary">
                                        ↑ +5 this month
                                    </span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card-decoration"></div>
                                <div className="stat-icon stat-icon-blue">
                                    <CreditCard size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{mockShoppingStats.reviewsWritten}</span>
                                    <span className="stat-label">Reviews Written</span>
                                    <span className="stat-badge neutral">
                                        Helpful to others!
                                    </span>
                                </div>
                            </div>
                            <div className="stat-card stat-card-success">
                                <div className="stat-card-decoration success"></div>
                                <div className="stat-icon stat-icon-green">
                                    <Wallet size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value text-success">{CURRENCY.format(mockShoppingStats.savedAmount)}</span>
                                    <span className="stat-label">Total Saved</span>
                                    <span className="stat-badge success">
                                        ↗ 12.5% savings rate
                                    </span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card-decoration pink"></div>
                                <div className="stat-icon stat-icon-pink">
                                    <Heart size={24} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{mockShoppingStats.wishlistItems}</span>
                                    <span className="stat-label">Wishlist Items</span>
                                    <span className="stat-link">
                                        3 on sale →
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Shopping DNA & Insights Grid */}
                        <div className="overview-grid">
                            <ShoppingDNA
                                categories={mockSpendingByCategory}
                                topBrands={mockTopBrands}
                                patterns={mockShoppingPatterns}
                            />
                            <SmartInsights
                                insights={mockSmartInsights.slice(0, 3)}
                                compact
                                onViewAll={() => navigateToTab('smart')}
                            />
                        </div>

                        {/* Quick Reorder */}
                        <QuickReorder
                            items={mockQuickReorder}
                            onOrderPlaced={handleOrderPlaced}
                            onViewAllProducts={() => navigateToTab('deals')}
                        />

                        {/* Recent Achievements */}
                        <Achievements
                            achievements={mockAchievements.filter(a => a.unlocked).slice(0, 4)}
                            compact
                            onViewAll={() => navigateToTab('achievements')}
                        />
                    </div>
                );

            case 'insights':
                return (
                    <div className="profile-insights stagger-children">
                        <SpendingAnalytics
                            monthlyData={mockMonthlySpending}
                            categoryData={mockSpendingByCategory}
                            stats={mockShoppingStats}
                            patterns={mockShoppingPatterns}
                        />
                        <ShoppingDNA
                            categories={mockSpendingByCategory}
                            topBrands={mockTopBrands}
                            patterns={mockShoppingPatterns}
                            expanded
                        />
                    </div>
                );

            case 'smart':
                return (
                    <div className="profile-smart stagger-children">
                        <SmartInsights insights={mockSmartInsights} />
                    </div>
                );

            case 'achievements':
                return (
                    <div className="profile-achievements stagger-children">
                        <Achievements achievements={mockAchievements} />
                    </div>
                );

            case 'orders':
                return (
                    <div className="profile-orders stagger-children">
                        <OrderTimeline
                            orders={orders}
                            onOrderCancelled={handleOrderCancelled}
                        />
                    </div>
                );

            case 'deals':
                return (
                    <div className="profile-deals stagger-children">
                        <PersonalizedDeals onAddToCart={handleOrderPlaced} />
                    </div>
                );

            case 'preferences':
                return (
                    <div className="profile-preferences stagger-children">
                        <Preferences initialPreferences={mockPreferences} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-background">
                <div className="profile-gradient-orb profile-orb-1"></div>
                <div className="profile-gradient-orb profile-orb-2"></div>
            </div>

            <div className="container">
                <ProfileHeader
                    user={user}
                    stats={mockShoppingStats}
                    loyaltyPoints={2450}
                    nextTierPoints={3000}
                />

                {/* Tab Navigation */}
                <nav className="profile-nav">
                    <div className="profile-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => navigateToTab(tab.id)}
                            >
                                <tab.icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Tab Content */}
                <main className="profile-content">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    );
}
