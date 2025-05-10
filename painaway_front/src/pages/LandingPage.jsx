import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import {
  FaHeartbeat,
  FaComments,
  FaStethoscope,
  FaUserMd,
  FaChevronRight,
  FaStar,
  FaQuoteLeft,
  FaQuestionCircle,
  FaChevronDown,
  FaRegListAlt,
  FaRegCommentDots,
  FaPaperPlane,
  FaRobot,
  FaClock,
} from "react-icons/fa";
import { useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
`;

const Navbar = styled.nav`
  width: 100vw;
  min-width: 360px;
  background: ${({ theme }) => theme?.colors?.primary || "#4A90E2"};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2.2rem 0.7rem 1.2rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
`;

const Logo = styled.div`
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.2rem 0.7rem;
  border-radius: 12px;
  transition: background 0.18s, color 0.18s;
  ${({ active }) =>
    active && `background: #fff; color: #4A90E2; font-weight: 800;`}
  &:hover {
    background: #e3f2fd;
    color: #4a90e2;
  }
`;

const SectionNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  background: rgba(74, 144, 226, 0.1);
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  @media (max-width: 1200px) {
    display: none;
  }
`;

const SectionNavLink = styled(ScrollLink)`
  background: ${(props) =>
    props.active ? "#4A90E2" : "rgba(255, 255, 255, 0.1)"};
  color: #4a90e2;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateX(-5px);
  }

  &.active {
    background: #4a90e2;
    color: white;
  }
`;

const Container = styled.div`
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme?.colors?.background || "#FFF8F0"};
  animation: ${fadeIn} 1.1s cubic-bezier(0.23, 1, 0.32, 1);
  scroll-snap-align: start;
  padding: 0 1rem;
  padding-top: 70px;
  box-sizing: border-box;
`;

const MainIcon = styled.div`
  font-size: 4.5rem;
  color: ${({ theme }) => theme?.colors?.primary || "#4A90E2"};
  margin-bottom: 1.2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme?.colors?.primary || "#4A90E2"};
  font-size: 2.7rem;
  margin-bottom: 0.7rem;
  font-weight: 800;
`;

const Description = styled.p`
  color: ${({ theme }) => theme?.colors?.text || "#333"};
  font-size: 1.18rem;
  margin-bottom: 2.2rem;
  text-align: center;
  line-height: 1.7;
`;

const Features = styled.div`
  display: flex;
  gap: 2.2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const FeatureIcon = styled.div`
  font-size: 2.2rem;
  color: ${({ theme }) => theme?.colors?.accent || "#FFD6A0"};
  margin-bottom: 0.5rem;
`;

const FeatureText = styled.div`
  color: #444;
  font-size: 1.02rem;
  text-align: center;
  font-weight: 500;
`;

const StartButton = styled.button`
  background: ${({ theme }) => theme?.colors?.accent || "#FFD6A0"};
  color: #333;
  border: none;
  border-radius: 18px;
  padding: 1.1rem 2.7rem;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.08);
  transition: background 0.2s, transform 0.18s, box-shadow 0.18s;
  &:hover {
    background: #ffe0b2;
    transform: translateY(-3px) scale(1.04);
    box-shadow: 0 6px 18px rgba(74, 144, 226, 0.13);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Section = styled.section`
  width: 100%;
  height: 85vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  scroll-snap-align: center;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #4a90e2;
  font-weight: 800;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
`;

const PageWrapper = styled.div`
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  min-height: 100vh;
  scroll-behavior: smooth;
  position: relative;
  scroll-padding: 0;
  padding-bottom: 2rem;
`;

const FlowBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin: 1.5rem 0 2.5rem 0;
  flex-wrap: wrap;
`;

const FlowStep = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(74, 144, 226, 0.07);
  padding: 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
  max-width: 200px;
  font-size: 1.05rem;
  font-weight: 500;
  color: #4a90e2;
  position: relative;
`;

const Arrow = styled(FaChevronRight)`
  font-size: 2rem;
  color: #ffd6a0;
  align-self: center;
`;

const ReviewBox = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1.5rem 0 2.5rem 0;
  max-width: 100%;
`;

const ReviewCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(74, 144, 226, 0.07);
  padding: 1.2rem 1.5rem;
  width: calc(33.333% - 1.5rem);
  min-width: 220px;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.02rem;
  color: #333;
  position: relative;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: calc(50% - 1.5rem);
    max-width: 45%;
  }

  @media (max-width: 576px) {
    width: 100%;
    max-width: 100%;
  }
`;

const ReviewStars = styled.div`
  color: #ffd6a0;
  margin-bottom: 0.3rem;
`;

const ReviewQuote = styled(FaQuoteLeft)`
  color: #ffd6a0;
  margin-right: 0.5rem;
`;

const FAQBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 1.5rem 0 2.5rem 0;
`;

const FAQItem = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.06);
  padding: 1rem 1.3rem;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  font-size: 1.01rem;
`;

const FeedbackForm = styled.form`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(74, 144, 226, 0.07);
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled.h3`
  color: #4a90e2;
  font-weight: 700;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const SubmitButton = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #3a80d2;
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: ${fadeIn} 0.3s, fadeOut 0.3s 2.7s;
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Footer = styled.footer`
  width: 100vw;
  text-align: center;
  color: #aaa;
  font-size: 0.98rem;
  padding: 2.5rem 0 1.2rem 0;
`;

const AssistantIntro = styled.div`
  background: ${(props) =>
    props.dark ? "rgba(255, 255, 255, 0.05)" : "#FFFFFF"};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 2rem 0;
  max-width: 800px;
  width: 100%;
`;

const AssistantIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #4a90e2;
`;

const AssistantName = styled.h2`
  color: ${(props) => (props.dark ? "#FFFFFF" : "#333333")};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const AssistantDescription = styled.p`
  color: ${(props) => (props.dark ? "#CCCCCC" : "#666666")};
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 제출 로직 추가 (서버로 전송 등)

    // 폼 초기화
    setName("");
    setEmail("");
    setFeedback("");

    // 토스트 메시지 표시
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <Navbar>
        <Logo onClick={() => navigate("/")}>
          <FaHeartbeat style={{ fontSize: "1.3em" }} /> PainAway
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

      <PageWrapper>
        <SectionNav>
          <SectionNavLink
            to="main"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaHeartbeat /> 메인
          </SectionNavLink>
          <SectionNavLink
            to="assistant"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaStethoscope /> 휴 소개
          </SectionNavLink>
          <SectionNavLink
            to="flow"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaRegListAlt /> 이용절차
          </SectionNavLink>
          <SectionNavLink
            to="reviews"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaRegCommentDots /> 고객후기
          </SectionNavLink>
          <SectionNavLink
            to="faq"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaQuestionCircle /> 자주 묻는 질문
          </SectionNavLink>
          <SectionNavLink
            to="feedback"
            smooth={true}
            duration={800}
            spy={true}
            activeClass="active"
            offset={-120}
          >
            <FaPaperPlane /> 건의사항
          </SectionNavLink>
        </SectionNav>

        {/* 메인 화면 */}
        <Element name="main" className="element">
          <Section>
            <Container>
              <MainIcon>
                <FaHeartbeat style={{ marginTop: "0.8em" }} />
              </MainIcon>
              <Title>통증 예측 서비스 PainAway</Title>
              <Description>
                PainAway는 증상을 입력하면 휴가 예상 질환과 진료과를 <br />
                추천해주는 건강 상담 서비스입니다.
              </Description>
              <Features>
                <Feature>
                  <FeatureIcon>
                    <FaComments />
                  </FeatureIcon>
                  <FeatureText>
                    간편한 챗봇
                    <br /> 상담
                  </FeatureText>
                </Feature>
                <Feature>
                  <FeatureIcon>
                    <FaStethoscope />
                  </FeatureIcon>
                  <FeatureText>
                    AI 기반 질환 <br />
                    예측
                  </FeatureText>
                </Feature>
                <Feature>
                  <FeatureIcon>
                    <FaUserMd />
                  </FeatureIcon>
                  <FeatureText>
                    추천 진료과 <br />
                    정보 제공
                  </FeatureText>
                </Feature>
                <Feature>
                  <FeatureIcon>
                    <FaHeartbeat />
                  </FeatureIcon>
                  <FeatureText>
                    따뜻한 상담 <br />
                    경험
                  </FeatureText>
                </Feature>
              </Features>
              <StartButton onClick={() => navigate("/chat")}>
                휴와 상담 시작하기
              </StartButton>
            </Container>
          </Section>
        </Element>

        {/* 휴 소개 섹션 */}
        <Element name="assistant" className="element">
          <Section>
            <AssistantIntro dark={darkMode}>
              <AssistantIcon>
                <FaStethoscope />
              </AssistantIcon>
              <AssistantName>휴와 함께하는 건강 상담</AssistantName>
              <AssistantDescription>
                '휴🥰'는 휴식, 회복, 치유의 의미를 담은 AI 건강 상담사입니다.
                <br />
                여러분의 증상을 친절하게 듣고,{" "}
                <strong>Hidoc 전문가의 답변 데이터</strong>를 바탕으로
                <br />
                전문적인 건강 상담을 제공합니다.
                <br />
                언제든 편안하게 찾아주세요. 휴가 당신의 건강한 하루를 위해
                돕겠습니다.
              </AssistantDescription>
            </AssistantIntro>
          </Section>
        </Element>

        {/* 이용 절차 */}
        <Element name="flow" className="element">
          <Section>
            <SectionTitle>이용 절차</SectionTitle>
            <FlowBox>
              <FlowStep>
                <FaComments size={32} style={{ marginBottom: 8 }} />
                증상 입력
              </FlowStep>
              <Arrow />
              <FlowStep>
                <FaStethoscope size={32} style={{ marginBottom: 8 }} />
                AI 분석
              </FlowStep>
              <Arrow />
              <FlowStep>
                <FaUserMd size={32} style={{ marginBottom: 8 }} />
                결과 안내
              </FlowStep>
            </FlowBox>
          </Section>
        </Element>

        {/* 고객 후기 */}
        <Element name="reviews" className="element">
          <Section>
            <SectionTitle>고객 후기</SectionTitle>
            <ReviewBox>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "빠르고 친절하게 안내받아 진료를 잘 받았어요!"
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 김OO (30대 여성)
                </div>
              </ReviewCard>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "병원을 어디로 가야할지 몰랐는데 큰 도움이 됐어요."
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 이OO (20대 남성)
                </div>
              </ReviewCard>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "AI가 생각보다 정확해서 신뢰가 갑니다."
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 박OO (40대 여성)
                </div>
              </ReviewCard>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "급한 상황에서 정말 큰 도움이 되었습니다. 빠른 진료과 안내에
                  감사해요."
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 최OO (30대 남성)
                </div>
              </ReviewCard>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "아이가 갑자기 아파서 당황했는데, 어느 병원을 가야할지
                  알려주어 감사했어요!"
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 정OO (40대 여성)
                </div>
              </ReviewCard>
              <ReviewCard>
                <ReviewStars>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </ReviewStars>
                <div>
                  <ReviewQuote />
                  "상담이 간결하고 이해하기 쉬웠어요. 건강 관리에 많은 도움이
                  됩니다."
                </div>
                <div
                  style={{ marginTop: 8, color: "#4A90E2", fontWeight: 700 }}
                >
                  - 윤OO (20대 남성)
                </div>
              </ReviewCard>
            </ReviewBox>
          </Section>
        </Element>

        {/* FAQ */}
        <Element name="faq" className="element">
          <Section>
            <SectionTitle>자주 묻는 질문</SectionTitle>
            <FAQBox>
              <FAQItem>
                <FaQuestionCircle size={22} style={{ marginTop: 2 }} />
                <b style={{ marginRight: 8 }}>정확한가요?</b>휴가 Hidoc 전문가의
                답변 데이터를 바탕으로 예측하지만, 참고용으로만 활용해 주세요.
              </FAQItem>
              <FAQItem>
                <FaQuestionCircle size={22} style={{ marginTop: 2 }} />
                <b style={{ marginRight: 8 }}>무료인가요?</b>네, PainAway는
                누구나 무료로 이용할 수 있습니다.
              </FAQItem>
              <FAQItem>
                <FaQuestionCircle size={22} style={{ marginTop: 2 }} />
                <b style={{ marginRight: 8 }}>개인정보는 안전한가요?</b>입력하신
                증상 정보는 진단 외 다른 용도로 사용되지 않습니다.
              </FAQItem>
            </FAQBox>
          </Section>
        </Element>

        {/* 건의사항 폼 */}
        <Element name="feedback" className="element">
          <Section>
            <SectionTitle>건의사항</SectionTitle>
            <FeedbackForm onSubmit={handleSubmit}>
              <FormTitle>소중한 의견을 들려주세요</FormTitle>
              <FormInput
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormInput
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormTextarea
                placeholder="건의사항을 입력해주세요"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <SubmitButton type="submit">
                <FaPaperPlane /> 보내기
              </SubmitButton>
            </FeedbackForm>
          </Section>
        </Element>

        {/* 토스트 메시지 */}
        <Toast className={showToast ? "show" : ""}>
          의견이 전달되었습니다. 소중한 의견 감사합니다!
        </Toast>

        {/* 푸터 */}
        <Footer>
          © 2024 PainAway. All rights reserved.
          <br />
          문의사항: @gmail.com
        </Footer>
      </PageWrapper>
    </>
  );
}

export default LandingPage;
