import { useMutation, useQuery } from '@apollo/client/react';
import React, { useState } from 'react';
import { CREATE_USER, DELETE_USER } from '../graphql/mutations';
import { GET_ALL_USERS } from '../graphql/queries';
import './UsersTable.css';

function UsersTable() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Query to fetch all users
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);

  // Mutation to create a user
  const [createUser, { loading: creating }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setShowCreateForm(false);
      setFormData({ name: '', email: '' });
      refetch();
    },
    onError: (err) => {
      console.error('Error creating user:', err);
      alert('Failed to create user: ' + err.message);
    },
  });

  // Mutation to delete a user
  const [deleteUser, { loading: deleting }] = useMutation(DELETE_USER, {
    onCompleted: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Error deleting user:', err);
      alert('Failed to delete user: ' + err.message);
    },
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        data: {
          name: formData.name,
          email: formData.email,
        },
      },
    });
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      deleteUser({
        variables: {
          id: userId,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="users-table-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-table-container">
        <div className="error">
          Error loading users: {error.message}
        </div>
      </div>
    );
  }

  const users = data?.getAllUsers || [];

  return (
    <div className="users-table-container">
      <div className="users-table-header">
        <h2>Users Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
          disabled={creating || deleting}
        >
          + Create User
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New User</h3>
              <button
                className="modal-close"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="create-user-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter user email"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Posts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found. Create your first user!
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td>
                    {user.posts && user.posts.length > 0 ? (
                      <div className="posts-list">
                        {user.posts.map((post, index) => (
                          <span key={post.id} className="post-tag">
                            {post.name}
                            {index < user.posts.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#999', fontStyle: 'italic' }}>No posts</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      disabled={deleting}
                      title="Delete user"
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;

