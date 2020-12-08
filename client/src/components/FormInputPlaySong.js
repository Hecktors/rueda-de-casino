import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

FormInputPlaySong.propTypes = {
  isSongActive: PropTypes.bool.isRequired,
  updateUserInput: PropTypes.func.isRequired,
  hasChanged: PropTypes.bool.isRequired,
}

export default function FormInputPlaySong({
  isSongActive,
  updateUserInput,
  hasChanged,
}) {
  return (
    <FormInputPlaySongStyled hasChanged={hasChanged}>
      <input
        id="mute"
        onChange={updateUserInput}
        type="checkbox"
        name="songActivity"
        checked={isSongActive}
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
    </FormInputPlaySongStyled>
  )
}

const FormInputPlaySongStyled = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 20px 20px;
  font-size: 1rem;

  .info {
    color: var(--color-secondary);
    user-select: none;
  }

  input {
    display: none;
  }

  label {
    display: inline-flex;
    user-select: none;
    color: var(--color-secondary);
  }

  label::before {
    content: '';
    display: block;
    border: 1px solid var(--color-secondary);
    width: 17px;
    height: 19px;
    margin-right: 10px;
    padding-left: 3px;
  }

  input:checked + label::before {
    content: '✔';
    color: ${({ hasChanged }) =>
      hasChanged ? 'var(--color-primary)' : 'var(--color-secondary)'};
    font-size: 1.2rem;
    line-height: 1;
  }

  .tooltip {
    display: inline-block;
    margin-left: 15px;
    user-select: none;
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
    background-color: var(--color-bg-message);
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`
