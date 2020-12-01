import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

MusicMuteInput.propTypes = {
  isMuted: PropTypes.bool.isRequired,
  updateUserInput: PropTypes.func.isRequired,
  hasChanged: PropTypes.bool.isRequired,
}

export default function MusicMuteInput({
  isMuted,
  updateUserInput,
  hasChanged,
}) {
  return (
    <MusicMuteInputStyled hasChanged={hasChanged}>
      <input
        id="mute"
        onChange={updateUserInput}
        type="checkbox"
        name="isMuted"
        checked={!isMuted}
      />
      <label htmlFor="mute">Play learning song </label>
      <div className="tooltip">
        <span className="info">&#9432;</span>
        <span className="tooltiptext">
          You can use the app with your own music. Just disable the onboard
          learning song and adapt the time between the move calls with the
          slider, if they're too fast or too slow for your song.
        </span>
      </div>
    </MusicMuteInputStyled>
  )
}

const MusicMuteInputStyled = styled.div`
  position: relative;
  margin-top: 30px;
  padding: 20px 20px;
  font-size: 1rem;

  .info {
    color: var(--color-button);
    user-select: none;
  }

  input {
    display: none;
  }

  label {
    display: inline-flex;
    user-select: none;
  }

  label::before {
    content: '';
    display: block;
    border: 1px solid
      ${({ hasChanged }) =>
        hasChanged ? 'var(--color-primary)' : 'var(--color-button)'};
    width: 18px;
    height: 20px;
    margin-right: 10px;
    padding-left: 3px;
  }

  input:checked + label::before {
    content: '✔';
    color: ${({ hasChanged }) =>
      hasChanged ? 'var(--color-primary)' : 'var(--color-button)'};
    font-size: 1.2rem;
    line-height: 1;
  }

  .tooltip {
    display: inline-block;
    margin-left: 10px;
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
