import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FiUser, FiMail, FiSave, FiLogOut } from 'react-icons/fi';
import { showSuccess } from '../../../services/toast';
import styles from './Settings.module.css';

const Settings = () => {
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({ name });
    showSuccess('Perfil atualizado!');
    setSaving(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Configurações</h1>
        <p>Gerencie seu perfil e preferências.</p>
      </div>

      <div className={styles.card}>
        <h2>Perfil</h2>
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.field}>
            <label><FiUser /> Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          <div className={styles.field}>
            <label><FiMail /> Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className={styles.disabled}
            />
            <span className={styles.hint}>Email gerenciado pelo provedor de autenticação.</span>
          </div>
          <button type="submit" disabled={saving} className={styles.saveButton}>
            <FiSave />
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </div>

      <div className={styles.card}>
        <h2>Sessão</h2>
        <p className={styles.sessionInfo}>
          Logado como <strong>{user?.email}</strong>
        </p>
        <button onClick={logout} className={styles.logoutButton}>
          <FiLogOut />
          Encerrar sessão
        </button>
      </div>
    </div>
  );
};

export default Settings;
