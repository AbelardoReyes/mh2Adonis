import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chef from 'App/Models/Chef'

export default class ChefsController {
    public async registrarChef({ request, response }: HttpContextContract) {
        const chef = new Chef()
        chef.nombre = request.input('nombre')
        chef.ap_paterno = request.input('ap_paterno')
        chef.ap_materno = request.input('ap_materno')
        chef.nacionalidad = request.input('nacionalidad')
        chef.edad = request.input('edad')
        await chef.save()
        const data = {
            status: 200,
            message: 'Chef registrado',
            data: chef,
            error: false
        }
        response.send(data)
    }
    public async obtenerChefs({ response }: HttpContextContract) {
        const chefs = await Chef.all()
        response.send(chefs)
    }
    public async obtenerChef({ params, response }: HttpContextContract) {
        const chef = await Chef.find(params.id)
        response.send(chef)
    }
    public async actualizarChef({ params, request, response }: HttpContextContract) {
        const chef = await Chef.find(params.id)
        if (chef) {
            chef.nombre = request.input('nombre')
            chef.ap_paterno = request.input('ap_paterno')
            chef.ap_materno = request.input('ap_materno')
            chef.nacionalidad = request.input('nacionalidad')
            chef.edad = request.input('edad')
            await chef.save()
            response.send(chef)
        } else {
            response.status(404).send({ message: 'Chef no encontrado' })
        }
    }
    public async eliminarChef({ params, response }: HttpContextContract) {
        const chef = await Chef.find(params.id)
        if (chef) {
            await chef.delete()
            response.send({ message: 'Chef eliminado' })
        } else {
            response.status(404).send({ message: 'Chef no encontrado' })
        }
    }


}
