import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../../app/context/AppContext'
import styled from 'styled-components/macro'
import AppHeader from '../../app/components/AppHeader'
import {
  AddIconButton,
  EditIconButton,
} from '../../app/components/buttons/IconButtons'
import Navigation from '../../app/components/Navigation'

export default function EditOverview() {
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
              {moves.map((move) => {
                return move.levelName === name ? (
                  <li key={move._id}>
                    {move.name}
                    <EditIconButton
                      size={'xs'}
                      onClick={() => history.push(`/edit-form/${move._id}`)}
                    />
                  </li>
                ) : (
                    ''
                  )
              })}
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
    width: 80%;
    max-width: 264px;
    margin: auto;
    display: flex;
    margin-bottom: 50px;
    flex-direction: column;
    gap: 7px;

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
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`
