import { actions, useTheme } from 'lib/state/profile/actor';
import { PrefersColorScheme } from 'lib/state/profile/services';
import { useLayoutEffect } from 'lib/utils/layoutEffect';

import styles from './Toggle.module.scss';

const Toggle = () => {
  const theme = useTheme();

  useLayoutEffect(() => {
    if (!theme) return;
    const html = document.querySelector('html');
    if (!html) {
      return;
    }
    html.setAttribute(
      'data-theme',
      theme?.toLowerCase() ?? PrefersColorScheme.DARK.toLowerCase(),
    );
  }, [theme]);

  return (
    <label className={styles.switch}>
      <input
        id="themeToggle"
        type="checkbox"
        checked={!!theme && theme === PrefersColorScheme.LIGHT}
        onChange={(e) => {
          actions.updatePrefersColorScheme(
            e.currentTarget.checked
              ? PrefersColorScheme.LIGHT
              : PrefersColorScheme.DARK,
          );
        }}
      />
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  );
};

export default Toggle;
