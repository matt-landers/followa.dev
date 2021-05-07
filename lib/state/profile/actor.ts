import tates from 'tates';
import { createStateHook } from 'react-tates';
import {
  getUserProfile,
  loginUser,
  PrefersColorScheme,
  updatePrefersColorScheme,
  updateProfile,
  User,
} from './services';

export interface ProfileState {
  loggedIn: boolean;
  user: User;
  prefersColorScheme: PrefersColorScheme;
}

const tate = tates<ProfileState>();
const { state } = tate;

export const actions = {
  async login(email: string, password: string) {
    const result = await loginUser(email, password);
    state.loggedIn = true;
    state.user = result;
    actions.getPrefersColorScheme();
  },
  async updateProfile(user: Pick<User, 'id' | 'firstName' | 'lastName'>) {
    await updateProfile(user);
    state.user.firstName = user.firstName;
    state.user.lastName = user.lastName;
  },
  updatePrefersColorScheme(pcs: PrefersColorScheme) {
    if (state?.user?.id) {
      updatePrefersColorScheme({
        id: state.user.id,
        prefersColorScheme: pcs,
      });
      state.user.prefersColorScheme = pcs;
    }
    if (localStorage) {
      localStorage.setItem('theme', pcs);
    }
    actions.getPrefersColorScheme();
  },
  getPrefersColorScheme() {
    let pcs: PrefersColorScheme;
    if (state?.user?.prefersColorScheme) {
      pcs = state.user.prefersColorScheme;
    } else if (localStorage) {
      pcs =
        (localStorage.getItem('theme') as PrefersColorScheme) ??
        PrefersColorScheme.DARK;
    } else {
      pcs = PrefersColorScheme.DARK;
    }
    if (localStorage) {
      localStorage.setItem('theme', pcs);
    }
    state.prefersColorScheme = pcs;
  },
  async getUser() {
    const user = await getUserProfile();
    state.user = user;
    state.prefersColorScheme = state.user.prefersColorScheme;
  },
};

export const useUser = createStateHook<
  User,
  typeof tate,
  typeof actions.getUser
>({
  tate,
  action: actions.getUser,
  property: 'user',
});

export const useLoggedIn = createStateHook<boolean, typeof tate, any>({
  tate,
  property: 'loggedIn',
});

export const useTheme = createStateHook<
  PrefersColorScheme,
  typeof tate,
  typeof actions.getPrefersColorScheme
>({
  tate,
  action: actions.getPrefersColorScheme,
  property: 'prefersColorScheme',
});
