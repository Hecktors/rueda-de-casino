import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #ff7109;
        --bg-color: #181b27;
        --color: #bbb;
        /* Title */
        --color-title: #bbb;
        /* Accordion */
        --bg-color-accordion: #262b34;
        --color-accordion-title: #2ca3d2;
        --color-accordion-item: #bbb;
        --color-accordion-item-active: #ff7109;
        /* Buttons */
        --color-button: #2ca3d2;
        --color-disabled: #333;
        /* Current move */
        --color-move: #ff7109;
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
        font-family: 'Open Sans', sans-serif;

        font-size: 112.5%;
        color:  var(--color);
        background-color: var(--bg-color);
    }

    main { 
        place-items: center;
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        background-color: transparent;
        color:  var(--color-text);
        font-size: 1.5rem;

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
