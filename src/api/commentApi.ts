import { api } from 'boot/axios';
import { IPostView } from 'src/api/postApi';


export interface IPostCommentResponse {
  post: IPostView
}

export interface IPostPostCommentRequest {
  postId: number
  text: string
}

export const postPostComment = async (comment: IPostPostCommentRequest) => {
  const response = await api.post<IPostCommentResponse>('/api/post/comment', { comment });
  return response.data;
};
