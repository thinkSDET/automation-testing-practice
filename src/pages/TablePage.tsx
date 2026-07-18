import React, { useEffect, useState } from 'react';
import { fetchOrders, Order, OrdersQuery } from '../api/mockApi';

const PAGE_SIZE = 8;
const COLUMNS: { key: keyof Order; label: string }[] = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

export default function TablePage() {
  const [rows, setRows] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrdersQuery['status']>('all');
  const [sortBy, setSortBy] = useState<keyof Order>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchOrders({ page, pageSize: PAGE_SIZE, search, status, sortBy, sortDir }).then((res) => {
      if (cancelled) return;
      setRows(res.rows);
      setTotal(res.total);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [page, search, status, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const toggleSort = (key: keyof Order) => {
    if (sortBy === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  return (
    <div data-testid="table-page">
      <div className="page-header">
        <div>
          <h2>Orders</h2>
          <p>Server-style pagination, sorting, search, and status filtering.</p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search customer, order ID, or product…"
            data-testid="order-search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            style={{ minWidth: 260 }}
          />
          <select
            data-testid="order-status-filter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as OrdersQuery['status']);
              setPage(1);
            }}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {loading && (
            <span className="loading-row" data-testid="table-loading">
              <span className="spinner" /> Loading…
            </span>
          )}
        </div>

        <div className="table-wrap">
          <table className="data-table" data-testid="orders-table">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={sortBy === col.key ? 'is-sorted' : ''}
                    data-testid={`sort-${col.key}`}
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label} {sortBy === col.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!loading && rows.length === 0 && (
                <tr>
                  <td colSpan={COLUMNS.length} data-testid="orders-empty">
                    No orders match these filters.
                  </td>
                </tr>
              )}
              {rows.map((order) => (
                <tr key={order.id} data-testid="order-row">
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>
                    <span className={`badge badge--${order.status}`}>{order.status}</span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination" data-testid="pagination">
          <button
            className="btn btn--secondary btn--sm"
            data-testid="prev-page"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span data-testid="page-indicator">
            Page {page} of {totalPages} ({total} orders)
          </span>
          <button
            className="btn btn--secondary btn--sm"
            data-testid="next-page"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
