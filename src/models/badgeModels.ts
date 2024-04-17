export type IBadgeStyle = Record<string, string>;

export interface IClubBadge {
  id: string
  name: string
  slug: string
  description: string
  img: string
  style: IBadgeStyle
  badgeType: string
}

export interface IMemberBadgeBase {
  id: number
  index: number
  value: number
}

export interface IMemberBadge extends IMemberBadgeBase {
  clubBadge: IClubBadge
}
