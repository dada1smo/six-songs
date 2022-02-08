import { createGlobalStyle } from 'styled-components';
import { DarkTheme } from './Theme';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${DarkTheme.neutral[800]};
        margin: 0;
        padding: 0;
        font-family: ${DarkTheme.ibmPlexSans};
        color: ${DarkTheme.neutral['000']};

        & * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        h3 {
            font-weight: 500;
            font-size: 24px;
        }

        p {
            font-size: 16px;
            font-weight: 400;
        }
    }
`;
