import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

InputSongSpeed.protoTypes = {
  speed: PropTypes.number.isRequired,
  updateAppState: PropTypes.func.isRequired,
}

export default function InputSongSpeed({ speed, updateAppState }) {
  return (
    <FormInputSongSpeedStyled className="range-input-container">
      <label htmlFor="speed">Song Speed</label>
      <input
        value={speed}
        onChange={updateAppState}
        type="range"
        name="speed"
        min="2100"
        max="3700"
        step="400"
      />
      <div className="range-legend">
        <span>slow</span>
        <span>fast</span>
      </div>
    </FormInputSongSpeedStyled>
  )
}

const FormInputSongSpeedStyled = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;

  input {
    direction: rtl;
    display: block;
    width: 100%;
    background-color: var(--color-bg);
  }

  .range-legend {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
  }

  input[type='range'] {
    height: 25px;
    -webkit-appearance: none;
    width: 100%;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: #2497e3;
    border-radius: 1px;
    border: 0px solid #000000;
    background-color: var(--color-text);
  }

  input[type='range']::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #a1d0ff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
    background-color: var(--color-secondary)};
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: #2497e3;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    background: #2497e3;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  input[type='range']::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #a1d0ff;
    cursor: pointer;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type='range']::-ms-fill-lower {
    background: #2497e3;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }

  input[type='range']::-ms-fill-upper {
    background: #2497e3;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #000000;
  }
  input[type='range']::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 1px solid #2497e3;
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: #a1d0ff;
    cursor: pointer;
  }

  input[type='range']:focus::-ms-fill-lower {
    background: #2497e3;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: #2497e3;
  }
`
