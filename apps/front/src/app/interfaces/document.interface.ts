
export interface DocumentInterface {
  id: number
  userId: number
  title: string
  lang: string
  description?: string
  tags?: string
  content: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}
