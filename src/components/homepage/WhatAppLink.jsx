// src/components/homepage/WhatsAppLink.jsx
import React, { useEffect, useState } from 'react';

const WhatsAppLink = () => {
  const [whatsAppLink, setWhatsAppLink] = useState('');

  useEffect(() => {
    // Obfuscação do número de telefone
    const part1 = "5524";  // Código do país e DDD
    const part2 = "99927"; // Primeira parte do número
    const part3 = "2828";  // Segunda parte do número
    const fullNumber = part1 + part2 + part3;
    const link = `https://wa.me/${fullNumber}`;

    setWhatsAppLink(link);
  }, []);

  return (
    <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
      <img 
        src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" 
        alt="WhatsApp" 
        style={{ width: 'auto', height: 'auto', border: 'none' }} 
      />
    </a>
  );
}

export default WhatsAppLink;
