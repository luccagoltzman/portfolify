import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// Importar componentes
import PortfolioForm from '../components/PortfolioForm';
import PortfolioPreview from '../components/PortfolioPreview';

// Importar utilitários
import { loadUserData, saveUserData, getEmptyUserData } from '../utils/storage';
import { exportToPdf } from '../utils/exportPdf';

export default function Home() {
  const [userData, setUserData] = useState(getEmptyUserData());
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('form');
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedData = loadUserData();
    if (savedData) {
      setUserData(savedData);
    }
    
    // Carregar o tema do localStorage no cliente
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    }
  }, []);

  // Efeito para salvar os dados do usuário
  useEffect(() => {
    if (isMounted) {
      saveUserData(userData);
    }
  }, [userData, isMounted]);

  // Efeito para aplicar o tema atual ao HTML e salvar no localStorage
  useEffect(() => {
    if (!isMounted) return;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, isMounted]);

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      await exportToPdf('portfolio-preview', `${userData.name.replace(/\s+/g, '_')}_portfolio.pdf`);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setLoading(false);
    }
  };

  const handleDownloadHTML = () => {
    try {
      setLoading(true);
      const previewElement = document.getElementById('portfolio-preview');
      if (!previewElement) return;

      const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${userData.name || 'Meu Portfólio'}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}">
          ${previewElement.outerHTML}
        </body>
        </html>
      `;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${userData.name.replace(/\s+/g, '_')}_portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao gerar HTML:', error);
      setLoading(false);
    }
  };

  // Se ainda não estiver montado no cliente, exibe um estado de carregamento
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Portfolify - Crie seu portfólio</title>
        <meta name="description" content="Crie um portfólio profissional em minutos" />
      </Head>
      
      <main className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">Portfolify</h1>
              <div className="absolute -top-4 -right-8 w-16 h-16 text-yellow-400 transform rotate-12 opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              Crie seu portfólio profissional em minutos e destaque-se no mercado
            </p>
          </header>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
              aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            >
              {theme === 'light' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Modo Escuro
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Modo Claro
                </>
              )}
            </button>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('form')}
                  className={`flex-1 px-6 py-4 font-medium text-sm transition-all duration-300 ${
                    activeTab === 'form' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Formulário
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 px-6 py-4 font-medium text-sm transition-all duration-300 ${
                    activeTab === 'preview' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Pré-visualização
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`transition-all duration-300 transform ${activeTab === 'form' ? 'block opacity-100 translate-x-0' : 'hidden lg:block opacity-90 lg:translate-x-0'}`}>
              <PortfolioForm userData={userData} setUserData={setUserData} />
            </div>
            
            <div className={`transition-all duration-300 transform ${activeTab === 'preview' ? 'block opacity-100 translate-x-0' : 'hidden lg:block opacity-90 lg:translate-x-0'}`}>
              <div id="portfolio-preview" className="mb-6">
                <PortfolioPreview userData={userData} theme={theme} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadPDF}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Baixar como PDF
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleDownloadHTML}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Baixar como HTML
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-blue-500 font-bold text-xl mr-2">Portfolify</span>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              © {new Date().getFullYear()} Portfolify. Todos os direitos reservados.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Crie seu portfólio profissional em minutos
            </div>
          </div>
        </footer>
      </main>
    </>
  );
} 