import { api } from 'boot/axios';
import { IPostView } from '@src/api/postApi';

export interface IPostResponse {
  post: IPostView;
}

export interface IPostPostReactionRequest {
  postId: number;
  reaction: PostReactionTypes;
}

export enum PostReactionTypes {
  upvote = 'upvote',
  downvote = 'downvote',
  heart = 'heart',
  fire = 'fire',
}

export const postPostReaction = async (
  postReaction: IPostPostReactionRequest
) => {
  const response = await api.post<IPostResponse>('/api/post/reaction', {
    postReaction,
  });
  return response.data;
};
