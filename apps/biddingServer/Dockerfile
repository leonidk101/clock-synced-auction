FROM node:24

WORKDIR /app

# Copy root package files for workspaces
COPY ../../package.json ../../package-lock.json* ./

# Copy only the biddingServer package
COPY . ./packages/biddingServer

# Install dependencies for the workspace
RUN npm install --workspaces

WORKDIR /app/packages/biddingServer

EXPOSE 3000

CMD ["npm", "run", "dev:backend"]