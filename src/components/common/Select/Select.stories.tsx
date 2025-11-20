import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "기본 셀렉트",
    options: [
      {
        group: "과일",
        items: [
          { value: "귤", disabled: true },
          { value: "사과" },
          { value: "바나나" },
        ],
      },
      {
        group: "none",
        disabled: true,
        items: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
      },
      {
        group: "채소",
        items: [{ value: "오이" }, { value: "당근" }, { value: "상추" }],
      },
      {
        group: "",
        items: [{ value: "Option A" }, { value: "Option B" }],
      },
      {
        group: "none",
        disabled: true,
        items: [
          { value: "Option 1" },
          { value: "Option 2" },
          { value: "Option 3" },
        ],
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    options: [
      {
        group: "none",
        items: [
          {
            value: "Option 1",
          },
        ],
      },
      {
        group: "none",
        items: [
          {
            value: "Option 2",
            disabled: true,
          },
        ],
      },
      {
        group: "",
        items: [
          {
            value: "Option 4123",
          },
        ],
      },
      {
        group: "none",
        items: [
          {
            value: "Option 3",
          },
        ],
      },
      {
        group: "",
        items: [
          {
            value: "Option 4",
          },
        ],
      },
    ],
    disabled: true,
  },
};
