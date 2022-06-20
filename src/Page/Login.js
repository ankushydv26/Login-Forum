import React, { useState, useEffect } from "react";
import { loadModels, loadFaceRecognition } from "../lib/faceUtil.js";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  margin: 4px;
`;

const Heading = styled.h1`
  color: black;
  margin: 0;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const FlexDiff = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ForumContainer = styled.div``;

const ProfilePicContainer = styled.div`
  width: 200px;
  height: 250px;
  border: 3px dotted #808080;
  & > img {
    width: 100%;
    height: 250px;
    object-fit: contain;
  }
`;

const skeletonKeyframes = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const ProfileSkin = styled.div`
  display: inline-block;
  height: 250px;
  width: 200px;
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
`;
// const  Car
// const

const Login = () => {
  const [selectImgFile, setSelectImgFile] = useState();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectImgFile(e.target.files[0]);
      loadFaceRecognition(URL.createObjectURL(e.target.files[0])).then(
        (imgInfo) => {
          console.log(imgInfo);
        }
      );
    } else {
      setSelectImgFile(null);
    }
  };

  //   console.log("selectImgFile", selectImgFile);
  useEffect(() => {
    if (!selectImgFile) {
      setPreview(null);
      return;
    }
    console.log("handleChange#", selectImgFile);
    const objectUrl = URL.createObjectURL(selectImgFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectImgFile]);

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <>
      <Container>
        <FlexCenter>
          <Heading>Login Forum .</Heading>
        </FlexCenter>
        <Container>
          <FlexDiff>
            <ForumContainer>
              <ProfileSkin />
            </ForumContainer>
            <ForumContainer>
              <input type="file" onChange={handleChange} />
              {preview && (
                <ProfilePicContainer>
                  {" "}
                  <img alt="profile-pic" src={preview} />{" "}
                </ProfilePicContainer>
              )}
            </ForumContainer>
          </FlexDiff>
        </Container>
      </Container>
    </>
  );
};

export default Login;
