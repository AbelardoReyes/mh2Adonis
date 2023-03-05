import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredientes from 'App/Models/Ingrediente'

export default class IngredientesController {
  public async registrarIngrediente({ request, response }: HttpContextContract) {
    const ingrediente = new Ingredientes()
    ingrediente.nombre = request.input('nombre')
    ingrediente.tipo = request.input('tipo')
    ingrediente.cantidad = request.input('cantidad')
    await ingrediente.save()
    const data = {
      status : 200,
      message: 'Ingrediente registrado',
      data: ingrediente,
      error: false

    }
    response.send(data)
  }
  public async obtenerIngredientes({ response }: HttpContextContract) {
    const ingredientes = await Ingredientes.all()
    response.send(ingredientes)
  }
  public async obtenerIngrediente({ params, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    response.send(ingrediente)
  }
  public async actualizarIngrediente({ params, request, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    if (ingrediente) {
      ingrediente.nombre = request.input('nombre')
      ingrediente.tipo = request.input('tipo')
      ingrediente.cantidad = request.input('cantidad')
      await ingrediente.save()
      response.send(ingrediente)
    } else {
      response.status(404).send({ message: 'Ingrediente no encontrado' })
    }
  }
  public async eliminarIngrediente({ params, response }: HttpContextContract) {
    const ingrediente = await Ingredientes.find(params.id)
    if (ingrediente) {
      await ingrediente.delete()
      response.send({ message: 'Ingrediente eliminado' })
    } else {
      response.status(404).send({ message: 'Ingrediente no encontrado' })
    }
  }


}
