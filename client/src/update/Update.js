import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppHeader from '../app/AppHeader'
import IconButton from '../app/Buttons/IconButton'
import { EditIcon, BackIcon, AddIcon } from '../app/Icons/Icons'
import Form from './Form/Form'
import { useEffect } from 'react/cjs/react.development'

Update.propTypes = {
  history: PropTypes.object.isRequired,
  pensum: PropTypes.array.isRequired,
  addMove: PropTypes.func.isRequired,
  updateMove: PropTypes.func.isRequired,
  deleteMove: PropTypes.func.isRequired,
}

export default function Update({
  history,
  pensum,
  addMove,
  updateMove,
  deleteMove,
}) {
  const [isFormOpen, setIsFormOpen] = useState()
  const [editedMoveID, setEditedMoveID] = useState(null)

  useEffect(() => {
    editedMoveID && setIsFormOpen(true)
  }, [editedMoveID])

  return (
    <>
      {isFormOpen && (
        <Form
          pensum={pensum}
          id={editedMoveID}
          addMove={addMove}
          updateMove={updateMove}
          setEditedMoveID={setEditedMoveID}
          setIsFormOpen={setIsFormOpen}
          deleteMove={deleteMove}
        />
      )}
      <AppHeader cols="110">
        <IconButton
          color={'tertiary'}
          size={'md'}
          onClick={() => history.push('/')}
        >
          <BackIcon />
        </IconButton>
        <h1>Moves Update</h1>
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
                    onClick={() => setEditedMoveID(move._id)}
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
          onClick={() => setIsFormOpen(true)}
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
