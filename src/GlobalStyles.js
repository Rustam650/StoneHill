import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Подключение шрифта SF Pro Expanded Regular */
  @font-face {
    font-family: 'SfPro-ExpandedRegular';
    src: url('/fonts/SF-Pro.ttf') format('truetype');
    font-weight: 400; /* Regular */
    font-style: normal;
  }
    

  /* Сброс базовых стилей */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Базовые стили для body */
  body {
    font-family: 'SfPro-ExpandedRegular', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    background-color: #222222; /* Основной фон */
    color: #ffffff; /* Основной цвет текста */
    overflow-x: hidden; /* Отключение горизонтальной прокрутки */
  }

  /* Стили для заголовков */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'SfPro-ExpandedRegular', sans-serif;
    margin: 0;
    color: #ffffff;
  }

  /* Стили для ссылок */
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  /* Стили для кнопок */
  button {
    font-family: 'SfPro-ExpandedRegular', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  /* Стили для списков */
  ul, ol {
    list-style: none;
    padding: 0;
  }

  /* Стили для изображений */
  img {
    max-width: 100%;
    display: block;
  }
`;

export default GlobalStyles;