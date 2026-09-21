// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const ruta = "https://apigestimed.compraloahora.com.mx/Files";
// const ruta = 'https://localhost:44312//Files'

// for use inside Vue files through this.$axios and this.$api
// (only in Vue Options API form)
export default ({ app }) => {
  app.config.globalProperties.$ruta = ruta;
};

// Here we define a named export
// that we can later use inside .js files:
export { ruta };
