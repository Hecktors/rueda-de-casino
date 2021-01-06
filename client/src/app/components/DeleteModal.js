import React from 'react'
import Proptypes from 'prop-types'
import styled from 'styled-components/macro'
import { CancelButton, DeleteButton } from './buttons/Buttons'

DeleteModal.propTypes = {
  deleteItem: Proptypes.string.isRequired,
  cancel: Proptypes.func.isRequired,
  handleDelete: Proptypes.func.isRequired,
}

export default function DeleteModal({ deleteItem, cancel, handleDelete }) {
  return (
    <DeleteModalStyled>
      <div className="msg-box">
        <h2>Delete {deleteItem}</h2>
        <p>Are you sure? This process cannot be undone.</p>
        <div>
          <CancelButton onClick={cancel} type="button" />
          <DeleteButton onClick={handleDelete} type="button" />{' '}
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
    border: 1px solid var(--color-border);
    border-radius: 5px;
    text-align: center;
    background-color: var(--color-bg);

    p {
      font-size: 0.9rem;
      margin: 20px 0;
    }

    div {
      display: flex;
      gap: 40px;
    }
  }
`
