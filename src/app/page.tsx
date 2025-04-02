'use client';

import { useState, useEffect } from 'react';
import PortfolioForm from '@/components/PortfolioForm';
import PortfolioPreview from '@/components/PortfolioPreview';
import { UserData } from '@/utils/types';
import { loadUserData, saveUserData, getEmptyUserData } from '@/utils/storage';
import { exportToPdf } from '@/utils/exportPdf';
import { useTheme } from '@/components/ThemeProvider';

export default function Home() {
  const [userData, setUserData] = useState<UserData>(getEmptyUserData());
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    const savedData = loadUserData();
    if (savedData) {
      setUserData(savedData);
    }
  }, []);

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const handleDownloadPDF = async () => {
    try {
      await exportToPdf('portfolio-preview', `${userData.name.replace(/\s+/g, '_')}_portfolio.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  const handleDownloadHTML = () => {
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
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Portfolify</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Crie seu portfólio profissional em minutos
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {theme === 'light' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Modo Escuro
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Modo Claro
              </>
            )}
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'form' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Formulário
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-3 font-medium text-sm ${
                  activeTab === 'preview' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Pré-visualização
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={activeTab === 'form' ? 'block' : 'hidden lg:block'}>
            <PortfolioForm userData={userData} setUserData={setUserData} />
          </div>
          
          <div className={activeTab === 'preview' ? 'block' : 'hidden lg:block'}>
            <div id="portfolio-preview">
              <PortfolioPreview userData={userData} theme={theme} />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar como PDF
              </button>
              
              <button
                onClick={handleDownloadHTML}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar como HTML
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Portfolify. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
