import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { formatVUV } from '../utils/currency';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setApiError(null);
      try {
        const response = await api.get('/reports/dashboard');
        setStats(response.data.stats);
      } catch (error) {
        const status = error.response?.status;
        const message = error.response?.data?.error || error.message || 'Request failed';
        setApiError({ status, message });
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner"></div>
        <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '500' }}>
          Loading dashboard insights...
        </p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="animate-fadeInUp">
        <h1 style={{
          marginBottom: '30px',
          fontSize: '32px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Dashboard
        </h1>
        <div
          className="card"
          style={{
            padding: '32px',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#991b1b',
            border: '2px solid #fca5a5',
            borderRadius: '16px',
            maxWidth: '700px',
            boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)'
          }}
        >
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            ⚠️
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '20px', textAlign: 'center' }}>
            API Error {apiError.status != null ? `(${apiError.status})` : ''}
          </div>
          <div style={{ marginBottom: '12px', fontSize: '15px', lineHeight: '1.6' }}>
            {apiError.message}
          </div>
          <div style={{
            fontSize: '14px',
            opacity: 0.9,
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '12px',
            borderRadius: '8px',
            marginTop: '16px'
          }}>
            💡 <strong>Tip:</strong> Check the backend is running and the database is migrated (e.g. run <code style={{
              background: 'rgba(0, 0, 0, 0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '600'
            }}>npm run migrate</code> in backend).
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load dashboard data</div>;
  }

  const statCards = [
    { title: 'Total Cards', value: stats.total_cards, icon: '💳', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#3b82f6' },
    { title: 'Active Cards', value: stats.active_cards, icon: '✅', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#10b981' },
    { title: 'Total Vehicles', value: stats.total_buses, icon: '🚌', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: '#8b5cf6' },
    { title: 'Operators', value: stats.total_owners, icon: '👥', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#f59e0b' },
    { title: 'Today\'s Transactions', value: stats.today_transactions, icon: '📊', gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', color: '#14b8a6' },
    { title: 'Today\'s Revenue', value: formatVUV(stats.today_revenue), icon: '💰', gradient: 'linear-gradient(135deg, #7FB539 0%, #6a9930 100%)', color: '#7FB539' },
    { title: 'Total Revenue', value: formatVUV(stats.total_revenue), icon: '💵', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#22c55e' },
    { title: 'Pending MyCash', value: stats.pending_mycash_transactions, icon: '⏳', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#ef4444' }
  ];

  return (
    <div className="animate-fadeInUp">
      <div style={{
        marginBottom: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          📊 Dashboard Overview
        </h1>
        <div style={{
          padding: '10px 20px',
          background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
          borderRadius: '12px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(127, 181, 57, 0.3)'
        }}>
          🕐 Real-time Stats
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {statCards.map((card, index) => (
          <div
            key={index}
            className="card stat-card"
            style={{
              textAlign: 'center',
              background: 'white',
              position: 'relative',
              overflow: 'hidden',
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Gradient Top Bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: card.gradient
            }}></div>

            {/* Background Decoration */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: card.gradient,
              borderRadius: '50%',
              opacity: 0.1,
              transition: 'all 0.3s ease'
            }}></div>

            {/* Card Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="stat-card-icon"
                style={{
                  fontSize: '56px',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                }}
              >
                {card.icon}
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '8px',
                background: card.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: "'Poppins', sans-serif"
              }}>
                {card.value}
              </div>
              <div style={{
                color: '#64748b',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div style={{
        marginTop: '40px',
        padding: '24px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        animation: 'fadeIn 1s ease-out 0.8s both'
      }}>
        <div style={{ fontSize: '32px' }}>💡</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '16px', color: '#1e293b', marginBottom: '4px' }}>
            System Status: Active
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            All systems operational. Data refreshed in real-time.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
