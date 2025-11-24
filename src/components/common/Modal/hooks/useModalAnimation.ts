import { useEffect, useState } from "react";
import type { ModalAnimationType } from "../../../../types/modal.type";

interface Props {
  isOpen: boolean;
  animation?: ModalAnimationType;
}

const useModalAnimation = ({ isOpen, animation = "none" }: Props) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setShouldRender(true);
        requestAnimationFrame(() => setIsActive(true));
      });
    } else {
      requestAnimationFrame(() => {
        setIsActive(false);
        if (animation === "none") setShouldRender(false);
      });

      if (animation !== "none") {
        const timer = setTimeout(() => setShouldRender(false), 200);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, animation]);

  const transitionBase = "transition-all duration-500 ease-in-out";
  let specificClasses = "";

  switch (animation) {
    case "fade":
      specificClasses = isActive ? "opacity-100" : "opacity-0";
      break;

    case "scale":
      specificClasses = isActive
        ? "opacity-100 scale-100"
        : "opacity-100 scale-0";
      break;

    case "slide":
      specificClasses = isActive
        ? "opacity-100 translate-y-0"
        : "opacity-100 translate-y-[100vh]";
      break;

    default:
      specificClasses = "";
  }

  return {
    animationClasses: `${transitionBase} ${specificClasses}`,
    shouldRender,
  };
};

export default useModalAnimation;
