import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class TokenHeader extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'email' })
  public email: string

  @column({ columnName:'password' ,serializeAs: null })
  public password: string

  @column({ columnName: 'remember_me_token'})
  public rememberMeToken: string | null

  @column({ columnName: 'role_id'})
  public role_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  role: any

  @beforeSave()
  public static async hashPassword (tokenHeader: TokenHeader) {
    if (tokenHeader.$dirty.password) {
      tokenHeader.password = await Hash.make(tokenHeader.password)
    }
  }
}
