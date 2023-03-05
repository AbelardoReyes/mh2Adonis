import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Receta from 'App/Models/Receta'

export default class RecetasController {
  public async registrarReceta({ request, response }: HttpContextContract) {
    const receta = new Receta()
    receta.nombre = request.input('nombre')
    receta.duracion = request.input('duracion')
    receta.preparacion = request.input('preparacion')
    receta.chef_id = request.input('chef_id')
    await receta.save()
    const data = {
      status : 200,
      message: 'Receta registrada',
      data: receta,
      error: false

    }
    response.send(data)
  }
  public async obtenerRecetas({ response }: HttpContextContract) {
    const recetas = await Receta.all()
    response.send(recetas)
  }
  public async obtenerReceta({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    response.send(receta)
  }
  public async actualizarReceta({ params, request, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    if (receta) {
      receta.nombre = request.input('nombre')
      receta.duracion = request.input('duracion')
      receta.preparacion = request.input('preparacion')
      receta.chef_id = request.input('chef_id')
      await receta.save()
      response.send(receta)
    } else {
      response.status(404).send({ message: 'Receta no encontrada' })
    }
  }
  public async eliminarReceta({ params, response }: HttpContextContract) {
    const receta = await Receta.find(params.id)
    if (receta) {
      await receta.delete()
      response.send({ message: 'Receta eliminada' })
    } else {
      response.status(404).send({ message: 'Receta no encontrada' })
    }
  }

}
