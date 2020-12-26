import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #d04b1f;
        --color-secondary: #2ca3d2;
        --color-text: #999;
        --color-bg: #0e0e15;
        --color-bg-dark : #000;
        --color-bg-dark-transparent: rgba(0, 0, 0, 0.8);
        --color-disabled: #333;
        --color-warning: #f53030;
        /* Header */
        --color-title: #929292;
        /* Accordion */
        --color-bg-accordion: #181826;        
        --color-bg-accordion-title: #0b1644;
        --color-accordion-item: #999;
        /* Message */
        --color-message: #666;
        --color-bg-message: #0f1118d9;
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
        --color-bg-input: #282b3f;
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
        background-color: var(--color-bg);
        background-image: url('./assets/img/dancing.svg');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    #root {
        display: flex;
        align-items: center;
    }

    .App {
        position: relative;
        height: 100%;
        width: 100%;
        max-width: 736px;
        margin: auto;
        display: grid;
        grid-template-rows: 100px auto 100px;

        &.no-footer {
        grid-template-rows: 100px auto;
        }
    }

    main { 
        flex-grow: 1;
        overflow-y: auto;
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: transparent;
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

    a, .link {
        text-decoration: unset;
        color: var(--color-secondary)
    }

    label {
        font-size: 1.2rem;
    }

    input,
    select {
        width: 100%;
        padding: 10px;
        font-size: 1.1rem;
        outline: none;
        border: none;
        color: var(--color-input);
        background-color: var(--color-bg-input);
    }

    /* .input-icon {
        position: absolute;
        top: 54%;
        right: 10px;
        transform: translateY(-50%)
    } */

    .dark {
        background-color: var(--color-bg-dark);
    }

    .tac {
        text-align: center;
    }

    .tar {
        text-align: right;
    }

    .pos {
        position: relative;
    }

    .top-right {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .top-left {
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .desktop-only {
        display: none;
        position: absolute;
        width:100%;
        text-align: center;
        top: -10vh;
        left: 0;
    }

    @media (orientation: landscape) {
        .App {
            max-height: 414px !important;
            grid-template-rows: 80px auto 80px;
        }

        main {
            padding-top: 0 !important;
        }
    }

    @media screen and (min-width: 800px) {
        .desktop-only {
            display: block;
        }
    }
`
