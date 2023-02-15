import { AppBar } from "components/AppBar/AppBar"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 300px;
  margin-left: 50px;
  h1 {
    font-size: 2.1em;
    text-align: right;
    text-align: center;
  }
  h2 {
    font-size: 2.1em;
    font-weight: 700;
  }
  span {
    color: skyblue;
  }
`

export const SharedLayout = () => {
    return (<>
        <Wrapper>
            <AppBar></AppBar>
        <Suspense fallback={null}>
          <Outlet></Outlet>
        </Suspense>
        </Wrapper>
    </>)
}