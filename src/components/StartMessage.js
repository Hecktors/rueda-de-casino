import styled from 'styled-components'
import { ReactComponent as NorthIcon } from '../assets/img/north.svg'
import { ReactComponent as SouthIcon } from '../assets/img/south.svg'

export default function StartMessage({ isFirstAppStart }) {
  return (
    <MessageStyled>
      {isFirstAppStart ? (
        <div className="first-start">
          <div className="top">
            <NorthIcon />
            <br />
            <span className="text">1. Choose the moves here.</span>
          </div>
          <div className="text">
            Afer choosing at least 2 moves
            <br /> you'll be ready to start
          </div>

          <div className="bottom">
            <span className="text">2. Start the session here</span>

            <br />
            <SouthIcon />
          </div>
        </div>
      ) : (
        <div className="default">
          <span className="text">Select at least 2 moves</span>
        </div>
      )}
    </MessageStyled>
  )
}

const MessageStyled = styled.div`
  display: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: var(--bg-color);
  opacity: 0.5;

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

  .text {
    display: inline-block;
    margin: 15px 0;
    line-height: 1.5;
    font-size: 1.5rem;
  }

  svg {
    transform: scale(2.5);
  }
  .top svg {
    margin-right: 20px;
  }
`
