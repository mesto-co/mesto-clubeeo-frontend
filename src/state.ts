import { TUseClub, useClub } from '@src/uses/useClub';
import { usePost } from '@src/uses/usePost';
import { TUseClubs, useClubs } from '@src/uses/useClubs';
import { usePosts } from '@src/uses/usePosts';
import { useGlobalState } from '@src/uses/useGlobalState';
import { TUseClubApp, useClubApp } from '@src/uses/useClubApp';

export class State {
  protected _$clubs: TUseClubs | undefined;
  get $clubs(): TUseClubs {
    return this._$clubs || (this._$clubs = useClubs());
  }

  protected _$club: TUseClub | undefined;
  get $club(): TUseClub {
    return this._$club || (this._$club = useClub());
  }

  protected _$clubApp: TUseClubApp | undefined;
  get $clubApp(): TUseClubApp {
    return this._$clubApp || (this._$clubApp = useClubApp());
  }

  protected _$post: ReturnType<typeof usePost> | undefined;
  get $post(): ReturnType<typeof usePost> {
    return (
      this._$post ||
      (this._$post = usePost({ $club: this.$club, $clubApp: this.$clubApp }))
    );
  }

  protected _$posts: ReturnType<typeof usePosts> | undefined;
  get $posts(): ReturnType<typeof usePosts> {
    return (
      this._$posts ||
      (this._$posts = usePosts({ $club: this.$club, $clubApp: this.$clubApp }))
    );
  }

  protected _$global: ReturnType<typeof useGlobalState> | undefined;
  get $global(): ReturnType<typeof useGlobalState> {
    return this._$global || (this._$global = useGlobalState(this));
  }
}

export const state = new State();
