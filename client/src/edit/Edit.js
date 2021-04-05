import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../app/context/AppContext'
import { addMove, deleteMove, updateMove } from '../app/services/moveAPIs'
import {
  AddIconButton,
  BackIconButton,
  DeleteIconButton,
  EditIconButton,
} from '../app/components/buttons/IconButtons'
import EditForm from './EditForm'
import AppHeader from '../app/components/AppHeader'
import Navigation from '../app/components/Navigation'
import DeleteModal from '../app/components/DeleteModal'

export default function Edit() {
  const { userData, levels, refreshLevels, setError } = useContext(AppContext)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)
  const [selectedMoveID, setSelectedMoveID] = useState(null)
  const history = useHistory()

  const selectedMove = levels
    .map((level) => level.moves)
    .flat()
    .find((move) => move._id === selectedMoveID)

  !userData.token && history.push('/')

  async function handleDelete(id) {
    const response = await deleteMove(userData.token, selectedMoveID)
    setIsDeleteModalDisplayed(false)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      refreshLevels()
      setSelectedMoveID(false)
    }
  }

  return (
    <>
      {isDeleteModalDisplayed && (
        <DeleteModal
          cancel={() => setIsDeleteModalDisplayed(false)}
          handleDelete={() => handleDelete(selectedMoveID)}
          deleteItem={selectedMove.name}
        />
      )}

      <AppHeader cols={!selectedMoveID ? '011' : '111'}>
        {selectedMoveID && (
          <BackIconButton
            onClick={() => setSelectedMoveID(false)}
            size={'md'}
            type="button"
          />
        )}
        <h1 className="logo">Salsa time!</h1>
        {!selectedMoveID ? (
          <AddIconButton
            className="add-button"
            size={'md'}
            onClick={() => setSelectedMoveID({})}
          />
        ) : (
          <DeleteIconButton
            onClick={() => setIsDeleteModalDisplayed(true)}
            type="button"
            size={'md'}
          />
        )}
      </AppHeader>

      <EditStyled>
        {!selectedMoveID ? (
          levels.map(({ name, moves }) => {
            return (
              <ul key={name}>
                <li>{name.toUpperCase()}</li>
                {moves
                  .filter((move) => move.levelName === name)
                  .map((move) => (
                    <li key={move._id}>
                      {move.name}
                      <EditIconButton
                        size={'xs'}
                        onClick={() => setSelectedMoveID(move._id)}
                      />
                    </li>
                  ))}
              </ul>
            )
          })
        ) : (
          <EditForm
            move={selectedMove}
            setSelectedMoveID={setSelectedMoveID}
            addMove={addMove}
            updateMove={updateMove}
          />
        )}
      </EditStyled>
      <footer>
        <Navigation />
      </footer>
    </>
  )
}

const EditStyled = styled.main`
  position: relative;
  width: 100%;
  padding: 0 10px;

  & > ul {
    width: 73%;
    max-width: 264px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: auto;
    margin-bottom: 50px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li:first-child {
      color: var(--color-primary);
    }
  }
`
