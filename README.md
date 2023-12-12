# Como ejecutar el proyecto #

/************* VARIABLES DE ENTORNO EN POSTMAN *******************/

  host = http://localhost:3000
  version = api/v1
  token = (este es el que se obtiene con el Login)


1. Primer paso - Instalar y correr el servidor
- Renombrar el archivo ".env.template" a ".env"
- Para instalar el servidor, se puede hacer de dos formas, corriendo el "docker compose up"
- o instalando las dependencias de NodeJS con "npm install" y para correrlo "npm run start:dev".


2. Segundo paso - Ejecutar la semilla
- En la carpeta raiz, viene un json de postman donde vienen los endpoints, una ves levantado el servidor en la
- carpeta de "seed" viene un unico endpoint, ejecutar ese endpoint para que agregue el servidor dos usuarios,
- Uno es usuario normal y el otro es administrador. 


3. Tercer paso - Ingresar ya sea desde el front o desde el back provando el API
- En postman viene una carpeta llamada "auth" donde vendran dos endpoints, uno para iniciar sesion y obtener tu token de acceso
- y el otro para verificar el estado de tu sesion.
- Las cuentas son las siguientes: 
    email: user@gmail.com            email: admin@gmail.com
    pass: DevPass#                   pass: DevPass#


4. Cuarto paso - Correr el Frontend
- Entrar a la carpeta de "front" y ejecutar "npm install" para instalar todas las dependencias, una ves instaladas
- Correr el comando "ng serve" para levantar la pagina web, y ahi mismo con los usuarios anteriormente mencionados
- iniciar sesion.


# Tecnologias utilizadas #
- Backend: NestJS | MongoDB | Mongoose
- Frontend: Angular v16 | Lazy Loading | Atomic Design | Standalone Components (unos cuantos) | SCSS