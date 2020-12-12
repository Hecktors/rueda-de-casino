import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppHeader from '../app/AppHeader'
import IconButton from '../app/Buttons/IconButton'
import { EditIcon, BackIcon, AddIcon } from '../app/Icons/Icons'

EditOverview.propTypes = {
  history: PropTypes.object.isRequired,
  pensum: PropTypes.array.isRequired,
}

export default function EditOverview({ history, pensum }) {
  return (
    <>
      <AppHeader cols="110">
        <IconButton
          color={'tertiary'}
          size={'md'}
          onClick={() => history.push('/')}
        >
          <BackIcon />
        </IconButton>
        <h1>Edit Overview</h1>
      </AppHeader>

      <UpdateStyled>
        {pensum.map((level) => {
          return (
            <ul key={level.id}>
              <li>{level.levelName.toUpperCase()}</li>
              {level.moves.map((move) => (
                <li key={move._id}>
                  {move.name}
                  <IconButton
                    color={'secondary'}
                    size={'xs'}
                    onClick={() => history.push(`/edit-form/${move._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          )
        })}
        <IconButton
          className="add-button"
          color={'tertiary'}
          size={'lg'}
          onClick={() => history.push('/edit-form')}
        >
          <AddIcon />
        </IconButton>
      </UpdateStyled>
    </>
  )
}

const UpdateStyled = styled.main`
  width: 100%;
  position: relative;
  padding: 10px;
  padding-bottom: 50px;
  display: flex;

  ul {
    width: 80%;
    max-width: 264px;
    margin: auto;
    display: flex;
    margin-bottom: 40px;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li:first-child {
      color: var(--color-primary);
    }
  }

  .add-button {
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
`
