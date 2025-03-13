import { useState,useEffect } from "react";
import {useParams}  from "react-router-dom";
import styled  from "styled-components";

// styled-components 쓰면 css 안열고도 편하게 사용 가능
// 스타일이 다른 js 파일로 오염 x
// 페이지 로딩시간 단축
// props로 컴포넌트 재활용 가능
// 그냥 라이브러리 사용법임

// 단점 js파일 매우 복잡해짐
// 중복스타일은 컴포넌트간 import하면 css랑 뭐가 다름?
// 협업시 css 담당의 숙련도 이슈
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : black;
  padding : 10px;
  `


let Box = styled.div`
  background : grey;
  padding : 20px;
`

function Detail(props){

  let {id} = useParams();

  let findItem = props.data.find(x=>x.id == id);

  let[show, showSet] = useState("flex");
  let [inputData, setInputData] = useState(""); // 입력 값을 상태로 관리


  // hook 걸기
  // mount, update시 코드 실행

  // useEffect는 html 랜더링 후 동작
  // side_Effect 같아서 useEffect라 함함
  useEffect(()=>{
    
    setTimeout(()=>{
      showSet("none");
    }, 2000);

    // userEffect 동작 전에 실행되는 return () => {}
    // cleanup function
    return ()=>{
      console.log("ddda");
    }
  }, [])
  // [] <- dependence useEffect 실행조건 넣을수 잇음

 
  
  
  return(
    <div className="container">
      
      <div className="alert alert-warning" style={{ display : show }}></div>
  
      <input className="inppp" type="text" name="inputData"  ></input>

      <div className="row">
         <div className="col-md-6">
           <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
         </div>
  
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.title}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default Detail;