import { IRenderableCard } from 'components/snippets/interfaces';
import { ISnippetData, ISnippetStyle } from 'src/models/snippetTypes';

// export type TSnippetData = Record<string, unknown> | number | string

export const screenPage = (slot: ISnippetData, opts: { style?: ISnippetStyle, } = {}) => ({ type: 'screenPage', ...opts, slot });
export const card = (slot: ISnippetData) => ({ type: 'card', slot });

export const content = {
  generic: (data: {
    title?: Array<string>, //html?
    header?: string,
    image?: string,
    cards?: Array<IRenderableCard>
  }) => ({ type: 'legacy:content', ...data }),
}
