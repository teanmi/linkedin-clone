import styled from "styled-components";
import React, { useState } from "react";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");

  const reset = (e) => {
    setEditorText("");
    props.handleClick(e);
  };

  return (
    <>
      { props.showModal === "open" &&
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="../images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img src="../images/user.svg" alt="" />
                <ExtraInfo>
                  <span>Name</span>
                  <button>
                    <img src="../images/globe-icon.svg" alt="" />
                    <span>Anyone</span>
                    <img src="../images/down-greyIcon.svg" alt="" />
                  </button>
                </ExtraInfo>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                ></textarea>
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton>
                  <img src="../images/share-image.svg" alt="" />
                </AssetButton>
                <AssetButton>
                  <img src="../images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <CommentButton>
                  <img src="../images/share-comment.svg" alt="" />
                  Anyone
                </CommentButton>
              </ShareComment>

              <PostButton>Post</PostButton>
            </ShareCreation>
          </Content>
        </Container>
      }
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 40px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 18px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 1);
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-weight: 100;
  }
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background-color: transparent;
    border: none;
    color: rgba(0, 0, 0, 0.15);
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 12px;

  & > img {
    height: 48px;
    width: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-left: 5px;
  & > span {
    font-weight: 600;
    font-size: 15px;
  }
  button {
    margin-top: 4px;
    border-radius: 15px;
    outline: 1px solid rgba(0, 0, 0, 0.6);
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    padding: 6px 8px;
    color: rgba(0, 0, 0, 0.6);
    transition: all 150ms ease-in;
    span {
      margin: 0 4px;
      font-weight: 600;
    }
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.1);
    outline: 2px solid rgba(0, 0, 0, 0.6);
    outline-offset: -1px;
    cursor: not-allowed;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  border: none;
  background-color: transparent;
  transition: background-color 100ms ease-in;
  border-radius: 50%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  img {
    height: 14px;
    margin-right: 4px;
  }
`;

const CommentButton = styled(AssetButton)`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  height: 30px;
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: auto 16px;
  background-color: #0a66c2;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  transition: background-color 150ms ease-in;
  &:hover {
    background-color: #004182;
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    border: none;
    outline: none;
    resize: none;
    font-size: 16px;
    font-family: sans-serif;
  }
`;

export default PostModal;
