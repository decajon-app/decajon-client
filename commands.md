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
git pull origin <nombre_branch_remota>
```
Si la branch no existe remotamente, este comando la creará en automático.

Para obtener los cambios de la branch remota en la branch local:
```terminal
git pull origin <nombre_branch>
```