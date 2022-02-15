import styled from "styled-components";

import { IconButton } from "./Button";
import { Theme } from "./Theme";

export const HeaderAppBar = styled.header`
    background-color: ${Theme.neutral[800]};
    padding: 0.75rem 0;
    position: relative;
    display: flex;
    align-items: center;
`;

export const ContainerHeaderAppBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem 2.75rem 0;
    margin-right: auto;
    margin-left: auto;
`;

export const LogoHeaderAppBar = styled.a`
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
    padding: 0;
`;

export const IconButtonAddMixAppBar = styled(IconButton)`
    width: 190px;
    height: 50px;
    font-size: 20px;
    border-radius: 24px;
    padding: 0.2em;
    color: ${Theme.neutral['000']};
    text-align: right;
`;
