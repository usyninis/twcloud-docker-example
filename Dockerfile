FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /src

RUN corepack enable

COPY package.json yarn.lock arui-scripts.config.ts .yarnrc.yml ./

RUN corepack prepare yarn@4.x --activate && yarn set version 4.x

RUN apk --no-cache add curl

RUN yarn install --immutable

COPY ./src ./src

RUN yarn build

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
CMD curl -f http://localhost:3000/health || exit 1

# Expose the port your application listens on (adjust if necessary)
EXPOSE 3000

# Define the command to run your application
CMD ["yarn", "start:in"]
