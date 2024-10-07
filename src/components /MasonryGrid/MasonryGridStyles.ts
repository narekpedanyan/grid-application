import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Grid = styled.div<{ columncount: number; gap: number; }>`
  width: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(${(props) => props.columncount}, minmax(0, 1fr));
  grid-column-gap: ${(props) => props.gap}px;
`;

export const Column = styled.div<{ gap: number }>`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: 24px;
`;

export const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    &:hover {
        &:before {
            background-color: rgba(0, 0, 0, 0.3);
            cursor: zoom-in;
        }
        > a {
            display: inline-flex;
        }
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    position: absolute;
    right: 12px;
    top: 12px;
    display: none;
    width: 42px;
    height: 42px;
    background-color: rgba(250, 250, 250, 0.85);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    &:hover {
        color: #3498db; /* Change the color on hover */
        img {
          filter: brightness(0.8); /* Example effect on the image inside the link */
        }
    }
    img {
        width: 28px;
        height: 28px;
        transition: filter 0.3s ease;
    }
`;

