import React from "react";
import styled, { css } from "styled-components";

const Bubble = styled.div`
  max-width: 80%;
  padding: 1.15rem 1.5rem;
  border-radius: 22px;
  font-size: 1.11rem;
  line-height: 1.7;
  word-break: break-word;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.2rem;
  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};
  background: ${({ sender }) => (sender === "user" ? "#fff4e6" : "#e9f2ff")};
  color: #222;
  position: relative;
  ${({ sender }) =>
    sender === "user"
      ? css`
          border-bottom-right-radius: 8px;
        `
      : css`
          border-bottom-left-radius: 8px;
        `}
`;

const Tail = styled.div`
  position: absolute;
  bottom: 0.7rem;
  ${({ sender }) =>
    sender === "user"
      ? css`
          right: -10px;
          border-left: 10px solid #fff4e6;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        `
      : css`
          left: -10px;
          border-right: 10px solid #e9f2ff;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        `}
`;

function MessageBubble({ sender, text, withTail, bubbleStyle }) {
  return (
    <Bubble sender={sender} style={bubbleStyle}>
      {text}
      {withTail && <Tail sender={sender} />}
    </Bubble>
  );
}

export default MessageBubble;
