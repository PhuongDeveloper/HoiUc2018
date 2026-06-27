'use client';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';
import Footer from './Footer';
import ZaloButton from './ZaloButton';
import AuthModal from './AuthModal';

export default function ClientLayout({ children }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('login');

  const openLogin = () => {
    setAuthInitialTab('login');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthInitialTab('register');
    setAuthModalOpen(true);
  };

  // Listen to custom registration trigger events from page buttons
  useEffect(() => {
    const handleTriggerRegister = () => {
      openRegister();
    };
    window.addEventListener('trigger-register', handleTriggerRegister);
    return () => window.removeEventListener('trigger-register', handleTriggerRegister);
  }, []);

  return (
    <SessionProvider>
      <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} />
      
      <main style={{ minHeight: 'calc(100vh - 150px)', paddingTop: 'var(--header-height)' }}>
        {children}
      </main>

      <Footer />
      <ZaloButton />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authInitialTab}
      />
    </SessionProvider>
  );
}
