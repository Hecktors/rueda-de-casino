import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root {
        --primery-color: #0C0804;
        --text-color: hotpink;
        --running-header-color: #17ed17;
        --default-heder-color: hotpink;
        --icon-color: #e5e5e5;
    }
    * {
        box-sizing: border-box;
        margin: 0;
    }

    html, body, #root {
        height: 100%;
    }
    button {
        cursor: pointer;
        outline: none;
        border: none;
        padding: 0;
        background-color: transparent;

        &:active,
        &:hover {
        opacity: 0.8;
        }
    }
`
