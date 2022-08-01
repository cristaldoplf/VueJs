<template>
  <h2>{{ customTitle }} <!-- {{ start }} --></h2>
  <p>{{ counter }}<sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">{{counter}}</p>
  <div>
    <button @click="increase">+1</button>
    <button data-testid="decrease" @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator(value) {
        return value > 100;
      },
    },
  },
  // name: "patito",
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    getSquareValue() {
      return this.counter * this.counter;
    },
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  computed: {
    squareCounter() {
      console.log("computed squareCounter");
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title || "Counter";
    },
  },
};
</script>

<style>
button {
  background-color: #64bb87;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(127, 255, 212, 0.593);
  transition: 0.3s ease-in-out;
}
</style>
