import { IOption } from 'src/modules/automation/useAppTriggerStore';

export type IValueType = string | number | string[]

// interface IOption<T = IValueType> {
//   value: T,
//   label: string,
// }

export interface IProp<T = IValueType> {
  key: string,
  type: string,
  label: string,
  description: string,
  editable?: boolean,
  required?: boolean,
  editor?: {
    type: 'select',
    showImage?: boolean
  },
  values?: IOption[]
  default?: T
  group: string
}

interface IData {
  key: string,
  type: string,
  label: string,
  description: string,
}

export type IEventProp = IProp
export type IEventOutput = IData
export interface IAppEvent {
  key: string,
  name: string,
  description: string,
  props: Record<string, IEventProp>,
  output: Record<string, IEventOutput>,
}

export type IActionProp = IProp
export type IActionOutput = IData
export interface IAppAction {
  key: string,
  name: string,
  description: string,
  props: Record<string, IActionProp>,
  input: Record<string, IActionOutput>,
}

export type IConfigProp = IProp
interface IConfig {
  props: Record<string, IConfigProp>,
}

export interface IAppConfig {
  key: string,
  name: string,
  version: string,
  description: string,
  coverImg: string,
  tags: string,
  events: Record<string, IAppEvent>,
  actions: Record<string, IAppAction>,
  config: IConfig,
}

export interface IClubApp {
  id: number,
  title: string,
  appName: string,
  appSlug: string,
  menuIndex: number | null,
  config: Record<string, string>,
  createdAt: string,
  updatedAt: string,
  clubId: number,
  app: IAppConfig,
}
