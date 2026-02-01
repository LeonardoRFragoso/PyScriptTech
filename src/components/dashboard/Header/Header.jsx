import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiSettings,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import styles from './Header.module.css';

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const notifications = [
    { id: 1, title: 'Novo cliente cadastrado', time: '5 min atrás', read: false },
    { id: 2, title: 'Projeto atualizado', time: '1 hora atrás', read: false },
    { id: 3, title: 'Tarefa concluída', time: '2 horas atrás', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <div className={styles.notificationsWrapper} ref={notificationsRef}>
          <button 
            className={styles.iconButton}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <h3>Notificações</h3>
                <button className={styles.markAllRead}>Marcar como lidas</button>
              </div>
              <div className={styles.dropdownContent}>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}
                    >
                      <div className={styles.notificationDot}></div>
                      <div className={styles.notificationContent}>
                        <p>{notification.title}</p>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.emptyState}>Sem notificações</p>
                )}
              </div>
              <Link to="/dashboard/notifications" className={styles.dropdownFooter}>
                Ver todas
              </Link>
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
                <Link to="/dashboard/profile" className={styles.menuItem}>
                  <FiUser />
                  <span>Meu Perfil</span>
                </Link>
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
