'use client';

export const exportToPdf = async (elementId: string, filename: string = 'portfolio.pdf') => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    // Importação dinâmica para garantir que só será carregada no cliente
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
  }
}; 