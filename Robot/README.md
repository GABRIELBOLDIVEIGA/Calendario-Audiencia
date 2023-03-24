# Tarefa automatizada

* Utilizando a biblioteca selenium-webdriver conseguimos fazer o login automatizado

```
npm install selenium-webdriver
```
https://www.selenium.dev/

## Para rodar o projeto de forma autatizada siga os seguintes passos:

* Na pasta src abra o terminal e digite
```
npm run build
```
* Instale o serve
```
npm install -g serve
```

* Crie um nova pasta no diretorio de sua preferencia e coloque a pasta build e a pasta Robot dentro dessa nova pasta

* Crie um arquivo 
```
run-all.bat
``` 
* Com o seguintes comandos
```
@echo off
start cmd /k "npx serve -s build"
timeout /t 3 /nobreak
start cmd /k "cd Robot && node Robot.js"
```
* Um novo terminal deve abrir e rodar um server em http://localhost:3000/

* Apos 3 segundos outro terminal ira iniciar o selenium-webdriver


## Possíveis erros

* Aporta padrão deve ser a http://localhost:3000/, outras portas serão bloqueasdas pela API.

* Caso o selenium-webdriver inicie antes do serve local, tente aumentar o tempo no arquivo run-all.bat, alinha de enterece é: timeout /t 3 /nobreak



