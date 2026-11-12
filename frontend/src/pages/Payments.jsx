import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { formatVUV } from '../utils/currency';

const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTopupForm, setShowTopupForm] = useState(false);
  const [topupData, setTopupData] = useState({ card_id: '', amount: '', customer_mobile: '' });
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchTransactions();
    api.get('/cards').then((response) => setCards(response.data.cards || [])).catch(() => setCards([]));
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/payments/transactions?limit=50');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  function formatPaymentError(error) {
    const d = error.response?.data;
    const status = error.response?.status;
    const msg = d?.error || error.message || 'Request failed';
    const code = d?.mycash_code;
    const mycashStatus = d?.mycash_status;
    if (code != null || mycashStatus) {
      return `M-Vatu Error${code != null ? ` ${code}` : ''}: ${mycashStatus || msg}`;
    }
    return status != null ? `API ${status}: ${msg}` : msg;
  }

  const handleInitiateTopup = async (e) => {
    e.preventDefault();
    setNotice('');
    try {
      const response = await api.post('/payments/topup/initiate', topupData);
      setNotice(response.data.message || 'Top-up recorded.');
      if (response.data.new_balance != null) {
        setNotice(`Card topped up. New balance: ${formatVUV(response.data.new_balance)}`);
        setShowTopupForm(false);
        setTopupData({ card_id: '', amount: '', customer_mobile: '' });
      }
      fetchTransactions();
    } catch (error) {
      setNotice(formatPaymentError(error));
    }
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Payments & Transactions</h1>
        <button className="btn btn-primary" onClick={() => setShowTopupForm(!showTopupForm)}>
          {showTopupForm ? 'Cancel' : '+ Top Up Card'}
        </button>
      </div>

      {showTopupForm && (
        <div className="card" style={{ marginBottom: '20px' }}>
          <h2>M-Vatu card top-up</h2>
          <p>Choose the passenger card, the amount in VUV, and the Vodafone mobile number. An agent can do this with the customer. The fare reader still spends the card balance, not the M-Vatu wallet.</p>
          {notice && <p style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>{notice}</p>}
          <form onSubmit={handleInitiateTopup}>
            <label>Card</label>
            <select
              value={topupData.card_id}
              onChange={(e) => setTopupData({ ...topupData, card_id: e.target.value })}
              required
            >
              <option value="">Select a card</option>
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.card_uid} — {card.customer_name || 'Unassigned'} — {formatVUV(card.balance)}
                </option>
              ))}
            </select>

            <label>Amount (VUV)</label>
            <input
              type="number"
              step="1"
              min="1"
              value={topupData.amount}
              onChange={(e) => setTopupData({ ...topupData, amount: e.target.value })}
              required
              placeholder="e.g. 500"
            />

            <label>Vodafone mobile</label>
            <input
              type="tel"
              value={topupData.customer_mobile}
              onChange={(e) => setTopupData({ ...topupData, customer_mobile: e.target.value })}
              required
              placeholder="+678"
            />

            <button type="submit" className="btn btn-primary">Record M-Vatu top-up</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Card UID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Balance After</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No transactions found</td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.created_at).toLocaleString()}</td>
                  <td>{tx.card_uid || 'N/A'}</td>
                  <td>{tx.transaction_type}</td>
                  <td>{formatVUV(tx.amount)}</td>
                  <td>{formatVUV(tx.balance_after)}</td>
                  <td>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: tx.status === 'completed' ? '#d4edda' : '#fff3cd',
                        color: tx.status === 'completed' ? '#155724' : '#856404'
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
