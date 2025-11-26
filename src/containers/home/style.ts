import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 0 20px;
`;

export const GridWrapper = styled.div`
    display: grid;
    gap: 15px;
    padding: 15px 0 40px 0 ;
    grid-template-columns: repeat(7, 350px);
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    align-items: start;

    @media (max-width: calc(350px * 7 + 24px * 6)) {
        grid-template-columns: repeat(6, 350px);
    }

    @media (max-width: calc(350px * 6 + 24px * 5)) {
        grid-template-columns: repeat(5, 350px);
    }

    @media (max-width: calc(350px * 5 + 24px * 4)) {
        grid-template-columns: repeat(4, 350px);
    }

    @media (max-width: calc(350px * 4 + 24px * 3)) {
        grid-template-columns: repeat(3, 350px);
    }

    @media (max-width: calc(350px * 3 + 24px * 2)) {
        grid-template-columns: repeat(2, 350px);
    }
`;

export const MoreButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 8px 0 40px;
`;

export const MoreButton = styled.button`
    min-width: 160px;
    height: 40px;
    padding: 0 50px;
    border-radius: 6px;
    background: #000;
    color: #fff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background: #7c7c7c;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.24);
    }
`;

export const StatusText = styled.div`
    padding: 16px 0;
    text-align: center;
    font-size: 14px;
`;
