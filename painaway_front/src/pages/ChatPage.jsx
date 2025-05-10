import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHeartbeat,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaLightbulb,
  FaSun,
  FaMoon,
  FaStethoscope,
} from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typing = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

const Navbar = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme?.colors?.primary || "#4A90E2"};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  ${({ active }) =>
    active && `background: rgba(255, 255, 255, 0.2); font-weight: 700;`}

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ChatPageContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => (props.dark ? "#1A202C" : "#F7FAFC")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 1rem 1rem 1rem;
  transition: background 0.3s ease;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: calc(100vh - 100px);
  background: ${(props) => (props.dark ? "#2D3748" : "#FFFFFF")};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
  transition: background 0.3s ease;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2rem;
  background: ${(props) => (props.dark ? "#4A5568" : "#EBF4FF")};
  color: ${(props) => (props.dark ? "#FFFFFF" : "#4A90E2")};
  border-bottom: 1px solid ${(props) => (props.dark ? "#4A5568" : "#E2E8F0")};
  transition: all 0.3s ease;
`;

const ChatTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const ThemeToggle = styled.button`
  background: ${(props) =>
    props.dark ? "rgba(255, 255, 255, 0.1)" : "rgba(74, 144, 226, 0.1)"};
  border: none;
  color: ${(props) => (props.dark ? "#FFFFFF" : "#4A90E2")};
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.8rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  gap: 0.4rem;

  &:hover {
    background: ${(props) =>
      props.dark ? "rgba(255, 255, 255, 0.2)" : "rgba(74, 144, 226, 0.2)"};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.dark ? "#4A5568" : "#CBD5E0")};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 80%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  background: ${(props) =>
    props.isUser
      ? props.dark
        ? "#553C9A"
        : "#4A90E2"
      : props.dark
      ? "#4A5568"
      : "#F0F5FF"};
  color: ${(props) =>
    props.isUser ? "#FFFFFF" : props.dark ? "#FFFFFF" : "#333333"};
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border-bottom-${(props) => (props.isUser ? "right" : "left")}-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 100%;
  word-wrap: break-word;
  position: relative;
  
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.isUser
      ? props.dark
        ? "#553C9A"
        : "#4A90E2"
      : props.dark
      ? "#4A5568"
      : "#F0F5FF"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${(props) =>
    props.isUser ? "#FFFFFF" : props.dark ? "#FFFFFF" : "#4A90E2"};
  margin-${(props) => (props.isUser ? "right" : "left")}: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SenderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
  color: ${(props) => (props.dark ? "#A0AEC0" : "#718096")};
  font-size: 0.85rem;
  font-weight: 600;
`;

const InputArea = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${(props) => (props.dark ? "#4A5568" : "#EBF4FF")};
  border-top: 1px solid ${(props) => (props.dark ? "#4A5568" : "#E2E8F0")};
  transition: background 0.3s ease;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.2rem;
  border: 1px solid ${(props) => (props.dark ? "#4A5568" : "#E2E8F0")};
  border-radius: 12px;
  background: ${(props) => (props.dark ? "#2D3748" : "#FFFFFF")};
  color: ${(props) => (props.dark ? "#FFFFFF" : "#333333")};
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  &::placeholder {
    color: ${(props) => (props.dark ? "#A0AEC0" : "#A0AEC0")};
  }
`;

const SendButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background: #3a7bc8;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const SuggestionsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  justify-content: center;
`;

const Suggestion = styled.button`
  background: ${(props) => (props.dark ? "#4A5568" : "#EBF4FF")};
  color: ${(props) => (props.dark ? "#FFFFFF" : "#4A90E2")};
  border: 1px solid ${(props) => (props.dark ? "#4A5568" : "#BEE3F8")};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.dark ? "#2D3748" : "#BEE3F8")};
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: ${(props) => (props.dark ? "#4A5568" : "#F0F5FF")};
  border-radius: 16px;
  width: fit-content;
  margin-top: 0.5rem;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${(props) => (props.dark ? "#A0AEC0" : "#4A90E2")};
  border-radius: 50%;
  animation: ${typing} 1.4s infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.dark ? "#4A5568" : "#F0F5FF")};
  padding: 1rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  text-align: center;

  h3 {
    color: ${(props) => (props.dark ? "#FFFFFF" : "#4A90E2")};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: ${(props) => (props.dark ? "#E2E8F0" : "#718096")};
    margin-bottom: 1rem;
  }
`;

const suggestions = [
  "머리가 아파요",
  "위장이 아픕니다",
  "기침이 심해요",
  "열이 나요",
  "목이 따끔해요",
  "허리가 아파요",
];

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: "안녕하세요! 저는 휴입니다.😊 어떤 통증이나 증상이 있으신가요?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 사용자 메시지 추가
    const userMessage = {
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // API 호출
      const response = await fetch("server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptom: input }),
      });

      if (!response.ok) {
        console.error("서버 응답 오류:", response.status, response.statusText);
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();
      console.log("서버 응답:", data); // 디버깅을 위한 로그 추가

      // 봇 응답 추가
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content:
              data.diagnosis ||
              "답변을 받아오지 못했습니다. 다시 시도해 주세요.",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1000); // 자연스러운 응답을 위한 딜레이
    } catch (error) {
      console.error("Error:", error);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            content:
              "죄송합니다. 서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해 주세요.",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Navbar>
        <Logo onClick={() => navigate("/")}>
          <FaHeartbeat /> PainAway
        </Logo>
        <NavLinks>
          <NavLink
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
          >
            홈
          </NavLink>
          <NavLink
            active={location.pathname === "/chat"}
            onClick={() => navigate("/chat")}
          >
            휴와 상담하기
          </NavLink>
        </NavLinks>
      </Navbar>

      <ChatPageContainer dark={darkMode}>
        <ChatContainer dark={darkMode}>
          <ChatHeader dark={darkMode}>
            <ChatTitle>
              <FaStethoscope /> 휴와 건강 상담
            </ChatTitle>
            <ThemeToggle dark={darkMode} onClick={toggleDarkMode}>
              {darkMode ? (
                <>
                  <FaSun /> 라이트 모드
                </>
              ) : (
                <>
                  <FaMoon /> 다크 모드
                </>
              )}
            </ThemeToggle>
          </ChatHeader>

          <MessagesContainer dark={darkMode}>
            <Guide dark={darkMode}>
              <h3>
                <FaLightbulb /> 이렇게 이용하세요
              </h3>
              <p>
                휴에게 증상을 자세히 설명해 주세요.
                <br />
                <strong>Hidoc 전문가의 답변 데이터</strong>를 바탕으로 예상
                질환과 추천 진료과를 알려드립니다.
              </p>
              <p>
                <strong>
                  이 서비스는 의료 자문이 아닌 참고용입니다. 정확한 진단은
                  의사와 상담하세요.
                </strong>
                <br />
                <br />
                문의: yooncount@gmail.com
              </p>
            </Guide>

            {messages.map((message, index) => (
              <MessageGroup key={index} isUser={message.sender === "user"}>
                <SenderInfo dark={darkMode}>
                  <Avatar isUser={message.sender === "user"} dark={darkMode}>
                    {message.sender === "user" ? <FaUser /> : <FaStethoscope />}
                  </Avatar>
                  {message.sender === "user" ? "나" : "휴"}
                </SenderInfo>

                <MessageBubble
                  isUser={message.sender === "user"}
                  dark={darkMode}
                >
                  {message.content}
                </MessageBubble>
              </MessageGroup>
            ))}

            {isLoading && (
              <TypingIndicator dark={darkMode}>
                <TypingDot dark={darkMode} delay={0} />
                <TypingDot dark={darkMode} delay={0.2} />
                <TypingDot dark={darkMode} delay={0.4} />
              </TypingIndicator>
            )}

            <div ref={messagesEndRef} />
          </MessagesContainer>

          <SuggestionsArea>
            {suggestions.map((suggestion, index) => (
              <Suggestion
                key={index}
                dark={darkMode}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Suggestion>
            ))}
          </SuggestionsArea>

          <InputArea dark={darkMode} onSubmit={handleSendMessage}>
            <Input
              type="text"
              placeholder="증상을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              dark={darkMode}
            />
            <SendButton type="submit" disabled={isLoading}>
              <FaPaperPlane />
            </SendButton>
          </InputArea>
        </ChatContainer>
      </ChatPageContainer>
    </>
  );
}

export default ChatPage;
