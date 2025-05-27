# start with official ruby docker image as base
FROM ruby:3.4.4@sha256:4cf7641c6354e8f407afd2dbb0ab1968cd44ac443bd833c16bdf55cc074a3eb8
# previous version ruby 3.1.2

# set working directory within container
WORKDIR /usr/src/app

# pull in ruby (jekyll) and python (cite process) package info
COPY Gemfile Gemfile.lock _cite/requirements.txt ./

# install ruby packages
RUN VERSION=$(grep -A 1 'BUNDLED WITH' Gemfile.lock | tail -n 1 | xargs); \
    gem install bundler --version ${VERSION} && \
    bundle _${VERSION}_ install

# install Python and venv tools
RUN apt update && apt install -y python3 python3-venv python3-pip

# create and activate venv, then install requirements (easier package management)
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install --no-cache-dir --requirement ./requirements.txt

# set the virtual env as default
ENV PATH="/opt/venv/bin:$PATH"
RUN apt update && apt install -y python3 python3-pip

# install python package for listening for file changes
RUN pip install "watchdog[watchmedo]==3.0.0"

# ports used by jekyll
EXPOSE 4000
EXPOSE 35729

# run jekyll and cite process
COPY .docker/entrypoint.sh /var
CMD [ "/var/entrypoint.sh" ]
