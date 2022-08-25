export const socialToIconMap: Record<string, string> = {
  'tiktok': 'fa-brands fa-tiktok',
  'twitter': 'fa-brands fa-twitter',
  'instagram': 'fa-brands fa-instagram',
  'discord': 'fa-brands fa-discord',
  'telegram': 'fa-brands fa-telegram',
  'reddit': 'fa-brands fa-reddit',
  'facebook': 'fa-brands fa-facebook',
  'linkedin': 'fa-brands fa-linkedin',
  'youtube': 'fa-brands fa-youtube',
  'web': 'fa-solid fa-globe',
}

export const mapSocialToIcon = (code: string) => {
  return socialToIconMap[code];
}
