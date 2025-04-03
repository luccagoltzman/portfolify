import React from 'react';

export default function PortfolioPreview({ userData, theme }) {
  const { name, title, bio, avatarUrl, profilePicture, socialLinks, projects, experiences, education } = userData;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const month = date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
    const year = date.getFullYear();
    
    return `${month[0].toUpperCase() + month.slice(1)} ${year}`;
  };
  
  return (
    <div className={`max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <header className="relative">
        {/* Banner de fundo com gradiente */}
        <div className={`h-32 w-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900 to-blue-900' : 'bg-gradient-to-r from-blue-400 to-purple-500'}`}></div>
        
        {/* Informações do perfil */}
        <div className="text-center px-6 pt-0 pb-8 relative">
          {(profilePicture || avatarUrl) && (
            <div className="mb-6 flex justify-center -mt-16">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl bg-white">
                <img 
                  src={profilePicture || avatarUrl} 
                  alt={name || 'Perfil'} 
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/file.svg";
                  }}
                />
              </div>
            </div>
          )}
          
          <h1 className="text-4xl font-bold mb-2 transition-all duration-300 hover:text-blue-500">{name || 'Seu Nome'}</h1>
          <h2 className="text-xl text-blue-500 mb-4 font-semibold">{title || 'Seu Título Profissional'}</h2>
          
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            {bio || 'Sua biografia aparecerá aqui. Escreva um pouco sobre você, suas habilidades e experiências.'}
          </p>
          
          <div className="flex justify-center space-x-4 mt-6">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            )}
            
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-500 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Experiências Profissionais */}
      {experiences && experiences.length > 0 && (
        <section className="px-6 pb-8 pt-4">
          <div className={`flex items-center mb-6 border-b pb-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-2xl font-bold">Experiência Profissional</h2>
            <div className={`ml-4 h-1 w-24 rounded ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
          </div>
          
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={index} className={`pb-5 ${index !== experiences.length - 1 ? 'border-b' : ''} ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-500">{experience.position}</h3>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 sm:mt-0`}>
                    {formatDate(experience.startDate)} - {experience.isCurrent ? 'Presente' : formatDate(experience.endDate)}
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {experience.company}
                  </span>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Formação Acadêmica */}
      {education && education.length > 0 && (
        <section className="px-6 pb-8 pt-4">
          <div className={`flex items-center mb-6 border-b pb-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-2xl font-bold">Formação Acadêmica</h2>
            <div className={`ml-4 h-1 w-24 rounded ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
          </div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className={`pb-5 ${index !== education.length - 1 ? 'border-b' : ''} ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-500">{edu.degree}</h3>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 sm:mt-0`}>
                    {formatDate(edu.startDate)} - {edu.isCurrent ? 'Presente' : formatDate(edu.endDate)}
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {edu.institution}
                  </span>
                  {edu.field && (
                    <>
                      <span className="mx-2">•</span>
                      <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{edu.field}</span>
                    </>
                  )}
                </div>
                {edu.description && (
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projetos */}
      <section className="px-6 pb-12 pt-4">
        <div className={`flex items-center mb-6 border-b pb-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-2xl font-bold">Meus Projetos</h2>
          <div className={`ml-4 h-1 w-24 rounded ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
        </div>
        
        {projects.length === 0 ? (
          <div className={`text-center py-10 border-2 border-dashed rounded-lg ${theme === 'dark' ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'}`}>
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-center italic">
              Nenhum projeto adicionado ainda. Adicione projetos para vê-los aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}
              >
                {(project.image || project.imageUrl) ? (
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={project.image || project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/file.svg";
                      }}
                    />
                  </div>
                ) : (
                  <div className={`h-32 flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-blue-500">{project.title || `Projeto ${index + 1}`}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description || 'Descrição do projeto.'}
                  </p>
                  
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <span>Ver Projeto</span>
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      <footer className={`text-center py-6 px-4 ${theme === 'dark' ? 'bg-gray-800 text-gray-400 border-t border-gray-700' : 'bg-gray-50 text-gray-500 border-t border-gray-200'}`}>
        <p className="text-sm">© {new Date().getFullYear()} {name || 'Seu Nome'}. Todos os direitos reservados.</p>
        <p className="mt-1 text-xs flex items-center justify-center">
          Criado com usando Portfolify
        </p>
      </footer>
    </div>
  );
} 