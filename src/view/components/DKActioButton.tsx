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
      className={`border-background-dark bg-background text-foreground overflow-clip rounded-lg font-medium ${className}`}
    >
      {label}
      {children}
    </button>
  );
};
export default DKActionButton;
