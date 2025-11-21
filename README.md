# 커넥팅더닷츠 과제

## 실행 방법

```
# 패키지 설치
npm install

# 스토리북 실행
npm run storybook

# 스토리북 접근
[localhost:6006](http://localhost:6006)
```

## 구현 목록

### Select

- [x] label + trigger + popup(list) 구성
- [x] option 선택 → trigger에 반영
- [x] keyboard navigation(예: ↑↓, Enter, Esc)
- [x] focus management
- [x] aria 속성 준수
- [x] 기본 디자인과 비활성화 디자인, 총 2종으로 구성(variant)
  - default
  - disabled
- [x] disabled option(특정 옵션 비활성화)
- [x] grouped options

### Modal

- [x] open/close 제어
- [x] ESC로 닫기 / backdrop 클릭 닫기
- [x] focus management, focus trap
- [x] aria 속성 준수
- [x] 기본 디자인 1종만 구성(variant)
- [x] 여닫기 애니메이션(fade, slide 등)

## 컴포넌트 구조 설계

### 공통 관점

- UI 컴포넌트는 최대한 View에 집중할 수 있도록 설계하였습니다.
- 비즈니스 로직은 커스텀 훅을 통해 관리 및 제어되도록 하였습니다.
- Select 및 Modal 모두 외부에서 상태를 주입받으며 제어 컴포넌트 설계를 따릅니다.

### Select

- 기본값으로 제공되는 스타일이 아닌 Props로 커스텀 스타일(tailwinds)을 전달해 활용하거나 useSelectStyles 훅 내부의 토큰값 또는 스타일을 수정하여 스타일을 커스텀 할 수 있도록 하였습니다.
- 웹 접근성(A11y)을 위한 Aria-\* 값들도 커스텀 훅을 통해 관리하여 하나의 흐름 안에서 관리할 수 있도록 처리하였습니다.
- 작성된 커스텀 훅의 목록과 역할은 다음과 같습니다.
  - `useKeyboardControl` : 키보드 제어에 대한 비즈니스 로직을 작성
  - `useScrollOnHeight` : 키보드 포커스 항목이 스크롤 뷰 내부에 보이도록 시각적 처리
  - `useGetAriaData` : 접근성 항목에 대한 중앙 관리
  - `useSelectStyle` : 스타일에 대한 중앙 관리

### Modal

- React Portal을 사용하여 부모 컴포넌트의 스타일(z-index, overflow) 간섭을 받지 않고 독립적인 레이어에서 렌더링되도록 구현했습니다.
- 작성된 커스텀 훅의 목록과 역할은 다음과 같습니다.
  - `useModalControl` : 포커스 트랩 구현 및 키보드 제어, 닫힘 시 이전 포커스 복귀 등 주요 비즈니스 로직 작성
  - `useModalAnimation` : 다양한 애니메이션에 대한 관리(fade, scale, slide, none)
  - `useModalStyle` : 스타일에 대한 중앙 관리

## 고민한 부분이 있다면 짧게 기록해주세요!

### 유틸리티 스타일 라이브러리에 대한 확장성

#### 고민

- Tailwind의 높은 생산성과 낮은 가독성/관리 복잡도 간의 균형점을 찾는 것이었습니다. 클래스 문자열의 길이 증가와 색상/테마 변경의 어려움이 주요 문제입니다.

#### 해결

- UI 컴포넌트 내부에서 하드코딩된 스타일을 제거하고, useSelectStyle 훅 또는 useModalStyle 내부에서 상태에 따라 스타일을 계산하여 객체로 반환하는 방식을 채택했습니다.
- 이를 통해 JSX 가독성 유지하고 스타일 토큰을 통해 부분적으로 변경을 용이하도록 하였으며 useMemo를 통해 의미없는 리렌더링이 발생하지 않도록 하여 유지보수성을 향상시켰습니다.

#### 질문

- 만약 커넥팅더닷츠팀에서 테일윈즈를 활용했거나 또는 활용하고 있다면 복잡한 Tailwind 프로젝트에서 useSelectStyles처럼 CSS-in-JS의 장점을 활용하면서도 가독성 이슈를 해결할 수 있는 팀의 관리 전략이 궁금합니다.

### 비즈니스 로직을 최대한 분리해 관리하는 것에 대한 고민

#### 고민

- 관심사의 분리(SoC)를 위해 로직을 훅으로 분리했으나, 기능이 커질 경우 훅끼리 강하게 결합되어 유지보수를 해치지 않을까 하는 점이었습니다.

#### 해결

- 현재 `useKeyboardControl`처럼 단일 책임을 갖는 훅을 통해 로직을 캡슐화했습니다. `highlightedIndex`와 `handleKeyDown`을 함께 두어 응집성을 높였습니다.
- 이런 분리를 통해 뷰 컴포넌트는 오직 훅의 최종 값만 사용하므로, 뷰 계층은 로직 변경으로부터 독립 가능해졌습니다.

#### 질문

- 훅들이 단일 책임 원칙을 지키도록 설계했지만, 기능 확장 시 훅 간의 강결합 위험성에 대해 고민했습니다. 만약 훅의 책임이 비대해질 경우, 어떤 기준으로 분리하고 결합도를 낮출 수 있을지에 대한 기술적 조언을 구합니다.
