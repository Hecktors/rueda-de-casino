import styled from 'styled-components/macro'
import { ReactComponent as NorthIcon } from '../assets/img/north.svg'
import { ReactComponent as SouthIcon } from '../assets/img/south.svg'

export default function Message({ isFirstAppStart = false }) {
  return (
    <MessageStyled>
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
    </MessageStyled>
  )
}

const MessageStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: var(--color-message);
  background-color: var(--bg-color-message);

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
