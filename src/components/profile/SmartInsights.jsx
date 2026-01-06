import { ChevronRight, Zap, AlertCircle, RefreshCw, Flame, BarChart3, Sparkles, PiggyBank, Info } from 'lucide-react';
import './SmartInsights.css';

// Map insight types to Lucide icons
const getInsightIcon = (type) => {
    switch (type) {
        case 'restock': return <RefreshCw size={18} />;
        case 'deal': return <Flame size={18} />;
        case 'pattern': return <BarChart3 size={18} />;
        case 'recommendation': return <Sparkles size={18} />;
        case 'savings': return <PiggyBank size={18} />;
        default: return <Info size={18} />;
    }
};

export default function SmartInsights({ insights, compact = false, onViewAll }) {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            default: return 'priority-low';
        }
    };

    const displayedInsights = compact ? insights.slice(0, 3) : insights;

    const handleViewAll = (e) => {
        e.preventDefault();
        if (onViewAll) {
            onViewAll();
        }
    };

    return (
        <div className={`smart-insights section-card ${compact ? 'compact' : ''}`}>
            <div className="section-header">
                <h2 className="section-title">
                    <Zap className="title-icon" />
                    Smart Insights
                </h2>
                {compact && (
                    <button className="section-action" onClick={handleViewAll}>
                        View All
                    </button>
                )}
            </div>

            <div className="insights-list">
                {displayedInsights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`insight-card ${getPriorityClass(insight.priority)}`}
                    >
                        <div className="insight-icon">{getInsightIcon(insight.type)}</div>
                        <div className="insight-content">
                            <h3 className="insight-title">{insight.title}</h3>
                            <p className="insight-message">{insight.message}</p>
                            {!compact && (
                                <button className="insight-action">
                                    {insight.action}
                                    <ChevronRight size={14} />
                                </button>
                            )}
                        </div>
                        {insight.priority === 'high' && (
                            <div className="insight-badge">
                                <AlertCircle size={12} />
                                Hot
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!compact && (
                <div className="insights-footer">
                    <p className="insights-note">
                        <Info size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        Insights are generated based on your shopping patterns and preferences.
                        <a href="#">Learn more</a>
                    </p>
                </div>
            )}
        </div>
    );
}

