import styled from "styled-components";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { postArticleAPI } from "../actions/actions";
import { Timestamp } from "firebase/firestore";


const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }

    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.fromDate(new Date()).toDate(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
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
                {props?.user?.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="../images/user.svg" alt="" />
                )}

                <ExtraInfo>
                  <span>
                    {props?.user?.displayName
                      ? props?.user?.displayName
                      : "Name"}
                  </span>
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
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter video URL"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        style={{
                          marginBottom: "8px",
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <label htmlFor="file">
                    <img src="../images/share-image.svg" alt="" />
                  </label>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleChange(e)}
                  />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="../images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <CommentButton>
                  <img src="../images/share-comment.svg" alt="" />
                  Anyone
                </CommentButton>
              </ShareComment>

              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
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
  animation: fadeIn 300ms;
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
  cursor: not-allowed !important;
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: auto 16px;
  background-color: ${(props) =>
    props.disabled ? "rgba(0,0,0,0.15)" : "#0a66c2"};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.3)" : "white")};
  font-weight: 600;
  font-size: 16px;
  border: none;
  transition: background-color 300ms ease-in, color 300ms ease-in;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(0,0,0,0.15)" : "#004182"};
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

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
