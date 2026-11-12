import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { authService } from '../services/auth';

const Settings = () => {
  const user = authService.getUser();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [apiStatus, setApiStatus] = useState(null); // { connected, code, message, mycash_status }
  const [statusLoading, setStatusLoading] = useState(false);
  const [form, setForm] = useState({
    apiUrl: '',
    apiKey: '',
    username: '',
    password: '',
    merchantMobile: '',
    productId: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings/mvatu');
        setForm({
          apiUrl: data.apiUrl || '',
          apiKey: '', // never pre-fill secret; UI shows masked from server
          username: data.username || '',
          password: '', // never pre-fill
          merchantMobile: data.merchantMobile || '',
          productId: data.productId || ''
        });
        setMessage(null);
      } catch (err) {
        const status = err.response?.status;
        const msg = err.response?.data?.error || err.message || 'Failed to load settings';
        setMessage({ type: 'error', text: status != null ? `API ${status}: ${msg}` : msg });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const checkMycashStatus = async () => {
    setStatusLoading(true);
    setApiStatus(null);
    try {
      const { data } = await api.get('/settings/mvatu/status');
      setApiStatus(data);
    } catch (err) {
      setApiStatus({
        connected: false,
        code: err.response?.status ?? 'network',
        message: err.response?.data?.error || err.message || 'Request failed'
      });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        apiUrl: form.apiUrl || undefined,
        username: form.username || undefined,
        merchantMobile: form.merchantMobile || undefined,
        productId: form.productId || undefined
      };
      if (form.apiKey.trim()) payload.apiKey = form.apiKey.trim();
      if (form.password.trim()) payload.password = form.password.trim();

      await api.put('/settings/mvatu', payload);
      setMessage({ type: 'success', text: 'M-Vatu settings saved. New key/password will be used for the next top-up.' });
      setForm((prev) => ({ ...prev, apiKey: '', password: '' }));
      setApiStatus(null);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.error || err.message || 'Failed to save settings';
      setMessage({ type: 'error', text: status != null ? `API ${status}: ${msg}` : msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>Settings</h1>
      <div style={{ maxWidth: '560px', background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '18px' }}>M-Vatu API</h2>
        <p style={{ color: '#475569', fontSize: '14px', marginBottom: '20px' }}>
            Save the merchant details Vodafone Vanuatu gives IHS. There is no public M-Vatu HTTP API yet, so saving these values does not send a payment and does not change a card balance.
        </p>

        {/* M-Vatu API connection status */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <strong>API Status</strong>
            <button
              type="button"
              onClick={checkMycashStatus}
              disabled={statusLoading}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: statusLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {statusLoading ? 'Checking…' : 'Check connection'}
            </button>
          </div>
          {apiStatus && (
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: apiStatus.connected ? '#d4edda' : '#f8d7da',
                color: apiStatus.connected ? '#155724' : '#721c24',
                border: `1px solid ${apiStatus.connected ? '#c3e6cb' : '#f5c6cb'}`
              }}
            >
              {apiStatus.connected ? (
                <>
                  <span style={{ fontWeight: 'bold' }}>● Connected</span>
                  <div style={{ marginTop: '4px', fontSize: '14px' }}>{apiStatus.message}</div>
                </>
              ) : (
                <>
                  <span style={{ fontWeight: 'bold' }}>
                    ● Error{apiStatus.code != null ? ` ${apiStatus.code}` : ''}
                  </span>
                  <div style={{ marginTop: '4px', fontSize: '14px' }}>{apiStatus.message}</div>
                  {apiStatus.mycash_status && (
                    <div style={{ marginTop: '4px', fontSize: '13px', opacity: 0.9 }}>{apiStatus.mycash_status}</div>
                  )}
                </>
              )}
            </div>
          )}
          <p style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>
            Digicel error codes are not used. Vodafone has not published M-Vatu merchant error codes.
          </p>
        </div>

        {message && (
          <div
            style={{
              padding: '12px',
              marginBottom: '16px',
              borderRadius: '6px',
              backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
              color: message.type === 'success' ? '#155724' : '#721c24'
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>API URL</label>
            <input
              type="url"
              name="apiUrl"
              value={form.apiUrl}
              onChange={handleChange}
              placeholder="Leave blank until Vodafone issues a base URL"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>API Key</label>
            <input
              type="password"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              placeholder="Leave blank to keep current key"
              autoComplete="off"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. Voucher_Tune"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              autoComplete="new-password"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Merchant Mobile</label>
            <input
              type="text"
              name="merchantMobile"
              value={form.merchantMobile}
              onChange={handleChange}
              placeholder="e.g. 67810000041"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Product ID</label>
            <input
              type="text"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              placeholder="e.g. 373"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '10px 20px',
              backgroundColor: saving ? '#aaa' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: 500
            }}
          >
            {saving ? 'Saving…' : 'Save M-Vatu settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
