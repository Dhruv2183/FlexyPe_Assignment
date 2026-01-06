import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TrendingUp, ShoppingBag, Clock, IndianRupee, PiggyBank } from 'lucide-react';
import { CURRENCY } from '../../data/mockApi';
import { useState } from 'react';
import './ShoppingDNA.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ShoppingDNA({ categories = [], topBrands, patterns, expanded = false }) {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    // Guard against empty/undefined categories
    if (!categories || categories.length === 0) {
        return (
            <div className={`shopping-dna section-card savings-theme ${expanded ? 'expanded' : ''}`}>
                <div className="section-header">
                    <h2 className="section-title">
                        <PiggyBank size={20} className="section-icon savings" />
                        Your Savings DNA
                    </h2>
                </div>
                <div className="dna-content">
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        Start shopping to see your savings breakdown!
                    </p>
                </div>
            </div>
        );
    }

    // Calculate savings by category (simulating ~15% savings per category)
    const savingsMultiplier = 0.15;
    const categorySavings = categories.map(c => ({
        ...c,
        savedAmount: Math.round((c.amount || 0) * savingsMultiplier)
    }));

    const totalSaved = categorySavings.reduce((sum, c) => sum + (c.savedAmount || 0), 0);

    const chartData = {
        labels: categorySavings.map(c => c.category),
        datasets: [{
            data: categorySavings.map(c => c.savedAmount),
            backgroundColor: categorySavings.map(c => c.color),
            borderWidth: 0,
            hoverOffset: 8,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false, // Disable default tooltip
            },
        },
        onHover: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                setHoveredCategory(categorySavings[index]);
            } else {
                setHoveredCategory(null);
            }
        },
    };

    return (
        <div className={`shopping-dna section-card savings-theme ${expanded ? 'expanded' : ''}`}>
            <div className="section-header">
                <h2 className="section-title">
                    <PiggyBank size={20} className="section-icon savings" />
                    Your Savings DNA
                </h2>
            </div>

            <div className="dna-content">
                {/* Savings by Category Chart */}
                <div className="dna-chart-section">
                    <div className="dna-chart">
                        <Doughnut data={chartData} options={chartOptions} />
                        <div className="chart-center savings-center">
                            {hoveredCategory ? (
                                <>
                                    <span className="chart-category-name" style={{ color: hoveredCategory.color }}>
                                        {hoveredCategory.category}
                                    </span>
                                    <span className="chart-total">{CURRENCY.format(hoveredCategory.savedAmount)}</span>
                                    <span className="chart-label">Saved</span>
                                </>
                            ) : (
                                <>
                                    <span className="chart-total text-success">{CURRENCY.format(totalSaved)}</span>
                                    <span className="chart-label">Total Saved</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="category-legend">
                        {categorySavings.map((cat, index) => (
                            <div
                                key={index}
                                className={`legend-item ${hoveredCategory?.category === cat.category ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredCategory(cat)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <span
                                    className="legend-dot"
                                    style={{ backgroundColor: cat.color }}
                                />
                                <span className="legend-name">{cat.category}</span>
                                <span className="legend-value">{cat.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Brands */}
                <div className="top-brands">
                    <h3 className="subsection-title">
                        <ShoppingBag size={16} />
                        Top Brands
                    </h3>
                    <div className="brands-list">
                        {topBrands.slice(0, 3).map((brand, index) => (
                            <div key={index} className="brand-item">
                                <div className="brand-rank">#{index + 1}</div>
                                <div className="brand-info">
                                    <span className="brand-name">{brand.name}</span>
                                    <span className="brand-orders">{brand.purchases} purchases</span>
                                </div>
                                <span className="brand-amount">{CURRENCY.format(brand.totalSpent)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shopping Patterns (shown when expanded) */}
                {expanded && patterns && (
                    <div className="shopping-patterns">
                        <h3 className="subsection-title">
                            <Clock size={16} />
                            Shopping Patterns
                        </h3>
                        <div className="patterns-grid">
                            <div className="pattern-card">
                                <TrendingUp size={20} />
                                <span className="pattern-label">Favorite Days</span>
                                <span className="pattern-value">{patterns.preferredDays?.join(', ') || 'Weekend'}</span>
                            </div>
                            <div className="pattern-card">
                                <Clock size={20} />
                                <span className="pattern-label">Peak Time</span>
                                <span className="pattern-value">{patterns.preferredTime || 'Evening'}</span>
                            </div>
                            <div className="pattern-card">
                                <IndianRupee size={20} />
                                <span className="pattern-label">Avg. Order</span>
                                <span className="pattern-value">{CURRENCY.format(patterns.averageOrderValue || 0)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
