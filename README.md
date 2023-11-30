<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest Logo" /></a>
</p>

# Requisitos 
* Cuenta de GitHub


# Tarea sobre WebHooks

## Parte 1 - Aplicación de Nest

1. Crear un proyecto de NestJS
```
nest new webhooks
```

2. Eliminar ```app.controller.ts``` y ```app.service.ts```, actualizar el ```app.module.ts``` adecuadamente para evitar los errores.

3. Crear (REST API) con un módulo, servicio y controlador llamado github, sin pruebas unitarias. Seleccionar "**NO**" cuando pregunte sobre CRUD.
```
nest g resource github --no-spec
```

4. Crear el manejador de evento para peticiones ```POST``` que vendrán desde GitHub (Dentro de ```github.controller.ts```)

```
@Post( '/' )
webhookHandler(
    @Headers( 'x-github-event' ) githubEvent: any,
    @Body() body: any,
) {

  console.log({ githubEvent });

  return { githubEvent };
}
```
* Recuerden realizar las importaciones de los decoradores que vienen de @nestjs/common

5. Levantemos el servidor ```npm run start:dev```
  
6. Abramos POSTMAN y enviemos una petición ```POST``` a la siguiente URL y añadan un custom HEADER llamado ```x-github-event``` con el valor ```ping```
```
POST http://localhost:3000/github

Headers: 
  x-github-event: ping
```
* Deberíamos ver en la respuesta y en consola, el evento que nos envía GitHub



## Parte 2 - Subida a Github

1. Crear un repositorio en GitHub llamado ```webhooks``` en su cuenta
2. Usar los comandos que les da GitHub para subir el repositorio

Ejemplo:
```
git add .
git commit -m "first commit"
git remote add origin https://github.xxxx.xxx.xxxx.xxx.xxxx
git branch -M main
git push -u origin main
```

3. Confimar que nuestro repositorio se subiera a GitHub


### Parte 3 - Configurar SMEE Proxy
Necesario para poder desarrollar y probar webhooks.

Alternativas:
* Smee - Recomendado (Gratuito)
* Ngrok - Recomendado pero expone IP Pública en tier gratuito
* LocalTunnel
* Serveo

**NO USAR ** - VSCode Ports, porque no se puede autorizar en GitHub.

1. Ir a [https://smee.io/](https://smee.io/) 
2. Click en ```"Start a new channel"```
3. Instalar CLI de SMEE como Administrador (Linux, Mac como **sudo**, Windows correr consola como **admin**)
```
npm install --global smee-client
```
4. Copiar la URL que nos da SMEE

Información adicional:
Esto está en la documentación [oficial de GitHub sobre WebHooks](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries#setup)

5. Ejecutar el siguiente comando en la terminal
```
smee --url <El WEBHOOK_PROXY_URL que les da SMEE> --path /github --port 3000
```
* Reemplazar WEBHOOK_PROXY_URL por la URL que nos da SMEE
* Reemplazar el puerto 3000 en caso de estar usando otro puerto
* /github es nuestro ENDPOINT que creamos en la parte 1

6. Probar que todo funcione enviando una petición ```POST``` desde POSTMAN a la URL que nos da SMEE.
   **(Revisar el sitio web de SMEE y la consola de la aplicación de NestJS, deberían de ver el mensaje enviado por los headers) **
```
POST https://smee.io/XXXXXXXXX

Headers: 
  x-github-event: ping-smee
```

Importante: 
* No cancelen los procedimientos de SMEE hasta que terminen el ejercicio.


### Parte 4 - Configurar WebHooks en GitHub

1. Ir a la configuración de nuestro repositorio y seleccionar la opción de WebHooks
```
Settings > WebHooks
```
2. Click en "Add WebHook"
3. Payload URL: Copiar la URL que nos da SMEE (que también es el mismo URL del sitio web si ya recibieron un mensaje)
4. En el Content Type seleccionar la opción de ```application/json```
5. El Secret lo dejamos en blanco (No lo ocupamos para este ejercicio)
6. En la parte de ```"Which events would you like to trigger this webhook?"``` seleccionar la opción de "Let me select individual events."
7. Seleccionar la opción de ```"issues"``` y ```"stars"```
8. Revisar que al final, tengamos el check de ```"Active"```
9. Click en ```"Add WebHook"```
10. Unos segundos después, deberían de ver en la consola, que Github mandó un ```ping``` a nuestro ENDPOINT ```(ver consola de Nest)```
11. También pueden probar colocar una estrella en su repositorio y/o crear un issue, y esto debería de disparar el webhook


### Felicidades, implementaron su primer WebHook con NestJS y GitHub.

Pueden revisar el código fuente de este repositorio para ver el código completo e implementar los handlers de los eventos de "issues" y "stars".


