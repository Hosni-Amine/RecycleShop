import React from 'react';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
        <h2 style={{ margin: '1rem 0' }}>Page Not Found</h2>
        <p style={{ fontSize: '1.2rem' }}>Oops! The page you are looking for could not be found.</p>
      </div>
    </div>
  );
}