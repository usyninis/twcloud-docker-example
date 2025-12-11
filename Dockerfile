FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /src

RUN corepack enable

COPY package.json yarn.lock arui-scripts.config.ts .yarnrc.yml ./

# апгрейд до 4‑й
RUN corepack prepare yarn@4.x --activate && yarn set version 4.x

RUN yarn install --immutable

COPY ./src ./src

RUN yarn build
# Install Yarn dependencies
# Using --frozen-lockfile ensures the exact versions from yarn.lock are installed

# Copy the rest of your application code
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
CMD curl -f http://localhost/health || exit 1

# Expose the port your application listens on (adjust if necessary)
EXPOSE 8080

# Define the command to run your application
CMD ["yarn", "start:in"]
