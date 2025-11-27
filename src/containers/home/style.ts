import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    padding: 0 20px 40px;
    display: flex;
    flex-direction: column;
`;

export const GridWrapper = styled.div`
    display: grid;
    width: 100%;
    gap: 15px;
    padding-top: 15px;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (min-width: 360px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    @media (min-width: 1440px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @media (min-width: 1920px) {
        grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    @media (min-width: 2560px) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    @media (min-width: 3008px) {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    
    @media (min-width: 3360px) {
        grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    
    @media (min-width: 3840px) {
        grid-template-columns: repeat(9, minmax(0, 1fr))
    }
`;

export const MoreButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px 0;
`;

export const MoreButton = styled.button`
    width: 35%;
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

// 데이터 없을때
export const EmptyState = styled.div`
    padding: 100px 0;
    flex: 1;                               
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;               
    gap: 40px;
`;

export const EmptyIcon = styled.img`
    width: 80px;
    opacity: 0.4;
`;

export const EmptyText = styled.div`
    font-size: 18px;
    color: #000;
`;

// 로딩
export const PageLoadingOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;  
`;

export const DotTypingWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 10px;
`;

interface DotProps {
    delay: number;
}

export const Dot = styled.span<DotProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #000;         
  display: block;
  animation: dot-bounce 0.6s ease-in-out infinite alternate;
  animation-delay: ${({ delay }) => `${delay}s`};

  @keyframes dot-bounce {
    0% {
      transform: translateY(0);
      opacity: 0.4;
    }
    100% {
      transform: translateY(-8px);
      opacity: 1;
    }
  }
`;
