export interface IAppData {
  appId: string,
  clubId: string,
  title: string,
  isLoading: boolean,
  clubSlug: string,
  appSlug: string,
  appName: string,
  appPage: string,
  appPageData: Record<string, unknown>,
  roles: string[],
}
