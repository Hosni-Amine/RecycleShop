import React from 'react';

const contactStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
  border: '2px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: '0 auto',
};

export default function Contact() {
  return (
    <div style={{marginTop:250}}>
      <div style={contactStyle}>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or inquiries, please feel free to contact us using the information
          below:
        </p>
        <address>
          Email: <email>contact@example.com</email>
          <br />
          Phone: <email>+123-456-7890</email>
          <br />
          Address: <email>123 Main Street, City, Country</email>
        </address>
      </div>
    </div>
  );
}