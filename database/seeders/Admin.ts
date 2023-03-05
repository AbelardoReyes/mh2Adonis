import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
export default class extends BaseSeeder {
  public async run () {
    await User.create(
      {
        name: 'admin',
        password: '123456789',
        email: 'sebastian.rmz.manuel@outlook.com',
        ap_materno: 'admin',
        ap_paterno: 'admin',
        telefono: '8712117940',
        role_id: 1,
      },
    )
  }

}
