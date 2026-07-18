import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ActivityItem,
  DashboardStats,
  fetchDashboardStats,
  fetchRecentActivity,
} from '../api/mockApi';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [forceError, setForceError] = useState(false);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await fetchDashboardStats(forceError);
      setStats(data);
    } catch (err) {
      setStatsError(err instanceof Error ? err.message : 'Unknown error.');
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, [forceError]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    setActivityLoading(true);
    fetchRecentActivity().then((data) => {
      setActivity(data);
      setActivityLoading(false);
    });
  }, []);

  return (
    <div data-testid="dashboard-page">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back{user ? `, ${user.name}` : ''}. Here is what changed recently.</p>
        </div>
        <label className="checkbox-row" data-testid="force-error-toggle">
          <input
            type="checkbox"
            checked={forceError}
            onChange={(e) => setForceError(e.target.checked)}
          />
          Simulate metrics failure
        </label>
      </div>

      {statsError && (
        <div className="alert-banner alert-banner--error" data-testid="stats-error">
          {statsError}{' '}
          <button className="btn btn--secondary btn--sm" data-testid="retry-stats" onClick={loadStats}>
            Retry
          </button>
        </div>
      )}

      {statsLoading ? (
        <div className="card-grid" data-testid="stats-loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="stat-card" key={i}>
              <div className="skeleton" style={{ width: '60%', marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '40%', height: 26 }} />
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="card-grid" data-testid="stats-grid">
          <div className="stat-card" data-testid="stat-active-users">
            <div className="stat-card__label">Active users</div>
            <div className="stat-card__value">{stats.activeUsers.toLocaleString()}</div>
          </div>
          <div className="stat-card" data-testid="stat-open-orders">
            <div className="stat-card__label">Open orders</div>
            <div className="stat-card__value">{stats.openOrders}</div>
          </div>
          <div className="stat-card" data-testid="stat-revenue">
            <div className="stat-card__label">Revenue today</div>
            <div className="stat-card__value">${stats.revenueToday.toLocaleString()}</div>
          </div>
          <div className="stat-card" data-testid="stat-error-rate">
            <div className="stat-card__label">Error rate</div>
            <div className="stat-card__value">{stats.errorRate}%</div>
          </div>
        </div>
      ) : null}

      <div className="card" data-testid="activity-card">
        <h3>Recent activity</h3>
        {activityLoading ? (
          <div className="loading-row" data-testid="activity-loading">
            <span className="spinner" /> Loading activity…
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} data-testid="activity-list">
            {activity.map((item) => (
              <li
                key={item.id}
                data-testid="activity-item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span>{item.message}</span>
                <span className="help-text">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
