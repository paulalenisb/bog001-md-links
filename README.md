# Markdown Links

## Descripción

Libreria de Node.js que permite extraer, validar y generar estadísticas de los links de un archivo o directorio en formato .md.

## Instalación

Para instalar la librería se debe correr el siguiente comando:

- Desde consola

```sh
npm install @paulalenisb/md-links@0.1.0
```

- Desde package.json:

```sh
"@paulalenisb/md-links": "0.1.0"
```

## Uso de la librería

La librería ofrece dos opciones o argumentos para generar la validación y estadísticas de los links.

####`npx mdLinks  <path-to-file> [options]`

- ##### `path`: Ruta del archivo or directorio
- ##### `Options`: Recibe dos propiedades, _validate_ y/o _stast_

La librería ofrece la siguiente información:

- Nombre del archivo .md
- Total de links encontrados en el archivo.
- URL, texto del link y ruta donde se encuentra el link.
- Lista de links con url, texto, ruta de donde se encuentra, status y estado del link _ok_ o _fail_.
- Links únicos, rotos y totales.

Para extraer los links sin opción se debe pasar el siguiente _comando_ en consola:

####`npx mdLinks  <path-to-file>`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md

./Laboratoria/ejemplo.md http://ejemplo.com/2/3/ Link Node
./Laboratoria/ejemplo.md https://prueba.net/algun-doc.html algún doc
./Laboratoria/ejemplo.md http://google.com/ Google
```
### Opciones

#### `--validate`
Pasa la opción validate después de la ruta para verificar los links.

######`mdLinks  <path-to-file> -v`
######`mdLinks  <path-to-file> --validate`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -v
$ md-links ./Laboratoria/ejemplo.md --validate

./Laboratoria/ejemplo.md http://ejemplo.com/2/3/ Link Node ok 200
./Laboratoria/ejemplo.md https://prueba.net/algun-doc.html algún doc fail 404
./Laboratoria/ejemplo.md http://google.com/ Google ok 200
```
#### `--stats`
Pasa la opción stats después de la ruta para obtener en total de los links y los unicos.

######`mdLinks  <path-to-file> -s`
######`mdLinks  <path-to-file> --stats`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -s
$ md-links ./Laboratoria/ejemplo.md --stats

Total: 3
Unique: 3
```
#### `--stats y --validate`
Pasa las dos opciones después de la ruta para verificar y obtener el total de los links.

######`mdLinks  <path-to-file> -s -v`
######`mdLinks  <path-to-file> -v -s`
######`mdLinks  <path-to-file> --stats --validate`
######`mdLinks  <path-to-file> --validate --stats`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -s
$ md-links ./Laboratoria/ejemplo.md --stats

Total: 3
Unique: 3
Broken: 1
```
