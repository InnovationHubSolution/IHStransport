import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login(username, password);
      // Ensure token and user are saved before navigating
      if (result.token) {
        // Force a page reload to ensure authentication state is updated
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(127, 181, 57, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(249, 199, 79, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }}></div>

      <div
        className="card animate-fadeInUp"
        style={{
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 1,
          background: 'white',
          borderRadius: '24px',
          overflow: 'hidden'
        }}
      >
        {/* Header Gradient Bar */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #7FB539 0%, #FDB813 50%, #F26B65 100%)',
          marginBottom: '30px'
        }}></div>

        <div style={{ padding: '20px 30px' }}>
          {/* Back Link */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Link
              to="/landing"
              style={{
                textDecoration: 'none',
                color: '#7FB539',
                fontSize: '14px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              ← Back to Home
            </Link>
          </div>

          {/* Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚌</div>
            <h1 style={{
              marginBottom: '8px',
              fontSize: '32px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Welcome Back
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '15px',
              fontWeight: '500'
            }}>
              Login to IHS Transport System
            </p>
          </div>

          {error && (
            <div
              className="animate-fadeIn"
              style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                color: '#991b1b',
                borderRadius: '12px',
                marginBottom: '24px',
                border: '2px solid #fca5a5',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '20px' }}>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>👤</span> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                style={{
                  padding: '14px 16px',
                  fontSize: '15px',
                  borderRadius: '12px'
                }}
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                color: '#1e293b',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <span>🔒</span> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  padding: '14px 16px',
                  fontSize: '15px',
                  borderRadius: '12px'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-modern"
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(127, 181, 57, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#64748b',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0'
          }}>
            Don't have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#7FB539',
                textDecoration: 'none',
                fontWeight: '700',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Sign up here
            </Link>
          </div>

          {/* Test Accounts */}
          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '12px',
            fontSize: '13px',
            color: '#475569',
            border: '2px solid #e2e8f0'
          }}>
            <div style={{
              fontWeight: '700',
              marginBottom: '12px',
              color: '#1e293b',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '18px' }}>🔑</span> Test Accounts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>👤</span>
                <span style={{ fontWeight: '600', minWidth: '90px' }}>Admin:</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>admin</code>
                <span style={{ color: '#94a3b8' }}>/</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>admin123</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🚌</span>
                <span style={{ fontWeight: '600', minWidth: '90px' }}>Bus Owner:</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>busowner</code>
                <span style={{ color: '#94a3b8' }}>/</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>owner123</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>👥</span>
                <span style={{ fontWeight: '600', minWidth: '90px' }}>Customer:</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>customer</code>
                <span style={{ color: '#94a3b8' }}>/</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>customer123</code>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🤝</span>
                <span style={{ fontWeight: '600', minWidth: '90px' }}>Agent:</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>agent</code>
                <span style={{ color: '#94a3b8' }}>/</span>
                <code style={{
                  background: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '12px',
                  border: '1px solid #cbd5e1'
                }}>agent123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
