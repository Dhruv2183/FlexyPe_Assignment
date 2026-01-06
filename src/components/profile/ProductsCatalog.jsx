import { useState } from 'react';
import { ShoppingBag, Star, Search, Filter, X, Package, MapPin, CreditCard, Check } from 'lucide-react';
import { placeOrder, CURRENCY } from '../../data/mockApi';
import './ProductsCatalog.css';

export default function ProductsCatalog({ products, onOrderPlaced }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderStep, setOrderStep] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const categories = ['all', ...new Set(products.map(p => p.category))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleBuyNow = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
        setOrderStep(1);
    };

    const handleConfirmOrder = () => {
        setOrderStep(2);
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const order = placeOrder([{
            ...selectedProduct,
            quantity: quantity
        }]);

        setIsProcessing(false);
        setOrderStep(3);

        setTimeout(() => {
            if (onOrderPlaced) {
                onOrderPlaced(order);
            }
            closeModal();
        }, 2000);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setOrderStep(0);
        setQuantity(1);
    };

    return (
        <>
            <div className="products-catalog section-card">
                <div className="section-header">
                    <h2 className="section-title">
                        <ShoppingBag className="title-icon shop" />
                        Shop Products
                    </h2>
                </div>

                {/* Search and Filter */}
                <div className="catalog-filters">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={() => setSearchQuery('')}>
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === 'all' ? 'All' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                {product.originalPrice > product.price && (
                                    <span className="discount-badge">
                                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>

                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>

                                <div className="product-rating">
                                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                                    <span>{product.rating}</span>
                                    <span className="review-count">({product.reviews.toLocaleString()})</span>
                                </div>

                                <div className="product-pricing">
                                    <span className="current-price">{CURRENCY.format(product.price)}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="original-price">{CURRENCY.format(product.originalPrice)}</span>
                                    )}
                                </div>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleBuyNow(product)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <ShoppingBag size={48} strokeWidth={1} />
                        <p>No products found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Order Flow Modal */}
            {selectedProduct && orderStep > 0 && (
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
                                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                                    <div className="product-details">
                                        <h3>{selectedProduct.name}</h3>
                                        <p className="product-price">{CURRENCY.format(selectedProduct.price)}</p>
                                        <div className="quantity-selector">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                            <span>{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                                        <span>{CURRENCY.format(selectedProduct.price * quantity)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery</span>
                                        <span className="text-success">FREE</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>{CURRENCY.format(selectedProduct.price * quantity)}</span>
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
                                        <span>{CURRENCY.format(selectedProduct.price * quantity)}</span>
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
