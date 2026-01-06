import { useState } from 'react';
import { Zap, Percent, Clock, Star, ShoppingBag, TrendingDown, Sparkles, X, Check, MapPin, CreditCard, Truck } from 'lucide-react';
import { CURRENCY } from '../../data/mockApi';
import './PersonalizedDeals.css';

// Simulated personalized deals based on user's shopping history
const getPersonalizedDeals = () => [
    {
        id: 1,
        name: 'Sony WH-1000XM5 Headphones',
        category: 'Electronics',
        originalPrice: 29990,
        discountedPrice: 19990,
        discount: 33,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        reason: 'Based on your electronics purchases',
        endsIn: '2 days',
        rating: 4.8,
        reviews: 1247,
        isHot: true,
    },
    {
        id: 2,
        name: 'Nike Air Max 270',
        category: 'Fashion',
        originalPrice: 12999,
        discountedPrice: 6499,
        discount: 50,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        reason: 'Similar to your past purchases',
        endsIn: '12 hours',
        rating: 4.6,
        reviews: 892,
        isHot: true,
    },
    {
        id: 3,
        name: 'The Ordinary Skincare Set',
        category: 'Beauty',
        originalPrice: 3500,
        discountedPrice: 1750,
        discount: 50,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
        reason: 'Time to restock your skincare',
        endsIn: '3 days',
        rating: 4.7,
        reviews: 2156,
        isHot: false,
    },
    {
        id: 4,
        name: 'Apple AirPods Pro',
        category: 'Electronics',
        originalPrice: 24900,
        discountedPrice: 17990,
        discount: 28,
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=300&h=300&fit=crop',
        reason: 'Complements your Apple devices',
        endsIn: '5 days',
        rating: 4.9,
        reviews: 3421,
        isHot: false,
    },
    {
        id: 5,
        name: 'Levi\'s 501 Original Jeans',
        category: 'Fashion',
        originalPrice: 4999,
        discountedPrice: 2499,
        discount: 50,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
        reason: 'Trending in your size',
        endsIn: '1 day',
        rating: 4.5,
        reviews: 567,
        isHot: true,
    },
    {
        id: 6,
        name: 'Fitbit Charge 5',
        category: 'Electronics',
        originalPrice: 14999,
        discountedPrice: 9999,
        discount: 33,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
        reason: 'Popular with shoppers like you',
        endsIn: '4 days',
        rating: 4.4,
        reviews: 789,
        isHot: false,
    },
];

export default function PersonalizedDeals({ onOrderPlaced }) {
    const [deals] = useState(getPersonalizedDeals());
    const [selectedDeal, setSelectedDeal] = useState(null);
    const [orderStep, setOrderStep] = useState('details'); // details, processing, confirmed
    const [orderedItems, setOrderedItems] = useState(new Set());

    const handleOrderNow = (deal) => {
        setSelectedDeal(deal);
        setOrderStep('details');
    };

    const handleConfirmOrder = async () => {
        setOrderStep('processing');

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        setOrderStep('confirmed');
        setOrderedItems(prev => new Set([...prev, selectedDeal.id]));

        if (onOrderPlaced) {
            onOrderPlaced({
                id: `FP${Date.now()}`,
                items: [selectedDeal],
                total: selectedDeal.discountedPrice,
                status: 'processing'
            });
        }
    };

    const handleCloseModal = () => {
        setSelectedDeal(null);
        setOrderStep('details');
    };

    const totalSavings = deals.reduce((sum, deal) => sum + (deal.originalPrice - deal.discountedPrice), 0);

    return (
        <div className="personalized-deals section-card">
            <div className="section-header">
                <h2 className="section-title">
                    <Sparkles className="title-icon deals" />
                    Deals For You
                </h2>
                <div className="deals-savings-badge">
                    <TrendingDown size={14} />
                    Save up to {CURRENCY.format(totalSavings)}
                </div>
            </div>

            <p className="deals-subtitle">
                Handpicked offers based on your shopping preferences and purchase history
            </p>

            <div className="deals-grid">
                {deals.map((deal) => (
                    <div key={deal.id} className={`deal-card ${deal.isHot ? 'hot' : ''}`}>
                        {deal.isHot && (
                            <div className="deal-hot-badge">
                                <Zap size={12} />
                                HOT DEAL
                            </div>
                        )}

                        <div className="deal-discount-badge">
                            <Percent size={12} />
                            {deal.discount}% OFF
                        </div>

                        <div className="deal-image">
                            <img src={deal.image} alt={deal.name} />
                        </div>

                        <div className="deal-content">
                            <span className="deal-category">{deal.category}</span>
                            <h3 className="deal-name">{deal.name}</h3>

                            <div className="deal-rating">
                                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                                <span>{deal.rating}</span>
                                <span className="deal-reviews">({deal.reviews})</span>
                            </div>

                            <div className="deal-price">
                                <span className="deal-price-current">{CURRENCY.format(deal.discountedPrice)}</span>
                                <span className="deal-price-original">{CURRENCY.format(deal.originalPrice)}</span>
                            </div>

                            <div className="deal-reason">
                                <Sparkles size={12} />
                                {deal.reason}
                            </div>

                            <div className="deal-timer">
                                <Clock size={12} />
                                Ends in {deal.endsIn}
                            </div>

                            <button
                                className={`btn btn-primary deal-cta ${orderedItems.has(deal.id) ? 'ordered' : ''}`}
                                onClick={() => handleOrderNow(deal)}
                                disabled={orderedItems.has(deal.id)}
                            >
                                {orderedItems.has(deal.id) ? (
                                    <>
                                        <Check size={14} />
                                        Ordered
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={14} />
                                        Order Now
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="deals-footer">
                <p className="deals-footer-text">
                    <Sparkles size={14} />
                    These deals are personalized just for you based on your shopping history
                </p>
            </div>

            {/* Order Modal */}
            {selectedDeal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="order-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        {orderStep === 'details' && (
                            <>
                                <button className="modal-close" onClick={handleCloseModal}>
                                    <X size={20} />
                                </button>

                                <div className="order-modal-header">
                                    <h2>Complete Your Order</h2>
                                </div>

                                <div className="order-modal-content">
                                    <div className="order-product">
                                        <img src={selectedDeal.image} alt={selectedDeal.name} />
                                        <div className="order-product-info">
                                            <h3>{selectedDeal.name}</h3>
                                            <span className="order-product-category">{selectedDeal.category}</span>
                                            <div className="order-product-price">
                                                <span className="current">{CURRENCY.format(selectedDeal.discountedPrice)}</span>
                                                <span className="original">{CURRENCY.format(selectedDeal.originalPrice)}</span>
                                                <span className="savings">You save {CURRENCY.format(selectedDeal.originalPrice - selectedDeal.discountedPrice)}!</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-section">
                                        <div className="order-section-header">
                                            <MapPin size={16} />
                                            <span>Delivery Address</span>
                                        </div>
                                        <div className="order-address">
                                            <strong>Home</strong>
                                            <p>123 Main Street, Apartment 4B<br />Mumbai, Maharashtra 400001</p>
                                        </div>
                                    </div>

                                    <div className="order-section">
                                        <div className="order-section-header">
                                            <CreditCard size={16} />
                                            <span>Payment Method</span>
                                        </div>
                                        <div className="order-payment">
                                            <span>•••• •••• •••• 4242</span>
                                            <span className="payment-type">Visa</span>
                                        </div>
                                    </div>

                                    <div className="order-section">
                                        <div className="order-section-header">
                                            <Truck size={16} />
                                            <span>Estimated Delivery</span>
                                        </div>
                                        <div className="order-delivery">
                                            <strong>3-5 Business Days</strong>
                                            <span>Free Express Shipping</span>
                                        </div>
                                    </div>

                                    <div className="order-summary">
                                        <div className="order-summary-row">
                                            <span>Subtotal</span>
                                            <span>{CURRENCY.format(selectedDeal.discountedPrice)}</span>
                                        </div>
                                        <div className="order-summary-row">
                                            <span>Shipping</span>
                                            <span className="free">FREE</span>
                                        </div>
                                        <div className="order-summary-row total">
                                            <span>Total</span>
                                            <span>{CURRENCY.format(selectedDeal.discountedPrice)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-modal-footer">
                                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleConfirmOrder}>
                                        <ShoppingBag size={16} />
                                        Place Order
                                    </button>
                                </div>
                            </>
                        )}

                        {orderStep === 'processing' && (
                            <div className="order-processing">
                                <div className="processing-spinner"></div>
                                <h3>Processing Your Order...</h3>
                                <p>Please wait while we confirm your order</p>
                            </div>
                        )}

                        {orderStep === 'confirmed' && (
                            <div className="order-confirmed">
                                <div className="confirmed-icon">
                                    <Check size={32} />
                                </div>
                                <h3>Order Confirmed! 🎉</h3>
                                <p>Your order has been placed successfully.</p>
                                <div className="confirmed-details">
                                    <span className="order-id">Order ID: FP{Date.now().toString().slice(-6)}</span>
                                    <span className="you-saved">You saved {CURRENCY.format(selectedDeal.originalPrice - selectedDeal.discountedPrice)}!</span>
                                </div>
                                <button className="btn btn-primary" onClick={handleCloseModal}>
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
