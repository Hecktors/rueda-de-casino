import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #ff7109;
        --color-secondary: #2ca3d2;
        --color-bg: #181b27;
        --color-bg-dark : #020510;
        --color-text: #bbb;
        --color-disabled: #333;
        /* Accordion */
        --color-bg-accordion: #222637;
        --color-bg-accordion-title: #0b1644;
        --color-accordion-item: #999;
        /* Message */
        --color-message: #666;
        --color-bg-message: #0f1118d9;
        --color-bg-overlay: #020510b3;
        --color-bg-overlay-full: #000;
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

    main { 
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        overflow-x: hidden;
        
        .absolute {
            position: absolute
        }
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
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
    
`
