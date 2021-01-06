import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../../app/context/AppContext'
import {
  AddIconButton,
  EditIconButton,
} from '../../app/components/buttons/IconButtons'
import AppHeader from '../../app/components/AppHeader'
import Navigation from '../../app/components/Navigation'

export default function EditPage() {
  const history = useHistory()
  const { userData, levels } = useContext(AppContext)

  !userData.token && history.push('/')

  return (
    <>
      <AppHeader cols="010">
        <h1 className="logo">Salsa time!</h1>
      </AppHeader>

      <EditPageStyled>
        {levels.map(({ name, moves }) => {
          return (
            <ul key={name}>
              <li>{name.toUpperCase()}</li>
              {moves.filter((move) => move.levelName === name).map(move =>
                <li key={move._id}>
                  {move.name}
                  <EditIconButton
                    size={'xs'}
                    onClick={() => history.push(`/edit-form/${move._id}`)}
                  />
                </li>
              )}
            </ul>
          )
        })}

        <AddIconButton
          className="add-button"
          size={'lg'}
          onClick={() => history.push('/edit-form')}
        />
      </EditPageStyled>
      <footer><Navigation /></footer>
    </>
  )
}

const EditPageStyled = styled.main`
position: relative;
  width: 100%;
  padding: 10px;
  padding-bottom: 50px;

  ul {
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

  .add-button {
    position: fixed;
    bottom: 100px;
    right: 10px;
  }
`
