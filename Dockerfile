# ================== Stage 1: Dependencies ==================
FROM node:20-alpine AS deps

WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Install toutes les dépendances (incluant dev pour le build)
RUN npm ci

# ================== Stage 2: Builder ==================
FROM node:20-alpine AS builder

WORKDIR /app

# Copie node_modules depuis deps
COPY --from=deps /app/node_modules ./node_modules

# Copie les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Copie le code source
COPY src ./src

# Build l'application
RUN npm run build

# Supprime les devDependencies
RUN npm prune --production

# ================== Stage 3: Runner ==================
FROM node:20-alpine AS runner

WORKDIR /app

# Copie uniquement les fichiers nécessaires en production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Copie les fichiers TypeORM (pour les migrations si besoin)
COPY --from=builder /app/src/database ./src/database

# Crée un user non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

# Expose le port (sera override par la variable PORT de Koyeb)
EXPOSE 4000

# Healthcheck optionnel
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Commande de démarrage
CMD ["node", "dist/main.js"]

