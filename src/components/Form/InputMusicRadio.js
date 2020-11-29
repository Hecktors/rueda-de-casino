import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

InputMusicRadio.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
  updateUserInput: PropTypes.func.isRequired,
}

export default function InputMusicRadio({ isMuted, speed, updateUserInput }) {
  return (
    <InputMusicRadioStyled>
      <div className="radio-container">
        <div>
          Play learning song{' '}
          <div className="tooltip">
            &#9432;
            <span className="tooltiptext">
              You can use the app with your own music. Just disable the onboard
              learning song and adapt the time between the move calls with the
              slider, if they're too fast or too slow for your song.
            </span>
          </div>
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
          <div class="range-legend">
            <span>slow</span>
            <span>fast</span>
          </div>
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
  .range-legend {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  .tooltip {
    display: inline-block;
    margin-left: 5px;
  }

  .tooltip .tooltiptext {
    width: 100%;
    height: 300px;
    display: flex;
    place-items: center;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transform: translateY(-100%);
    border-radius: 6px;
    padding: 15px;
    text-align: center;
    line-height: 1.6;
    color: #fff;
    background-color: var(--bg-color-message);
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`
