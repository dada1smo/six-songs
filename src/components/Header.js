import { useNavigate } from "react-router-dom";

import { ContainerHeaderAppBar, HeaderAppBar, IconButtonAddMixAppBar, LogoHeaderAppBar } from "../styles/Header";
import addIcon from "../images/add-icon.svg";

export default function Header(){
    const router = useNavigate();

    const goToAddMix = (e) => {
        router("/");
    };

    return (
        <HeaderAppBar>
            <ContainerHeaderAppBar>
                <LogoHeaderAppBar href="/">
                    <h2>O logo vem aqui</h2>
                </LogoHeaderAppBar>

                <IconButtonAddMixAppBar onClick={goToAddMix}>
                    <img src={addIcon} alt="" /> &nbsp;
                    Criar novo mix
                </IconButtonAddMixAppBar>
            </ContainerHeaderAppBar>
        </HeaderAppBar>
    );
}
