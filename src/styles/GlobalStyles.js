import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        --primary-color: #121212;
        --text-color: #e5e5e5;
        --icon-color: var(--text-color);
        --main-button-color: transparent;
        --move-list-pause-color: #8d8d8d;
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
    .error-msg {
        padding: 20px;
        color: red;
        font-family: monospace
    }
`
