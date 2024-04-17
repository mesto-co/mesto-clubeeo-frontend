import { api } from 'boot/axios';

export interface IAppMutationRequest<ReqT = Record<string, unknown>> {
  clubSlug: string,
  appSlug: string,
  mutationName: string,
  appPage?: string,
  data?: ReqT
}

export interface IAppMutationResult<RespT = Record<string, unknown>> {
  club: {
    id: string
  },
  clubApp: {
    id: string,
    title: string,
    appName: string,
    appSlug: string,
  },
  mutation: {
    mutationName: string,
    result: RespT,
  }
}

export const appMutation = async <RespT = Record<string, unknown>, ReqT = Record<string, unknown>>(
  args: IAppMutationRequest<ReqT>
): Promise<IAppMutationResult<RespT>> => {
  const response = await api.post<IAppMutationResult<RespT>>(
    `/api/club/${args.clubSlug}/app/${args.appSlug}/mutation/${args.mutationName}?appPage=${args.appPage || ''}`, {
    data: args.data,
  });

  return response.data;
}


export interface IAppActionRequest<ReqT = Record<string, unknown>> {
  clubSlug: string,
  appSlug: string,
  actionName: string,
  appPage?: string,
  data?: ReqT
}

export interface IAppActionResult<RespT = Record<string, unknown>> {
  club: {
    id: string
  },
  clubApp: {
    id: string,
    title: string,
    appName: string,
    appSlug: string,
  },
  action: {
    actionName: string,
    result: RespT,
  }
}

export const appAction = async <RespT = Record<string, unknown>, ReqT = Record<string, unknown>>(
  args: IAppActionRequest<ReqT>
): Promise<IAppActionResult<RespT>> => {
  const response = await api.post<IAppActionResult<RespT>>(
    `/api/club/${args.clubSlug}/app/${args.appSlug}/action/${args.actionName}?appPage=${args.appPage || ''}`, {
      data: args.data,
    });

  return response.data;
}
