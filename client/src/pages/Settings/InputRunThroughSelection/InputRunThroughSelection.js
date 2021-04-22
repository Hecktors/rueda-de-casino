import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

InputRunThroughSelection.propTypes = {
  isRunThroughSelection: PropTypes.bool.isRequired,
  updateAppState: PropTypes.func.isRequired,
}

export default function InputRunThroughSelection({
  isRunThroughSelection,
  updateAppState,
}) {
  return (
    <InputRunThroughSelectionStyled>
      <input
        id="runThroughSelection"
        onChange={updateAppState}
        type="checkbox"
        name="runThroughSelection"
        checked={isRunThroughSelection}
      />
      <label htmlFor="runThroughSelection">
        Avoid multi consecutive move repetitions
      </label>
    </InputRunThroughSelectionStyled>
  )
}

const InputRunThroughSelectionStyled = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 20px 20px;
  font-size: 1rem;

  .info {
    user-select: none;
    color: var(--color-text);
  }

  input {
    display: none;
  }

  label {
    display: inline-flex;
    user-select: none;
    color: var(--color-text);
  }

  label::before {
    content: '';
    width: 17px;
    height: 19px;
    display: block;
    margin-right: 10px;
    padding-left: 3px;
    border: 1px solid var(--color-text);
  }

  input:checked + label::before {
    content: '✔';
    line-height: 1;
    font-size: 1.2rem;
    color: var(--color-primary);
  }

  .tooltip {
    display: inline-block;
    margin-left: 15px;
    user-select: none;
  }

  .tooltip .tooltiptext {
    width: 100%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    place-items: center;
    visibility: hidden;
    transform: translateY(-100%);
    border-radius: 6px;
    padding: 15px;
    line-height: 1.6;
    text-align: center;
    color: #fff;
    background-color: var(--color-bg-message);
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`
