# Jira open

Para correr localcamente, se necesita la base de datos

```as3
docker-compose up -d
```

* El -d significa __detached__ , es decir, que el proceso no se va a detener al terminar.

* MongoDB URL Local:

```url
mongodb://localhost:27017/entriesdb
```

* Reconstruir los modulos de node y levantar Next

```bash
npm i
npm dev
```
:colombia: :flag-co:
## Configurar las variables de entorno

Renombrar el archivo __env.tempalte__ a __.env__

## LLenar la base de datos con información de pruebas

`https://localhost:3000/api/seed`

## Instalación básica de Material UI

* Instalar Material UI `npm install @mui/material @emotion/react @emotion/styled`, instalar Material icon `npm install @mui/icons-material`.

* Creamos el archivo `src/pages/_document.tsx` usamos el snippet `nextdocument` en la etiquita:

```jsx
<Head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</Head>
```

* En el archivo `pages/_app.tsx` configuramos el cssBasic

```js
export const lightTheme = createTheme({
  palette:{
    mode: 'light',
    background: {
      default: grey[300],
    },
    primary:{
      main: '#4a148c',
    },
    secondary:{
      main: '#19857b',
    },
    error:{
      main: red.A400,
    }
  },
  components:{

  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme} >
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```