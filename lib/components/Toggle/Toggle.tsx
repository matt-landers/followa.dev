import { useEffect, useState } from 'react';
import styles from './Toggle.module.scss';

const Toggle = () => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(
      typeof localStorage !== 'undefined' &&
        localStorage?.getItem('theme') === 'light',
    );
  }, []);
  return (
    <label className={styles.switch}>
      <input
        id="themeToggle"
        type="checkbox"
        checked={checked}
        onChange={() => {
          console.log('Toggle:onChange');
          const html = document.querySelector('html');

          if (!html) {
            return;
          }

          const theme = html.getAttribute('data-theme');

          if (!theme || theme === 'dark') {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            setChecked(true);
          } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setChecked(false);
          }
        }}
      />
      <span className={[styles.slider, styles.round].join(' ')}></span>
    </label>
  );
};

export default Toggle;
