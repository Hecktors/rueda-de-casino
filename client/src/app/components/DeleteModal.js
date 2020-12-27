import React from 'react'
import styled from 'styled-components'
import { CancelButton, DeleteButton } from './buttons/Buttons'

export default function DeleteModal({ cancel, handleDelete, deleteItem }) {
  return (
    <DeleteModalStyled>
      <div className="msg-box">
        <h2>Delete {deleteItem}</h2>
        <p>Are you sure? This process cannot be undone.</p>
        <div>
          <CancelButton onClick={cancel} />
          <DeleteButton onClick={handleDelete} />{' '}
        </div>
      </div>
    </DeleteModalStyled>
  )
}

const DeleteModalStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  .msg-box {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    background-color: #f5d4d4;
    color: var(--color-bg);

    p {
      font-size: 0.9rem;
      margin: 20px 0;
    }

    div {
      display: flex;
      justify-content: space-evenly;
    }
  }
`
