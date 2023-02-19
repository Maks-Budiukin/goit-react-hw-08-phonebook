import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

const HomeWrapper = styled.div`
    text-align: center;
    h1 {
        text-align: center;
    }
`

const StyledLink = styled(Link)`
display: block;
width: 120px;
  background-color: #fff;
    padding: 5px 10px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid silver;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    font-size: 14px;
    font-weight: 500;

    transition-property: color, background-color, border;
    transition-duration: 250ms;
    transition-timing-function: ease;


    &:visited {
        color: black;
    }
    &:hover,
    &:focus  {
      outline: none;
      border: 1px solid skyblue;
    }
  &.active {
    color: #fff;
    background-color: skyblue;
    border: 1px solid skyblue;
  }
`;

export const HomeScreen = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const name = useSelector(state => state.auth.user.name)


    return (<HomeWrapper>
        {isLoggedIn
            ? <div><h1>Welcome back, {name}!</h1>
                <StyledLink to="/contacts">Go to Your contacts</StyledLink></div>
            : <div><h1>Welcome to PhoneBook App!</h1>
                <p>Please, LogIn or SignUp to get your own phone book!</p></div>}
            </HomeWrapper>)
}