import React, { useState, useEffect } from 'react';
import { useClients } from '../../../hooks/useClients';
import Input from '../../../components/DesignSystem/Input';
import { FiUser, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import styles from './ClientForm.module.css';

const ClientForm = ({ client, onSuccess }) => {
  const { createClient, updateClient } = useClients();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'lead',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        company: client.company || '',
        status: client.status || 'lead',
        notes: client.notes || '',
      });
    }
  }, [client]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    const result = client
      ? await updateClient(client.id || client._id, formData)
      : await createClient(formData);
    
    setLoading(false);
    
    if (result.success) {
      onSuccess();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Nome completo"
        name="name"
        placeholder="João Silva"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        icon={<FiUser />}
        fullWidth
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="joao@empresa.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={<FiMail />}
        fullWidth
        required
      />

      <Input
        label="Telefone"
        name="phone"
        placeholder="(21) 98765-4321"
        value={formData.phone}
        onChange={handlePhoneChange}
        error={errors.phone}
        icon={<FiPhone />}
        fullWidth
        required
      />

      <Input
        label="Empresa"
        name="company"
        placeholder="Nome da empresa (opcional)"
        value={formData.company}
        onChange={handleChange}
        icon={<FiBriefcase />}
        fullWidth
      />

      <div className={styles.field}>
        <label className={styles.label}>Status</label>
        <div className={styles.statusOptions}>
          {[
            { value: 'lead', label: 'Lead', color: '#f59e0b' },
            { value: 'active', label: 'Ativo', color: '#10b981' },
            { value: 'inactive', label: 'Inativo', color: '#6b7280' },
          ].map(option => (
            <label 
              key={option.value} 
              className={`${styles.statusOption} ${formData.status === option.value ? styles.selected : ''}`}
              style={{ '--status-color': option.color }}
            >
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={formData.status === option.value}
                onChange={handleChange}
              />
              <span className={styles.statusDot}></span>
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Observações</label>
        <textarea
          name="notes"
          placeholder="Notas sobre o cliente (opcional)"
          value={formData.notes}
          onChange={handleChange}
          className={styles.textarea}
          rows={3}
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            <span className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            client ? 'Atualizar Cliente' : 'Criar Cliente'
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
