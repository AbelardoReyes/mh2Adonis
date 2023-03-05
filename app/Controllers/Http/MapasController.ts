import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mapa from 'App/Models/Mapa'
export default class MapasController {
  public async registrarMapa({ request, response }: HttpContextContract) {
    const mapa = new Mapa()
    mapa.nombre = request.input('nombre')
    mapa.descripcion = request.input('descripcion')
    mapa.totalZonas = request.input('totalZonas')
    await mapa.save()
    const data = {
      status : 200,
      message: 'Mapa registrado',
      data: mapa,
      error: false

    }
    response.send(data)
  }
  public async obtenerMapas({ response }: HttpContextContract) {
    const mapas = await Mapa.all()
    response.send(mapas)
  }
  public async obtenerMapa({ params, response }: HttpContextContract) {
    const mapa = await Mapa.find(params.id)
    response.send(mapa)
  }
  public async actualizarMapa({ params, request, response }: HttpContextContract) {
    const mapa = await Mapa.find(params.id)
    if (mapa) {
      mapa.nombre = request.input('nombre')
      mapa.descripcion = request.input('descripcion')
      mapa.totalZonas = request.input('totalZonas')
      await mapa.save()
      response.send(mapa)
    } else {
      response.status(404).send({ message: 'Mapa no encontrado' })
    }
  }
  public async eliminarMapa({ params, response }: HttpContextContract) {
    const mapa = await Mapa.find(params.id)
    if (mapa) {
      await mapa.delete()
      response.send({ message: 'Mapa eliminado' })
    } else {
      response.status(404).send({ message: 'Mapa no encontrado' })
    }
  }


}
