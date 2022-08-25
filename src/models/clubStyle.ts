export interface IClubStyle {
  color: string
  textColor: string
  primaryColor: string
  primaryTextColor: string
  font: string
  socialColor: string
  socialTextColor: string
  aside: string
  buttonClass: string
  heroImg: string
  logoImg: string
  heroColor?: string
}

export const getDefaultDashClubStyle = () => {
  return {
    color: '#111117',
    textColor: '',
    primaryColor: '#1D1D27',
    primaryTextColor: '',
    font: '',
    socialColor: '#1D1D27',
    socialTextColor: '#FFFFFF',
    heroImg: '',
    logoImg: '',
    heroColor: '',
    aside: '',
    buttonClass: '',
  }
}

export const normLandingClubStyle = (s: Partial<IClubStyle>) => {
  const color = s.color || '#ffffff';
  const primaryColor = s.primaryColor || '#212121';

  return {
    color: s.color || color,
    textColor: s.textColor || primaryColor,
    primaryColor: s.primaryColor || primaryColor,
    primaryTextColor: s.primaryTextColor || color,
    socialColor: s.socialColor || primaryColor,
    socialTextColor: s.socialTextColor || color,
    aside: s.aside || 'right',
    buttonClass: s.buttonClass || '',
    font: s.font || 'Roboto',
    heroImg: s.heroImg || '',
    logoImg: s.logoImg || '',
    heroColor: s.heroColor,
  };
}
