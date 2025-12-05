import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "storybook/internal/preview-api";
import { Modal } from ".";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달 열림 상태",
    },
    setIsOpen: {
      action: "onClose",
      description: "모달 닫기 핸들러",
    },
    animation: {
      control: { type: "select" },
      options: ["fade", "scale", "slide", "none"],
      description: "모달 애니메이션 종류",
    },
    ariaLabel: {
      control: "text",
      description: "모달의 접근성 라벨",
    },
    customStyles: {
      control: "object",
      description: "모달 커스텀 스타일",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variant: Story = {
  render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    const handleOpen = () => updateArgs({ isOpen: true });
    const handleClose = () => updateArgs({ isOpen: false });

    return (
      <>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleOpen}
            className="p-4 bg-blue-500 text-white rounded"
          >
            모달 열기
          </button>
          <button
            onClick={() => alert("트랩 테스트 버튼 클릭됨")}
            className="mt-2 p-4 bg-green-500 text-white rounded"
          >
            트랩 테스트 버튼
          </button>
          <button
            onClick={() => alert("트랩 테스트 버튼 클릭됨")}
            className="mt-2 p-4 bg-red-500 text-white rounded"
          >
            트랩 테스트 버튼
          </button>
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={handleClose}
          ariaLabel={args.ariaLabel}
          animation={args.animation}
        >
          <Modal.Container>
            <Modal.Title title="모달 제목" showClosedButton={true} />
            <Modal.Body scrollable={true} height={300}>
              {args.children}
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={handleClose}
                className="p-2 bg-gray-300 rounded w-full"
              >
                닫기
              </button>
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </>
    );
  },
  args: {
    children: (
      <>
        <p className="mb-4">이것은 모달의 내용입니다.</p>
        <div className="flex flex-col gap-2">
          <button className="p-4 border rounded">트랩 테스트1</button>
          <button className="p-4 border rounded">트랩 테스트2</button>
          <button className="p-4 border rounded">트랩 테스트3</button>
          <button className="p-4 border rounded">트랩 테스트1</button>
          <button className="p-4 border rounded">트랩 테스트2</button>
          <button className="p-4 border rounded">트랩 테스트3</button>
          <button className="p-4 border rounded">트랩 테스트1</button>
          <button className="p-4 border rounded">트랩 테스트2</button>
          <button className="p-4 border rounded">트랩 테스트3</button>
        </div>
      </>
    ),
    isOpen: false,
    setIsOpen: () => {},
    animation: "fade",
    ariaLabel: "기본 모달",
  },
};
