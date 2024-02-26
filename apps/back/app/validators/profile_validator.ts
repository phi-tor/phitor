import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
  vine.object({
    fullname: vine.string().escape().optional(),
    bio: vine.string().escape().optional(),
    avatarUrl: vine.string().url().optional(),  // temp
  })
)
