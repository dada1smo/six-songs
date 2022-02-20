import { createGlobalStyle } from 'styled-components';
import { Theme } from './Theme';

export const GlobalStyles = createGlobalStyle`
    body {
        background: ${Theme.neutral[800]};
        margin: 0;
        padding: 0;
        font-family: ${Theme.ibmPlexSans};
        color: ${Theme.neutral['000']};

        & * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        h1 {
            font-size: 28px;
            font-weight: 600;
        }

        h3 {
            font-weight: 500;
            font-size: 20px;
        }

        p {
            font-size: 16px;
            font-weight: 400;
        }
    }
`;
