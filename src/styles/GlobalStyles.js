import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

    :root {
        --bg-color: #121212;
        --bg-color-accordion: #201e1e;
        --color-text: #ccc;
        --color-button: #fff;
        --color-disabled: #333;
        --color-listitem: #999;
        --color-listitem-active: #ff7109;
        --color-move: #ff7109;
        --color-title: #ff7109;
        --color-warning: #d15353;
        --color-success: green;
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
        background-color: var(--bg-color);
    }

    main { 
        place-items: center;
        padding: 10px;
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

    .warning {
        color: var(--color-warning)
    }

    .success {
        color: var(--color-success)
    }
`
