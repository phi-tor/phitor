import Badge from "#models/badge"
import { errors as authErrors } from '@adonisjs/auth'

type createBadgeOptions = {
  userId: number
  name: string
  description: string
  imgUrl: string
}

type updateBadgeOptions = {
  userId?: number
  name?: string
  description?: string
  imgUrl?: string
}

export default class BadgeService {
  async createBadge(options: createBadgeOptions){
    return await Badge.create(options)
  }

  async getBadge(badgeId: number) {
    return await Badge.findOrFail(badgeId)
  }

  async updateBadge(badgeId: number, currentUserId: number, options: updateBadgeOptions) {
    const badge = await Badge.findOrFail(badgeId)

    if(currentUserId !== badge.userId) throw authErrors.E_UNAUTHORIZED_ACCESS

    badge.merge(options)
    await badge.save()

    return badge
  }

  async deleteBadge(badgeId: number, currentUserId: number) {
    const badge = await Badge.findOrFail(badgeId)

    if(currentUserId !== badge.userId) throw authErrors.E_UNAUTHORIZED_ACCESS

    await badge.delete()
  }
}
