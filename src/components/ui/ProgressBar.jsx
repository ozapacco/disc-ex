/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const containerStyles = css`
  width: 100%;
  height: 8px;
  background: #1A1A2E;
  border-radius: 4px;
  overflow: hidden;
`;

const fillStyles = css`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #E94560 0%, #FF6B6B 50%, #E94560 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 2s linear infinite;
`;

const labelStyles = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #A0A0B8;
`;

export function ProgressBar({ current, total, showLabel = true, animated = true }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const percentage = (current / total) * 100;
    if (animated) {
      setWidth(percentage);
    } else {
      setWidth(percentage);
    }
  }, [current, total, animated]);

  return (
    <div>
      {showLabel && (
        <div css={labelStyles}>
          <span>Progresso</span>
          <span>{Math.round((current / total) * 100)}%</span>
        </div>
      )}
      <div css={containerStyles}>
        <motion.div
          css={fillStyles}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
