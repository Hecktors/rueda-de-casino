import { useContext, useState } from 'react'
import styled from 'styled-components/macro'
import { Context } from '../../context/Context'
import { addMove, deleteMove, updateMove } from '../../services/moveAPIs'
import {
  AddIconButton,
  BackIconButton,
  DeleteIconButton,
  EditIconButton,
} from '../../components/IconButtons'
import EditForm from './EditForm'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import DeleteModal from '../../components/DeleteModal'

export default function Edit() {
  const { authData, levels, refreshLevels, setError } = useContext(Context)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)
  const [selectedMoveId, setSelectedMoveId] = useState(null)

  const selectedMove = levels
    .map((level) => level.moves)
    .flat()
    .find((move) => move._id === selectedMoveId)

  async function handleDelete(id) {
    const response = await deleteMove(authData.token, selectedMoveId)
    setIsDeleteModalDisplayed(false)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      refreshLevels()
      setSelectedMoveId(false)
    }
  }

  const header = selectedMoveId ? (
    <Header
      left={
        <BackIconButton
          onClick={() => setSelectedMoveId(false)}
          size={'md'}
          type="button"
        />
      }
      right={
        <DeleteIconButton
          onClick={() => setIsDeleteModalDisplayed(true)}
          type="button"
          size={'md'}
        />
      }
    />
  ) : (
    <Header
      right={
        <AddIconButton
          className="add-button"
          size={'md'}
          onClick={() => setSelectedMoveId({})}
        />
      }
    />
  )

  return (
    <>
      {isDeleteModalDisplayed && (
        <DeleteModal
          cancel={() => setIsDeleteModalDisplayed(false)}
          handleDelete={() => handleDelete(selectedMoveId)}
          deleteItem={selectedMove.name}
        />
      )}

      {header}

      <EditStyled>
        {!selectedMoveId ? (
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
                        onClick={() => setSelectedMoveId(move._id)}
                      />
                    </li>
                  ))}
              </ul>
            )
          })
        ) : (
          <EditForm
            move={selectedMove}
            setSelectedMoveId={setSelectedMoveId}
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
