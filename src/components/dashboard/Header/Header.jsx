import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import styles from './Header.module.css';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button 
          onClick={onToggleSidebar} 
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </form>
      </div>

      <div className={styles.right}>
        <button 
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Modo claro' : 'Modo escuro'}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </button>

        <div className={styles.notificationsWrapper} ref={notificationsRef}>
          <button 
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
          >
            <FiBell />
          </button>

          {showNotifications && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3>Notificações</h3>
              </div>
              <div className={styles.dropdownContent}>
                <p className={styles.emptyState}>Sem notificações no momento.</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.userWrapper} ref={userMenuRef}>
          <button 
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Usuário'}</span>
              <span className={styles.userRole}>{user?.role || 'Admin'}</span>
            </div>
          </button>

          {showUserMenu && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownContent}>
                <Link to="/dashboard/settings" className={styles.menuItem}>
                  <FiSettings />
                  <span>Configurações</span>
                </Link>
                <button onClick={logout} className={`${styles.menuItem} ${styles.logout}`}>
                  <FiLogOut />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
