import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

const ItemWrapper = styled.div`
  min-height: 100vh;
  padding: var(--section-padding) 6vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--color-bg);
  @media (max-width: 600px) {
    padding: var(--section-padding) 4vw;
  }
`;

const BackLink = styled(Link)`
  font-size: 0.95rem;
  color: var(--color-accent);
  margin-bottom: 2rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const ItemTitle = styled.h1`
  font-size: clamp(2.2rem, 6vw, 3.2rem);
  font-family: var(--font-secondary);
  margin-bottom: 1rem;
`;

const ItemImg = styled.img`
  width: 100%;
  max-width: 600px;
  border-radius: 1.2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const ItemDesc = styled.p`
  font-size: 1.1rem;
  color: var(--color-muted);
  max-width: 60ch;
`;

// Placeholder data; in production, fetch from CMS or API
const galleryItems = [
  {
    id: 'minibar',
    title: 'Kids Minibar',
    image: '/Kids Minibar/cover.jpg',
    desc: 'A playful minibar concept designed to delight young guests with healthy snacks, creative packaging, and interactive surprises.'
  },
  // Add more items here as needed
];

const GalleryItem = () => {
  const { itemId } = useParams();
  const item = galleryItems.find(i => i.id === itemId);
  if (!item) return <ItemWrapper>Item not found.</ItemWrapper>;
  return (
    <ItemWrapper>
      <BackLink to="/">← Back to Home</BackLink>
      <ItemTitle>{item.title}</ItemTitle>
      <ItemImg src={item.image} alt={item.title} />
      <ItemDesc>{item.desc}</ItemDesc>
    </ItemWrapper>
  );
};

export default GalleryItem;
