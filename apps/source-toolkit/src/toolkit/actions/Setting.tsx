import {
  SettingsActionTypes,
  SET_INITIAL_PATH,
  TOGGLE_NAV_COLLAPSED,
} from '@crema/actions/Settings.action';

export const toggleNavCollapsed = () => ({ type: TOGGLE_NAV_COLLAPSED });

export const setInitialPath = (initialPath: string): SettingsActionTypes => ({
  type: SET_INITIAL_PATH,
  payload: initialPath,
});
