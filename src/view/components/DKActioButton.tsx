import type React from "react";
import { motion } from "motion/react";

interface DKActionButtonProps {
  type?: "button" | "submit" | "reset";
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const DKActionButton: React.FC<DKActionButtonProps> = ({
  type,
  label,
  onClick,
  children,
  disabled,
  className,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`border-background-dark bg-background rounded-lg font-medium shadow-lg ${className}`}
      >
        {label}
        {children}
      </button>
    </motion.div>
  );
};
export default DKActionButton;
