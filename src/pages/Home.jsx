import React from 'react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import styled from 'styled-components';
import beforeImg from '../assets/images/website-castleroom-before.jpg';
import afterImg from '../assets/images/website-castleroom-after.jpg';

const AboutSectionTitle = styled.h2`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-family: var(--font-secondary);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const AboutSectionDesc = styled.p`
  font-size: 0.95rem;
  color: var(--color-muted);
  max-width: 40ch;
`;

const AboutSection = styled.section`
  padding: var(--section-padding) 6vw;
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const ApproachSection = styled.section`
  padding: var(--section-padding) 6vw;
  background: #f7f9fa;
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const ContactSection = styled.section`
  padding: var(--section-padding) 6vw;
  background: #fff;
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const ContactLink = styled.a`
  font-size: 1.1rem;
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    color: var(--color-text);
  }
`;


const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  background: #fff;
  padding-top: 6rem;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 55vh;
    padding-top: 4rem;
  }
`;

const HeroContent = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 8vw;
  z-index: 2;
  @media (max-width: 1200px) {
    padding-left: 4vw;
  }
  @media (max-width: 900px) {
    padding-left: 2vw;
    padding-top: 4.5rem;
    align-items: center;
    text-align: center;
  }
  @media (max-width: 600px) {
    padding-left: 0;
    padding-top: 2.5rem;
  }
`;

const HeroImageWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  gap: 2.5rem;
  padding-right: 6vw;
  @media (max-width: 1200px) {
    gap: 1.2rem;
    padding-right: 4vw;
  }
  @media (max-width: 900px) {
    gap: 0.8rem;
    padding-right: 4vw;
  }
  @media (max-width: 600px) {
    gap: 0.5rem;
    padding-right: 0;
  }
  @media (max-width: 400px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FloatingImageContainer = styled.div`
  border-radius: 1.5rem;
  box-shadow: 0 8px 40px rgba(30,30,60,0.18);
  background: #fff;
  border: 2px solid #fff;
  overflow: hidden;
  width: 240px;
  aspect-ratio: 6/5;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatAnim 7s ease-in-out infinite;
  position: relative;
  @media (max-width: 1200px) {
    width: 140px;
  }
  @media (max-width: 900px) {
    width: 38vw;
    border-radius: 1.2rem;
  }
  @media (max-width: 600px) {
    width: 44vw;
  }
  @media (max-width: 400px) {
    width: 90vw;
  }
  @keyframes floatAnim {
    0% { transform: translateY(0px) translateX(0px) scale(1); }
    20% { transform: translateY(-5px) translateX(3px) scale(1.01); }
    40% { transform: translateY(6px) translateX(-2px) scale(0.99); }
    60% { transform: translateY(-3px) translateX(2px) scale(1.02); }
    80% { transform: translateY(4px) translateX(-3px) scale(1); }
    100% { transform: translateY(0px) translateX(0px) scale(1); }
  }
`;

const FloatingImageContainerRight = styled(FloatingImageContainer)`
  animation-delay: 2.5s;
`;

const FloatingImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  @media (max-width: 900px) {
    height: 36px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.88) 60%, rgba(255,255,255,0.38) 100%);
  pointer-events: none;
  z-index: 1;
  @media (max-width: 900px) {
    background: linear-gradient(180deg, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0.4) 100%);
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.05;
  font-family: var(--font-secondary);
  color: var(--color-text);
  margin-bottom: 1.2rem;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-muted);
  max-width: 36ch;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-family: var(--font-secondary);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SectionDesc = styled.p`
  font-size: 0.95rem;
  color: var(--color-muted);
  max-width: 40ch;
`;

const Section = styled.section`
  padding: var(--section-padding) 6vw;
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const Home = () => (
  <>
    <Navbar />
    <HeroSection>
      <HeroContent>
        <HeroTitle>Introducing: The Divided Family Suite</HeroTitle>
        <HeroSubtitle>
          Convert any hotel room into a family-friendly suite for the parents and a magical kingdom for the kids.
        </HeroSubtitle>
      </HeroContent>
      <HeroImageWrapper>
  <FloatingImageContainer>
    <FloatingImg src={beforeImg} alt="Family Suite Before" />
  </FloatingImageContainer>
  <ArrowWrapper>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
      <path d="M8 24H40" stroke="#1e90ff" strokeWidth="3" strokeLinecap="round"/>
      <path d="M32 16L40 24L32 32" stroke="#1e90ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </ArrowWrapper>
  <FloatingImageContainerRight>
    <FloatingImg src={afterImg} alt="Family Suite After" />
  </FloatingImageContainerRight>
</HeroImageWrapper>
    </HeroSection>
    <AboutSection id="about">
      <AboutSectionTitle>Who We Are</AboutSectionTitle>
      <AboutSectionDesc>
        Wanderland Studio is a design agency specializing in hospitality and travel for the next generation. We work with leading hotel brands and independents to create playful, purposeful, and memorable spaces and programs for kids and teens.
      </AboutSectionDesc>
    </AboutSection>
    <Gallery />
    <ApproachSection id="approach">
      <SectionTitle>Our Approach</SectionTitle>
      <SectionDesc>
        We combine creativity, research, and deep hospitality expertise to design experiences that are both magical and practical. Our process is collaborative, data-informed, and always focused on the guest journey.
      </SectionDesc>
    </ApproachSection>
    <ContactSection id="contact">
      <SectionTitle>Contact</SectionTitle>
      <SectionDesc>
        Ready to create something extraordinary for your young guests? <br />
        <ContactLink href="mailto:hello@wanderland.studio">hello@wanderland.studio</ContactLink>
      </SectionDesc>
    </ContactSection>
  </>
);

export default Home;
