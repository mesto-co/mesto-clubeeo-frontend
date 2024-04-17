export interface IProp {
  key: string,
  type: string,
  label: string,
  description: string,
  editable?: boolean,
  required?: boolean,
  editor?: {
    type: 'select',
    showImage?: boolean,
  } | { type: 'copy' }
    | { type: 'rich-edit' },
  value: string,
}

export interface IRegistryItem {
  key: string,
  description: string
  coverImg: string,
  name: string,
  version: string,
  config: {
    props: Record<string, IProp>
  }
}

export type ISerializedProp = null | string;
export type IPropValue = ISerializedProp | { value: ISerializedProp, label?: ISerializedProp };


export const serializeProp = (value: IPropValue, config?: IProp) => {
  if (config?.editor?.type === 'select' && typeof value === 'object') {
    return value?.['value'] || null;
  } else {
    return value;
  }
};

export const deserializeProp = (value: string | null, config?: IProp): IPropValue => {
  if (config?.editor?.type === 'select') {
    return { value, label: value };
  } else {
    return value;
  }
};
