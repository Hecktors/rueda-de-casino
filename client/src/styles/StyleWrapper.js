import GlobalStyles from './GlobalStyles'
import styled from 'styled-components/macro'

export default function StyleWrapper({ children }) {
  return (
    <body>
      <WrapperStyled>
        <GlobalStyles />
        {children}
      </WrapperStyled>
    </body>
  )
}

const WrapperStyled = styled.div`
  padding: 20px; ;
`
