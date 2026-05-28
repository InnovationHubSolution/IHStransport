import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

const Layout = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    authService.logout();
    navigate('/landing');
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/cards', label: 'Cards', icon: '💳' },
    { path: '/payments', label: 'Payments', icon: '💵' },
    { path: '/transport', label: 'Transport', icon: '🚌' },
    { path: '/transport-map', label: 'Transport Map', icon: '🗺️' },
    { path: '/owners', label: 'Operators', icon: '👥' },
    { path: '/devices', label: 'NFC Devices', icon: '📱' },
    { path: '/fare', label: 'Bus fare', icon: '🎫' },
    { path: '/customers', label: 'Customers', icon: '👤' },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ].filter(item => {
    // Filter menu based on user role
    if (user?.role === 'bus_owner') {
      return ['/', '/transport', '/transport-map', '/reports', '/devices'].includes(item.path);
    }
    if (user?.role === 'agent') {
      return ['/', '/cards', '/payments'].includes(item.path);
    }
    if (user?.role === 'customer') {
      return ['/', '/cards', '/payments'].includes(item.path);
    }
    // Admin sees all (including Settings)
    return true;
  }).filter(item => {
    // Settings, Customers, and NFC Devices only for admin (bus_owner sees Devices as read-only)
    if (item.path === '/settings' || item.path === '/customers' || item.path === '/fare') return user?.role === 'admin';
    if (item.path === '/devices') return user?.role === 'admin' || user?.role === 'bus_owner';
    return true;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Modern Sidebar */}
      <div
        className="sidebar"
        style={{
          width: sidebarOpen ? '280px' : '80px',
          color: 'white',
          padding: '24px 16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '-15px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          {sidebarOpen ? '◀' : '▶'}
        </button>

        {/* Logo Section */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <img
            src="/logo.png"
            alt="IHS Cashless Transport"
            style={{
              width: sidebarOpen ? '200px' : '48px',
              height: 'auto',
              transition: 'all 0.3s ease',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}
          />
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className="sidebar-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 16px',
                color: 'white',
                textDecoration: 'none',
                marginBottom: '8px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '500',
                position: 'relative',
                animation: `slideInLeft 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              <span style={{
                fontSize: '24px',
                minWidth: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease'
              }}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <span style={{
                  marginLeft: '16px',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.3s ease'
                }}>
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {sidebarOpen && (
            <div style={{
              padding: '16px',
              background: 'rgba(127, 181, 57, 0.1)',
              borderRadius: '12px',
              marginBottom: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(127, 181, 57, 0.2)'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                👤 {user?.username || 'User'}
              </div>
              <div style={{
                fontSize: '12px',
                opacity: 0.8,
                textTransform: 'capitalize',
                color: '#FDB813'
              }}>
                {user?.role?.replace('_', ' ')}
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="btn-modern"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span style={{ fontSize: '18px' }}>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        backgroundColor: '#f8fafc',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Modern Header */}
        <div className="header-glass" style={{
          padding: '20px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 5,
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              IHS Transport System
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
                borderRadius: '20px',
                color: 'white',
                fontSize: '13px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(127, 181, 57, 0.3)'
              }}>
                ✨ {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          padding: '0 32px 32px',
          maxWidth: '1400px',
          margin: '0 auto',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
