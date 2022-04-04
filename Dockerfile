FROM rupnike/micmac:1.0
    
# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install base dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        build-essential \
        ca-certificates \
        curl \
        git \
        libssl-dev \
        wget \
    && rm -rf /var/lib/apt/lists/*

ENV NVM_DIR /usr/local/nvm 
# or ~/.nvm , depending
ENV NODE_VERSION 10.19.0

ENV API_PATH /etc/opt/apiMicMac
ADD ./apiMicMac $API_PATH


# Install nvm with node and npm
#RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash \
ADD ./Docker/nvm $NVM_DIR 
RUN . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && cd $API_PATH \
    && npm install

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

CMD cd $API_PATH \
    && . $NVM_DIR/nvm.sh \
    && npm start


