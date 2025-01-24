import React from 'react';

interface MatrixGridBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const MatrixGridBackground: React.FC<MatrixGridBackgroundProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative bg-black ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128, 128, 128, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MatrixGridBackground;