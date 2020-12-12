import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Button from '../../app/Buttons/Button'

Form.propTypes = {
  levels: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default function Form({ levels, id, handleSubmit }) {
  console.log(id)
  const editMove = levels
    .map((level) => level.moves)
    .flat()
    .find((move) => move.id === id)
  console.log(editMove)

  return (
    <FormStyled onSubmit={() => handleSubmit(levels)}>
      <h2>Edit {editMove.name}</h2>
      <label htmlFor="">movename</label>
      <label htmlFor="">levelname</label>
      <label htmlFor="">steps</label>
      <label htmlFor="">youtube video url</label>
      <label htmlFor="">youtube video start at</label>
      <Button onClick={() => {}} color={'primary'} size={'lg'} outlined>
        Save
      </Button>
    </FormStyled>
  )
}

const FormStyled = styled.form`
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  left: 10px;
  z-index: 9999;
  border-radius: 5px;
  background-color: var(--color-bg);

  h2 {
    text-align: center;
  }
  label {
    display: block;
  }
`
