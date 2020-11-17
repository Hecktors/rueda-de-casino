import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'

function MainButton({ task, isDisabled = false, handleClick }) {
  return (
    <ButtonStyled
      onClick={() => handleClick(task)}
      task={task}
      disabled={isDisabled}
    >
      {task === 'play' ? <PlayIcon /> : <PauseIcon />}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  svg {
    width: 60px;
    height: 60px;
    fill: #fff;
  }
`

export default MainButton

ButtonStyled.propTypes = {
  task: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
}
