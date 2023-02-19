import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";
import { logoutThunk } from "redux/auth/auth.thunk";
import styled from "styled-components";


const AuthButton = styled.button`
    width: 75px;
    background-color: #fff;
    padding: 5px 5px;
    margin: 10px 0;
    border: 1px solid silver;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    transition-property: border;
    transition-duration: 250ms;
    transition-timing-function: ease;

    &:hover,
    &:focus  {
      outline: none;
      /* color: skyblue; */
      border: 1px solid skyblue;
    }
`

const AuthLink = styled(NavLink)`
display: block;
width: 55px;
  background-color: #fff;
    padding: 5px 10px;
    margin: 10px 0;
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
      /* color: skyblue; */
      border: 1px solid skyblue;
    }
  &.active {
    color: #fff;
    background-color: skyblue;
    border: 1px solid skyblue;
  }
`;

const NavWrapper = styled.div`
display: flex;
justify-content: space-between;
height: 90px;
margin-bottom: 12px;
  h1 {
    margin-top: 4px;
    margin-bottom: 14px;
  }

  p {
    font-style: italic;
    margin-bottom: 0;
    text-align: right;
  }
    
`

const LogoLink = styled(Link)`
  text-decoration: none;
  &:visited {
        color: black;
    }
`

export const AppBar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const name = useSelector(state => state.auth.user.name)
    const dispatch = useDispatch();

    return (<>
        <NavWrapper>
            <nav>
                {isLoggedIn
                    ? <AuthButton type="button" onClick={() => dispatch(logoutThunk())}>Log Out</AuthButton>
                    : 
                <><AuthLink to="/login">Log In</AuthLink><AuthLink to="/register">Sign Up</AuthLink></>}
        </nav>
            <div>
        <LogoLink to="/"><h1><span>P</span>honebook</h1></LogoLink>
            
          {isLoggedIn && <p>Welcome, {name}!</p>}
            </div>
        </NavWrapper>
    </>)
}