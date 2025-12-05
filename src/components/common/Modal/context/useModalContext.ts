import { createContext, useContext } from "react";
import type { ModalContextValue } from "../types/modal.type";

export const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = (
  ModalContext: React.Context<ModalContextValue | null>
) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal의 서브 컴포넌트는 Modal 컴포넌트 내부에서만 사용 가능합니다."
    );
  }
  return context;
};

export default useModalContext;
