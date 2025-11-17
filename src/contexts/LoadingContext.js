'use client';
import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="spinner">
            <div className="inner"></div>
          </div>
        </div>
      )}
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border-radius: 100%;
          background-color: aqua;
          display: grid;
          place-items: center;
          animation: zoomin 1.5s infinite alternate-reverse;
        }
        .inner {
          background-color: #212121;
          width: 80%;
          height: 80%;
          border-radius: 100%;
        }
        @keyframes zoomin {
          0% {
            transform: scale(1);
            box-shadow: 0 0 100px 20px rgb(16, 71, 71);
          }
          100% {
            transform: scale(1.5);
            box-shadow: 0 0 100px 20px #000;
          }
        }
      `}</style>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
