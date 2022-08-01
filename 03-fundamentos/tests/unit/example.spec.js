////

//test suite
describe('Example Component', () => {

  //test
  test('Debe de ser mayor a 10', () => {
    //Arreglar
    let value = 9; //sujeto de pruebas

    //Estimulo
    value = value + 2;

    //Observar el resultado
    expect(value).toBeGreaterThan(10)

  })
})