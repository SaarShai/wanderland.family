import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-primary: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    --font-secondary: 'Playfair Display', serif;
    --color-bg: #fff;
    --color-text: #111;
    --color-accent: #1e90ff;
    --color-muted: #888;
    --section-padding: clamp(2rem, 6vw, 6rem);
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-primary);
    font-size: 18px;
    line-height: 1.6;
    scroll-behavior: smooth;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: 700;
    margin: 0 0 0.5em 0;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0 0 1.5em 0;
    font-size: 1rem;
    color: var(--color-muted);
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: var(--color-text);
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    padding: var(--section-padding) 0;
  }
`;

export default GlobalStyle;
