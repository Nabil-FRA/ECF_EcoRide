# 1. Utiliser une image de base Node.js
FROM node:18-alpine

# 2. Définir le répertoire de travail dans le conteneur
WORKDIR /app

# 3. Copier package.json et package-lock.json
COPY package*.json ./

# 4. Installer les dépendances (y compris Vite)
RUN npm install

# 5. Copier le reste du code de l'application
COPY . .

# 6. Exposer le port que Vite utilise par défaut
EXPOSE 5173

# 7. La commande pour démarrer l'application
CMD ["npm", "run", "dev"]