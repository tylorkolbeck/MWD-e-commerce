import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media screen and (max-width: 800px) {
    align-items: center;
  }
`

export const TitleContainer = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;

  & h1 {
    font-size: 28px;
    margin-bottom: 25px;
  }
  &:hover {
    color: grey;
  }
`

export const PreviewContainer = styled.div`
  /* display: flex;
  justify-content: space-between; */
  display: grid;
  grid-gap: 15px;

  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`
