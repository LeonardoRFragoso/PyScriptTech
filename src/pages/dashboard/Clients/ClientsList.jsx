import React, { useState } from 'react';
import { useClients } from '../../../hooks/useClients';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiMail, 
  FiPhone,
  FiMoreVertical,
  FiDownload,
  FiFilter
} from 'react-icons/fi';
import Modal from '../../../components/DesignSystem/Modal';
import Input from '../../../components/DesignSystem/Input';
import ClientForm from './ClientForm';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import styles from './ClientsList.module.css';

const ClientsList = () => {
  const { 
    clients, 
    loading, 
    deleteClient, 
    searchClients,
    filterByStatus 
  } = useClients();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    const timeoutId = setTimeout(() => {
      searchClients(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteClient(deleteConfirm.id || deleteConfirm._id);
      setDeleteConfirm(null);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingClient(null);
  };

  const handleFilterChange = (status) => {
    setActiveFilter(status);
    filterByStatus(status === 'all' ? '' : status);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      lead: { label: 'Lead', class: styles.statusLead },
      active: { label: 'Ativo', class: styles.statusActive },
      inactive: { label: 'Inativo', class: styles.statusInactive },
    };
    return statusConfig[status] || statusConfig.lead;
  };

  const filters = [
    { value: 'all', label: 'Todos' },
    { value: 'lead', label: 'Leads' },
    { value: 'active', label: 'Ativos' },
    { value: 'inactive', label: 'Inativos' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Clientes</h1>
          <p>{clients.length} clientes cadastrados</p>
        </div>
        
        <div className={styles.headerActions}>
          <button className={styles.exportButton}>
            <FiDownload />
            Exportar
          </button>
          <button 
            className={styles.addButton}
            onClick={() => setModalOpen(true)}
          >
            <FiPlus />
            Novo Cliente
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Buscar por nome, email ou empresa..."
            value={searchTerm}
            onChange={handleSearch}
            icon={<FiSearch />}
            fullWidth
          />
        </div>

        <div className={styles.filters}>
          <FiFilter className={styles.filterIcon} />
          {filters.map(filter => (
            <button
              key={filter.value}
              className={`${styles.filterButton} ${activeFilter === filter.value ? styles.active : ''}`}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading && clients.length === 0 ? (
        <LoadingSpinner />
      ) : clients.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>👥</div>
          <h3>Nenhum cliente encontrado</h3>
          <p>Comece adicionando seu primeiro cliente</p>
          <button 
            className={styles.addButton}
            onClick={() => setModalOpen(true)}
          >
            <FiPlus />
            Adicionar Cliente
          </button>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contato</th>
                <th>Empresa</th>
                <th>Status</th>
                <th>Criado em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => {
                const statusBadge = getStatusBadge(client.status);
                return (
                  <tr key={client.id || client._id}>
                    <td>
                      <div className={styles.clientCell}>
                        <div className={styles.avatar}>
                          {client.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className={styles.clientName}>{client.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.contactCell}>
                        <a href={`mailto:${client.email}`} className={styles.contactLink}>
                          <FiMail />
                          {client.email}
                        </a>
                        {client.phone && (
                          <a href={`tel:${client.phone}`} className={styles.contactLink}>
                            <FiPhone />
                            {client.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={styles.company}>{client.company || '-'}</span>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${statusBadge.class}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td>
                      <span className={styles.date}>
                        {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button 
                          className={styles.actionButton}
                          onClick={() => handleEdit(client)}
                          title="Editar"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => setDeleteConfirm(client)}
                          title="Excluir"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingClient ? 'Editar Cliente' : 'Novo Cliente'}
        size="medium"
      >
        <ClientForm
          client={editingClient}
          onSuccess={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar exclusão"
        size="small"
      >
        <div className={styles.deleteModal}>
          <p>
            Tem certeza que deseja excluir o cliente <strong>{deleteConfirm?.name}</strong>?
          </p>
          <p className={styles.deleteWarning}>
            Esta ação não pode ser desfeita.
          </p>
          <div className={styles.deleteActions}>
            <button 
              className={styles.cancelButton}
              onClick={() => setDeleteConfirm(null)}
            >
              Cancelar
            </button>
            <button 
              className={styles.confirmDeleteButton}
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientsList;
