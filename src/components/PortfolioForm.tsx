'use client';

import React, { useState, useEffect } from 'react';
import { UserData, Project, Experience, Education } from '@/utils/types';
import Image from 'next/image';

interface PortfolioFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export default function PortfolioForm({ userData, setUserData }: PortfolioFormProps) {
  useEffect(() => {
    const updatedData = { ...userData };
    let needsUpdate = false;

    if (!updatedData.projects || !Array.isArray(updatedData.projects)) {
      updatedData.projects = [];
      needsUpdate = true;
    }
    
    if (!updatedData.experiences || !Array.isArray(updatedData.experiences)) {
      updatedData.experiences = [];
      needsUpdate = true;
    }
    
    if (!updatedData.education || !Array.isArray(updatedData.education)) {
      updatedData.education = [];
      needsUpdate = true;
    }
    
    if (!updatedData.socialLinks) {
      updatedData.socialLinks = { github: '', linkedin: '', twitter: '', instagram: '' };
      needsUpdate = true;
    }

    if (needsUpdate) {
      setUserData(updatedData);
    }
  }, [userData, setUserData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserData({
            ...userData,
            profilePicture: event.target.result as string,
            avatarUrl: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setUserData({ ...userData, projects: updatedProjects });
  };

  const handleProjectImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && userData.projects) {
          const updatedProjects = [...userData.projects];
          updatedProjects[index] = {
            ...updatedProjects[index],
            image: event.target.result as string,
            imageUrl: event.target.result as string
          };
          setUserData({
            ...userData,
            projects: updatedProjects
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperiences = [...userData.experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setUserData({ ...userData, experiences: updatedExperiences });
  };

  const addExperience = () => {
    setUserData({
      ...userData,
      experiences: [
        ...userData.experiences,
        { 
          company: '', 
          position: '', 
          startDate: '', 
          endDate: '', 
          description: '',
          isCurrent: false
        }
      ]
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = userData.experiences.filter((_: Experience, i: number) => i !== index);
    setUserData({ ...userData, experiences: updatedExperiences });
  };

  const toggleCurrentJob = (index: number) => {
    const updatedExperiences = [...userData.experiences];
    const experience = updatedExperiences[index];
    experience.isCurrent = !experience.isCurrent;
    setUserData({ ...userData, experiences: updatedExperiences });
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...userData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setUserData({ ...userData, education: updatedEducation });
  };

  const addEducation = () => {
    setUserData({
      ...userData,
      education: [
        ...userData.education,
        { 
          institution: '', 
          degree: '', 
          field: '',
          startDate: '', 
          endDate: '', 
          description: '',
          isCurrent: false
        }
      ]
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = userData.education.filter((_: Education, i: number) => i !== index);
    setUserData({ ...userData, education: updatedEducation });
  };

  const toggleCurrentEducation = (index: number) => {
    const updatedEducation = [...userData.education];
    const education = updatedEducation[index];
    education.isCurrent = !education.isCurrent;
    setUserData({ ...userData, education: updatedEducation });
  };

  const handleSocialChange = (platform: string, value: string) => {
    setUserData({
      ...userData,
      socialLinks: { ...userData.socialLinks, [platform]: value }
    });
  };

  const addProject = () => {
    setUserData({
      ...userData,
      projects: [
        ...userData.projects,
        { title: '', description: '', imageUrl: '', link: '' }
      ]
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = userData.projects.filter((_: Project, i: number) => i !== index);
    setUserData({ ...userData, projects: updatedProjects });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white inline-flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Informações Pessoais
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      
      <div className="space-y-6">
        <div className="transition-all duration-300 hover:translate-x-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            placeholder="Digite seu nome completo"
          />
        </div>

        <div className="transition-all duration-300 hover:translate-x-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Título Profissional
          </label>
          <input
            type="text"
            name="title"
            value={userData.title}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            placeholder="Ex: Desenvolvedor Front-end, Designer UX, etc."
          />
        </div>

        <div className="transition-all duration-300 hover:translate-x-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Biografia
          </label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
            placeholder="Fale um pouco sobre você, sua experiência e habilidades..."
          />
        </div>

        <div className="transition-all duration-300 hover:translate-x-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Foto de Perfil
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="profilePicture"
            />
            <label
              htmlFor="profilePicture"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            >
              Carregar Imagem
            </label>
            {(userData.profilePicture || userData.avatarUrl) && (
              <div className="w-20 h-20 relative overflow-hidden rounded-full">
                <img
                  src={userData.profilePicture || userData.avatarUrl}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/file.svg';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Projetos
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adicione seus melhores projetos para exibir no portfólio</p>
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={addProject}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar Projeto
            </button>
          </div>

          {(!userData.projects || userData.projects.length === 0) ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Nenhum projeto adicionado ainda. Clique no botão acima para adicionar seu primeiro projeto.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {userData.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-all duration-300 hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs mr-2">
                        {index + 1}
                      </span>
                      Projeto {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Remover projeto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Título
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Nome do projeto"
                      />
                    </div>
                    
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Link do Projeto
                      </label>
                      <input
                        type="text"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="https://exemplo.com/projeto"
                      />
                    </div>
                  </div>

                  <div className="mt-4 transition-all duration-300 hover:translate-x-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Descrição
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
                      placeholder="Descreva seu projeto brevemente..."
                    />
                  </div>

                  <div className="mt-4 mb-4">
                    <label className="block text-gray-700 mb-2">Imagem do Projeto</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProjectImageChange(index, e)}
                        className="hidden"
                        id={`projectImage-${index}`}
                      />
                      <label
                        htmlFor={`projectImage-${index}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
                      >
                        Carregar Imagem
                      </label>
                      {(project.image || project.imageUrl) && (
                        <div className="w-20 h-20 relative overflow-hidden">
                          <img
                            src={project.image || project.imageUrl}
                            alt={`Imagem do projeto ${project.title}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/file.svg';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Experiências Profissionais
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adicione suas experiências profissionais para destacar sua trajetória</p>
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={addExperience}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar Experiência
            </button>
          </div>

          {(!userData.experiences || userData.experiences.length === 0) ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Nenhuma experiência adicionada ainda. Adicione sua experiência profissional para destacar suas competências.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {userData.experiences.map((experience, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-all duration-300 hover:shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full text-xs mr-2">
                        {index + 1}
                      </span>
                      Experiência {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Remover experiência"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Empresa
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Nome da empresa"
                      />
                    </div>
                    
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Cargo
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Seu cargo ou função"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Data de Início
                      </label>
                      <input
                        type="month"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                    </div>
                    
                    <div className="transition-all duration-300 hover:translate-x-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex justify-between">
                        <span>Data de Término</span>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={experience.isCurrent}
                            onChange={() => toggleCurrentJob(index)}
                            className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4"
                          />
                          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Emprego atual</span>
                        </label>
                      </label>
                      <input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        disabled={experience.isCurrent}
                        className={`w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${experience.isCurrent ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 transition-all duration-300 hover:translate-x-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Descrição
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
                      placeholder="Descreva suas principais responsabilidades e realizações..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5m0 0l9-5-9-5-9 5 9 5m0 0v7"></path>
              </svg>
              Formação Acadêmica
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adicione sua formação acadêmica para destacar seus conhecimentos</p>
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={addEducation}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar Formação
            </button>
          </div>

          {(!userData.education || userData.education.length === 0) ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5m0 0l9-5-9-5-9 5 9 5m0 0v7" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Nenhuma formação adicionada ainda. Adicione sua formação acadêmica para destacar seus conhecimentos.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userData.education.map((education: Education, index: number) => (
                <div key={index} className="border border-gray-300 dark:border-gray-700 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">Formação {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Instituição
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Nome da instituição de ensino"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Grau/Nível
                      </label>
                      <select
                        value={education.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Selecione um grau</option>
                        <option value="Ensino Médio">Ensino Médio</option>
                        <option value="Curso Técnico">Curso Técnico</option>
                        <option value="Graduação">Graduação</option>
                        <option value="Pós-graduação">Pós-graduação</option>
                        <option value="MBA">MBA</option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Doutorado">Doutorado</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Área de Estudo
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Ex: Ciência da Computação, Administração, etc."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Data de Início
                      </label>
                      <input
                        type="month"
                        value={education.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex justify-between">
                        <span>Data de Conclusão</span>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={education.isCurrent}
                            onChange={() => toggleCurrentEducation(index)}
                            className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4"
                          />
                          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Cursando</span>
                        </label>
                      </label>
                      <input
                        type="month"
                        value={education.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        disabled={education.isCurrent}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          education.isCurrent ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={education.description}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Descreva detalhes sobre o curso, realizações e atividades relevantes..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              Redes Sociais
            </h3>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adicione links para suas redes sociais e perfis profissionais</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="transition-all duration-300 hover:translate-x-1 group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-sm group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">linkedin.com/in/</span>
                <input
                  type="text"
                  value={userData.socialLinks.linkedin.replace(/^https?:\/\/(?:www\.)?linkedin\.com\/in\//, '')}
                  onChange={(e) => handleSocialChange('linkedin', `https://linkedin.com/in/${e.target.value}`)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="seu-perfil"
                />
              </div>
            </div>
            
            <div className="transition-all duration-300 hover:translate-x-1 group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-sm group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">github.com/</span>
                <input
                  type="text"
                  value={userData.socialLinks.github.replace(/^https?:\/\/(?:www\.)?github\.com\//, '')}
                  onChange={(e) => handleSocialChange('github', `https://github.com/${e.target.value}`)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="seu-usuario"
                />
              </div>
            </div>
            
            <div className="transition-all duration-300 hover:translate-x-1 group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-sm group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">twitter.com/</span>
                <input
                  type="text"
                  value={userData.socialLinks.twitter.replace(/^https?:\/\/(?:www\.)?twitter\.com\//, '')}
                  onChange={(e) => handleSocialChange('twitter', `https://twitter.com/${e.target.value}`)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="seu_usuario"
                />
              </div>
            </div>
            
            <div className="transition-all duration-300 hover:translate-x-1 group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center">
                <svg className="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.353.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                Instagram
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-sm group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-200">instagram.com/</span>
                <input
                  type="text"
                  value={userData.socialLinks.instagram.replace(/^https?:\/\/(?:www\.)?instagram\.com\//, '')}
                  onChange={(e) => handleSocialChange('instagram', `https://instagram.com/${e.target.value}`)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="seu_perfil"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 