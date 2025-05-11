# ProvaFullStackAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

# Versões e compatibilidades Angular
Portal Angular `https://angular.dev/reference/versions`

# Instalando e configurando NVM

## Instale o NVM no projeto
[x] - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

### Configure o Exporte do NVM
[x] - export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"

### Defina a versao do NVM
[x] - nvm install 18.19.1

### Use a versao do node instalada
[x] - nvm use node 18.19.1

# Instale o Angular CLI
Comando verficar versão `ng --version`
Versao na qual o projeto esta rodando localhost `Node.js version v18.19.1 detected`
Comando `npm i @angular/cli@18.0.1`

# Instale o TypeScript CLI
Comando verficar versão  `tsc --version`
Versao na qual o projeto esta rodando localhost `Version 5.4.2` 
Comando `npm i typescript@5.4.2`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

ng serve --configuration development

ng serve --configuration production

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Build Production
Run `ng build --configuration production` to build the project. The build artifacts will be stored in the `dist/` directory.
