import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string()
  })
)

/**
 * will be changed later
 */
export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .regex(new RegExp('^[a-zA-Z0-9]+$'))
      .unique(async (db, value) => {
        // if a user with the same username doesn't exist, pass
        const user = await db
          .from('users')
          .where('username', value)
          .first()
        return !user
      })
      .escape(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        // if a user with the same email doesn't exist, pass
        const user = await db
          .from('users')
          .where('email', value)
          .first()
        return !user
      }),
    password: vine
      .string()
      .minLength(6)
      .confirmed(),
    lang: vine.string(),
    terms: vine.boolean(),
  })
)
