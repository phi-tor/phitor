
// user
export type createUserType = {
  username: string
  email: string
  password: string
  password_confirmation: string
  lang: string
  terms: string
}

export type updateUserType = {
  password: string
  username?: string
  email?: string
  newPassword?: string
  newPassword_confirmation?: string
  lang?: string
}

export type loginUserType = {
  email: string
  password: string
}

// document

export type createDocumentType = {
  title: string
  lang?: string
  description?: string
  tags?: string
  content: string
  isPublic?: boolean
}

export type updateDocumentType = {
  title?: string
  lang?: string
  description?: string
  tags?: string
  content?: string
  isPublic?: boolean
}

// profile

export type updateProfileType = {
  fullname?: string
  bio?: string
  avatarUrl?: string
}
