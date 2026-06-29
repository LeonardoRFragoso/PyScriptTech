import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiFileText,
  FiTarget,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiX
} from 'react-icons/fi';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { icon: FiUserPlus, label: 'Leads', path: '/dashboard/leads' },
    { icon: FiFileText, label: 'Propostas', path: '/dashboard/proposals' },
    { icon: FiTarget, label: 'Prospecção', path: '/dashboard/prospects' },
    { icon: FiUsers, label: 'Clientes', path: '/dashboard/clients' },
    { icon: FiBarChart2, label: 'Métricas', path: '/dashboard/metrics' },
  ];

  const bottomMenuItems = [
    { icon: FiSettings, label: 'Configurações', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.header}>
          <NavLink to="/dashboard" className={styles.logo}>
            {isCollapsed ? (
              <span className={styles.logoIcon}>P</span>
            ) : (
              <>
                PyScript<span>.tech</span>
              </>
            )}
          </NavLink>
          
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <FiX />
          </button>

          <button 
            className={styles.collapseButton}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <FiChevronLeft className={isCollapsed ? styles.rotated : ''} />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  end={item.path === '/dashboard'}
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={styles.navIcon} />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.divider}></div>

          <ul className={styles.menuList}>
            {bottomMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={onClose}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={styles.navIcon} />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className={`${styles.navItem} ${styles.logoutButton}`}
                title={isCollapsed ? 'Sair' : undefined}
              >
                <FiLogOut className={styles.navIcon} />
                {!isCollapsed && <span>Sair</span>}
              </button>
            </li>
          </ul>
        </nav>

        {!isCollapsed && (
          <div className={styles.userSection}>
            <div className={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.name || 'Usuário'}</span>
              <span className={styles.userRole}>{user?.role || 'Admin'}</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
