FROM node:18.18.0

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@9.8.1

################################################################################
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl

RUN echo "alias ll='ls -alF'" >> /etc/bash.bashrc