import React from "react";
import { Container, InfoBox, InfoButton, SideMenus } from "./MyPage";
import { useState } from "react";
import DetailsForm from "./BoxPages/DetailsForm";
import ChangePwForm from "./BoxPages/ChangePwForm";
import ViewForm from "./BoxPages/ViewForm";
import LikeForm from "./BoxPages/LikeForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "./../../Auth";
import apiServer from "../../api/api";

const MyPageForm = () => {
  const [infoBoxContent, setInfoBoxContent] = useState(<DetailsForm />);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("id")) {
  //     navigate("/login");
  //     alert("로그인 후 이용가능합니다.");
  //     return;
  //   }
  // }, [navigate]);

  const handleButtonClick = (content) => {
    setInfoBoxContent(content);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    try {
      const response = await axios.post(`${apiServer}/api/~~~~`, { setToken });
      console.log(response);
      alert("로그아웃 성공");
      navigate("/login");
    } catch (error) {
      alert("로그아웃 실패");
      console.log(error);
    }
  };

  return (
    <>
      <SideMenus>
        <Container>
          <InfoButton onClick={() => handleButtonClick(<DetailsForm />)}>
            <span class="material-symbols-outlined">
              info
              <span
                style={{
                  fontSize: "17px",
                  position: "relative",
                  bottom: "5px",
                  left: "10px",
                }}
              >
                내 정보
              </span>
            </span>
          </InfoButton>
          <InfoButton onClick={() => handleButtonClick(<ChangePwForm />)}>
            <span class="material-symbols-outlined">
              lock
              <span
                style={{
                  fontSize: "17px",
                  position: "relative",
                  bottom: "5px",
                  left: "10px",
                }}
              >
                비밀번호 변경
              </span>
            </span>
          </InfoButton>
          <InfoButton onClick={() => handleButtonClick(<ViewForm />)}>
            <span class="material-symbols-outlined">
              order_approve
              <span
                style={{
                  fontSize: "17px",
                  position: "relative",
                  bottom: "5px",
                  left: "10px",
                }}
              >
                내 글 보기
              </span>
            </span>
          </InfoButton>
          <InfoButton onClick={() => handleButtonClick(<LikeForm />)}>
            <span class="material-symbols-outlined">
              favorite
              <span
                style={{
                  fontSize: "17px",
                  position: "relative",
                  bottom: "5px",
                  left: "10px",
                }}
              >
                좋아요 리스트
              </span>
            </span>
          </InfoButton>
          <InfoButton onClick={handleLogout}>
            <span class="material-symbols-outlined">
              logout
              <span
                style={{
                  fontSize: "17px",
                  position: "relative",
                  bottom: "5px",
                  left: "10px",
                }}
              >
                로그아웃
              </span>
            </span>
          </InfoButton>
        </Container>
      </SideMenus>
      <InfoBox>{infoBoxContent}</InfoBox>
    </>
  );
};

export default MyPageForm;
