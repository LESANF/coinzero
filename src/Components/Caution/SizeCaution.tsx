import React from 'react';
import styled from 'styled-components';

export const SizeCautionFrame = styled.div`
    @media screen and (max-width: 600px) {
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #799aff;
        z-index: 2000;
    }
`;
