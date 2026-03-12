/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cardStyles = css`
  background: #252540;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`;

const variants = {
  default: css``,
  elevated: css`
    background: linear-gradient(145deg, #2a2a4a 0%, #1e1e38 100%);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  `,
  glass: css`
    background: rgba(37, 37, 64, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `,
  accent: css`
    border: 1px solid rgba(233, 69, 96, 0.3);
    box-shadow: 0 4px 24px rgba(233, 69, 96, 0.15);
  `,
  gold: css`
    border: 1px solid rgba(212, 175, 55, 0.3);
    box-shadow: 0 4px 24px rgba(212, 175, 55, 0.15);
  `,
};

const sizes = {
  sm: css`
    padding: 16px;
  `,
  md: css`
    padding: 24px;
  `,
  lg: css`
    padding: 32px;
  `,
};

export function Card({ children, variant = 'default', size = 'md', css: customCss, ...props }) {
  return (
    <div css={[cardStyles, variants[variant], sizes[size], customCss]} {...props}>
      {children}
    </div>
  );
}
