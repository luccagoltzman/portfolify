'use client';

export const exportToPdf = async (elementId: string, filename: string = 'portfolio.pdf') => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Element not found');
    return;
  }

  // Garantir que todas as imagens estejam carregadas antes de gerar o PDF
  const images = Array.from(element.querySelectorAll('img'));
  
  try {
    // Esperar que todas as imagens sejam carregadas
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => {
                // Se a imagem falhar, substitua pelo placeholder
                img.src = '/file.svg';
                resolve(true);
              };
            }
          })
      )
    );

    // Importação dinâmica para garantir que só será carregada no cliente
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        logging: true,
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Adicionando um pequeno atraso para garantir que as imagens estejam renderizadas
    setTimeout(() => {
      html2pdf().set(opt).from(element).save();
    }, 500);
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
  }
}; 