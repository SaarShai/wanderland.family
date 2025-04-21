import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GallerySection = styled.section`
  background: #fafbfc;
  padding: var(--section-padding) 6vw;
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const GalleryTitle = styled.h2`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-family: var(--font-secondary);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const GalleryDesc = styled.p`
  font-size: 0.95rem;
  color: var(--color-muted);
  max-width: 40ch;
  margin-bottom: 2.5rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
  @media (max-width: 600px) {
    gap: 1.4rem;
  }
`;

const GalleryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  text-decoration: none;
  color: var(--color-text);
  transition: transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 8px 32px rgba(30,144,255,0.08);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h3`
  font-family: var(--font-secondary);
  font-size: 1.3rem;
  margin: 1.1rem 1.2rem 0.5rem 1.2rem;
`;

const CardDesc = styled.p`
  font-size: 0.92rem;
  color: var(--color-muted);
  margin: 0 1.2rem 1.2rem 1.2rem;
`;

// Placeholder gallery data
const galleryItems = [
  {
    id: 'minibar',
    title: 'Kids Minibar',
    image: '/Kids Minibar/cover.jpg',
    desc: 'A playful minibar concept for young guests.'
  },
  // More items can be added here
];

const Gallery = () => (
  <GallerySection id="gallery">
    <GalleryTitle>Gallery</GalleryTitle>
    <GalleryDesc>
      Explore our innovative concepts and products designed for kids and teens in hospitality.
    </GalleryDesc>
    <GalleryGrid>
      {galleryItems.map(item => (
        <GalleryCard to={`/gallery/${item.id}`} key={item.id}>
          <CardImage src={item.image} alt={item.title} />
          <CardTitle>{item.title}</CardTitle>
          <CardDesc>{item.desc}</CardDesc>
        </GalleryCard>
      ))}
    </GalleryGrid>
  </GallerySection>
);

export default Gallery;
