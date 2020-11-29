import PropTypes from 'prop-types'
import styled from 'styled-components'

InputMusicRadio.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function InputMusicRadio({ isMuted, speed, updateUserInput }) {
  return (
    <InputMusicRadioStyled>
      <div className="radio-container">
        Play salsa learning song{' '}
        <div className="tooltip">
          &#9432;
          <span className="tooltiptext">
            You can use the app with your own music. Just adapt the time between
            the move calls, if they're too fast or too slow for your song.
          </span>
        </div>
        <div className="label-container">
          <label htmlFor="mute">
            Yes
            <input
              id="mute"
              onChange={updateUserInput}
              type="radio"
              name="isMuted"
              value={false}
              checked={!isMuted}
            />
          </label>
          <label htmlFor="notMote">
            No
            <input
              id="notMote"
              onChange={updateUserInput}
              type="radio"
              name="isMuted"
              value={true}
              checked={isMuted}
            />
          </label>
        </div>
      </div>
      {isMuted && (
        <div className="range-input-container">
          <label htmlFor="speed">Move Call Speed </label>
          <input
            value={speed}
            onChange={updateUserInput}
            type="range"
            name="speed"
            min="2100"
            max="3700"
            step="400"
          />
        </div>
      )}
    </InputMusicRadioStyled>
  )
}

const InputMusicRadioStyled = styled.div`
  margin-top: 20px;
  position: relative;
  .radio-container {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    padding: 10px 20px;
    font-size: 1rem;

    label {
      margin-left: 20px;
    }

    input {
      margin-left: 5px;
    }
  }

  .range-input-container {
    margin: 0 auto;
    padding: 10px 20px;

    input {
      display: block;
      margin-top: 5px;
      width: 100%;
    }
  }

  .tooltip {
    display: inline-block;
    margin-left: 5px;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    display: block;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 20px 10px;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 0;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`
