import React from 'react';
import FacebookLogo from './components/FacebookLogo';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="mb-8">
        <FacebookLogo />
      </div>
      <LoginForm />
      <Footer />
    </div>
  );
}

export default App;
