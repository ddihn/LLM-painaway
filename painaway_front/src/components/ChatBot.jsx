import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MessageBubble from "./MessageBubble";
import {
  FaUser,
  FaHeartbeat,
  FaRobot,
  FaMoon,
  FaSun,
  FaPaperPlane,
  FaLightbulb,
} from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
`;

const loadingBounce = keyframes`
  0%, 80%, 100% { transform: scale(1); opacity: 0.6; }
  40% { transform: scale(1.3); opacity: 1; }
`;

const Bg = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 48px;
  padding-bottom: 48px;
  @media (max-width: 900px) {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 850px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  height: 80vh;
  padding: 2.5rem 2rem 1.5rem 2rem;
  @media (max-width: 900px) {
    max-width: 99vw;
    padding: 1.5rem 0.6rem 0.7rem 0.6rem;
  }
`;

const TopGuideCard = styled.div`
  width: 100%;
  margin: 0 0 1.8rem 0;
  background: #f1f7fe;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 1.3rem 1.6rem;
  font-size: 1.15rem;
  color: #3a80d2;
  font-weight: 700;
  text-align: left;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    padding: 1rem 1.2rem;
    font-size: 1.05rem;
    margin: 0 0 1.3rem 0;
  }
`;

const Messages = styled.div`
  flex: 1;
  padding: 0.5rem 0 0.5rem 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-left: 24px;
  margin-right: 24px;
  @media (max-width: 900px) {
    margin-left: 12px;
    margin-right: 12px;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #e9ecef;
    border-radius: 6px;
  }
`;

const MessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  animation: ${fadeIn} 0.5s;
  position: relative;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ sender }) => (sender === "bot" ? "#e9f2ff" : "#fff4e6")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: ${({ sender }) => (sender === "bot" ? "#3a80d2" : "#e6a44e")};
  flex-shrink: 0;
  position: absolute;
  left: ${({ sender }) => (sender === "bot" ? "-28px" : "unset")};
  right: ${({ sender }) => (sender === "user" ? "-28px" : "unset")};
  top: 0.1rem;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const ExampleCard = styled.div`
  background: #f1f7fe;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  padding: 1.3rem 1.6rem 1.5rem 1.6rem;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 900px) {
    padding: 1.1rem 1.2rem 1.3rem 1.2rem;
  }
`;

const ExampleTitle = styled.div`
  color: #3a80d2;
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const RecommendBtn = styled.button`
  background: #fff4e6;
  color: #333;
  border: none;
  border-radius: 16px;
  padding: 0.9rem 1.7rem;
  font-size: 1.09rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.22s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const InputArea = styled.form`
  display: flex;
  padding: 1.3rem 1.6rem 0.7rem 1.6rem;
  border-top: 1px solid #f1f3f5;
  background: #ffffff;
  align-items: center;
  gap: 0.9rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.02);
  border-radius: 0 0 24px 24px;
  margin-top: 1rem;
  @media (max-width: 900px) {
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    gap: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1.1rem 1.3rem;
  border: 1.5px solid #e9ecef;
  border-radius: 18px;
  font-size: 1.08rem;
  outline: none;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  &:focus {
    border-color: #c1d5f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  background: #3a80d2;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.22s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: #3a80d2;
  font-size: 1.4rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: all 0.22s ease;
  &:hover {
    color: #e6a44e;
    transform: scale(1.1);
  }
`;

const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  height: 1.2em;
  margin-left: 0.5rem;
  margin-bottom: 0.2rem;
`;

const Dot = styled.span`
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  background: #3a80d2;
  border-radius: 50%;
  animation: ${loadingBounce} 1.2s infinite;
  animation-delay: ${({ delay }) => delay};
`;

const EnterGuide = styled.div`
  font-size: 0.97rem;
  color: #a0b0c5;
  margin: 0.3rem 0 0.4rem 0.2rem;
  text-align: center;
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.01rem;
  color: #a0b0c5;
  padding: 1.2rem 0 0.5rem 0;
  background: transparent;
`;

const defaultRecommend = [
  "머리가 아파요",
  "허리가 뻐근해요",
  "소화가 잘 안돼요",
];

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "안녕하세요! 어떤 통증이 있으신가요? 증상을 말씀해주시면 예측 질환과 진료과를 추천해드릴게요.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommend] = useState(defaultRecommend);
  const [dark, setDark] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (dark) {
      document.body.style.background = "#23272f";
    } else {
      document.body.style.background = "#FFF8F0";
    }
  }, [dark]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptom: input }),
      });
      if (!response.ok) throw new Error("서버 오류");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.diagnosis || "답변을 받아오지 못했습니다.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "답변을 받아오지 못했습니다. 잠시 후 다시 시도해 주세요.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommend = (text) => {
    if (!loading) setInput(text);
  };

  return (
    <Bg style={dark ? { background: "#23272f" } : {}}>
      <ChatContainer
        style={dark ? { background: "#2d3748", color: "#fff" } : {}}
      >
        <TopGuideCard
          style={dark ? { background: "#3a4a61", color: "#fff" } : {}}
        >
          <span>
            <FaHeartbeat style={{ marginRight: 12 }} />
            증상을 입력하면 AI가 예측 질환과 진료과를 추천해드려요!
          </span>
          <ThemeToggle
            onClick={() => setDark((d) => !d)}
            title="테마 변경"
            style={dark ? { color: "#fff" } : {}}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
        </TopGuideCard>
        <Messages>
          {messages.map((msg, idx) => (
            <MessageRow
              key={idx}
              style={
                msg.sender === "bot"
                  ? { alignSelf: "flex-start" }
                  : { alignSelf: "flex-end" }
              }
            >
              {msg.sender === "bot" && (
                <Avatar
                  sender="bot"
                  style={
                    dark
                      ? { background: "#3a4a61", color: "#fff", left: "-28px" }
                      : { left: "-28px" }
                  }
                >
                  <FaRobot />
                </Avatar>
              )}
              <MessageBubble
                sender={msg.sender}
                text={msg.text}
                bubbleStyle={{
                  marginLeft: msg.sender === "bot" ? 28 : 0,
                  marginRight: msg.sender === "user" ? 28 : 0,
                  position: "relative",
                  zIndex: 1,
                  ...(dark
                    ? {
                        background:
                          msg.sender === "user" ? "#3a4a61" : "#2d4362",
                        color: "#fff",
                      }
                    : {}),
                }}
                withTail
              />
              {msg.sender === "user" && (
                <Avatar
                  sender="user"
                  style={
                    dark
                      ? { background: "#3a4a61", color: "#fff", right: "-28px" }
                      : { right: "-28px" }
                  }
                >
                  <FaUser />
                </Avatar>
              )}
            </MessageRow>
          ))}
          {loading && (
            <LoadingDots>
              <Dot delay="0s" />
              <Dot delay="0.2s" />
              <Dot delay="0.4s" />
            </LoadingDots>
          )}
          <div ref={messagesEndRef} />
        </Messages>
        <ExampleCard
          style={dark ? { background: "#3a4a61", color: "#fff" } : {}}
        >
          <ExampleTitle style={dark ? { color: "#fff" } : {}}>
            <FaLightbulb style={{ marginRight: 8 }} />
            예시 질문 보기
          </ExampleTitle>
          <RecommendBox>
            {recommend.map((q, i) => (
              <RecommendBtn
                key={i}
                onClick={() => handleRecommend(q)}
                style={
                  dark
                    ? {
                        background: "#2d3748",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                        color: "#fff",
                      }
                    : {}
                }
              >
                {q}
              </RecommendBtn>
            ))}
          </RecommendBox>
        </ExampleCard>
        <EnterGuide style={dark ? { color: "#a0b0c5" } : {}}>
          엔터키로 전송할 수 있습니다.
        </EnterGuide>
        <InputArea
          onSubmit={handleSend}
          style={
            dark
              ? { background: "#2d3748", borderTop: "1px solid #3a4a61" }
              : {}
          }
        >
          <Input
            type="text"
            placeholder="증상을 입력하세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={
              dark
                ? {
                    background: "#3a4a61",
                    color: "#fff",
                    border: "1px solid #4a5568",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }
                : {}
            }
          />
          <SendButton
            type="submit"
            disabled={loading}
            title="전송"
            style={
              dark
                ? {
                    background: "#4a90e2",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                  }
                : {}
            }
          >
            <FaPaperPlane />
          </SendButton>
        </InputArea>
      </ChatContainer>
    </Bg>
  );
}

export default ChatBot;
