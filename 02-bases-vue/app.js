// template:`
// <h1>Hola Mundo</h1>
// <p>{{ !true ? 'Activo' : 'Inactivo' }}</p>
// `
const app = Vue.createApp({
  data(){
    return {
      message: 'Hola Mundo',
      quote: "I'm Batman",
      author: 'Bruce Wayne'
    }
  }
})
app.mount('#myApp')