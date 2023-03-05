import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Objetos from 'App/Models/Objeto'
export default class ObjetosController {
  public async registrarObjeto({ request, response }: HttpContextContract) {
    const objeto = new Objetos()
    objeto.nombre = request.input('nombre')
    objeto.descripcion = request.input('descripcion')
    objeto.rareza = request.input('rareza')
    objeto.valor = request.input('valor')
    objeto.limiteBolsa = request.input('limiteBolsa')

    await objeto.save()
    const data = {
      status : 200,
      message: 'Objeto registrado',
      data: objeto,
      error: false

    }
    response.send(data)
  }
  public async obtenerObjetos({ response }: HttpContextContract) {
    const objetos = await Objetos.all()
    response.send(objetos)
  }
  public async obtenerObjeto({ params, response }: HttpContextContract) {
    const objeto = await Objetos.find(params.id)
    response.send(objeto)
  }
  public async actualizarObjeto({ params, request, response }: HttpContextContract) {
    const objeto = await Objetos.find(params.id)
    if (objeto) {
      objeto.nombre = request.input('nombre')
      objeto.descripcion = request.input('descripcion')
      objeto.rareza = request.input('rareza')
      objeto.valor = request.input('valor')
      objeto.limiteBolsa = request.input('limiteBolsa')
      await objeto.save()
      response.send(objeto)
    } else {
      response.status(404).send({ message: 'Objeto no encontrado' })
    }
  }
  public async eliminarObjeto({ params, response }: HttpContextContract) {
    const objeto = await Objetos.find(params.id)
    if (objeto) {
      await objeto.delete()
      response.send({ message: 'Objeto eliminado' })
    } else {
      response.status(404).send({ message: 'Objeto no encontrado' })
    }
  }

}
