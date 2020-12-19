import styled from 'styled-components'

export const ImageContainer = styled.div`
  height: 200px;
  width: 150px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: white;
    border: 1px solid black;
    color: black;
  }

  img {
    width: inherit;
    height: inherit;
    object-fit: contain;
    background: white;
    border: 1px solid black;
    padding: 10px;
  }

  p {
    padding: 20px;
  }
`
