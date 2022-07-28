// template:`
// <h1>Hola Mundo</h1>
// <p>{{ !true ? 'Activo' : 'Inactivo' }}</p>
// `
const app = Vue.createApp({
  data() {
    return {
      message: 'Hola Mundo',
      quote: "I'm Batman",
      author: 'Bruce Wayne'
    }
  },
  methods: {
    changeQuote(event) { //le ponemos el evento
      console.log('Hola Mundo', event)
      this.author = 'Pablo Cristaldo'
      this.capitalize()
    },
    capitalize() {
      this.quote = this.quote.toUpperCase()
    }
  }

})
app.mount('#myApp')