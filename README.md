# Kyros Password Recovery

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

1. Fijar las variables en entorno en el fichero .env

2. En vue.config.js, descomentar la linea: 
  config.publicPath = process.env.VUE_APP_BASE

3. Compilar el proyecto:

```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Mover ficheros
scp ruta3.kml root@192.168.28.136:/home/kyros/www/images/kml

### demos
scp -r dist/* root@192.168.28.245:/var/www/html/kmlview/
scp -r dist/* root@192.168.28.246:/var/www/html/kmlview/

