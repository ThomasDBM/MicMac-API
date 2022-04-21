# Swagger usage

## Write specification

Use [swagger editor](https://editor.swagger.io/) to update the specification, or update it directly in vscode (the Swagger Viervier extension can help).
Save it as yaml or json file.

## Generate node-js server

### Install **swagger-codegen** using Homebrew

1. Install Homebrew :

```
sudo apt update
sudo apt-get install build-essential
```

Make sure git is installed

- Use Homebrew installation script:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- Add brew to PATH:
```
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

- Check Homebrew installation:
```
brew doctor
```

2. Install swagger-codegen
```
brew install swagger-codegen
```

### Generate node-js server

```
swagger-codegen generate -i swagger.yaml -l nodejs-server
```