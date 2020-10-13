# Markdown Links

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir, es por eso que se ha creado una librería.

## Descripción

Este proyecto es una libreria de Node.js que permite extraer, validar y generar estadísticas de los links de un archivo o directorio en formato .md.

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

#### `md-links  <path-to-file> [options]`

- ##### `path`: Ruta del archivo or directorio
- ##### `Options`: Recibe dos propiedades, _validate_ y/o _stast_

La librería ofrece la siguiente información:

- Nombre del archivo .md
- Total de links encontrados en el archivo.
- URL, texto del link y ruta donde se encuentra el link.
- Lista de links con url, texto, ruta de donde se encuentra, status y estado del link _ok_ o _fail_.
- Links únicos, rotos y totales.

Para extraer los links sin opción se debe pasar el siguiente _comando_ en consola:

#### `md-links  <path-to-file>`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md

{
  href: 'http://ejemplo.com/2/3/',
  text: 'Link Node',
  userPath: 'C:/User/Laboratoria/ejemplo.md'
}
```
### Opciones

#### `--validate`
Pasar alguno de los siguientes comandos para obtener la opción validate después de la ruta y verificar los links.

###### `md-links  <path-to-file> -v`
###### `md-links  <path-to-file> --validate`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -v
$ md-links ./Laboratoria/ejemplo.md --validate

{
  href: 'http://ejemplo.com/2/3/',
  text: 'Link Node',
  userPath: 'C:/User/Laboratoria/ejemplo.md',
  status: 200,
  ok: true
}
```
#### `--stats`
Pasar alguno de los siguientes comandos para obtener la opción stats después de la ruta y obtener en total de los links y los unicos.

###### `md-links  <path-to-file> -s`
###### `md-links  <path-to-file> --stats`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -s
$ md-links ./Laboratoria/ejemplo.md --stats

Total: 3
Unique: 3
```
#### `--stats y --validate`
Pasa las dos opciones después de la ruta para verificar y obtener el total de los links.

###### `md-links  <path-to-file> -s -v`
###### `md-links  <path-to-file> -v -s`
###### `md-links  <path-to-file> --stats --validate`
###### `md-links  <path-to-file> --validate --stats`

Ejemplo:

```sh
$ md-links ./Laboratoria/ejemplo.md -s -v
$ md-links ./Laboratoria/ejemplo.md -v -s
$ md-links ./Laboratoria/ejemplo.md --stats --validate
$ md-links ./Laboratoria/ejemplo.md --validate --stats

Total: 3
Unique: 3
Broken: 1
```
