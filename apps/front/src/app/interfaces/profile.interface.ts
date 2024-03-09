
export interface ProfileInterface {
  id: 1
  userId: 1
  /**
   * Nota: this field isn't stored in db, it's only added artificially in the object after the fetch in the db (cf.
   * `/apps/back/app/models/profile.ts`).
   */
  username: string
  fullname: string
  bio: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
}
