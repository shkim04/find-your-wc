###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:lts-alpine As development
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
chmod +x /bin/pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch

COPY --chown=node:node . .
RUN pnpm install --offline
RUN pnpm exec prisma generate

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:lts-alpine As build
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
chmod +x /bin/pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node .env .env
COPY --chown=node:node . .

RUN pnpm build
ENV NODE_ENV production

RUN pnpm install --offline --prod

USER node

###################
# PRODUCTION
###################

FROM node:lts-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]