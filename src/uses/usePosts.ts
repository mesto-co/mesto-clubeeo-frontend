import { TUseClub } from '@src/uses/useClub';
import { ref } from 'vue';
import { getPostList, IPagination, IPostView } from '@src/api/postApi';
import { TUseClubApp } from '@src/uses/useClubApp';

export const usePosts = (dep: { $club: TUseClub; $clubApp: TUseClubApp }) => {
  const { $club, $clubApp } = dep;

  const isLoading = ref(false);
  const isOnceLoaded = ref(false);

  const posts = ref<Array<IPostView>>([]);
  const pagination = ref<IPagination>({
    page: 1,
    take: 100,
    skip: 0,
  });

  const loadPostList = async () => {
    isLoading.value = true;

    const clubId = $club.club.id;
    const clubAppId = $clubApp.clubApp.clubApp.id;

    if (!clubId) throw 'clubId is not set';

    const response = await getPostList(clubId, clubAppId);
    posts.value = response.posts;
    pagination.value = response.pagination;

    isOnceLoaded.value = true;
    isLoading.value = false;
  };

  const updatePostState = (post: { id: number }, data: IPostView) => {
    const postId = data.id;
    if (!postId || postId !== post.id)
      return console.error("postId don't match");

    const currentPost = posts.value.filter((p) => p.id === postId);

    return Object.assign(currentPost, data);
  };

  return {
    isLoading,
    isOnceLoaded,
    posts,
    pagination,

    getPostList,
    loadPostList,
    updatePostState,
  };
};
