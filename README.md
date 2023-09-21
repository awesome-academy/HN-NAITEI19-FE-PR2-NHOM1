# HN-NAITEI19-FE-PR2-NHOM1

## Requirement

- Docker >= 20.10
- Docker compose plugin
- NodeJS 18

## How to use it

Run the following command in the root directory of project:

```bash
make devup
```

Install dependencies:

```bash
make devinstall
```

### Start server front-end and json-server separately

Run this command to start json-server

```bash
make devserver
```

And finally to start the front-end server

```bash
make devclient
```

### Start project with front-end server console only

Start the app in the development mode:

```bash
make devrun
```

The app will run by default at `localhost:3000`, and you can custom the `localhost` in the `.env` file in the root directory. Don't worry the json-server already running along with the front-end server.

Stop the application:

```bash
make devdown
```

Happy coding ><
