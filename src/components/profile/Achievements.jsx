import { Award, Lock, ChevronRight, PartyPopper, Star, Gem, Coins, Sunrise, Leaf, Flame, Heart, Check, Share2 } from 'lucide-react';
import './Achievements.css';

// Map achievement IDs to Lucide icons
const getAchievementIcon = (id) => {
    switch (id) {
        case 'first_purchase': return <PartyPopper size={24} />;
        case 'review_master': return <Star size={24} />;
        case 'loyal_customer': return <Gem size={24} />;
        case 'big_spender': return <Coins size={24} />;
        case 'early_bird': return <Sunrise size={24} />;
        case 'eco_warrior': return <Leaf size={24} />;
        case 'streak_master': return <Flame size={24} />;
        case 'wishlist_pro': return <Heart size={24} />;
        default: return <Award size={24} />;
    }
};

export default function Achievements({ achievements, compact = false, onViewAll }) {
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    const displayedAchievements = compact
        ? achievements.filter(a => a.unlocked).slice(0, 4)
        : achievements;

    const handleViewAll = (e) => {
        e.preventDefault();
        if (onViewAll) {
            onViewAll();
        }
    };

    return (
        <div className={`achievements section-card ${compact ? 'compact' : ''}`}>
            <div className="section-header">
                <h2 className="section-title">
                    <Award className="title-icon trophy" />
                    Achievements
                    <span className="achievement-count">{unlockedCount}/{totalCount}</span>
                </h2>
                {compact && (
                    <button className="section-action" onClick={handleViewAll}>
                        View All
                        <ChevronRight size={14} />
                    </button>
                )}
            </div>

            {!compact && (
                <div className="achievements-progress">
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                        ></div>
                    </div>
                    <span className="progress-label">
                        {Math.round((unlockedCount / totalCount) * 100)}% Complete
                    </span>
                </div>
            )}

            <div className="achievements-grid">
                {displayedAchievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                    >
                        <div className="achievement-icon-wrapper">
                            <span className="achievement-icon">{getAchievementIcon(achievement.id)}</span>
                            {!achievement.unlocked && (
                                <div className="lock-overlay">
                                    <Lock size={16} />
                                </div>
                            )}
                            {achievement.unlocked && (
                                <div className="unlock-glow"></div>
                            )}
                        </div>

                        <div className="achievement-info">
                            <h3 className="achievement-name">{achievement.name}</h3>
                            <p className="achievement-desc">{achievement.description}</p>

                            {achievement.unlocked ? (
                                <span className="achievement-date">
                                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            ) : (
                                <div className="achievement-progress">
                                    <div className="mini-progress-bar">
                                        <div
                                            className="mini-progress-fill"
                                            style={{ width: `${achievement.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="mini-progress-label">{achievement.progress || 0}%</span>
                                </div>
                            )}
                        </div>

                        {achievement.unlocked && (
                            <div className="achievement-check"><Check size={14} /></div>
                        )}
                    </div>
                ))}
            </div>

            {!compact && (
                <div className="achievements-footer">
                    <div className="share-achievements">
                        <span><Share2 size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Share your achievements</span>
                        <div className="share-buttons">
                            <button className="share-btn">Twitter</button>
                            <button className="share-btn">Facebook</button>
                            <button className="share-btn">Copy Link</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
