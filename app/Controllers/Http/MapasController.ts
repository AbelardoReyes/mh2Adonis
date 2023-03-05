import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Mapa from 'App/Models/Mapa'
export default class MapasController {
  public async registrarMapa({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true }, [rules.required(), rules.unique({ table: 'mapas', column: 'nombre' })]),
      descripcion: schema.string({ trim: true }, [rules.required()]),
      totalZonas: schema.number([rules.required(), rules.range(1, 10)]),
    })
    const data = await request.validate({
      schema: validationSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'nombre.unique': 'El nombre ya existe',
        'descripcion.required': 'La descripción es requerida',
        'totalZonas.required': 'El total de zonas es requerido',
        'totalZonas.range': 'El total de zonas debe estar entre 1 y 10',
      },
    })

    const mapa = new Mapa()
    mapa.nombre = request.input('nombre')
    mapa.descripcion = request.input('descripcion')
    mapa.totalZonas = request.input('totalZonas')
    await mapa.save()
    const respuesta = {
      status : 200,
      message: 'Mapa registrado',
      data: mapa,
      error: false

    }
    response.send(respuesta)
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
    const validationSchema = schema.create({
      nombre: schema.string({ trim: true }, [rules.required()]),
      descripcion: schema.string({ trim: true }, [rules.required()]),
      totalZonas: schema.number([rules.required(), rules.range(1, 10)]),
    })
    const data = await request.validate({
      schema: validationSchema,
      messages: {
        'nombre.required': 'El nombre es requerido',
        'descripcion.required': 'La descripción es requerida',
        'totalZonas.required': 'El total de zonas es requerido',
        'totalZonas.range': 'El total de zonas debe estar entre 1 y 10',
      },
    })
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
