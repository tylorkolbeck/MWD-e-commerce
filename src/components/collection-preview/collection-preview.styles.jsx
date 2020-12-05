import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
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
  display: flex;
  justify-content: space-between;
`
