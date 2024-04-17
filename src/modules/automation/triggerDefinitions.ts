import fromEntries from 'fromentries';

interface IOption {
  label: string,
  value: string,
  caption: string,
  children?: Array<IOption>
  parent?: {value: string}
}

interface IProcessingTypeOption extends IOption {
  showData?: boolean
  showOpts?: boolean
  showCode?: boolean,
  description?: string,
}

export const eventSourceOptions: Array<IOption> = [
  {
    label: 'badges', value: 'badge', caption: 'granting badges, achievements or scorepoints',
    children: [
      { label: 'badge granted', value: 'badge:granted', caption: 'triggers on first assigment of a type' },
      {
        label: 'badge changed',
        value: 'badge:changed',
        caption: 'triggers on any change, including adding scorepoints and secondary assignments'
      }
    ]
  },
  {
    label: 'roles', value: 'role', caption: 'granting or removal roles',
    children: [
      { label: 'role granted', value: 'role:granted', caption: 'triggers on assigment of a role' },
      { label: 'role removed', value: 'role:removed', caption: 'triggers on role removal' }
    ]
  },
  {
    label: 'tokens', value: 'token', caption: 'NFT or fungible tokens events',
    children: [
      {
        label: 'NFT received',
        value: 'nft:received',
        caption: 'triggers on receiving a token from a registered collection'
      },
      {
        label: 'NFT dismissed',
        value: 'nft:dismissed',
        caption: 'triggers on dismissing a token from a registered collection'
      }
    ]
  },
  {
    label: 'webhooks', value: 'webhook', caption: 'triggering via API',
    children: [
      { label: 'get', value: 'webhook:get', caption: 'receive GET request' },
      { label: 'post', value: 'webhook:post', caption: 'receive POST request' }
    ]
  }
];
export const eventSourceOptionsMap = fromEntries<IOption>(eventSourceOptions.map((eso: IOption) => [eso.value, eso]));
export const eventTypeOptionsMap: Record<string, IOption> = {};
for (const sourceOption of eventSourceOptions) {
  for (const typeOption of sourceOption.children || []) {
    eventTypeOptionsMap[typeOption.value] = { ...typeOption, parent: { value: sourceOption.value } };
  }
}

export const processingTypeOptions: Array<IProcessingTypeOption> = [
  { label: 'bypass', value: 'bypass', caption: 'send event outputs to action inputs without modification' },
  // { label: 'static', value: 'static', caption: 'send predefined data', showData: true, description: '' },
  // { label: 'map', value: 'map', caption: 'map event data', showOpts: true, description: ''},
  // { label: 'merge', value: 'merge', caption: 'merges data from event and trigger', },
  { label: 'javascript', value: 'javascript', caption: 'low-code / lambda', showCode: true }
];
export const processingTypeOptionsMap = fromEntries<IProcessingTypeOption>(processingTypeOptions.map((eso: IProcessingTypeOption) => [eso.value, eso]));

export const taskTargetOptions: Array<IOption> = [
  {
    label: 'badges', value: 'badge', caption: 'granting badges, achievements or scorepoints',
    children: [
      { label: 'badge grant', value: 'badge:grant', caption: 'assigment a badge of a type' }
    ]
  },
  {
    label: 'roles', value: 'role', caption: 'granting or removal roles',
    children: [
      { label: 'grant role', value: 'role:grant', caption: 'assign of a role' },
      { label: 'remove role', value: 'role:remove', caption: 'remove a role' }
    ]
  },
  {
    label: 'webhooks', value: 'webhook', caption: 'API call',
    children: [
      { label: 'get', value: 'webhook:get', caption: 'send GET request' },
      { label: 'post', value: 'webhook:post', caption: 'send POST request' }
    ]
  }
];
export const taskTargetOptionsMap = fromEntries<IOption>(taskTargetOptions.map((tto: IOption) => [tto.value, tto]));
export const taskTypeOptionsMap: Record<string, IOption> = {};
for (const targetOption of taskTargetOptions) {
  for (const typeOption of targetOption.children || []) {
    taskTypeOptionsMap[typeOption.value] = { ...typeOption, parent: { value: targetOption.value } };
  }
}

