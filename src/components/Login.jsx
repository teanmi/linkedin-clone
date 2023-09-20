import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI, signInGuestAPI } from "../actions/actions";
import { useNavigate } from "react-router";

const Login = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.user) {
      navigate("/home");
    }
  }, [props.user, navigate]);

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="../images/login-logo.svg" alt="" />
        </a>
        <div className="">
          <Join>Join now</Join>
          <SignIn onClick={() => props.signIn()}>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="../images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="../images/google.svg" alt="" />
            Sign in with Google
          </Google>
          <Guest onClick={() => props.signInGuest()}>
            Sign in as Guest
          </Guest>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 12px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  text-decoration: none;
  transition-duration: 150ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
  }
`;

const Section = styled.section`
  display: flex;
  align-content: flex-start;
  min-height: 700px;
  padding: 60px 0;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    min-height: 0px;
    justify-content: center;
  }
`;

const Hero = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  h1 {
    z-index: 1;
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 100;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 28px;
      width: 100%;
      line-height: 2;
      margin-bottom: 6px;
    }
  }

  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: 50px;
    right: -15px;
    @media (max-width: 768px) {
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  z-index: 1;
  margin-top: 100px;
  width: 488px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
  text-align: center;
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 1;
  transition-duration: 150ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Guest = styled.button`
  margin-top: 16px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    text-decoration: underline;
  }
`

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
  signInGuest: () => dispatch(signInGuestAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
