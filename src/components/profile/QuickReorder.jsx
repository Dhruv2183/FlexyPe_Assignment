import { useState } from 'react';
import { RefreshCw, Clock, Check, ShoppingCart, X, Package, MapPin, CreditCard, Lightbulb } from 'lucide-react';
import { placeOrder, CURRENCY } from '../../data/mockApi';
import './QuickReorder.css';

export default function QuickReorder({ items, onOrderPlaced, onViewAllProducts }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [orderStep, setOrderStep] = useState(0); // 0: none, 1: confirm, 2: address, 3: success
    const [isProcessing, setIsProcessing] = useState(false);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    };

    const handleOrderClick = (item) => {
        setSelectedItem(item);
        setOrderStep(1);
    };

    const handleConfirmOrder = async () => {
        setOrderStep(2);
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Place the order
        const order = placeOrder([{
            ...selectedItem,
            quantity: 1
        }]);

        setIsProcessing(false);
        setOrderStep(3);

        // Notify parent and close after delay
        setTimeout(() => {
            if (onOrderPlaced) {
                onOrderPlaced(order);
            }
            setSelectedItem(null);
            setOrderStep(0);
        }, 2000);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setOrderStep(0);
    };

    return (
        <>
            <div className="quick-reorder section-card">
                <div className="section-header">
                    <h2 className="section-title">
                        <RefreshCw className="title-icon reorder" />
                        Quick Reorder
                    </h2>
                    <button className="section-action" onClick={onViewAllProducts}>
                        View All Products
                    </button>
                </div>

                <p className="reorder-subtitle">
                    Products you buy regularly. Reorder with one click!
                </p>

                <div className="reorder-grid">
                    {items.map((item) => (
                        <div key={item.id} className="reorder-card">
                            <div className="reorder-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="reorder-info">
                                <h3 className="reorder-name">{item.name}</h3>
                                <div className="reorder-meta">
                                    <span className="reorder-price">{CURRENCY.format(item.price)}</span>
                                    <span className="reorder-frequency">
                                        <Clock size={12} />
                                        {item.frequency}
                                    </span>
                                </div>
                                <span className="reorder-last">
                                    Last ordered: {formatDate(item.lastOrdered)}
                                </span>
                            </div>

                            <button
                                className="btn btn-primary btn-sm reorder-btn"
                                onClick={() => handleOrderClick(item)}
                            >
                                <ShoppingCart size={14} />
                                Order Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="reorder-tip">
                    <Lightbulb size={14} style={{ marginRight: '4px', verticalAlign: 'middle', color: 'var(--color-accent)' }} />
                    <strong>Pro tip:</strong> Set up auto-delivery and save 15% on these items!
                    <a href="#">Learn more</a>
                </div>
            </div>

            {/* Order Flow Modal */}
            {selectedItem && orderStep > 0 && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="order-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        {orderStep < 3 && (
                            <button className="modal-close" onClick={closeModal}>
                                <X size={20} />
                            </button>
                        )}

                        {/* Step 1: Review Order */}
                        {orderStep === 1 && (
                            <div className="order-step">
                                <div className="step-header">
                                    <Package size={24} />
                                    <h2>Review Your Order</h2>
                                </div>

                                <div className="order-product-card">
                                    <img src={selectedItem.image} alt={selectedItem.name} />
                                    <div className="product-details">
                                        <h3>{selectedItem.name}</h3>
                                        <p className="product-price">{CURRENCY.format(selectedItem.price)}</p>
                                        <p className="product-qty">Quantity: 1</p>
                                    </div>
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>{CURRENCY.format(selectedItem.price)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery</span>
                                        <span className="text-success">FREE</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>{CURRENCY.format(selectedItem.price)}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-lg" onClick={handleConfirmOrder}>
                                    Continue to Delivery
                                </button>
                            </div>
                        )}

                        {/* Step 2: Delivery Address */}
                        {orderStep === 2 && (
                            <div className="order-step">
                                <div className="step-header">
                                    <MapPin size={24} />
                                    <h2>Delivery Address</h2>
                                </div>

                                <div className="address-card selected">
                                    <div className="address-badge">Default</div>
                                    <h4>Home</h4>
                                    <p>Rahul Sharma</p>
                                    <p>123, Green Park Extension</p>
                                    <p>New Delhi - 110016</p>
                                    <p>+91 98765 43210</p>
                                </div>

                                <div className="payment-section">
                                    <div className="step-header small">
                                        <CreditCard size={20} />
                                        <h3>Payment Method</h3>
                                    </div>
                                    <div className="payment-option selected">
                                        <span>💵 Cash on Delivery</span>
                                        <Check size={16} />
                                    </div>
                                </div>

                                <div className="order-summary compact">
                                    <div className="summary-row total">
                                        <span>Total to Pay</span>
                                        <span>{CURRENCY.format(selectedItem.price)}</span>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={handlePlaceOrder}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        )}

                        {/* Step 3: Success */}
                        {orderStep === 3 && (
                            <div className="order-step success">
                                <div className="success-icon">
                                    <Check size={40} />
                                </div>
                                <h2>Order Placed!</h2>
                                <p>Your order has been placed successfully.</p>
                                <p className="success-hint">Check the Orders tab for tracking.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
