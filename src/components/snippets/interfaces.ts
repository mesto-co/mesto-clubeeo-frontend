export interface IRenderableCard {
  title?: string
  text?: string
  class?: string
  button?: {
    size?: 'xl' | string
    style?: string | Record<string, string | number>
    class?: string | Record<string, boolean>
    href: string
    to: string| Record<string, string>
    label: string
  },
  chips?: {
    icon?: string
    title?: string
  }[]
}
