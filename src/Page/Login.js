import React, { useState, useEffect, useRef } from "react";
import { loadModels, loadFaceRecognition } from "../lib/faceUtil.js";
import styled, { keyframes } from "styled-components";
import ProfilePic from "../assets/profilePic.svg";

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

const ProfileContainer = styled.div``;

const ProfilePicContainer = styled.div`
  width: 200px;
  height: 250px;
  border: ${(props) => (props.loadProfile ? "none" : "3px dotted #808080")};
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

const InstructionPargarph = styled.p`
  margin: 5px 0 0 0;
  color: #aa4a44;
  font-size: 12px;
  white-space: nowrap;
  letter-spacing: 1 !important;
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: White;
  border: 0.6px solid #aa4a44;
  border-radius: 3px;
  ::placeholder {
    color: black;
    font-family: "Pacifico";
  }
  &:focus {
    color: #aa4a44;
    box-shadow: 0px 0px 2px black;
    :: placeholder {
      color: #aa4a44;
    }
  }
`;

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding-left: 20px;
`;

const Form = styled.form``;

const Login = () => {
  const [selectImgFile, setSelectImgFile] = useState();
  const [preview, setPreview] = useState();
  const [loadProfile, setProfilePic] = useState(false);
  const [getFaceRecognition, setFaceRecognition] = useState(false);
  const inputFile = useRef(null);
  const handleChange = (e) => {
    const fileTypeCheck =
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/jpg";
    if (fileTypeCheck) {
      alert("<h1>Please chose only jpeg</h1>");
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      setProfilePic(true);
      setSelectImgFile(e.target.files[0]);
      loadFaceRecognition(URL.createObjectURL(e.target.files[0]))
        .then((imgInfo) => {
          setProfilePic(false);
          setFaceRecognition(true);
          console.log("imgInfo", imgInfo.length);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setSelectImgFile(null);
    }
  };

  const handleProfileChange = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    if (!selectImgFile) {
      setPreview(null);
      return;
    }
    // console.log("handleChange#", selectImgFile);
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
          <Heading>Registration</Heading>
        </FlexCenter>
        <Container>
          <FlexDiff>
            <ForumContainer>
              <Form>
                <FlexDiff>
                  <FlexColumn>
                    <p style={{ margin: "0" }}>Name</p>
                    <Input type="text" placeholder="name" />
                  </FlexColumn>
                  <FlexColumn>
                    <p style={{ margin: "0" }}>Email</p>
                    <Input type="email" placeholder="email" />
                  </FlexColumn>
                </FlexDiff>
              </Form>
            </ForumContainer>
            <ProfileContainer>
              <input
                type="file"
                accept="image/png , image/jpeg , image/jpg"
                ref={inputFile}
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <ProfilePicContainer
                loadProfile={loadProfile}
                onClick={handleProfileChange}
              >
                {loadProfile ? (
                  <ProfileSkin />
                ) : (
                  <img
                    alt="profile-pic"
                    src={getFaceRecognition ? preview : ProfilePic}
                    // src={preview}
                    width="100%"
                    height="100%"
                  />
                )}
                <InstructionPargarph>
                  Please upload your single picture
                </InstructionPargarph>
              </ProfilePicContainer>
            </ProfileContainer>
          </FlexDiff>
        </Container>
      </Container>
    </>
  );
};

export default Login;
