import { TUseClub, useClub } from 'src/uses/useClub';
import { TUseClubs, useClubs } from 'src/uses/useClubs';
import { useGlobalState } from 'src/uses/useGlobalState';

export class State {
  protected _$clubs: TUseClubs | undefined;
  get $clubs(): TUseClubs {
    return this._$clubs || (this._$clubs = useClubs());
  }

  protected _$club: TUseClub | undefined;
  get $club(): TUseClub {
    return this._$club || (this._$club = useClub());
  }

  protected _$global: ReturnType<typeof useGlobalState> | undefined;
  get $global(): ReturnType<typeof useGlobalState> {
    return this._$global || (this._$global = useGlobalState(this));
  }
}

export const state = new State();
