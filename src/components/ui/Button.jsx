/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
`;

const variants = {
  primary: css`
    background: linear-gradient(135deg, #E94560 0%, #FF6B6B 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);

    &:not(:disabled):hover {
      box-shadow: 0 6px 20px rgba(233, 69, 96, 0.5);
    }
  `,
  secondary: css`
    background: #252540;
    color: white;
    border: 1px solid #3a3a5c;

    &:not(:disabled):hover {
      background: #2a2a4a;
      border-color: #E94560;
    }
  `,
  outline: css`
    background: transparent;
    color: #E94560;
    border: 2px solid #E94560;

    &:not(:disabled):hover {
      background: rgba(233, 69, 96, 0.1);
    }
  `,
  ghost: css`
    background: transparent;
    color: #A0A0B8;

    &:not(:disabled):hover {
      color: white;
      background: rgba(255, 255, 255, 0.05);
    }
  `,
  gold: css`
    background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%);
    color: #1A1A2E;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);

    &:not(:disabled):hover {
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }
  `,
};

const sizes = {
  sm: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  md: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
  lg: css`
    padding: 16px 32px;
    font-size: 18px;
  `,
};

const loadingStyles = css`
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      css={[
        baseStyles,
        variants[variant],
        sizes[size],
        loading && loadingStyles,
        fullWidth && css`width: 100%;`,
      ]}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? 'Processando...' : children}
    </button>
  );
}
