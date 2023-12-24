<h1 align="center"> Prueba técnica DevOps </h1>

## Tabla de Contenidos
1. [Requisitos de la prueba](#requisitos-de-la-prueba)
2. [Herramientas usadas](#herramientas-usadas)
3. [Características de esta solución](#características-de-esta-solución)
4. [Instrucciones para replicar el ejercicio](#instrucciones-para-replicar-el-ejercicio)

### Requisitos de la prueba

Para el desarrollo de esta prueba, los requisitos presentados eran los siguientes:

- Servidor de base de datos en docker (no importa el motor que escojas), al construir el docker debe crear una tabla con información dummy cargada desde un archivo SQL
- API Backend (en el lenguaje que quieras) que se conecte a la base de datos y haga un query a la tabla dummy y retorne un mensaje JSON con un contenido con esta, el código debe contener docstrings.
- Frontend con un SPA que carga la información del backend.

Además, la infraestructura debía crearse con alguna herramienta de IaC y se debía implementar de alguna forma CICD y orquestación de contenedores.

Por limitaciones de varias naturalezas, como por ejemplo mi falta de experiencia en el desarrollo de aplicaciones web, algunos de estos requisitos no pudieron ser cumplidos a cabalidad, pero se reforzó en otros aspectos en los que tengo más experiencia. 

## Herramientas usadas

Las herramientas utilizadas para este proyecto fueron:
- Github como repository vendor
- Terraform para IaC
- Github actions para CICD
- Docker Swarm para orquestación de contenedores
- AWS como cloud vendor

## Características de esta solución

La aplicación está construída en NodeJs y consiste en dos microservicios contenerizados (uno para back-end y otro para front-end) y una base de datos en memoria. Esto último dada mi falta de experiencia en la construcción de aplicaciones como lo mencioné anteriormente; sin embargo no es un inconveniente dificil de resolver con la propuesta de infraestructura expuesta en este proyecto.

En la construcción de la infraestructura se optó por normalizar los nombres con una política de nombramiento común para todos los recursos (ya que esto puede ahorrar problemas a futuro, en caso de que se necesite aumentar la cantidad de recursos), y se procuró usar las variables necesarias para evitar el hardcode a toda costa, pudiendo hacer de este código algo muy reutilizable.

Para la implementación de CICD el enfoque que se tomó fue el de construir las imágenes de la aplicación para posteriormente publicarlas en sus respectivos repositorios de docker. Esto ocurrirá cada que haya un nuevo push en la rama main.


## Instrucciones para replicar el ejercicio

Para replicar el ejercicio deben seguirse las siguientes instrucciones:

1. Clonar el repositorio de infraestructura: https://github.com/davidrramz/infra-test-liberty

2. Loggearse con las credenciales de su cloud vendor. En este caso se usó AWS y la forma de pasarle las credenciales es mediante un archivo "credentials" en la raiz de este proyecto. El archivo debe obedecer al siguiente formato: 
```
[default]
 aws_access_key_id = your_access_key_id
 aws_secret_access_key = your_secret_access_key
```

 3. En este caso se optó por almacenar el estado de terraform en un bucket de S3 para evitar conflictos en caso de que alguien más quiera hacer cambios en la infraestructura. Por ende, si desea replicar este proyecto en otra cuenta, deberá comentar temporalmente todo el bloque "backend" en el archivo "provider.tf". Además deberá cambiar el nombre del bucket en el archivo "backend.tf"
 Posteriormente deberá lanzar el comando "terraform init", luego terraform apply, y cuando la infraestructura ya esté generada sí podrá descomentar el bloque de código "backend" en el archivo "provider.tf".
 Después de descomentar ese bloque de código deberá volver a lanzar el comando "terraform init", y tras esto ya estará asociado al estado de terraform almacenado en S3

 4. Tras haber lanzado el comando "terraform apply" las máquinas ya estarán preparadas para funcionar con docker-swarm ya que se incluyeron algunos scripts que nos ahorran todas esas configuraciones manuales.

 5. Ahora solo nos resta la parte de la aplicación. Para desplegar nuestra aplicación deberemos entrar a nuestra máquina "master".
 Una vez dentro, crearemos un archivo "docker-compose.yml" y dentro pondremos el contenido que hay en este repositorio en el archivo "docker-compose.yml" dentro de la carpeta "docker config", y crearemos también un archivo "default.conf" y dentro pondremos el contenido del archivo "default.conf" de este repositorio. Este último archivo contiene la configuración del proxy. 

 6. Ahora debemos crear en cada una de las máquinas un archivo llamado "bicicletas.db". Este enfoque no nos garantizará integridad ni consistencia de la data, pero para fines demostrativos funciona y no es complicado mejorar ese aspecto. 

 7. Una vez creado el archivo "bicicletas.db" (para lo cual se puede usar el comando ```touch bicicletas.db```), volveremos a entrar en la máquina maestra y ejecutaremos el siguiente comando ```docker stack deploy --compose-file docker-compose.yml libertydemo```. Con esto, tendremos una aplicación funcional con una réplica por servicio, y esta estará distribuida entre los distintos nodos del enjambre.
 Si se quiere aumentar el número de réplicas, debe usarse el siguiente comando ```docker service scale exampleapp=3``` para cada app que se quiera escalar.
 Para verificar que los servicios están corriendo, puede hacer uso del comando ```docker service ls```

 8. Una vez hecho esto, podremos acceder a la app con la direccion IP pública de las máquinas y apuntando al puerto 8080.