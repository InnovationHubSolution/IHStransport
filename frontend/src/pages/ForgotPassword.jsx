import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { authService } from '../services/auth';

const ForgotPassword = () => {
  const [form, setForm] = useState({ username: '', phone: '', new_password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (form.new_password.length < 12) {
      setError('Use at least 12 characters.');
      return;
    }
    if (form.new_password !== form.confirm) {
      setError('The two passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', {
        username: form.username,
        phone: form.phone,
        new_password: form.new_password
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '20px' }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: '440px', background: 'white', borderRadius: '16px', padding: '32px' }}>
        <Link to="/login" style={{ color: '#7FB539', fontWeight: 700, textDecoration: 'none' }}>← Back to login</Link>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '28px', margin: '16px 0 8px' }}>Reset password</h1>
        <p style={{ color: '#64748b', marginTop: 0 }}>Vanuatu Smart Transit matches the username to the mobile number on the account. Use the Vanuatu number stored at signup, with or without +678.</p>
        {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>{error}</div>}
        {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>{message}</div>}
        <label>Username</label>
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required style={{ width: '100%', marginBottom: '12px', padding: '12px' }} />
        <label>Mobile number</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+678" style={{ width: '100%', marginBottom: '12px', padding: '12px' }} />
        <label>New password</label>
        <input type={showPassword ? 'text' : 'password'} value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} required style={{ width: '100%', marginBottom: '8px', padding: '12px' }} />
        <label style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
          Show password
        </label>
        <label>Confirm password</label>
        <input type={showPassword ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required style={{ width: '100%', marginBottom: '16px', padding: '12px' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 700, background: 'linear-gradient(135deg, #7FB539 0%, #FDB813 100%)' }}>
          {loading ? 'Saving…' : 'Set new password'}
        </button>
        <p style={{ color: '#64748b', fontSize: '13px' }}>Accounts with no mobile number, including the system administrator, cannot use this form. {authService.getUser() ? '' : ''}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
