# DevOps on sudoku project

## Commands

- Unit tests command: `npm run test`
- E2E tests command: `npm run cypress:open`
- Linting command: `npm run lint`

## Installation

```bash
sudo snap install microk8s --classic --channel=latest/stable
microk8s.enable dns
microk8s.enable ingress
microk8s.start
docker login gitlab.insa-rennes.fr:5050
```
Then, with the next command, MicroK8s will create a generic secret named "secret-insa" using .dockerconfigjson file, located at ${HOME}/.docker/config.json , with kubernetes.io/dockerconfigjson type, with namespace "game" :

```bash
microk8s.kubectl create secret generic secret-insa --from-file=.dockerconfigjson=${HOME}/.docker/config.json  --type=kubernetes.io/dockerconfigjson --namespace=game
```

In order to verify that the command has been successful, you can check that the config.json file located at ${HOME}/.docker/config.json contains your username:password encoded in base64 (use ```echo -n 'username:password' | base64```) as shown below:

```json
{
    "auths": {
        "your.docker.registry": {
            "auth": "<your hash here>"
        }
    }
}
```

## Deployment

In order to deploy the application, we need to use the deployment file called k8s-deployment.yml

```bash
microk8s.kubectl apply -f k8s-deployment.yml
```


Now you can access the deployed application at `http://127.0.0.1/`.


# Old README
## Layout

`game/game-backend` is backend of the application. It contains th Java code of the server.
It is in charge with providing a REST API.

`game/game-frontend` is the Angular front-end of the application.

`game-doc` is the folder that will contain your reports (and its pictures) and the user documentation.

Launch back-end: in /game-backend => `mvn spring-boot:run`