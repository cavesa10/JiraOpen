# Jira open

## Instalación básica de Material UI

- Instalar Material UI `npm install @mui/material @emotion/react @emotion/styled`, instalar Material icon `npm install @mui/icons-material`.

- Creamos el archivo `src/pages/_document.tsx` usamos el snippet `nextdocument` en la etiquita:

```js
<Head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
</Head>
```

- En el archivo `pages/_app.tsx` configuramos el cssBasic

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
