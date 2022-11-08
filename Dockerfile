FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node yarn.lock .

RUN yarn install --frozen-lockfile --non-interactive

COPY --chown=node:node tsconfig.json .

COPY --chown=node:node . .

RUN yarn build

USER node

FROM node:18-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]