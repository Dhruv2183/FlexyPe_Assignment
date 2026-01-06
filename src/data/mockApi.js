// Mock API data for demonstration
// This simulates backend responses and can be easily replaced with real API calls
// Currency: Indian Rupees (₹)

export const CURRENCY = {
    symbol: '₹',
    code: 'INR',
    format: (amount) => `₹${amount.toLocaleString('en-IN')}`,
};

export const mockUserData = {
    id: '1',
    name: 'Rahul Sharma',
    email: 'demo@flexype.com',
    phone: '+91 98765 43210',
    avatar: null,
    memberSince: '2023-06-15',
    loyaltyTier: 'Gold',
    loyaltyPoints: 2450,
    nextTierPoints: 3000,
};

export const mockShoppingStats = {
    totalOrders: 47,
    totalSpent: 245890,
    savedAmount: 31250,
    wishlistItems: 12,
    reviewsWritten: 23,
    returnRate: 3.2,
};

export const mockSpendingByCategory = [
    { category: 'Electronics', amount: 92500, percentage: 38, color: '#6366f1' },
    { category: 'Fashion', amount: 61000, percentage: 25, color: '#ec4899' },
    { category: 'Home & Living', amount: 44500, percentage: 18, color: '#14b8a6' },
    { category: 'Beauty', amount: 26000, percentage: 11, color: '#f59e0b' },
    { category: 'Sports', amount: 20625, percentage: 8, color: '#22c55e' },
];

export const mockMonthlySpending = [
    { month: 'Jan', amount: 16000 },
    { month: 'Feb', amount: 22250 },
    { month: 'Mar', amount: 19000 },
    { month: 'Apr', amount: 26000 },
    { month: 'May', amount: 20500 },
    { month: 'Jun', amount: 34000 },
    { month: 'Jul', amount: 29500 },
    { month: 'Aug', amount: 22500 },
    { month: 'Sep', amount: 36000 },
    { month: 'Oct', amount: 27500 },
    { month: 'Nov', amount: 44500 },
    { month: 'Dec', amount: 47000 },
];

export const mockTopBrands = [
    { name: 'Apple', purchases: 8, totalSpent: 62500 },
    { name: 'Nike', purchases: 12, totalSpent: 34000 },
    { name: 'Sony', purchases: 5, totalSpent: 26000 },
    { name: 'Zara', purchases: 15, totalSpent: 22000 },
    { name: 'Samsung', purchases: 4, totalSpent: 19000 },
];

export const mockSmartInsights = [
    {
        id: 1,
        type: 'restock',
        icon: '🔄',
        title: 'Time to Restock?',
        message: 'You last bought skincare products 45 days ago. Your usual cycle is 30-40 days.',
        action: 'Shop Skincare',
        actionUrl: '/category/beauty',
        priority: 'high',
    },
    {
        id: 2,
        type: 'deal',
        icon: '🔥',
        title: 'Price Drop Alert!',
        message: 'Apple AirPods Pro in your wishlist is now 20% off!',
        action: 'View Deal',
        actionUrl: '/product/airpods-pro',
        priority: 'high',
    },
    {
        id: 3,
        type: 'pattern',
        icon: '📊',
        title: 'Smart Tip',
        message: 'You tend to shop more on weekends. Check out our Weekend Flash Sales!',
        action: 'See Sales',
        actionUrl: '/sales',
        priority: 'medium',
    },
    {
        id: 4,
        type: 'recommendation',
        icon: '✨',
        title: 'Based on Your Style',
        message: 'New arrivals from Nike and Zara match your preferences.',
        action: 'Explore',
        actionUrl: '/recommendations',
        priority: 'medium',
    },
    {
        id: 5,
        type: 'savings',
        icon: '💰',
        title: 'Savings Opportunity',
        message: 'Subscribe to monthly delivery and save 15% on your regular purchases.',
        action: 'Learn More',
        actionUrl: '/subscriptions',
        priority: 'low',
    },
];

export const mockPreferences = {
    sizes: {
        tops: 'M',
        bottoms: '32',
        shoes: '9 UK',
        dresses: 'M',
    },
    favoriteColors: ['Black', 'Navy', 'White', 'Olive'],
    favoriteBrands: ['Nike', 'Apple', 'Zara', 'Sony'],
    notifications: {
        orderUpdates: true,
        promotions: true,
        priceDrops: true,
        newArrivals: false,
        newsletter: true,
        smsAlerts: false,
    },
    privacy: {
        showPurchaseHistory: true,
        shareDataForRecommendations: true,
        allowReviews: true,
    },
};

export const mockAchievements = [
    {
        id: 'first_purchase',
        name: 'First Step',
        description: 'Made your first purchase',
        icon: '🎉',
        unlockedAt: '2023-06-15',
        unlocked: true,
    },
    {
        id: 'review_master',
        name: 'Review Master',
        description: 'Written 20+ product reviews',
        icon: '⭐',
        unlockedAt: '2024-02-10',
        unlocked: true,
    },
    {
        id: 'loyal_customer',
        name: 'Loyal Customer',
        description: 'Shopping with us for 1+ year',
        icon: '💎',
        unlockedAt: '2024-06-15',
        unlocked: true,
    },
    {
        id: 'big_spender',
        name: 'Big Spender',
        description: 'Spent ₹2,50,000+ lifetime',
        icon: '💰',
        progress: 98,
        unlocked: false,
    },
    {
        id: 'early_bird',
        name: 'Early Bird',
        description: 'Purchased during a flash sale',
        icon: '🌅',
        unlockedAt: '2023-11-24',
        unlocked: true,
    },
    {
        id: 'eco_warrior',
        name: 'Eco Warrior',
        description: 'Bought 10+ eco-friendly products',
        icon: '🌱',
        progress: 70,
        unlocked: false,
    },
    {
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Shopped 4 months in a row',
        icon: '🔥',
        unlockedAt: '2024-10-01',
        unlocked: true,
    },
    {
        id: 'wishlist_pro',
        name: 'Wishlist Pro',
        description: 'Added 50+ items to wishlist',
        icon: '❤️',
        progress: 45,
        unlocked: false,
    },
];

export let mockOrders = [
    {
        id: 'ORD-2025-001302',
        date: '2025-01-05',
        status: 'processing',
        total: 10999,
        items: [
            {
                id: 101,
                name: 'boAt Airdopes 141',
                image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
                price: 10999,
                quantity: 1,
            },
        ],
        estimatedDelivery: '2025-01-10',
    },
    {
        id: 'ORD-2025-001298',
        date: '2025-01-03',
        status: 'shipped',
        total: 18500,
        items: [
            {
                id: 102,
                name: 'Amazon Echo Dot (5th Gen)',
                image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
                price: 12999,
                quantity: 1,
            },
            {
                id: 103,
                name: 'Philips Smart LED Bulbs (4-Pack)',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
                price: 5501,
                quantity: 1,
            },
        ],
        trackingNumber: 'DTDC123456789',
        carrier: 'DTDC',
        estimatedDelivery: '2025-01-07',
    },
    {
        id: 'ORD-2025-001290',
        date: '2025-01-01',
        status: 'shipped',
        total: 4950,
        items: [
            {
                id: 104,
                name: 'Boldfit Yoga Mat (6mm)',
                image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
                price: 2950,
                quantity: 1,
            },
            {
                id: 105,
                name: 'Resistance Bands Set',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
                price: 2000,
                quantity: 1,
            },
        ],
        trackingNumber: 'BLUEDART987654321',
        carrier: 'BlueDart',
        estimatedDelivery: '2025-01-06',
    },
    {
        id: 'ORD-2024-001247',
        date: '2024-12-28',
        status: 'delivered',
        total: 15999,
        items: [
            {
                id: 1,
                name: 'Sony WH-1000XM4 Headphones',
                image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
                price: 12999,
                quantity: 1,
            },
            {
                id: 2,
                name: 'Spigen Phone Case',
                image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop',
                price: 3000,
                quantity: 1,
            },
        ],
        deliveredAt: '2024-12-31',
    },
    {
        id: 'ORD-2024-001198',
        date: '2024-12-15',
        status: 'delivered',
        total: 24500,
        items: [
            {
                id: 3,
                name: 'Noise ColorFit Pro 4',
                image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
                price: 18500,
                quantity: 1,
            },
            {
                id: 4,
                name: 'Puma Running Shoes',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                price: 6000,
                quantity: 1,
            },
        ],
        deliveredAt: '2024-12-18',
    },
    {
        id: 'ORD-2024-001156',
        date: '2024-11-28',
        status: 'delivered',
        total: 7499,
        items: [
            {
                id: 5,
                name: 'Wipro Smart LED Desk Lamp',
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
                price: 7499,
                quantity: 1,
            },
        ],
        deliveredAt: '2024-12-01',
    },
    {
        id: 'ORD-2024-001089',
        date: '2024-11-10',
        status: 'delivered',
        total: 5200,
        items: [
            {
                id: 6,
                name: 'Allen Solly Cotton T-Shirt Pack',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
                price: 2600,
                quantity: 2,
            },
        ],
        deliveredAt: '2024-11-13',
    },
    {
        id: 'ORD-2024-001034',
        date: '2024-10-22',
        status: 'delivered',
        total: 22250,
        items: [
            {
                id: 7,
                name: 'JBL Flip 6 Bluetooth Speaker',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
                price: 9999,
                quantity: 1,
            },
            {
                id: 8,
                name: 'Samsung Wireless Charger',
                image: 'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=400&h=400&fit=crop',
                price: 3999,
                quantity: 1,
            },
            {
                id: 9,
                name: 'Woodland Leather Wallet',
                image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
                price: 4499,
                quantity: 1,
            },
            {
                id: 10,
                name: 'Ray-Ban Sunglasses',
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                price: 3753,
                quantity: 1,
            },
        ],
        deliveredAt: '2024-10-25',
    },
];

// Cart for demo ordering
export let mockCart = [];

// Place order from items
export const placeOrder = (items) => {
    const orderId = `ORD-2025-${String(1303 + mockOrders.length).padStart(6, '0')}`;

    // Calculate total properly from items
    let total = 0;
    const orderItems = items.map((item, idx) => {
        const itemPrice = item.price || 0;
        const itemQty = item.quantity || 1;
        total += itemPrice * itemQty;

        return {
            id: 200 + idx + mockOrders.length,
            name: item.name,
            image: item.image,
            price: itemPrice,
            quantity: itemQty,
        };
    });

    const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'processing',
        total: total,
        items: orderItems,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    mockOrders = [newOrder, ...mockOrders];
    mockCart = [];

    return newOrder;
};

// Cancel order (only for processing orders)
export const cancelOrder = (orderId) => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1 && mockOrders[orderIndex].status === 'processing') {
        mockOrders = mockOrders.filter(o => o.id !== orderId);
        return { success: true, message: 'Order cancelled successfully' };
    }
    return { success: false, message: 'Cannot cancel this order' };
};

// All Products for the shop
export const mockProducts = [
    {
        id: 'prod-001',
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
        price: 29990,
        originalPrice: 34990,
        category: 'Electronics',
        rating: 4.8,
        reviews: 1250,
        inStock: true,
    },
    {
        id: 'prod-002',
        name: 'Apple AirPods Pro (2nd Gen)',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
        price: 24900,
        originalPrice: 26900,
        category: 'Electronics',
        rating: 4.9,
        reviews: 3420,
        inStock: true,
    },
    {
        id: 'prod-003',
        name: 'Nike Air Max 270',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        price: 12995,
        originalPrice: 14995,
        category: 'Fashion',
        rating: 4.6,
        reviews: 890,
        inStock: true,
    },
    {
        id: 'prod-004',
        name: 'boAt Rockerz 450 Headphones',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
        price: 1499,
        originalPrice: 2990,
        category: 'Electronics',
        rating: 4.2,
        reviews: 15600,
        inStock: true,
    },
    {
        id: 'prod-005',
        name: 'Noise ColorFit Pulse 2',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
        price: 2499,
        originalPrice: 4999,
        category: 'Electronics',
        rating: 4.3,
        reviews: 28900,
        inStock: true,
    },
    {
        id: 'prod-006',
        name: 'Levi\'s 511 Slim Fit Jeans',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
        price: 2999,
        originalPrice: 4499,
        category: 'Fashion',
        rating: 4.5,
        reviews: 4520,
        inStock: true,
    },
    {
        id: 'prod-007',
        name: 'Samsung Galaxy Buds2 Pro',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
        price: 17999,
        originalPrice: 23999,
        category: 'Electronics',
        rating: 4.7,
        reviews: 2100,
        inStock: true,
    },
    {
        id: 'prod-008',
        name: 'The Ordinary Niacinamide Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        price: 699,
        originalPrice: 850,
        category: 'Beauty',
        rating: 4.6,
        reviews: 8900,
        inStock: true,
    },
    {
        id: 'prod-009',
        name: 'Puma Running T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        price: 1299,
        originalPrice: 1999,
        category: 'Sports',
        rating: 4.4,
        reviews: 1560,
        inStock: true,
    },
    {
        id: 'prod-010',
        name: 'JBL Flip 6 Portable Speaker',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        price: 9999,
        originalPrice: 12999,
        category: 'Electronics',
        rating: 4.7,
        reviews: 3200,
        inStock: true,
    },
    {
        id: 'prod-011',
        name: 'Mamaearth Vitamin C Face Wash',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
        price: 349,
        originalPrice: 399,
        category: 'Beauty',
        rating: 4.3,
        reviews: 12500,
        inStock: true,
    },
    {
        id: 'prod-012',
        name: 'Adidas Ultraboost 22',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        price: 16999,
        originalPrice: 21999,
        category: 'Sports',
        rating: 4.8,
        reviews: 2800,
        inStock: true,
    },
];

export const mockQuickReorder = [
    {
        id: 'qr-1',
        name: 'The Ordinary Niacinamide Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
        price: 699,
        lastOrdered: '2024-11-15',
        frequency: 'Monthly',
    },
    {
        id: 'qr-2',
        name: 'MuscleBlaze Whey Protein',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
        price: 2799,
        lastOrdered: '2024-12-01',
        frequency: 'Every 6 weeks',
    },
    {
        id: 'qr-3',
        name: 'Blue Tokai Coffee Beans',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
        price: 599,
        lastOrdered: '2024-12-20',
        frequency: 'Bi-weekly',
    },
];

export const mockShoppingPatterns = {
    preferredDays: ['Saturday', 'Sunday'],
    preferredTime: 'Evening (6PM - 10PM)',
    averageOrderValue: 5205,
    avgItemsPerOrder: 2.3,
    priceRange: {
        min: 300,
        max: 35000,
        average: 3900,
    },
};

// API simulation functions
export const api = {
    getUser: () => Promise.resolve(mockUserData),
    getShoppingStats: () => Promise.resolve(mockShoppingStats),
    getSpendingByCategory: () => Promise.resolve(mockSpendingByCategory),
    getMonthlySpending: () => Promise.resolve(mockMonthlySpending),
    getTopBrands: () => Promise.resolve(mockTopBrands),
    getSmartInsights: () => Promise.resolve(mockSmartInsights),
    getPreferences: () => Promise.resolve(mockPreferences),
    getAchievements: () => Promise.resolve(mockAchievements),
    getOrders: () => Promise.resolve(mockOrders),
    getQuickReorder: () => Promise.resolve(mockQuickReorder),
    getShoppingPatterns: () => Promise.resolve(mockShoppingPatterns),
    getProducts: () => Promise.resolve(mockProducts),

    updatePreferences: (updates) => {
        Object.assign(mockPreferences, updates);
        return Promise.resolve({ success: true });
    },
};

export default api;
