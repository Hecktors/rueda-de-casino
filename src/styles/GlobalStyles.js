import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

    :root {
        --color-bg: #121212;
        --color-bg-dropdown: #201e1e;
        --color-text: #a0a0a0;
        --color-title: #ff7109;
        --color-move: #9116a6;
        --color-button: #d90000;
        --color-message: #a66767;
        --color-selected: #ff7109;
        --color-disabled: #999;
        --color-active: #e5e5e5;
        --color-passive: #999;
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
        background-color: var(--color-bg);
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
