FROM node:24-slim
WORKDIR /app
COPY rig /app/rig
RUN cd /app/rig && npm install --no-audit --no-fund
COPY server.mjs /app/server.mjs
ENV DATA_DIR=/tmp/data RIG_DIR=/app/rig PORT=8787
EXPOSE 8787
CMD ["node", "/app/server.mjs"]
