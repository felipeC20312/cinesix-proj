import type React from "react";

interface DKActionButtonProps {
  label?: string;
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const DKActionButton: React.FC<DKActionButtonProps> = ({
  label,
  onClick,
  children,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-background-dark bg-background text-foreground rounded-lg font-medium shadow-xl ${className}`}
    >
      {label}
      {children}
    </button>
  );
};
export default DKActionButton;
