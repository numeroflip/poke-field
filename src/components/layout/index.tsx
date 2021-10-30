import { ReactNode } from 'react'
import { styled } from '@mui/material'

interface Props {
  body: ReactNode
  footer?: ReactNode
  header?: ReactNode
}

export const Layout = ({ header, footer, body }: Props) => {
  return (
    <Wrapper>
      {header ? <header>{header}</header> : null}
      <main>{body}</main>
      {footer ? <footer>{footer}</footer> : null}
    </Wrapper>
  )
}

const Wrapper = styled('div')`
  display: flex;
  min-height: 100vh;
  footer {
    margin-top: auto;
  }
`
