import styled from 'styled-components/macro'

export default function Layout({ children }) {
  return <LayoutStyled>{children}</LayoutStyled>
}

const LayoutStyled = styled.div`
  height: 100%;
  width: 100%;
  max-width: 499px;
  position: relative;
  display: grid;
  grid-template-rows: 80px auto 100px;
  margin: auto;
  color: var(--text-color);

  @media (min-width: 500px) and (orientation: landscape) {
    height: 80%;
    border: 1px solid #fff;
    border-radius: 5px;
  }

  header {
    position: relative;
    display: grid;
    grid-template-columns: 40px auto 40px;
    place-items: center;
    padding: 0 15px;

    h1 {
      text-align: center;
      font-size: 1.3rem;
      letter-spacing: 3px;
      font-weight: lighter;
      text-transform: uppercase;
      color: var(--color-title);
    }
  }

  .logo {
    text-transform: none;
    font-family: 'Molle', cursive;
    color: var(--color-primary);
    letter-spacing: 0px;
    font-size: 2.3rem;
  }

  footer {
    width: 100%;
    padding: 0 30px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-evenly;
  }
`
