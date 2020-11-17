import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
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
`
