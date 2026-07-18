import React, { useEffect, useState } from 'react';
import {
  createUser,
  deleteUser,
  fetchUsers,
  ManagedUser,
  updateUser,
} from '../api/mockApi';

type ModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; user: ManagedUser }
  | { mode: 'delete'; user: ManagedUser };

const emptyDraft = { name: '', email: '', role: 'viewer' as ManagedUser['role'] };

export default function UserManagementPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>({ mode: 'closed' });
  const [draft, setDraft] = useState(emptyDraft);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const openCreate = () => {
    setDraft(emptyDraft);
    setFormError(null);
    setModal({ mode: 'create' });
  };

  const openEdit = (user: ManagedUser) => {
    setDraft({ name: user.name, email: user.email, role: user.role });
    setFormError(null);
    setModal({ mode: 'edit', user });
  };

  const closeModal = () => setModal({ mode: 'closed' });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!draft.name.trim() || !draft.email.trim()) {
      setFormError('Name and email are required.');
      return;
    }
    setSaving(true);
    try {
      if (modal.mode === 'create') {
        await createUser(draft);
        setToast('User invited.');
      } else if (modal.mode === 'edit') {
        await updateUser(modal.user.id, draft);
        setToast('User updated.');
      }
      closeModal();
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (modal.mode !== 'delete') return;
    setSaving(true);
    try {
      await deleteUser(modal.user.id);
      setToast('User removed.');
      closeModal();
      load();
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (user: ManagedUser) => {
    const next = user.status === 'suspended' ? 'active' : 'suspended';
    await updateUser(user.id, { status: next });
    load();
  };

  return (
    <div data-testid="user-management-page">
      <div className="page-header">
        <div>
          <h2>User management</h2>
          <p>Full CRUD: create, edit, suspend, and delete users.</p>
        </div>
        <button className="btn btn--primary" data-testid="add-user-button" onClick={openCreate}>
          + Add user
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-row" data-testid="users-loading">
            <span className="spinner" /> Loading users…
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table" data-testid="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} data-testid="user-row" data-user-email={u.email}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge badge--${u.role}`}>{u.role}</span>
                    </td>
                    <td>
                      <span className={`badge badge--${u.status}`}>{u.status}</span>
                    </td>
                    <td>{u.createdAt}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          className="btn btn--secondary btn--sm"
                          data-testid={`edit-user-${u.id}`}
                          onClick={() => openEdit(u)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn--secondary btn--sm"
                          data-testid={`toggle-status-${u.id}`}
                          onClick={() => toggleStatus(u)}
                        >
                          {u.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                        </button>
                        <button
                          className="btn btn--danger btn--sm"
                          data-testid={`delete-user-${u.id}`}
                          onClick={() => setModal({ mode: 'delete', user: u })}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {(modal.mode === 'create' || modal.mode === 'edit') && (
        <div className="modal-overlay" data-testid="user-modal-overlay">
          <div className="modal" role="dialog" aria-modal="true" data-testid="user-modal">
            <h3>{modal.mode === 'create' ? 'Add user' : 'Edit user'}</h3>
            <form onSubmit={handleSave}>
              {formError && (
                <div className="alert-banner alert-banner--error" data-testid="user-form-error">
                  {formError}
                </div>
              )}
              <div className="field">
                <label htmlFor="user-name">Name</label>
                <input
                  id="user-name"
                  type="text"
                  data-testid="user-name-input"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="user-email">Email</label>
                <input
                  id="user-email"
                  type="email"
                  data-testid="user-email-input"
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  disabled={modal.mode === 'edit'}
                />
              </div>
              <div className="field">
                <label htmlFor="user-role">Role</label>
                <select
                  id="user-role"
                  data-testid="user-role-input"
                  value={draft.role}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, role: e.target.value as ManagedUser['role'] }))
                  }
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="modal__actions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  data-testid="user-modal-cancel"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn--primary"
                  data-testid="user-modal-save"
                  disabled={saving}
                >
                  {saving ? <span className="spinner" /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal.mode === 'delete' && (
        <div className="modal-overlay" data-testid="delete-modal-overlay">
          <div className="modal" role="dialog" aria-modal="true" data-testid="delete-modal">
            <h3>Remove {modal.user.name}?</h3>
            <p>This cannot be undone in a real system. Here, a page refresh will restore the seed data.</p>
            <div className="modal__actions">
              <button
                className="btn btn--secondary"
                data-testid="delete-cancel"
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="btn btn--danger"
                data-testid="delete-confirm"
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? <span className="spinner" /> : 'Delete user'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-stack">
          <div className="toast" data-testid="user-toast">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
