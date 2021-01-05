import { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../../app/context/AppContext'
import AppHeader from '../../app/components/AppHeader'
import MainFooter from '../../app/components/MainFooter'
import { ResetButton, SaveButton } from '../../app/components/buttons/Buttons'
import {
  AddIconButton,
  BackIconButton,
  DeleteIconButton,
} from '../../app//components/buttons/IconButtons/IconButtons'
import LevelAccordion from './LevelAccordion'
import useUserInput from './useUserInput'
import DeleteModal from '../../app/components/DeleteModal'
import { addMove, deleteMove, updateMove } from '../../app/services/moveAPIs'
import Navigation from '../../app/components/Navigation'

export default function EditForm() {
  const history = useHistory()
  const params = useParams()
  const { userData, levels, refreshLevels, setError } = useContext(AppContext)
  const moveID = params.id || ''
  const [isNewLevel, setIsNewLevel] = useState(false)
  const hasNoLevels = !levels.length
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)
  const { token } = userData
  const editedMove = levels
    .map((level) => level.moves)
    .flat()
    .find((move) => move._id === moveID)

  let initLevelName = levels.length > 0 ? levels[levels.length - 1].name : ''
  if (editedMove) initLevelName = editedMove.levelName

  !token && history.push('/')

  const [
    userInput,
    updateUserInput,
    resetUserInput,
    openNewLevelInput,
    hasNoChanges,
    isValid,
  ] = useUserInput(editedMove, setIsNewLevel, initLevelName, hasNoLevels)

  useEffect(() => {
    !initLevelName && setIsNewLevel(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e) {
    e.preventDefault()
    const isNewMove = !userInput._id
    const response = isNewMove
      ? await addMove(token, userInput)
      : await updateMove(token, moveID, userInput)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      refreshLevels()
      history.push('/edit-overview')
    }
  }

  async function handleDelete(id) {
    const response = await deleteMove(token, id)
    setIsDeleteModalDisplayed(false)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      refreshLevels()
      history.push('/edit-overview')
    }
  }

  return (
    <EditFormStyled onSubmit={handleSubmit}>
      {isDeleteModalDisplayed && (
        <DeleteModal
          cancel={() => setIsDeleteModalDisplayed(false)}
          handleDelete={() => handleDelete(moveID)}
          deleteItem={editedMove.name}
        />
      )}
      <AppHeader cols={moveID ? '111' : '110'}>
        <BackIconButton
          onClick={() => history.push('/edit-overview')}
          size={'sm'}
          type="button"
        />
        <h1 className="logo">Salsa time!</h1>
        {moveID && (
          <DeleteIconButton
            onClick={() => setIsDeleteModalDisplayed(true)}
            type="button"
            size={'md'}
          />
        )}
      </AppHeader>
      <main>
        <div className="form-group-container">
          <div className="form-group">
            <LevelAccordion
              levels={levels}
              selectedLevelName={userInput.levelName}
              isNewLevel={isNewLevel}
              updateUserInput={updateUserInput}
            />
          </div>
          <div className="form-group">
            <AddIconButton
              onClick={openNewLevelInput}
              type={'button'}
              size={'sm'}
              disabled={isNewLevel}
            />
          </div>
        </div>

        {isNewLevel && (
          <div className="form-group">
            <label htmlFor="">Level name</label>
            <input
              onChange={updateUserInput}
              value={userInput.levelName}
              type="text"
              id="newLevel"
              name="newLevel"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>
        )}

        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="name">Move name*</label>
            <input
              onChange={updateUserInput}
              value={userInput.name}
              type="text"
              id="name"
              name="name"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Num of bars*</label>
            <input
              className="tar"
              onChange={updateUserInput}
              value={userInput.bars}
              type="number"
              id="bars"
              name="bars"
              placeholder="0"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
              required
            />
          </div>
        </div>

        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="">Youtube link</label>
            <input
              onChange={updateUserInput}
              value={userInput.videoUrl}
              type="text"
              id="videoUrl"
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=b4jaXaC1P04"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Start at sec</label>
            <input
              className="tar"
              onChange={updateUserInput}
              value={userInput.videoStart}
              type="text"
              id="videoStart"
              name="videoStart"
              placeholder="00:00"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <MainFooter>
          <ResetButton
            onClick={resetUserInput}
            disabled={hasNoChanges}
            type={'button'}
            inline
            outlined
          />
          <SaveButton
            onClick={() => { }}
            disabled={hasNoChanges || !isValid}
            inline
          />
        </MainFooter>
      </main>
      <footer><Navigation /></footer>
    </EditFormStyled>
  )
}

const EditFormStyled = styled.form`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 9999;
  border-radius: 5px;
  display: grid;
  flex-direction: column;
  grid-template-rows: 100px auto 100px;

  main {
    padding: 10px;
  }

  label {
    display: block;
  }

  .form-group-container {
    display: flex;
    max-width: 400px;
    margin: auto;
    gap: 20px;

    &:first-of-type {
      margin-top: 20px;
    }
  }

  .form-group {
    max-width: 400px;
    margin: 20px auto;
    display: grid;
  }

  .form-group:first-of-type {
    width: 100%;

    &.select {
      width: 100%;
    }
  }
`
