import vine from '@vinejs/vine'

/**
 * userId and lang are to get on the current user on the creating process
 */
export const createDocumentValidator = vine.compile(
  vine.object({
    title: vine.string(),
    lang: vine.string().optional(),
    description: vine.string().escape().optional(),
    tags: vine.string().escape().optional(),
    content: vine.string().escape(),
  })
)

export const updateDocumentValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    lang: vine.string().optional(),
    description: vine.string().escape().optional(),
    tags: vine.string().escape().optional(),
    content: vine.string().escape().optional(),
  })
)
