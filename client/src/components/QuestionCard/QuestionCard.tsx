import React, { useState } from "react";
import Modal from "react-modal";
import { QuestionModal } from "./components/QuestionModal";
import { IQuestion } from "../../types";
import styles from './QuestionCard.module.css'

export type QuestionPropsType = {
  question: IQuestion;
  answered: boolean
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Черный полупрозрачный фон
  },
  content: {
    // backgroundColor: '#2D30B7', // Цвет фона модального окна
    border: 'solid 1px #F3E59C', // Убираем границу
    width: 'fit-content', // Максимальная ширина модального окна
    height: 'fit-content', // Максимальная ширина модального окна
    margin: 'auto', // Центрируем по горизонтали
    padding: '0',
  },
};

export const QuestionCard: React.FC<QuestionPropsType> = ({ question, answered }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log(answered)
  Modal.setAppElement('#root');
  const openModal = () => {
    if (!answered) setModalIsOpen(true);
  };

  const closeModal = () => {
     setModalIsOpen(false);
  };
  return (
    <>
      <div className={styles.card} onClick={openModal}>{answered || <h3>{question.cost}</h3>}</div>
      <Modal isOpen={modalIsOpen} style={modalStyles}>
        <QuestionModal question={question} closeModal={closeModal}/>
      </Modal>
    </>
  );
};
