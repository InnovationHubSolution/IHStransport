import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { authService } from '../services/auth';
import { formatVUV } from '../utils/currency';

const Settlements = () => {
  const user = authService.getUser();
  const isAdmin = user?.role === 'admin';
  const [data, setData] = useState({ settlements: [], owners: [], commission_rate: 5 });
  const [rate, setRate] = useState('5');
  const [form, setForm] = useState({ bus_owner_id: '', period_start: '', period_end: '' });
  const [references, setReferences] = useState({});
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    const response = await api.get('/settlements');
    setData(response.data);
    setRate(String(response.data.commission_rate ?? 5));
  };

  useEffect(() => {
    load().catch((err) => setError(err.response?.data?.error || err.message));
  }, []);

  const saveRate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.put('/settlements/config', { commission_rate: rate });
      setMessage('Commission rate saved. It applies to the next settlement.');
      await load();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const createSettlement = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await api.post('/settlements', form);
      setMessage(`Settlement ${response.data.settlement.id} created for ${response.data.fare_count} fares.`);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const updateStatus = async (id, status) => {
    setError('');
    setMessage('');
    try {
      await api.patch(`/settlements/${id}`, { status, payment_reference: references[id] || '' });
      setMessage(`Settlement ${id} marked ${status}.`);
      await load();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h1>Settlements</h1>
      <p style={{ color: '#475569' }}>
        IHS keeps a commission on fare revenue when an operator is paid. The default rate is 5%. Passengers are not charged this commission on top of the fare. Card sales and agent commissions are not deducted; no price is defined for them.
      </p>
      {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '8px' }}>{error}</div>}
      {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginTop: '8px' }}>{message}</div>}

      {isAdmin && (
        <div className="card" style={{ marginTop: '16px' }}>
          <h2>Commission rate</h2>
          <form onSubmit={saveRate} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input type="number" min="0" max="100" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} style={{ width: '120px' }} />
            <span>%</span>
            <button className="btn btn-primary" type="submit">Save rate</button>
          </form>
        </div>
      )}

      {isAdmin && (
        <div className="card">
          <h2>Run a settlement</h2>
          <form onSubmit={createSettlement}>
            <label>Operator</label>
            <select value={form.bus_owner_id} onChange={(e) => setForm({ ...form, bus_owner_id: e.target.value })} required>
              <option value="">Select operator</option>
              {(data.owners || []).map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} — pending {formatVUV(owner.pending_settlement || 0)} — {owner.settlement_method}
                </option>
              ))}
            </select>
            <label>Period start</label>
            <input type="date" value={form.period_start} onChange={(e) => setForm({ ...form, period_start: e.target.value })} required />
            <label>Period end</label>
            <input type="date" value={form.period_end} onChange={(e) => setForm({ ...form, period_end: e.target.value })} required />
            <button className="btn btn-primary" type="submit">Create pending settlement</button>
          </form>
        </div>
      )}

      {!isAdmin && data.owner && (
        <div className="card">
          <p><strong>Pending fares:</strong> {formatVUV(data.owner.pending_settlement || 0)}</p>
          <p><strong>Payout method:</strong> {data.owner.settlement_method || 'bank_transfer'}</p>
          <p><strong>Current commission rate:</strong> {data.commission_rate}%</p>
        </div>
      )}

      <div className="card">
        <h2>History</h2>
        <table className="table">
          <thead>
            <tr>
              {isAdmin && <th>Operator</th>}
              <th>Period</th>
              <th>Gross</th>
              <th>Commission</th>
              <th>Net</th>
              <th>Status</th>
              <th>Reference</th>
              {isAdmin && <th></th>}
            </tr>
          </thead>
          <tbody>
            {(data.settlements || []).length === 0 ? (
              <tr><td colSpan={isAdmin ? 8 : 6}>No settlements yet.</td></tr>
            ) : data.settlements.map((row) => (
              <tr key={row.id}>
                {isAdmin && <td>{row.owner_name}</td>}
                <td>{String(row.period_start).slice(0, 10)} – {String(row.period_end).slice(0, 10)}</td>
                <td>{formatVUV(row.total_amount)}</td>
                <td>{formatVUV(row.commission_amount)} ({row.commission_rate}%)</td>
                <td>{formatVUV(row.net_amount)}</td>
                <td>{row.status}</td>
                <td>{row.payment_reference || '—'}</td>
                {isAdmin && (
                  <td>
                    {row.status === 'pending' && <button type="button" onClick={() => updateStatus(row.id, 'approved')}>Approve</button>}
                    {row.status === 'approved' && (
                      <>
                        <input placeholder="Payment reference" value={references[row.id] || ''} onChange={(e) => setReferences({ ...references, [row.id]: e.target.value })} />
                        <button type="button" onClick={() => updateStatus(row.id, 'paid')}>Mark paid</button>
                      </>
                    )}
                    {row.status !== 'paid' && row.status !== 'cancelled' && (
                      <button type="button" onClick={() => updateStatus(row.id, 'cancelled')}>Cancel</button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settlements;
