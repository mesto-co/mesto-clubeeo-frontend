import { api } from 'boot/axios';

// Post common

export interface IPagination {
  page: number
  take: number
  skip: number
}

export type IPostViewReactions = Record<string, number>

export interface IPostViewComment {
  id: number
  text: string
  user: {
    screenName: string
    imgUrl: string
  }
  createdAt: string
  updatedAt: string
}

export interface IPostView {
  id: number
  title: string
  text: string
  userId: number
  reactions: IPostViewReactions,
  myReactions: IPostViewReactions,
  comments: IPostViewComment[],
  createdAt: string
  updatedAt: string
}

export interface IPostResponse {
  post: IPostView
}

// Index posts

export interface IPostListResponse {
  posts: Array<IPostView>
  pagination: IPagination
}

export const getPostList = async (clubId: string, clubAppId: string) => {
  const response = await api.get<IPostListResponse>('/api/post', {
    params: {
      clubId,
      clubAppId,
    }
  });
  return response.data;
};

// Create post

export interface IPostCreateRequest {
  clubId: string | null
  clubAppId: string | null
  title: string
  text: string
}

export const postPost = async (post: IPostCreateRequest) => {
  const response = await api.post<IPostResponse>('/api/post', { post });
  return response.data;
};
