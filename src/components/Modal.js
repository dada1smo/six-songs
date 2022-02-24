import { useEffect } from "react";

import { PrimaryButton } from "../styles/Button";
import {
    ModalBodyStyled,
    ModalContentStyled,
    ModalTitleStyled,
    ModalStyled
} from "../styles/Modal";
import removeIcon from "../images/remove-icon.svg";

const styleModalShow = {
    opacity: 1,
    pointerEvents: "visible"
};
const styleModalContentShow = {
    transform: "translateY(0)"
};

export default function Modal({ show, title, onClose, children }) {

    /* aqui sera possivel fechar o modal ao pressionar a tecla Esc do teclado */
    const closeOnEscapeKeyDown = (e) => {
        if((e.charCode || e.keyCode) === 27)
            onClose();
    };
    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);

        return function cleanup(){
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        }
    }, []);
    /* aqui sera possivel fechar o modal ao pressionar a tecla Esc do teclado */

    /**
     * linha 44: aqui sera possivel fechar o modal ao clicar fora do conteudo
     * linha 45: css de animacao aplicado somente quando o modal esta sendo exibido
     * linha 48: aqui evitamos que o clique no conteudo do modal feche o mesmo
     * linha 49: css de animacao aplicado somente quando o modal esta sendo exibido
     */
    return (
        <ModalStyled
            onClick={onClose}
            style={show ? styleModalShow : null}
        >
            <ModalContentStyled
                onClick={e => e.stopPropagation()}
                style={show ? styleModalContentShow : null}
            >
                <ModalTitleStyled>
                    <h3>{title}</h3>
                    <PrimaryButton onClick={onClose}>
                        <img src={removeIcon} alt="" />
                    </PrimaryButton>
                </ModalTitleStyled>

                <ModalBodyStyled>
                    {children}
                </ModalBodyStyled>
            </ModalContentStyled>
        </ModalStyled>
    );
}
