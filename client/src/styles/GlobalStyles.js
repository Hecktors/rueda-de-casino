import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #d04b1f;
        --color-secondary: #2ca3d2;
        --color-text: #999;
        --color-text-active: #df5426;
        --color-bg: rgb(7, 7, 17);
        --color-bg-dark : #000;
        --color-bg-dark-transparent: rgba(0, 0, 0, 0.8);
        --color-disabled: #333;
        --color-warning: #f53030;

        /* Body */
        --color-bg-body: var(--color-bg); 

        /* Header */
        --color-title: #929292;

        /* Accordion */
        --color-bg-accordion: rgba(7, 7, 17, 0.8);
        --color-bg-accordion: rgba(2, 190, 255, 0.05);

        /* Message */
        --color-message: #666;
        --color-bg-message: #0f1118d9;

        /* Border */
        --color-border: #9999993d;

        /* Overlay */
        --color-bg-overlay: rgba(0, 0, 0, 0.7);
        --color-bg-overlay-full: #000;

        /* Selected Moves List */
        --color-selected-movelist: #2ca3d2;
        --color-bg-overlay-paused: rgba(0, 0, 0, 0.85);

        /* Edit Form */
        --color-select: #ccc;
        --color-bg-select: #0e0e15;

        /* Input */
        --color-input: #ccc;
        --color-bg-input: #080814;
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        font-size: 112.5%;
        color:  var(--color-text);
        background: var(--color-bg-body);
    }

    #root {
        display: flex;
        align-items: center;
    }

    main { 
        flex-grow: 1;
        overflow-y: auto;

        @media (orientation: landscape) {
                padding-top: 0 !important;
        }
    }

    ul {
        padding: 0;
    }

    li {
        list-style: none;
    }

    a, .link {
        cursor: pointer;
        text-decoration: unset;
        color: var(--color-secondary)
    }

    a, .link:hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;

        &:active,
        &:hover {
        opacity: 0.8;
        }
    }

    input {
        color:  var(--color-text);

    }
    input:-webkit-autofill { 
        box-shadow: 0 0 0 30px #070711 inset !important;
        -webkit-box-shadow: 0 0 0 30px #070711 inset !important;
        -webkit-text-fill-color: var(--color-text) !important;

    }

    .dark-transparent {
        background-color: var(--color-bg-dark-transparent);
    }

    .tac {
        text-align: center;
    }
`
