import vine from '@vinejs/vine'

export const createBadgeValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    name: vine.string().escape(),
    description: vine.string().escape(),
    imgUrl: vine.string().url(),
  })
)

export const updateBadgeValidator = vine.compile(
  vine.object({
    name: vine.string().escape().optional(),
    description: vine.string().escape().optional(),
    imgUrl: vine.string().url().optional(),
  })
)
