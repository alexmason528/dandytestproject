# README

Documentation of steps needed to get the application up and running with docker setup.

### How do I get set up?

#### Clone the project

- Clone this repository

#### Set up environment variables

- Copy files to `env` so that the application can use it:

  ```
  cp .env.example .env
  ```

- Populate it with your own variables as needed.
  **Never include `.env` in the source code! It may contain secrets such as API keys.**

#### Docker configuration files and start script

The projects contains `dockerfile` Can be found in `docker` folder

- Copy docker files to `frontend` so that the docker can build containers.
  ```
  cp docker/dockerfile ./
  ```

#### Install Docker

https://docs.docker.com/install/linux/docker-ce/ubuntu/

#### Install Docker-compose

https://docs.docker.com/compose/install/

#### Start server

- Build docker `docker-compose build`
- Install node modules `docker-compose run frontend yarn`
- Run docker `docker-compose up`
