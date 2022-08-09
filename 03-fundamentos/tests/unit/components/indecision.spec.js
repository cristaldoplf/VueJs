import {shallowMount} from '@vue/test-utils'
import Indecision from '@/components/Indecision'
import {assert} from '@vue/compiler-core';

describe('Indecision Component', () => {

  let wrapper
  let clgSpy

  //mock del fetch api
  global.fetch = jest.fn(()=> Promise.resolve({
    json: () => Promise.resolve({
      'answer':'yes',
      'forced':false,
      'image': 'https://yesno.wtf/assets/yes/2.gif'
    })
  }))

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    clgSpy = jest.spyOn(console, 'log')
    //espiamos el objeto console y el metodo log de ese objeto

    jest.clearAllMocks()
  })

  test('Debe de hacer match con el snapshot ', () => {
    expect(wrapper.html()).toMatchSnapshot()
  });

  test('Escribir en el input no debe de disparar nada(console.log)', async() => {
    const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer')
    //este getAnswerSpy no tiene que haber sido llamado ya que no puse un "?"
    
    const input = wrapper.find('input')
    await input.setValue('Hola Mundo')

    expect(clgSpy).toHaveBeenCalledTimes(1)
    //checkea que fue llamado 1 veces
    expect(getAnswerSpy).toHaveBeenCalledTimes(0)
    expect(getAnswerSpy).not.toHaveBeenCalled()
  });

  test('escribir el simbolo de "?" debe de disparar el getAnswer ', async() => {
    const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer')
    //este getAnswerSpy no tiene que haber sido llamado ya que no puse un "?"
    
    const input = wrapper.find('input')
    await input.setValue('Hola Mundo?')

    expect(getAnswerSpy).toHaveBeenCalledTimes(1)
  });

  test('pruebas en getAnswer', async() => {
    await wrapper.vm.getAnswer()
    //probamos el fetch y en los proximos logs podemos ver lo que trae para testearlo.
    console.log(wrapper.vm.img)
    console.log(wrapper.vm.answer)

    const img = wrapper.find('img')
    expect(img.exists()).toBeTruthy()

    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect(wrapper.vm.answer).toBe('Si')

  });

  test('pruebas de getAnswer - Fallo en el API', async() => {
    
    fetch.mockImplementationOnce(()=> Promise.reject('Api es down'))

    await wrapper.vm.getAnswer()
    
    const img = wrapper.find('img')

    expect(img.exists()).toBeFalsy()
    expect(wrapper.vm.answer).toBe('No se pudo cargar del API')

  });
})