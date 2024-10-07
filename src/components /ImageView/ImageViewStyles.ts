import styled from "styled-components";

export const ImageViewOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    padding-right: 24px;
    z-index: 444;
`;

export const ModalContainer = styled.div`
    max-width: 1440px;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 90%;
    padding: 30px;
    border-radius: 12px;
    position: relative;
`;

export const ModalHeader = styled.div`
    display: flex;
    position: relative;
`;

export const CloseBtn = styled.button`
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 24px;
    color: #141414;
    background: transparent;
    width: 24px;
    height: 24px;
    outline: none;
    border: none;
    cursor: pointer;
`;

export const Content = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`;

export const InfoHolder = styled.div`
    flex: 1;
    align-self: start;
`;

export const InfoLabel = styled.div`
    font-size: 15px;
    margin-top: 12px;
`;

export const ImageHolder = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    > img {
        max-width: 1024px;
        max-height: calc(95vh - 46px);
        object-fit: cover;
    }
`;