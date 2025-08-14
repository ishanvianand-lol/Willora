import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const baseStyles =
    "rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#d9865b] to-[#c96f4a] text-white hover:from-[#c96f4a] hover:to-[#d9865b] focus:ring-[#d9865b]",
    secondary:
      "bg-gradient-to-r from-[#b7c4a1] to-[#9fad87] text-white hover:from-[#9fad87] hover:to-[#b7c4a1] focus:ring-[#b7c4a1]",
    ghost:
      "bg-transparent border border-[#d9865b] text-[#d9865b] hover:bg-[#fdf5ef] focus:ring-[#d9865b]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
