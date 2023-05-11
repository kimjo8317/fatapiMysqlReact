import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiServer from "../../api/api";

export const WriteContainer = styled.div`
  width: 900px;
  height: 600px;
  margin: 0 auto;
  box-shadow: 1px 5px 15px 5px lightgray;
  margin-top: 70px;
  margin-bottom: 300px;
  padding: 20px;
  input {
    width: 850px;
    height: 40px;
    background-color: transparent;
    border: 1px solid lightgray;
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  width: 850px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #c7e8ca;
  color: gray;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #5d9c59;
    color: white;
  }
`;

const EditQuestion = () => {
  const ID = String(localStorage.getItem("id"));
  const quillRef = useRef();
  const [username, setUsername] = useState(ID);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [create_date, setCreate_date] = useState(new Date());
  const now = new Date();
  const formattedDate = now.toISOString();

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
      alert("로그인 후 이용가능합니다.");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("작성자: ", username);
    console.log("제목: ", subject);
    console.log("내용: ", content);
    console.log("날짜: ", formattedDate);

    if (subject === "") {
      alert("제목을 작성해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 작성해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${apiServer}/api/board/update/${localStorage.getItem("username")}`, {
        username,
        subject,
      });
      alert("질문 수정 성공");
      navigate("/q&a");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image"],
        [{ align: [] }, { color: [] }, { background: [] }],
        ["clean"],
      ],
    };
  }, []);

  return (
    <WriteContainer onSubmit>
      <input
        placeholder="제목을 입력해주세요."
        value={subject}
        type="text"
        onChange={(e) => setSubject(e.target.value)}
      ></input>
      <ReactQuill
        style={{ width: "850px", height: "430px", marginBottom: "50px" }}
        placeholder="내용을 입력해주세요. "
        modules={modules}
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
      ></ReactQuill>
      <input type="hidden" value={username} onChange={setUsername} />
      <input type="hidden" value={create_date} onChange={setCreate_date} />
      <ButtonContainer>
        <Button type="submit" onClick={handleSubmit}>
          업로드하기
        </Button>
      </ButtonContainer>
    </WriteContainer>
  );
};

export default EditQuestion;
