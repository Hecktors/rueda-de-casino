import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-title: #929292;
        --color-logo: #c6099c;
        --color-primary: #c65909;
        --color-secondary: #2ca3d2;
        --color-tertiary: #0550ff;
        --color-text: #999;
        --color-bg: #11141d;
        --color-bg-dark : #000;
        --color-bg-dark-transparent: rgba(0, 0, 0, 0.8);
        --color-disabled: #333;
        --color-warning: #f53030;

        /* Accordion */
        --color-bg-accordion: #222637;
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
        /* --color-bg-overlay-paused: #020510d9; */
        --color-bg-overlay-paused: rgba(0, 0, 0, 0.8);
        /* Experimental */
        /* --color-primary: #c65909; */
        --color-logo: #c65909;
        --color-bg: #0e0e15;
        --color-bg-accordion: #181826;        
    }

    * {
        box-sizing: border-box;
        margin: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        font-size: 112.5%;
        color:  var(--color-text);
        background-color: var(--color-bg);
    }

    #root {
        display: flex;
        align-items: center;
    }

    .App {
        height: 100%;
        width: 100%;
        max-width: 800px;
        position: relative;
        display: flex;
        flex-direction: column;
        margin: auto;
        display: grid;
        grid-template-rows: 80px auto 100px;
    }

    main { 
        flex-grow: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        overflow-x: hidden;
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

    label {
        font-size: 1rem;
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
    }

    .dark {
        background-color: var(--color-bg-dark);
    }

    .tar {
        text-align: right;
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
`