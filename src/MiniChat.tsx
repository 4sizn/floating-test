import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { z } from "zod";

const chatSchema = z.object({
  chatMessage: z
    .string()
    .refine((v) => v.length > 0, {
      message: " 채팅은 1 이상 입력해주세요.",
      //clientSide returnCode
      params: { returnCode: 101000 },
    })
    .refine((v) => v.length < 5, {
      message: "채팅은 5자 이하로 입력해주세요.",
      //clientSide returnCode
      params: { returnCode: 101001 },
    }),
});

export function MiniChat() {
  const [sendDisabled, setSendDisabled] = React.useState(false);
  const ref = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    // 첫 렌더링 시, textarea 상태 검사
    handleChangePreSubmit();
  }, []);

  const handleChangePreSubmit = () => {
    ref.current?.chatMessage.value.trim().length === 0
      ? setSendDisabled(true)
      : setSendDisabled(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ref.current?.requestSubmit();
    }
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChangePreSubmit();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendDisabled) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const validateForm = chatSchema.parse(data);
      console.log("hsshin", validateForm);
      // TODO: 서버로 데이터 전송 후, 결과값으로 초기화 처리
      ref.current?.reset();
      handleChangePreSubmit();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("zod", error.issues);
      }
      // console.log(error);
    }
  };

  return (
    <div css={[styleMiniChat]}>
      <div css={styleMiniChatHeader}>
        <div>스페이스명</div>
        <div>멤버 98명</div>
        <div css={styleToolWrap}>
          <img src="https://placekitten.com/25/25" alt="avatar" />
          <img src="https://placekitten.com/25/25" alt="avatar" />
          <img src="https://placekitten.com/25/25" alt="avatar" />
        </div>
      </div>
      <div css={styleMiniChatBody()}>
        {Array(100)
          .fill(0)
          .map((_, i) => (
            <ChatItem key={i} />
          ))}
      </div>
      <div css={styleMiniChatFooter}>
        <form ref={ref} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <textarea
            onChange={handleChangeTextarea}
            name="chatMessage"
            placeholder="메시지 입력"
            css={css`
              width: 100%;
              resize: none;
            `}
          ></textarea>

          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div>
              <button>
                <img src="https://placekitten.com/25/25" alt="avatar" />
              </button>
              <button>
                <img src="https://placekitten.com/25/25" alt="avatar" />
              </button>
            </div>
            <div>
              <button disabled={sendDisabled}>
                <img src="https://placekitten.com/25/25" alt="avatar" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const styleMiniChat = css`
  display: flex;
  flex-direction: column;

  min-width: 300px;
`;

const styleMiniChatHeader = css`
  position: relative;
  background-color: red;
`;
const styleMiniChatBody = () => css`
  overflow-y: auto;
  min-height: 100px;
  max-height: 500px;
`;
const styleMiniChatFooter = css``;

const styleToolWrap = css`
  position: absolute;
  top: 0;
  right: 0;
`;

function ChatItem() {
  return (
    <div css={styleChatItem}>
      <img
        src="https://placekitten.com/50/50"
        alt="avatar"
        width="50"
        height="50"
      />
      <div>
        <div>
          홍길동 <time>오후 2:38</time>
        </div>
        <div>안녕하세요</div>
        <div>
          <img src="https://" alt="thumb" />
          <img src="https://" alt="thumb" />
          <img src="https://" alt="thumb" />
        </div>
      </div>
    </div>
  );
}

const styleChatItem = css`
  display: flex;
`;
