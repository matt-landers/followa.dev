import React from 'react';

export interface EmojiProps {
  symbol: string;
  label: string;
  size?: string;
}

function Emoji({ symbol, label, size = 'inherit' }: EmojiProps) {
  return (
    <span
      style={{ fontSize: size }}
      title={label}
      role="img"
      aria-label={label || ``}
      aria-hidden={label ? `false` : `true`}>
      {symbol}
    </span>
  );
}

export default Emoji;
