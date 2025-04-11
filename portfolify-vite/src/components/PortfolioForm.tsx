import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserData } from '../types';
import toast from 'react-hot-toast';

interface PortfolioFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export default function PortfolioForm({ userData, setUserData }: PortfolioFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSocialLinkChange = (platform: keyof UserData['socialLinks'], value: string) => {
    setUserData({
      ...userData,
      socialLinks: {
        ...userData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setUserData({
          ...userData,
          avatarUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectChange = (index: number, field: keyof UserData['projects'][0], value: string) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setUserData({ ...userData, projects: updatedProjects });
  };

  const addProject = () => {
    setUserData({
      ...userData,
      projects: [
        ...userData.projects,
        {
          title: '',
          description: '',
          imageUrl: '',
          link: ''
        }
      ]
    });
    toast.success('Novo projeto adicionado!');
  };

  const removeProject = (index: number) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    setUserData({ ...userData, projects: updatedProjects });
    toast.success('Projeto removido!');
  };

  const handleExperienceChange = (index: number, field: keyof UserData['experiences'][0], value: string | boolean) => {
    const updatedExperiences = [...userData.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
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
    toast.success('Nova experiência adicionada!');
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = userData.experiences.filter((_, i) => i !== index);
    setUserData({ ...userData, experiences: updatedExperiences });
    toast.success('Experiência removida!');
  };

  const handleEducationChange = (index: number, field: keyof UserData['education'][0], value: string | boolean) => {
    const updatedEducation = [...userData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
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
    toast.success('Nova formação adicionada!');
  };

  const removeEducation = (index: number) => {
    const updatedEducation = userData.education.filter((_, i) => i !== index);
    setUserData({ ...userData, education: updatedEducation });
    toast.success('Formação removida!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Informações Pessoais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Informações Pessoais</h2>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="input"
                placeholder="Seu nome completo"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={userData.title}
                onChange={handleInputChange}
                className="input"
                placeholder="Seu cargo ou área de atuação"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Biografia
            </label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
              className="input h-32"
              placeholder="Conte um pouco sobre você"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Foto de Perfil
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="input"
              />
              {previewImage && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Links Sociais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Links Sociais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub
            </label>
            <input
              type="url"
              value={userData.socialLinks.github}
              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
              className="input"
              placeholder="https://github.com/seu-usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={userData.socialLinks.linkedin}
              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
              className="input"
              placeholder="https://linkedin.com/in/seu-perfil"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Twitter
            </label>
            <input
              type="url"
              value={userData.socialLinks.twitter}
              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
              className="input"
              placeholder="https://twitter.com/seu-usuario"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={userData.socialLinks.instagram}
              onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
              className="input"
              placeholder="https://instagram.com/seu-usuario"
            />
          </div>
        </div>
      </motion.div>

      {/* Projetos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Projetos</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addProject}
            className="btn btn-primary"
          >
            Adicionar Projeto
          </motion.button>
        </div>

        {userData.projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Nenhum projeto adicionado ainda
          </p>
        ) : (
          <div className="space-y-6">
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Projeto {index + 1}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="input"
                      placeholder="Nome do projeto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="input h-24"
                      placeholder="Descreva o projeto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Link do Projeto
                    </label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      className="input"
                      placeholder="https://seu-projeto.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Imagem do Projeto
                    </label>
                    <input
                      type="url"
                      value={project.imageUrl}
                      onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)}
                      className="input"
                      placeholder="URL da imagem do projeto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Experiências Profissionais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Experiências Profissionais</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addExperience}
            className="btn btn-primary"
          >
            Adicionar Experiência
          </motion.button>
        </div>

        {userData.experiences.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Nenhuma experiência adicionada ainda
          </p>
        ) : (
          <div className="space-y-6">
            {userData.experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Experiência {index + 1}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="input"
                        placeholder="Nome da empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="input"
                        placeholder="Seu cargo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data de Início
                      </label>
                      <input
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data de Término
                      </label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="input"
                        disabled={experience.isCurrent}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={experience.isCurrent}
                      onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`current-${index}`}
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Trabalho atual
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      className="input h-24"
                      placeholder="Descreva suas responsabilidades e conquistas"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Formação Acadêmica */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Formação Acadêmica</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addEducation}
            className="btn btn-primary"
          >
            Adicionar Formação
          </motion.button>
        </div>

        {userData.education.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Nenhuma formação adicionada ainda
          </p>
        ) : (
          <div className="space-y-6">
            {userData.education.map((education, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Formação {index + 1}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remover
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Instituição
                      </label>
                      <input
                        type="text"
                        value={education.institution}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        className="input"
                        placeholder="Nome da instituição"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Curso
                      </label>
                      <input
                        type="text"
                        value={education.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="input"
                        placeholder="Nome do curso"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Área de Estudo
                    </label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                      className="input"
                      placeholder="Área de estudo"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data de Início
                      </label>
                      <input
                        type="date"
                        value={education.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data de Término
                      </label>
                      <input
                        type="date"
                        value={education.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        className="input"
                        disabled={education.isCurrent}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`current-edu-${index}`}
                      checked={education.isCurrent}
                      onChange={(e) => handleEducationChange(index, 'isCurrent', e.target.checked)}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`current-edu-${index}`}
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Cursando atualmente
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={education.description}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                      className="input h-24"
                      placeholder="Descreva sua formação"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 