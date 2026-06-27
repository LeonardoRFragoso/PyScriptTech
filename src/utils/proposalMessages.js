export const buildEmailMessage = ({ clientName, proposalTitle, publicUrl, senderName = 'Leonardo Fragoso', companyName = 'PyScriptTech' }) => {
  const subject = `Proposta ${companyName} — ${proposalTitle}`;
  const body = `Olá ${clientName || 'Cliente'},

conforme conversamos, preparei a proposta para ${proposalTitle || 'o projeto'}.

Você pode visualizar o escopo, valores e próximos passos pelo link abaixo:

${publicUrl}

Se estiver tudo certo, basta clicar em "Aceitar proposta" na própria página.

Após o aceite, eu inicio a organização do projeto no nosso portal de execução.

Atenciosamente,
${senderName}
${companyName}
contato@pyscript.tech | (21) 98029-2791
`;

  return { subject, body, mailto: `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
};

export const buildWhatsAppMessage = ({ clientName, proposalTitle, publicUrl, senderName = 'Leonardo Fragoso', companyName = 'PyScriptTech' }) => {
  const text = `Olá ${clientName || 'Cliente'}, tudo bem?

Preparei a proposta da ${companyName} para ${proposalTitle || 'o projeto que conversamos'}.

Você pode visualizar e aceitar por aqui:
${publicUrl}

Depois do aceite, eu organizo o projeto no nosso portal de execução e te envio os próximos passos.

Abraço,
${senderName}
`;

  return { text, whatsappUrl: `https://wa.me/?text=${encodeURIComponent(text)}` };
};

export const buildProposalTextSummary = ({ clientName, companyName, proposalTitle, scope, items, totalValue, validUntil }) => {
  const itemsText = Array.isArray(items)
    ? items.map((item, i) => `${i + 1}. ${item.description || item.name || 'Item'} — ${(item.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`).join('\n')
    : '';

  return `PROPOSTA COMERCIAL — ${proposalTitle || 'Projeto'}

Para: ${clientName || companyName || 'Cliente'}

Escopo:
${scope || 'Não informado.'}

Itens:
${itemsText}

Total: ${(totalValue || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
Válida até: ${validUntil ? new Date(validUntil).toLocaleDateString('pt-BR') : 'Não informado'}

PyScriptTech — Automação, IA e Sistemas Corporativos
contato@pyscript.tech | (21) 98029-2791
`;
};
