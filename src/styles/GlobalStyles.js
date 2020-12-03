import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
    :root {
        /* General */
        --color-primary: #ff7109;
        --bg-color: #181b27;
        --color: #bbb;
        /* Title */
        --color-title: #bbb;
        /* Accordion */
        --bg-color-accordion: #222637;
        --color-accordion-title: #2ca3d2;
        --bg-color-accordion-title: #0b1644;
        --color-accordion-title-active: #ff7109;
        --color-accordion-item: #999;
        --color-accordion-item-active: #ff7109;
        /* Buttons */
        --color-button: #2ca3d2;
        --color-disabled: #333;
        /* Current move */
        --color-move: #ff7109;
        /* Message */
        --color-message: #666;
        --bg-color-message: #0f1118d9;
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
        color:  var(--color);
        background-color: var(--bg-color);
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
        color:  var(--color-text);
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
        background-color: #000;
    }
    
`
