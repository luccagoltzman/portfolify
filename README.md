# Portfolify

Um gerador de portfólio minimalista e elegante para desenvolvedores, designers e outros profissionais.

## 📋 Sobre o Projeto

Portfolify é uma aplicação web que permite a criação rápida de páginas de portfólio profissionais. Com uma interface intuitiva, os usuários podem personalizar suas informações, adicionar projetos, escolher temas e exportar seu portfólio para compartilhamento.

### ✨ Características Principais

- **Interface Intuitiva**: Crie seu portfólio sem conhecimentos de programação
- **Personalização Completa**: Edite seu perfil, adicione projetos e escolha seu tema favorito
- **Responsivo**: Visualização perfeita em qualquer dispositivo
- **Exportação para PDF**: Compartilhe seu portfólio facilmente
- **Múltiplos Temas**: Alterne entre modo claro e escuro
- **Armazenamento Local**: Seus dados são salvos automaticamente no seu navegador

## 🚀 Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/portfolify.git
   cd portfolify
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:3000
   ```

## 🧩 Estrutura do Projeto

```
portfolify/
├── public/            # Arquivos estáticos
├── src/
│   ├── app/           # Páginas da aplicação (Next.js App Router)
│   ├── components/    # Componentes React reutilizáveis
│   ├── styles/        # Estilos globais (Tailwind CSS)
│   └── utils/         # Funções utilitárias
├── tailwind.config.js # Configuração do Tailwind CSS
├── next.config.js     # Configuração do Next.js
└── package.json       # Dependências e scripts
```

## 🧰 Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **React**: Biblioteca JavaScript para interfaces de usuário
- **Tailwind CSS**: Framework CSS utilitário
- **html2canvas e jsPDF**: Para exportação de PDF

## 🔧 Customização

### Temas

O projeto suporta dois temas (claro e escuro) que podem ser alternados através do botão de tema na interface. Os temas são salvos nas preferências do usuário.

### Dados do Usuário

Os dados do usuário são armazenados localmente no navegador usando `localStorage`. Isso inclui:
- Informações pessoais (nome, cargo, bio)
- Links para redes sociais
- Projetos (imagem, título, descrição, links)

## 📤 Exportação

O portfólio pode ser exportado em formato PDF para compartilhamento:

1. Configure todas as suas informações
2. Clique no botão "Exportar PDF"
3. O arquivo será gerado e baixado automaticamente

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 📬 Contato

Para dúvidas ou sugestões, entre em contato através de [luccagoltzman@gmail.com](mailto:luccagoltzman@gmail.com).

---

Desenvolvido usando React e Next.js.
