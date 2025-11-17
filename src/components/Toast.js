'use client';
import { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container">
      <div className="toast-left-side">
        <div className="toast-card">
          <div className="toast-card-line"></div>
        </div>
        <div className="toast-post">
          <div className="toast-post-line"></div>
          <div className="toast-screen"></div>
          <div className="toast-numbers"></div>
          <div className="toast-numbers-line2"></div>
        </div>
        <div className="toast-buttons"></div>
      </div>
      <div className="toast-right-side">
        <div className="toast-new">{message}</div>
        <svg className="toast-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <div className="toast-icon">!</div>
    </div>
  );
}
