import { motion } from 'framer-motion';
import { UserData } from '../types';

interface PortfolioPreviewProps {
  userData: UserData;
}

export default function PortfolioPreview({ userData }: PortfolioPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-12"
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {userData.avatarUrl && (
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={userData.avatarUrl}
            alt={userData.name}
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {userData.name}
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          {userData.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {userData.bio}
        </p>
      </motion.div>

      {/* Links Sociais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center space-x-4"
      >
        {userData.socialLinks.github && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={userData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            GitHub
          </motion.a>
        )}
        {userData.socialLinks.linkedin && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={userData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            LinkedIn
          </motion.a>
        )}
        {userData.socialLinks.twitter && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={userData.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Twitter
          </motion.a>
        )}
        {userData.socialLinks.instagram && (
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={userData.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Instagram
          </motion.a>
        )}
      </motion.div>

      {/* Projetos */}
      {userData.projects.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  {project.link && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600"
                    >
                      Ver Projeto →
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Experiências Profissionais */}
      {userData.experiences.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experiências Profissionais</h2>
          <div className="space-y-6">
            {userData.experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {experience.position}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {experience.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-300">
                      {experience.startDate} - {experience.isCurrent ? 'Presente' : experience.endDate}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {experience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Formação Acadêmica */}
      {userData.education.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Formação Acadêmica</h2>
          <div className="space-y-6">
            {userData.education.map((education, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {education.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {education.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {education.field}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-300">
                      {education.startDate} - {education.isCurrent ? 'Presente' : education.endDate}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {education.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
} 