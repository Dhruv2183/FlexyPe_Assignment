import { useState } from 'react';
import { Package, Truck, CheckCircle, RotateCcw, Star, ChevronDown, ChevronUp, Eye, Clock, MapPin, XCircle, AlertTriangle } from 'lucide-react';
import { cancelOrder, CURRENCY } from '../../data/mockApi';
import './OrderTimeline.css';

export default function OrderTimeline({ orders, onOrderCancelled }) {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [filter, setFilter] = useState('all');
    const [cancellingOrder, setCancellingOrder] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'processing':
                return { icon: Clock, label: 'Processing', color: '#f59e0b' };
            case 'shipped':
                return { icon: Truck, label: 'Shipped', color: '#3b82f6' };
            case 'delivered':
                return { icon: CheckCircle, label: 'Delivered', color: '#22c55e' };
            case 'cancelled':
                return { icon: XCircle, label: 'Cancelled', color: '#ef4444' };
            default:
                return { icon: Package, label: status, color: '#94a3b8' };
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Filter orders based on selected filter
    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    // Count orders by status for filter badges
    const statusCounts = {
        all: orders.length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
    };

    const handleCancelClick = (orderId) => {
        setCancellingOrder(orderId);
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        if (cancellingOrder) {
            cancelOrder(cancellingOrder);
            setShowCancelModal(false);
            setCancellingOrder(null);
            if (onOrderCancelled) {
                onOrderCancelled();
            }
        }
    };

    return (
        <>
            <div className="order-timeline section-card">
                <div className="section-header">
                    <h2 className="section-title">
                        <Package className="title-icon package" />
                        Order History
                    </h2>
                    <div className="order-filters">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All <span className="filter-count">{statusCounts.all}</span>
                        </button>
                        <button
                            className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
                            onClick={() => setFilter('processing')}
                        >
                            <Clock size={14} />
                            Processing <span className="filter-count">{statusCounts.processing}</span>
                        </button>
                        <button
                            className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
                            onClick={() => setFilter('shipped')}
                        >
                            <Truck size={14} />
                            In Transit <span className="filter-count">{statusCounts.shipped}</span>
                        </button>
                        <button
                            className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
                            onClick={() => setFilter('delivered')}
                        >
                            <CheckCircle size={14} />
                            Delivered <span className="filter-count">{statusCounts.delivered}</span>
                        </button>
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="no-orders">
                        <Package size={48} strokeWidth={1} />
                        <p>No orders found with this filter.</p>
                    </div>
                ) : (
                    <div className="orders-list">
                        {filteredOrders.map((order, index) => {
                            const statusInfo = getStatusInfo(order.status);
                            const StatusIcon = statusInfo.icon;
                            const isExpanded = expandedOrder === order.id;

                            return (
                                <div key={order.id} className="order-card">
                                    {/* Timeline connector */}
                                    {index < filteredOrders.length - 1 && (
                                        <div className="timeline-connector"></div>
                                    )}

                                    {/* Timeline dot */}
                                    <div
                                        className="timeline-dot"
                                        style={{ backgroundColor: statusInfo.color }}
                                    >
                                        <StatusIcon size={14} />
                                    </div>

                                    {/* Order content */}
                                    <div className="order-content">
                                        <div
                                            className="order-header"
                                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                        >
                                            <div className="order-main-info">
                                                <span className="order-id">{order.id}</span>
                                                <span
                                                    className="order-status"
                                                    style={{ backgroundColor: `${statusInfo.color}20`, color: statusInfo.color }}
                                                >
                                                    <StatusIcon size={12} />
                                                    {statusInfo.label}
                                                </span>
                                            </div>

                                            <div className="order-meta">
                                                <span className="order-date">{formatDate(order.date)}</span>
                                                <span className="order-total">{CURRENCY.format(order.total)}</span>
                                            </div>

                                            <button className="order-toggle">
                                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </button>
                                        </div>

                                        {/* Expanded content */}
                                        {isExpanded && (
                                            <div className="order-details animate-slide-up">
                                                {/* Tracking Info for shipped orders */}
                                                {order.status === 'shipped' && order.trackingNumber && (
                                                    <div className="tracking-info">
                                                        <MapPin size={16} />
                                                        <div className="tracking-content">
                                                            <span className="tracking-label">Tracking: {order.trackingNumber}</span>
                                                            <span className="tracking-carrier">via {order.carrier}</span>
                                                        </div>
                                                        <span className="tracking-eta">Est. {formatDate(order.estimatedDelivery)}</span>
                                                    </div>
                                                )}

                                                {/* Estimated delivery for processing orders */}
                                                {order.status === 'processing' && order.estimatedDelivery && (
                                                    <div className="tracking-info processing">
                                                        <Clock size={16} />
                                                        <span>Estimated delivery: {formatDate(order.estimatedDelivery)}</span>
                                                    </div>
                                                )}

                                                <div className="order-items">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="order-item">
                                                            <div className="item-image">
                                                                <img src={item.image} alt={item.name} />
                                                            </div>
                                                            <div className="item-info">
                                                                <span className="item-name">{item.name}</span>
                                                                <span className="item-qty">Qty: {item.quantity}</span>
                                                            </div>
                                                            <span className="item-price">{CURRENCY.format(item.price)}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="order-actions">
                                                    <button className="btn btn-secondary btn-sm">
                                                        <Eye size={14} />
                                                        View Details
                                                    </button>
                                                    {order.status === 'processing' && (
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleCancelClick(order.id)}
                                                        >
                                                            <XCircle size={14} />
                                                            Cancel Order
                                                        </button>
                                                    )}
                                                    {order.status !== 'processing' && (
                                                        <button className="btn btn-secondary btn-sm">
                                                            <RotateCcw size={14} />
                                                            Reorder
                                                        </button>
                                                    )}
                                                    {order.status === 'delivered' && (
                                                        <button className="btn btn-secondary btn-sm">
                                                            <Star size={14} />
                                                            Write Review
                                                        </button>
                                                    )}
                                                </div>

                                                {order.deliveredAt && (
                                                    <div className="delivery-info">
                                                        <CheckCircle size={14} />
                                                        <span>Delivered on {formatDate(order.deliveredAt)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredOrders.length > 0 && filter === 'all' && (
                    <div className="orders-pagination">
                        <button className="btn btn-ghost">Load More Orders</button>
                    </div>
                )}
            </div>

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
                    <div className="cancel-modal animate-scale-in" onClick={e => e.stopPropagation()}>
                        <div className="cancel-modal-icon">
                            <AlertTriangle size={32} />
                        </div>
                        <h2>Cancel Order?</h2>
                        <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
                        <div className="cancel-modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowCancelModal(false)}
                            >
                                Keep Order
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={confirmCancel}
                            >
                                Yes, Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
