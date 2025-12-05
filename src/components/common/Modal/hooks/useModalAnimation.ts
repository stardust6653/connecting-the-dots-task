import { useEffect, useState } from "react";
import type { ModalAnimationType } from "../../../../types/modal.type";

interface Props {
  isOpen: boolean;
  animation?: ModalAnimationType;
}

const useModalAnimation = ({ isOpen, animation = "none" }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let requestAnimationFrame1: number | undefined;
    let requestAnimationFrame2: number | undefined;
    let timer: number | undefined;

    if (isOpen) {
      requestAnimationFrame1 = requestAnimationFrame(() => {
        setShouldRender(true);
        requestAnimationFrame2 = requestAnimationFrame(() => setIsActive(true));
      });
    } else {
      requestAnimationFrame1 = requestAnimationFrame(() => {
        setIsActive(false);
        if (animation === "none") setShouldRender(false);
      });

      if (animation !== "none") {
        timer = window.setTimeout(() => setShouldRender(false), 200);
      }
    }

    return () => {
      if (requestAnimationFrame1 !== undefined)
        cancelAnimationFrame(requestAnimationFrame1);
      if (requestAnimationFrame2 !== undefined)
        cancelAnimationFrame(requestAnimationFrame2);
      if (timer !== undefined) clearTimeout(timer);
    };
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
