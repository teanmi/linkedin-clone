/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../actions/actions"

const Header = (props) => {
  return (
    <Container>
      <Content>
        <Logo>
          <a>
            <img src="../images/home-logo.svg" alt="" />
          </a>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="../images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="../images/nav-home.svg" alt="" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="../images/nav-network.svg" alt="" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="../images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="../images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </a>
            </NavList>
            <NavList>
              <a>
                <img src="../images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                {props?.user && props?.user?.photoURL ? (
                  <img src={props.user.photoURL} alt=""/>
                ) : (
                  <img src="../images/user.svg" alt="" />
                )}

                <span>
                  Me
                  <img src="../images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut onClick={() => props.signOut()}>
                <a>Sign out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src="../images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="../images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  padding: 0 24px;
  width: 100vw;
  @media (max-width: 768px) {
    padding: 8px 24px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #e2f6f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      outline-color: #0a66c2;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  @media (max-width: 1200px) and (min-width: 768px) {
    margin-right: 36px;
  }

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid rgba(0, 0, 0, 0.9);
      position: absolute;
      bottom: 0;
      left: 0;
      transition: transform 200ms ease-in-out;
      width: 100%;
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
    }
  }
  @media (max-width: 875px) and (min-width: 768px) {
    a {
      min-width: 65px;
      span {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    min-width: 70px;
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 1);
        transition: color linear 150ms;
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background-color: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  transition-duration: 150ms;
  text-align: center;
  display: none;
  box-shadow: 0px 6px 8px 4px rgba(0, 0, 0, 0.3);
`;

const User = styled(NavList)`
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
    img {
      width: 13px;
    }
  }

  &:hover {
    ${SignOut} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI())
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)
