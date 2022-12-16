import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  width: 900px;
  height: 720px;
  background: #e7e3db;
  z-index: 10;
  border-radius: 16px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: block;
  overflow: auto;
  padding: 16px 8px;
`

const Modal = ({ children, setModalIsOpen }) => {
  return <ModalContainer>{children}</ModalContainer>
}

export default Modal
