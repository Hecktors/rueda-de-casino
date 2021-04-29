import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #d04b1f;
        --color-primary-lighter: #df5426;
        --color-secondary: #2ca3d2;
        --color-text: #999;
        --color-bg: #0e0e15;
        --color-bg-dark : #000;
        --color-bg-dark-transparent: rgba(0, 0, 0, 0.8);
        --color-disabled: #333;
        --color-warning: #f53030;
        /* Body */
        --color-bg-body: linear-gradient(to top, #0575e6, #021b79); 
        /* Header */
        --color-title: #929292;
        /* Accordion */
        --color-bg-accordion: #181826;        
        --color-bg-accordion-title: #0b1644;
        --color-accordion-item: #999;
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
        background: var(--color-bg-body);
    }

    #root {
        display: flex;
        align-items: center;
    }

    .App {
        background-position: center 75%;
        background-size: contain;
        background-repeat: no-repeat;
        background-color: var(--color-bg);
        position: relative;
        height: 100%;
        width: 100%;
        max-width: 736px;
        max-height: 800px;
        margin: auto;
        display: grid;
        grid-template-rows: 80px auto 80px;
        overflow-y: scroll;

        &.session {
        grid-template-rows: 100px auto 160px;
        }
    }

    main { 
        flex-grow: 1;
        overflow-y: auto;
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

    label {
        font-size: 0.875rem;
        padding-bottom: 3px; 
    }

    input,
    select {
        width: 100%;
        padding: 7px 10px;
        font-size: 1rem;
        outline: none;
        border-radius: 3px;
        border: none;
        color: var(--color-input);
        background-color: var(--color-bg-input);
    }

    input:focus {
        box-shadow: inset 0px 0px 4px var(--color-secondary);
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    /* Change Autocomplete styles in Chrome*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--color-input);;
    transition: background-color 5000s ease-in-out 0s;
    }

    .dark-transparent {
        background-color: var(--color-bg-dark-transparent);
    }

    .tac {
        text-align: center;
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
            grid-template-rows: 80px auto 80px !important; 
        }

        main {
            padding-top: 0 !important;
        }
    }

    @media screen and (min-width: 800px) {
        .App{
            border: 1px solid var(--color-border);
            border-radius: 5px;
            
            &.session {
            }
        }

        .desktop-only {
            display: block;
        }
    }

    @media (orientation: landscape) and (min-height: 500px) {
        .App {
           max-width:560px;

           &.session {
            grid-template-rows: 100px auto 160px !important;
            }
        }
    }
`
