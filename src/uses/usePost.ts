import { TUseClub } from '@src/uses/useClub';
import { reactive, ref } from 'vue';
import { IPostView, postPost } from '@src/api/postApi';
import { TUseClubApp } from '@src/uses/useClubApp';

export interface IPostCreateView {
  title: string;
  text: string;
}

export const usePost = (dep: { $club: TUseClub; $clubApp: TUseClubApp }) => {
  const { $club, $clubApp } = dep;

  const isCreating = ref(false);

  const postInit = {
    title: '',
    text: '',
  };

  const post = reactive<IPostCreateView>(postInit);

  const createdPost = ref<IPostView | null>(null);

  const postStateReset = () => {
    post.text = '';
    post.title = '';
  };

  const createPost = async () => {
    isCreating.value = true;

    const response = await postPost({
      ...post,
      clubId: $club.club.id,
      clubAppId: $clubApp.clubApp.clubApp.id,
    });
    createdPost.value = response.post;

    postStateReset();

    isCreating.value = false;
  };

  return {
    isCreating,
    post,
    createdPost,

    postPost,
    createPost,
    postStateReset,
  };
};
