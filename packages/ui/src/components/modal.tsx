"use client";

import { X } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  maxHeight?: string;
  closeButton?: boolean;
  theme?: "white" | "blue" | "red";
  blur?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  width = "455px",
  height,
  maxHeight = "90%",
  children,
  closeButton = true,
  theme = "white",
  blur,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {createPortal(
        <div
          className={clsx(
            blur && "backdrop-blur-md",
            `h-full w-full fixed top-0 bg-backdrop-pure flex justify-center items-center z-50 transition-opacity duration-180 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`
          )}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            style={{ width, maxHeight, height }}
            className={clsx(
              theme === "white" && "bg-background",
              theme === "blue" && "bg-primary-pure",
              theme === "red" && "bg-[#CD0000]",
              `rounded-xl border overflow-scroll scrollbar-hide duration-180 ${
                isOpen
                  ? "animate-in zoom-in ease-out"
                  : "animate-out zoom-out ease-in"
              }`
            )}
          >
            <div className="pt-[10px] pr-[10px] flex justify-end items-center w-full">
              {closeButton && (
                <button
                  className="w-[26px] h-[26px] text-low-medium/60 bg-high-medium/50 hover:bg-gray-500/10 rounded-md flex items-center justify-center transition-all"
                  onClick={onClose}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="px-[20px] py-[15px] overflow-scroll scrollbar-hide">
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
