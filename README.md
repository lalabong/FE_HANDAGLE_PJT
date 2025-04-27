# 프로젝트 설명

## 메인홈 페이지

![Image](https://github.com/user-attachments/assets/8d2fc449-9ef6-4192-b246-0eee06f7f72e)

- 무한 캐러셀 애니메이션
- 로고 클릭 시 홈으로 이동
- 유저 아이콘 클릭 시 닉네임 팝오버 및 로그아웃 버튼 노출

![Image](https://github.com/user-attachments/assets/490172d6-88f7-4b9f-a0c1-3ce328023052)

- 게시글 10개씩 페이지네이션

## 로그인 페이지

![Image](https://github.com/user-attachments/assets/a1f0157a-0520-4c78-a745-e6b69eac9d74)

- 아이디 및 비밀번호 미 입력 제출 시 에러 메세지 노출

## 게시글 상세 페이지

![Image](https://github.com/user-attachments/assets/780708ee-861c-4b5a-b02f-defe021c501c)

- 본인 게시글일 경우 수정 및 삭제 가능
- 본인 댓글일 경우 수정 및 삭제 가능

## 게시글 작성 및 수정 페이지

![Image](https://github.com/user-attachments/assets/b289168e-28e0-438e-b689-4a90e2c18f6f)

- 작성한 글자 수 표시
- 최소 작성 글자수 불만족 시 에러 메세지 노출
- 수정 시 변경 사항 없을 경우 수정 버튼 비활성화

## 모바일 전용 UI(반응형)

![Image](https://github.com/user-attachments/assets/b233f3af-5a57-4653-af44-1eca62bac3aa)
![Image](https://github.com/user-attachments/assets/a3d6387c-f180-4d53-96b2-f25724ab8a9c)
![Image](https://github.com/user-attachments/assets/8d8297e3-2243-4394-84df-842480382858)

- 햄버거 버튼 클릭시 슬라이드 메뉴 노출
- 게시글 무한 스크롤 적용

![Image](https://github.com/user-attachments/assets/6fef0534-4114-4084-84e2-0b420641ce44)

![Image](https://github.com/user-attachments/assets/766fc946-f2e3-440e-b067-f7eb54f6c19f)

![Image](https://github.com/user-attachments/assets/4fd6dd8e-e4ae-4b68-b83a-c264bf799bf6)

![Image](https://github.com/user-attachments/assets/b96ea655-47a3-4ec8-8798-6369fc816cb0)

# 사용 기술

## React

React는 컴포넌트 기반 설계에 특화되어있어, 재사용 및 유지보수성이 용이합니다. 또한 React는 현재 가장 많이 사용되는 라이브러리로, 실무 경험과 가장 근접하다고 생각해 선택하게 되었습니다.

## Tailwind

cn 유틸리티 함수를 사용하여 조건부 클래스 적용 등에 더욱 가독성을 높이기 위해 선택했습니다. 또한 확장성도 좋은 편이며 반응형 디자인을 쉽고 빠르게 구현할 수 있습니다.

## React-Query

React-Query는 클라이언트 상태와 서버 상태를 명확하게 구분하여 관리할 수 있으며, 캐싱을 통해 불필요한 API 호출을 줄일 수 있습니다. 또한 로딩 상태, 에러 처리, 리페칭을 간편하게 관리할 수 있습니다.

## Zustand

유일하게 사용해 본 전역 상태 관리 라이브러리로, 사용이 간편하고 직관적이라는 것이 큰 장점입니다. 러닝커브를 낮추고 단기간에 빠른 구현을 위해 선택했습니다.

# 와이어프레임

![Image](https://github.com/user-attachments/assets/07234f76-8f96-4a7f-9b57-7c38c48fd568)

# 폴더 구조

```📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂header
 ┃ ┣ 📂icons
 ┃ ┣ 📂post
 ┃ ┗ 📂skeleton
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂layouts
 ┣ 📂lib
 ┣ 📂pages
 ┣ 📂router
 ┣ 📂stores
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
```

| 폴더명     | 폴더 설명                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| api        | API 요청 관련 함수들을 모아둔 폴더로, 도메인별(user, post 등)로 구분된 HTTP 요청 함수들을 관리합니다.                                            |
| components | 재사용 가능한 UI 컴포넌트들을 모아둔 폴더로, header, post, common, icons 등 기능과 역할에 따라 구조화되어 있습니다.                              |
| constants  | 프로젝트 전반에서 사용되는 상수값, 에러 메시지, 성공 메시지, 경로 등을 정의하여 관리합니다.                                                      |
| hooks      | 커스텀 훅 모음으로, React Query를 활용한 데이터 페칭 훅(queries)과 UI 로직 관련 훅으로 구분하여 관리합니다.                                      |
| layouts    | 페이지 레이아웃 컴포넌트를 관리하는 폴더로, 여러 페이지에서 공통으로 사용되는 레이아웃 구조를 정의합니다.                                        |
| lib        | 외부 라이브러리 관련 컴포넌트를 포함하는 폴더로, tailwind의 cn 유틸리티 컴포넌트가 존재합니다.                                    |
| pages      | 라우팅 가능한 페이지 컴포넌트들을 모아둔 폴더로, 애플리케이션의 각 화면을 담당하는 최상위 컴포넌트들을 관리합니다.                               |
| router     | React Router 설정 관련 파일을 관리하는 폴더로, 라우트 정의와 인증 상태에 따른 라우팅을 관리하는 컴포넌트를 포함했습니다.                                                       |
| stores     | Zustand를 사용한 전역 상태 관리 스토어를 모아둔 폴더로, 인증(useAuthStore), 디바이스 크기 관련(useDeviceStore), 메뉴(useMenuStore) 등의 상태를 관리합니다. |
| styles     | 전역 스타일과 Tailwind CSS 관련 설정을 포함하는 폴더로, 공통 스타일 정의를 관리합니다.                                                           |
| types      | TypeScript 타입 정의 파일을 모아둔 폴더로, 프로젝트에서 자주 사용되는 인터페이스, 타입 등을 정의합니다.                                          |
| utils      | 유틸리티 함수들을 모아둔 폴더로, 날짜 변환, 문자열 처리 등 재사용 가능한 순수 함수들을 관리합니다.                                        |

# 전달 사항

- 와이어프레임에 없는 로그아웃 버튼을 임의 배치했습니다.
- 메인페이지 게시글 리스트의 작성자 프로필 사진 -> api 응답 데이터에 프로필 url이 없어 빈 회색 원으로 임시 구현했습니다.
- (모바일)마찬가지로 게시글 리스트 조회에서 작성자 닉네임이 없어 '글쓴이닉네임'으로 임시 구현했습니다.
- 게시글 상세페이지가 비로그인 시엔 접근이 불가능 -> 로그인 여부에 따른 구현 부분을 제외했습니다.
