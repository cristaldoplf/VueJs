import {
  shallowMount,
  mount
} from '@vue/test-utils'
import Counter from '@/components/Counter'
import {
  assert
} from '@vue/compiler-core';



describe('Counter Component', () => {

  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  // test('Debe de hacer match con el snapshot ', () => {
  //   const wrapper = shallowMount(Counter)
  //   expect(wrapper.html()).toMatchSnapshot()
  // });
  test('h2 debe de tener el valor por defecto "Counter"', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2Value = wrapper.find('h2').text()
    expect(h2Value).toBe('Counter')

  });

  test('el valor por defecto tiene que ser 100 en el p', () => {
    let value = wrapper.find('[data-testid="counter"]')
    expect(value.text()).toBe("100")
  });

  test('debe de incrementar en 1 el valor del contador', async () => {
    let increaseBtn = wrapper.find('button') //tomamos el primero que aparece en el html
    await increaseBtn.trigger('click') //displaramos el evento del boton
    let value = wrapper.find('[data-testid="counter"]').text()
    expect(value).toBe('101')
  });

  test('debe decrementar en 2 el valor del contador', async () => {
    let decreaseBtn = wrapper.find('[data-testid="decrease"]')
    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')
    let value = wrapper.find('[data-testid="counter"]').text()
    expect(value).toBe('98')
  });

  test('debe de incrementar y decrementar el contador', async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')

    const value = wrapper.find('[data-testid="counter"]').text()

    expect(value).toBe('101')
  });

  test('debe de establecer el valor por defecto', () => {
    console.log(wrapper.props())
    const {start} = wrapper.props()
    const value = wrapper.find('[data-testid="counter"]').text()
    expect(value).toBe(start.toString())
  });

  test('debe de mostrar la prop title', () => {
    const wrapper = shallowMount(Counter, {
      props: {
        title: 'Hola Mundo'
      }
    })
    const value = wrapper.find('h2').text()
    expect(value).toBe('Hola Mundo')
  });
})