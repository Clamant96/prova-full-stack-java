# Desafio Full Stack Tokio

## Requisitos da API
Desenvolver uma API REST completa utilizando Spring Boot, JPA e PostgreSQL, consumindo um serviço externo de CEP. Além disso, desenvolver um frontend que consuma essa API.

Requisitos da API

Gerenciamento de Usuários e Endereços

Criar um CRUD completo de usuários e um CRUD de endereços.

1.      Um usuário pode ter múltiplos endereços. 

2.      O relacionamento deve ser unidirecional ou bidirecional, conforme necessidade. 

3.      O usuário deve ter os campos: ID, Nome, Email (único), Senha (criptografada). 

4.      O endereço deve conter: ID, Logradouro, Número, Complemento, Bairro, Cidade, Estado, CEP, Usuário associado. 

Autenticação e Autorização

1.      Implementar Spring Security e autenticação via JWT. 

2.      Criar níveis de acesso: 

3.      Admin: Pode gerenciar todos os usuários. 

4.      Usuário comum: Só pode acessar e modificar seus próprios dados. 

Consumo de Serviço Externo

1.      Implementar consumo do serviço de CEP: 

1.      sh $ curl  https://viacep.com.br/ws/{cep}/json/ 

O CEP informado deve ser validado e armazenado corretamente no banco de dados.

2.      Paginação e Ordenação 

3.      Os endpoints de listagem devem suportar paginação e ordenar por nome, email e data de criação. 

Tratamento de Exceções

1.      Implementar Global Exception Handler para capturar erros de validação, autenticação e requisições inválidas. 

Testes Unitários e de Integração

2.      Criar testes unitários para serviços e repositórios usando JUnit e Mockito. 

3.      Criar testes de integração para os endpoints principais. 


## Requisitos do Frontend

Desenvolver um frontend SPA (Single Page Application) utilizando uma das tecnologias abaixo:

Angular

Thymeleaf

JSP

O frontend deve conter:
lo
✅ Tela de Login e Registro 

✅ Dashboard com listagem de usuários e endereços

✅ Formulários para cadastro e edição

✅ Consumo da API REST

✅ Feedback visual (toasts, mensagens de erro, loaders)


## Extras (Opcional, mas diferencial para sênior)

Deploy em Servidor de Aplicação

1.      O backend deve ser empacotado como um WAR e rodar em um servidor de aplicação, como Tomcat, WildFly ou Payara.

2.      Alternativamente, pode ser feito um deploy no Heroku ou AWS Elastic Beanstalk.

Documentação da API

1.      Utilizar Swagger (SpringDoc OpenAPI) para documentar os endpoints.

Entrega Final

2.      Código fonte no GitHub ou GitLab.

3.      Instruções de instalação e execução no README.md.

4.      Demonstração em vídeo (opcional) mostrando as principais funcionalidades.