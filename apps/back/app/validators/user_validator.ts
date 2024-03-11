import vine from "@vinejs/vine";

/**
 * TODO: returns true for unique contraint on username and email if the field is already taken but by the same user
 */
export const updateUserValidator = vine.compile(
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
      .escape()
      .optional(),
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
      })
      .optional(),
    /**
     * password required for editing account
     */
    password: vine
      .string()
      .minLength(6),
    newPassword: vine
      .string()
      .minLength(6)
      .confirmed()
      .optional(),
    lang: vine.string().optional(),
  })
)
