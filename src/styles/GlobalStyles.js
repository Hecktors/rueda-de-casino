import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        --color-primary: #121212;
        --color-text: #e5e5e5;
        --color-main-button: transparent;
        --color-selected: orange;
        --color-active: #e5e5e5;
        --color-disabled: #666;
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
        color:  var(--color-text);
        background-color: var(--color-primary);
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        background-color: transparent;
        color:  var(--color-text);
        font-size: 2.5rem;

        &:active,
        &:hover {
        opacity: 0.8;
        }
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
    }
`
