# DeCajonApp

DeCajonApp es una aplicación móvil desarrollada con **React Native**. Esta aplicación está diseñada para gestionar eventos, ensayos y grupos musicales. A continuación, se describen las características principales del proyecto.

## Características

- **Gestión de Eventos**: Permite crear, editar y visualizar eventos próximos.
- **Ensayos Sugeridos**: Muestra una lista de ensayos sugeridos basados en el grupo musical del usuario.
- **Perfil de Usuario**: Los usuarios pueden ver y editar su perfil.
- **Grupos Musicales**: Los usuarios pueden crear y gestionar grupos musicales.
- **Animaciones**: Se han implementado animaciones entre pantallas y botones para mejorar la experiencia del usuario.

## Pantallas

- **Pantalla de Inicio**: Muestra un saludo al usuario y un resumen de los eventos próximos y ensayos sugeridos.
- **Pantalla de Crear Evento**: Permite a los usuarios crear nuevos eventos.
- **Pantalla de Crear Grupo**: Permite a los usuarios crear nuevos grupos musicales.
- **Pantalla de Perfil**: Permite a los usuarios ver y editar su perfil.
- **Pantalla de Login**: Permite a los usuarios iniciar sesión en la aplicación.

## Tecnologías Utilizadas

- **React Native**: Framework principal para el desarrollo de la aplicación móvil.
- **React Navigation**: Utilizado para la navegación entre pantallas.
- **React Native Vector Icons**: Utilizado para los iconos en la aplicación.
- **Animated API**: Utilizado para las animaciones en la aplicación.

## Instalación

Para instalar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/decajonapp.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd decajonapp
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Inicia el servidor Metro:
    ```sh
    npx react-native start
    ```
5. En otra terminal, ejecuta la aplicación en tu dispositivo o emulador:
    ```sh
    npx react-native run-android
    ```
    o
    ```sh
    npx react-native run-ios
    ```



## Comandos para SQL Shell (PostgreSQL)

Para ver las bases de datos existentes:
```sql
\l
```

Para conectar a una base de datos:
```sql
\c <nombre_base_de_datos>
```

Para ejecutar un script:
```sql
\i <ruta_absoluta_al_script>
```

Para ver las tablas existentes en la bd:
```sql
\dt
```

Para ver los detalles de una tabla:
```sql
\d+ <nombre_tabla>
```

Para obtener todos los datos sobre una tabla:
```sql
SELECT * FROM <nombre_tabla>;
```

## Comandos útiles para git

Para ver las branches existentes:
```terminal
git branch
```
(Aparecerá con un `*` la branch en la que estamos situados)

Para crear una branch:
```terminal
git branch <nombre_branch>
```

Para cambiar a una branch:
```terminal
git checkout <nombre_branch>
```

Para cambiar a un branch no existente y crearla en el proceso (dos pasos anteriores juntos):
```terminal
git checkout -b <nombre_branch>
```

Para eliminar una branch:
```terminal
git branch -D <nombre_branch>
```

Para agregar archivos al futuro commit:
```terminal
git add <ruta_relativa_al_archivo>
```

Para agregar todos los archivos que sufrieron cambios (no recomendable):
```terminal
git add .
```

Para realizar commit (guardar cambios):
```terminal
git commit -m "mensaje_descriptivo"
```

Para sincronizar cambios con el repositorio remoto:
```terminal
git push origin <nombre_branch_remota>
```
Si la branch no existe remotamente, este comando la creará en automático.

Para obtener los cambios de la branch remota en la branch local:
```terminal
git pull origin <nombre_branch>
```
