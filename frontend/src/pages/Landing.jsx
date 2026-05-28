import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', overflow: 'hidden' }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1B3A5F 0%, #0f172a 50%, #1B3A5F 100%)',
        zIndex: 0
      }}>
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
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 35%, #F26B65 70%, #1B3A5F 100%)',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite'
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out'
          }}>
            {/* IHS Logo */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              <img
                src="/logo.png"
                alt="IHS Cashless Transportation System"
                style={{
                  width: 'clamp(200px, 40vw, 400px)',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))',
                  animation: 'float 4s ease-in-out infinite'
                }}
              />
            </div>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              🌴 POWERED BY INNOVATEL HUB SOLUTIONS
            </div>
            <h1 style={{
              fontSize: 'clamp(36px, 8vw, 72px)',
              fontWeight: '900',
              marginBottom: '20px',
              fontFamily: "'Poppins', sans-serif",
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              lineHeight: '1.2'
            }}>
              Vanuatu Smart Transit
            </h1>
            <p style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              marginBottom: '40px',
              opacity: 0.95,
              maxWidth: '800px',
              margin: '0 auto 40px',
              fontWeight: '400',
              lineHeight: '1.6'
            }}>
              Experience seamless cashless payments for buses, planes, and ships with cutting-edge NFC technology
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/login"
                style={{
                  padding: '18px 45px',
                  background: 'white',
                  color: '#1B3A5F',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-block',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                Get Started →
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '18px 45px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-block',
                  fontFamily: "'Inter', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          right: 0,
          height: '100px',
          overflow: 'hidden'
        }}>
          <svg
            viewBox="0 0 1200 100"
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '100px 20px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            marginBottom: '20px',
            color: '#f8fafc',
            fontWeight: '800',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Why Choose Our System?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Powerful features designed for modern transit systems
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              icon: '💳',
              title: 'Easy Card Payments',
              description: 'Tap your NFC card on the reader—on bus, plane, or ship. No cash or exact change needed.',
              color: '#1B3A5F'
            },
            {
              icon: '📱',
              title: 'Mobile Top-Up',
              description: 'Top up your card anytime using Digicel MyCash. Quick and secure mobile payments.',
              color: '#7FB539'
            },
            {
              icon: '📊',
              title: 'Track Your Spending',
              description: 'View all your transactions and card balance online. Stay in control of your travel expenses.',
              color: '#FDB813'
            },
            {
              icon: '🚌',
              title: 'Real-Time GPS Tracking',
              description: 'GPS-enabled vehicles let you track routes and verify transactions with location data.',
              color: '#7FB539'
            },
            {
              icon: '💰',
              title: 'Revenue Dashboard',
              description: 'Operators can monitor daily revenue, monthly earnings, and track all transactions in real-time.',
              color: '#FDB813'
            },
            {
              icon: '🗺️',
              title: 'Fleet Location Map',
              description: 'View buses, planes, and ships on an interactive map. Track routes and monitor fleet movements.',
              color: '#F26B65'
            },
            {
              icon: '📈',
              title: 'Analytics & Reports',
              description: 'Generate detailed reports, view transaction history, and analyze revenue trends.',
              color: '#1B3A5F'
            },
            {
              icon: '💵',
              title: 'Settlement Tracking',
              description: 'Track pending settlements, view payment history, and manage payouts efficiently.',
              color: '#7FB539'
            },
            {
              icon: '🔒',
              title: 'Secure & Safe',
              description: 'Your card balance is protected. All transactions are encrypted and securely stored.',
              color: '#F26B65'
            },
            {
              icon: '⚡',
              title: 'Fast & Convenient',
              description: 'No more waiting in line or fumbling with cash. Quick tap and go!',
              color: '#FDB813'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="card"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                textAlign: 'center',
                padding: '40px 30px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                e.currentTarget.style.borderColor = feature.color;
                e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '80px',
                marginBottom: '25px',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                animation: 'float 3s ease-in-out infinite'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '24px',
                marginBottom: '15px',
                color: '#f8fafc',
                fontWeight: '700',
                fontFamily: "'Poppins', sans-serif"
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#cbd5e1',
                lineHeight: '1.7',
                fontSize: '15px'
              }}>
                {feature.description}
              </p>
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="feature-line"></div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        padding: '100px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)',
          zIndex: 0
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(32px, 5vw, 48px)',
            marginBottom: '80px',
            color: '#f8fafc',
            fontWeight: '800',
            fontFamily: "'Poppins', sans-serif"
          }}>
            How It Works
          </h2>

          {/* For Passengers */}
          <div style={{ marginBottom: '100px' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '50px',
              background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
              padding: '15px 40px',
              borderRadius: '50px',
              display: 'inline-block',
              boxShadow: '0 8px 20px rgba(127, 181, 57, 0.4)'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: 'white',
                fontFamily: "'Poppins', sans-serif"
              }}>
                👥 For Passengers
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '40px'
            }}>
              {[
                { step: '1', title: 'Get Your Card', desc: 'Visit an agent to purchase your prepaid NFC card', icon: '🎫' },
                { step: '2', title: 'Top Up Balance', desc: 'Add money to your card using Digicel MyCash', icon: '💰' },
                { step: '3', title: 'Tap & Ride', desc: 'Tap your card on the bus reader when boarding', icon: '✨' },
                { step: '4', title: 'Track & Manage', desc: 'Monitor your balance and transactions online', icon: '📱' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    opacity: 0,
                    animation: `fadeInUp 0.8s ease-out forwards ${index * 0.2}s`,
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    marginBottom: '30px'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      fontWeight: '900',
                      margin: '0 auto',
                      boxShadow: '0 10px 30px rgba(127, 181, 57, 0.4)',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {item.step}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: 'rgba(127, 181, 57, 0.2)',
                      zIndex: 1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></div>
                  </div>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '24px',
                    marginBottom: '15px',
                    color: '#f8fafc',
                    fontWeight: '700',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    fontSize: '16px'
                  }}>
                    {item.desc}
                  </p>
                  {index < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: '60px',
                      right: '-40px',
                      color: '#7FB539',
                      fontSize: '40px',
                      display: window.innerWidth > 768 ? 'block' : 'none'
                    }}>
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* For Bus Owners */}
          <div style={{
            background: 'rgba(127, 181, 57, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '30px',
            padding: '60px 40px',
            border: '1px solid rgba(127, 181, 57, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '50px',
              background: 'linear-gradient(135deg, #FDB813 0%, #F26B65 100%)',
              padding: '15px 40px',
              borderRadius: '50px',
              display: 'inline-block',
              boxShadow: '0 8px 20px rgba(253, 184, 19, 0.4)'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: 'white',
                fontFamily: "'Poppins', sans-serif"
              }}>
                🚌 For Bus Owners
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '40px'
            }}>
              {[
                { step: '1', title: 'Register Your Fleet', desc: 'Add your buses to the system and get NFC devices', icon: '📝' },
                { step: '2', title: 'Real-Time Tracking', desc: 'Monitor your buses with GPS tracking and location history', icon: '🗺️' },
                { step: '3', title: 'Revenue Dashboard', desc: 'View daily, monthly, and total revenue statistics', icon: '📊' },
                { step: '4', title: 'Settlement & Reports', desc: 'Track pending settlements and generate detailed reports', icon: '💵' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    opacity: 0,
                    animation: `fadeInUp 0.8s ease-out forwards ${index * 0.2 + 0.5}s`,
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    display: 'inline-block',
                    marginBottom: '30px'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FDB813 0%, #F26B65 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      fontWeight: '900',
                      margin: '0 auto',
                      boxShadow: '0 10px 30px rgba(253, 184, 19, 0.4)',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {item.step}
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      background: 'rgba(253, 184, 19, 0.2)',
                      zIndex: 1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></div>
                  </div>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '24px',
                    marginBottom: '15px',
                    color: '#f8fafc',
                    fontWeight: '700',
                    fontFamily: "'Poppins', sans-serif"
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    fontSize: '16px'
                  }}>
                    {item.desc}
                  </p>
                  {index < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: '60px',
                      right: '-40px',
                      color: '#F26B65',
                      fontSize: '40px',
                      display: window.innerWidth > 768 ? 'block' : 'none'
                    }}>
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        padding: '100px 20px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            marginBottom: '20px',
            color: '#0f172a',
            fontWeight: '800',
            fontFamily: "'Poppins', sans-serif"
          }}>
            Trusted by Thousands
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            marginBottom: '60px',
            maxWidth: '600px',
            margin: '0 auto 60px'
          }}>
            Join the growing community of satisfied users across Vanuatu
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '50px'
          }}>
            {[
              { number: '10,000+', label: 'Active Cards', icon: '💳', color: '#1B3A5F' },
              { number: '500+', label: 'Buses', icon: '🚌', color: '#7FB539' },
              { number: '50+', label: 'Routes', icon: '🗺️', color: '#FDB813' },
              { number: '1M+', label: 'Transactions', icon: '📊', color: '#F26B65' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  opacity: 0,
                  animation: `scaleIn 0.6s ease-out forwards ${index * 0.15}s`,
                  padding: '30px',
                  background: 'white',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '15px',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: '900',
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '10px',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '18px',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bus Owner Features Section */}
      <div style={{
        padding: '100px 20px',
        background: '#0f172a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(127, 181, 57, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              marginBottom: '20px',
              color: '#f8fafc',
              fontWeight: '800',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Powerful Features for Bus Owners
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#94a3b8',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Manage your fleet, track revenue, and optimize operations with our comprehensive dashboard
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                icon: '📊',
                title: 'Revenue Dashboard',
                description: 'Real-time revenue tracking with daily, monthly, and total statistics. Monitor earnings from all your buses in one place.',
                color: '#1B3A5F',
                gradient: 'linear-gradient(135deg, #1B3A5F 0%, #0f172a 100%)'
              },
              {
                icon: '🗺️',
                title: 'GPS Bus Tracking',
                description: 'Track your buses in real-time with GPS coordinates. View location history and verify routes on an interactive map.',
                color: '#7FB539',
                gradient: 'linear-gradient(135deg, #7FB539 0%, #5a8a29 100%)'
              },
              {
                icon: '📈',
                title: 'Analytics & Reports',
                description: 'Generate detailed reports on transactions, revenue trends, and bus performance. Export data for accounting.',
                color: '#FDB813',
                gradient: 'linear-gradient(135deg, #FDB813 0%, #e09a00 100%)'
              },
              {
                icon: '💵',
                title: 'Settlement Management',
                description: 'Track pending settlements, view payment history, and manage payouts. Know exactly when payments are due.',
                color: '#F26B65',
                gradient: 'linear-gradient(135deg, #F26B65 0%, #e04842 100%)'
              },
              {
                icon: '🚌',
                title: 'Fleet Management',
                description: 'Manage all your buses, routes, and devices from one dashboard. Monitor bus status and activity.',
                color: '#7FB539',
                gradient: 'linear-gradient(135deg, #7FB539 0%, #6a9930 100%)'
              },
              {
                icon: '⏱️',
                title: 'Transaction History',
                description: 'View complete transaction history with GPS coordinates. Verify all fare payments and track card usage.',
                color: '#1B3A5F',
                gradient: 'linear-gradient(135deg, #1B3A5F 0%, #152d4a 100%)'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.background = feature.gradient;
                  e.currentTarget.style.borderColor = feature.color;
                  e.currentTarget.style.boxShadow = `0 25px 50px ${feature.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon Badge */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: feature.gradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  marginBottom: '25px',
                  boxShadow: `0 10px 25px ${feature.color}40`,
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  marginBottom: '15px',
                  color: '#f8fafc',
                  fontWeight: '700',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cbd5e1',
                  lineHeight: '1.7',
                  fontSize: '15px'
                }}>
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: feature.gradient,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} className="feature-top-line"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 50%, #F26B65 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>
            Join thousands of commuters enjoying cashless bus travel
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/login"
              style={{
                padding: '15px 50px',
                backgroundColor: 'white',
                color: '#1B3A5F',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '20px',
                display: 'inline-block',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                padding: '15px 50px',
                backgroundColor: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '20px',
                border: '2px solid white',
                display: 'inline-block',
                transition: 'transform 0.2s, background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        padding: '60px 20px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(127, 181, 57, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px' }}>
            <img
              src="/logo.png"
              alt="IHS Cashless Transportation System"
              style={{
                width: 'clamp(150px, 30vw, 300px)',
                height: 'auto',
                marginBottom: '20px',
                filter: 'drop-shadow(0 4px 12px rgba(127, 181, 57, 0.4))'
              }}
            />
            <h3 style={{
              fontSize: '28px',
              marginBottom: '10px',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: '700',
              background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              IHS Cashless Transportation System
            </h3>
            <p style={{
              opacity: 0.9,
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Smart Travel • Secure Payment • Better Connected
            </p>
          </div>
          <div style={{
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            paddingTop: '30px',
            marginTop: '30px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#94a3b8',
              marginBottom: '10px'
            }}>
              © 2024 Innovatel Hub Solutions Limited. All rights reserved.
            </p>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              marginTop: '15px'
            }}>
              For support, contact your local transport authority or visit an agent location.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
