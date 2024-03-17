import {DocumentInterface} from "./document.interface";
import {ProfileInterface} from "./profile.interface";
import {BadgeInterface} from "./badge.interface";

export interface UserInterface {
  id: number
  username: string
  email: string
  lang: string
  createdAt: string
  updatedAt: string
  documents?: DocumentInterface[]
  profile?: ProfileInterface
  badges?: BadgeInterface[]
  likes?: any[]
  follows?: any[]
}
