export type ISnippetData = {
  type: string,
  style?: ISnippetStyle,
} & Record<string, unknown>

export type ISnippetStyle = Record<string, string> | Array<string>
