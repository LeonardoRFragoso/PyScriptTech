import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={toggleCollapse}
      />
      
      <div className={`${styles.main} ${sidebarOpen && !sidebarCollapsed ? styles.shifted : ''} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <Header 
          onToggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
        />
        
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
