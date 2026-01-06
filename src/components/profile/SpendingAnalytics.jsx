import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, Calendar, Gift, Sparkles, Award, PartyPopper, PiggyBank } from 'lucide-react';
import { CURRENCY } from '../../data/mockApi';
import { useState } from 'react';
import './SpendingAnalytics.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function SpendingAnalytics({ monthlyData, categoryData, stats, patterns }) {
    // Calculate savings data - simulate original prices being higher
    const savingsMultiplier = 1.15; // FlexyPe offers ~15% average savings

    const monthlySavings = monthlyData.map(m => ({
        month: m.month,
        actualPaid: m.amount,
        wouldHavePaid: Math.round(m.amount * savingsMultiplier),
        saved: Math.round(m.amount * (savingsMultiplier - 1))
    }));

    const totalActualPaid = monthlySavings.reduce((sum, m) => sum + m.actualPaid, 0);
    const totalWouldHavePaid = monthlySavings.reduce((sum, m) => sum + m.wouldHavePaid, 0);
    const totalSaved = stats?.savedAmount || (totalWouldHavePaid - totalActualPaid);
    const savingsRate = ((totalSaved / totalWouldHavePaid) * 100).toFixed(1);

    const lastMonthSaved = monthlySavings[monthlySavings.length - 1]?.saved || 0;
    const prevMonthSaved = monthlySavings[monthlySavings.length - 2]?.saved || 0;
    const savingsChange = prevMonthSaved ? ((lastMonthSaved - prevMonthSaved) / prevMonthSaved * 100).toFixed(1) : 0;

    // Savings milestones
    const savingsMilestones = [
        { amount: 10000, label: 'Starter', emoji: '🌱' },
        { amount: 25000, label: 'Saver', emoji: '💰' },
        { amount: 50000, label: 'Smart Shopper', emoji: '⭐' },
        { amount: 100000, label: 'Super Saver', emoji: '🏆' },
        { amount: 200000, label: 'Savings Champion', emoji: '👑' },
    ];

    const currentMilestone = savingsMilestones.filter(m => totalSaved >= m.amount).pop();
    const nextMilestone = savingsMilestones.find(m => totalSaved < m.amount);
    const milestoneProgress = nextMilestone
        ? ((totalSaved - (currentMilestone?.amount || 0)) / (nextMilestone.amount - (currentMilestone?.amount || 0))) * 100
        : 100;

    // Chart shows SAVINGS over time (green, positive feeling)
    const chartData = {
        labels: monthlySavings.map(m => m.month),
        datasets: [{
            label: 'Monthly Savings',
            data: monthlySavings.map(m => m.saved),
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
                gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                return gradient;
            },
            borderColor: '#22c55e',
            borderWidth: 3,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(34, 197, 94, 0.95)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                borderColor: 'rgba(34, 197, 94, 0.5)',
                borderWidth: 1,
                borderRadius: 8,
                callbacks: {
                    title: (items) => `${items[0].label} Savings`,
                    label: (context) => `You saved ${CURRENCY.format(context.raw)} 🎉`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                },
            },
            y: {
                grid: {
                    color: 'rgba(34, 197, 94, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                    font: { size: 11 },
                    callback: (value) => `₹${(value / 1000).toFixed(0)}k`,
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <div className="spending-analytics section-card savings-focused">
            <div className="section-header">
                <h2 className="section-title">
                    <PiggyBank size={20} className="section-icon savings" />
                    Your Savings Dashboard
                </h2>
                <div className="analytics-period">
                    <Calendar size={14} />
                    <span>Last 12 months</span>
                </div>
            </div>

            {/* Hero Savings Banner */}
            <div className="savings-hero-banner">
                <div className="savings-hero-content">
                    <div className="savings-hero-icon">
                        <PartyPopper size={32} />
                    </div>
                    <div className="savings-hero-text">
                        <span className="savings-hero-label">You've Saved a Total of</span>
                        <span className="savings-hero-amount">{CURRENCY.format(totalSaved)}</span>
                        <span className="savings-hero-subtitle">
                            That's {savingsRate}% off your purchases! 🎉
                        </span>
                    </div>
                </div>
                {currentMilestone && (
                    <div className="savings-badge">
                        <span className="savings-badge-emoji">{currentMilestone.emoji}</span>
                        <span className="savings-badge-label">{currentMilestone.label}</span>
                    </div>
                )}
            </div>

            {/* Comparison Cards */}
            <div className="analytics-summary savings-summary">
                <div className="summary-card comparison">
                    <span className="summary-label">Would Have Paid</span>
                    <span className="summary-value strikethrough">{CURRENCY.format(totalWouldHavePaid)}</span>
                    <span className="summary-note">Without FlexyPe offers</span>
                </div>
                <div className="summary-card comparison highlight-success">
                    <span className="summary-label">You Actually Paid</span>
                    <span className="summary-value text-success">{CURRENCY.format(totalActualPaid)}</span>
                    <span className="summary-note">Thanks to our deals!</span>
                </div>
                <div className="summary-card">
                    <span className="summary-label">This Month's Savings</span>
                    <div className="summary-value-row">
                        <span className="summary-value text-success">{CURRENCY.format(lastMonthSaved)}</span>
                        {savingsChange > 0 && (
                            <span className="summary-change positive">
                                <TrendingUp size={14} />
                                {savingsChange}%
                            </span>
                        )}
                    </div>
                </div>
                <div className="summary-card">
                    <span className="summary-label">Avg Monthly Savings</span>
                    <span className="summary-value text-success">
                        {CURRENCY.format(Math.round(totalSaved / monthlySavings.length))}
                    </span>
                </div>
            </div>

            {/* Savings Chart */}
            <div className="analytics-chart">
                <div className="chart-header">
                    <span className="chart-title">
                        <TrendingUp size={16} className="text-success" />
                        Your Savings Growth
                    </span>
                </div>
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Savings Milestone Progress */}
            {nextMilestone && (
                <div className="savings-milestone-section">
                    <div className="milestone-header">
                        <div className="milestone-title">
                            <Award size={16} />
                            <span>Next Savings Milestone</span>
                        </div>
                        <div className="milestone-target">
                            {nextMilestone.emoji} {nextMilestone.label} ({CURRENCY.format(nextMilestone.amount)})
                        </div>
                    </div>

                    <div className="milestone-bar">
                        <div
                            className="milestone-fill"
                            style={{ width: `${milestoneProgress}%` }}
                        />
                    </div>

                    <div className="milestone-status">
                        <span className="text-success">
                            <Sparkles size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                            {CURRENCY.format(nextMilestone.amount - totalSaved)} more to unlock!
                        </span>
                        <span className="milestone-percentage">
                            {milestoneProgress.toFixed(0)}% complete
                        </span>
                    </div>
                </div>
            )}

            {/* Motivational Message */}
            <div className="savings-motivation">
                <Gift size={18} />
                <p>Keep shopping with FlexyPe to unlock more exclusive deals and maximize your savings!</p>
            </div>
        </div>
    );
}
