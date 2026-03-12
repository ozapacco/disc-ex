/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const inputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const labelStyles = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #A0A0B8;
`;

const inputStyles = css`
  width: 100%;
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: white;
  background: #1A1A2E;
  border: 2px solid #252540;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #6a6a8a;
  }

  &:focus {
    border-color: #E94560;
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const errorStyles = css`
  border-color: #F87171 !important;

  &:focus {
    box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1) !important;
  }
`;

const errorText = css`
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #F87171;
`;

export function Input({
  label,
  error,
  ...props
}) {
  return (
    <div css={inputContainer}>
      {label && <label css={labelStyles}>{label}</label>}
      <input
        css={[inputStyles, error && errorStyles]}
        {...props}
      />
      {error && <span css={errorText}>{error}</span>}
    </div>
  );
}
