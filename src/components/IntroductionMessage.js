import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as NorthIcon } from '../assets/img/north.svg'
import { ReactComponent as SouthIcon } from '../assets/img/south.svg'

IntroductionMessage.propTypes = {
  isFirstAppStart: PropTypes.bool,
}

export default function IntroductionMessage({ isFirstAppStart = false }) {
  return (
    <IntroductionMessageStyled>
      {isFirstAppStart ? (
        <div className="first-start">
          <div className="top">
            <NorthIcon />
            <br />
            <span className="text">1. Select the moves here</span>
          </div>
          <div className="text">
            You need at least 2 moves
            <br />
            to start the session
          </div>

          <div className="bottom">
            <span className="text">2. Start the session here</span>

            <br />
            <SouthIcon />
          </div>
        </div>
      ) : (
        <div className="bottom">
          <span className="text">Select at least 2 moves</span>
        </div>
      )}
    </IntroductionMessageStyled>
  )
}

const IntroductionMessageStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: var(--color-message);

  .first-start {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .top {
    text-align: right;
  }

  .bottom,
  .warning {
    text-align: center;
  }

  .text {
    display: inline-block;
    margin: 15px 0;
    line-height: 1.5;
    font-size: 1.5rem;
  }

  svg {
    fill: var(--color-message);
    transform: scale(2.5);
  }
  .top svg {
    margin-right: 10px;
  }
`
