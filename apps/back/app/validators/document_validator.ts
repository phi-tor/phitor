import vine from '@vinejs/vine'

/**
 * userId and lang are to get on the current user on the creating process
 */
export const createDocumentValidator = vine.compile(
  vine.object({
    title: vine.string(),
    lang: vine.string().nullable(),
    description: vine.string().escape().nullable(),
    tags: vine.string().escape().nullable(),
    content: vine.string().escape(),
  })
)

export const updateDocumentValidator = vine.compile(
  vine.object({
    title: vine.string().nullable(),
    lang: vine.string().nullable(),
    description: vine.string().escape().nullable(),
    tags: vine.string().escape().nullable(),
    content: vine.string().escape().nullable(),
  })
)
