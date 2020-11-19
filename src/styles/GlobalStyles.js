import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        --primary-color: #121212;
        --text-color: #e5e5e5;
        --running-header-color: #e5e5e5;
        --default-header-color: #e5e5e5;
        --main-button-color: transparent;
        --icon-color: #e5e5e5;
    }
    * {
        box-sizing: border-box;
        margin: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: 'Helvetica';
        font-size: 112.5%;
        color:  var(--text-color);
        background-color: var(--primary-color);
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        background-color: transparent;

        &:active,
        &:hover {
        opacity: 0.8;
        }
    }
`