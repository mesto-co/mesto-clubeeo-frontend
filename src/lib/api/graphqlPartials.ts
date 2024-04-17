export const clubStylePartial = `{
  color
  textColor
  primaryColor
  primaryTextColor
  font
  socialColor
  socialTextColor
  aside
  buttonClass
  logoImg
  heroImg
}`

export interface IClubSocialLinks {
  telegram?: string
  discord?: string
  instagram?: string
  twitter?: string
  etherscan?: string
  web?: string
}

export const clubSocialLinksPartial = `{
  tiktok
  telegram
  discord
  instagram
  twitter
  reddit
  facebook
  linkedin
  etherscan
  youtube
  web
}`

export const clubRoadmapPartial = `{
  entries {
    title
    text
    when
  }
}`

// type ClubBuyLinks {
//   opensea: String
//   rarible: String
//   main: String
// }
