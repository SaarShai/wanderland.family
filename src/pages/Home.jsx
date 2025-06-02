import React from 'react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import styled from 'styled-components';

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
  background: #f7f9fa;
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
  margin-left: 6vw;
  max-width: 520px;
  z-index: 2;
  @media (max-width: 900px) {
    margin-left: 4vw;
    max-width: 90vw;
    margin-bottom: 2rem;
  }
`;

const HeroImageWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  @media (max-width: 900px) {
    width: 100vw;
    height: 260px;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;

const HeroImage = styled.img`
  width: 380px;
  max-width: 45vw;
  height: auto;
  border-radius: 1.5rem;
  box-shadow: 0 8px 40px rgba(30,30,60,0.13);
  border: 2px solid #fff;
  background: #fff;
  object-fit: cover;
  @media (max-width: 900px) {
    width: 90vw;
    max-width: 90vw;
    height: 240px;
    border-radius: 1.2rem;
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
        <HeroTitle>Designs for Young Explorers</HeroTitle>
        <HeroSubtitle>
          We help hotels create unforgettable experiences for kids and teens. Our unique, research-driven concepts inspire, engage, and delight families worldwide.
        </HeroSubtitle>
      </HeroContent>
      <HeroImageWrapper>
        <HeroImage src="/src/assets/images/hero image.png" alt="Wanderland Studio Hero" />
        <HeroOverlay />
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
