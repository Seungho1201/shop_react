import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import bg from './img/bg.jpg'

import data from './data.js'
import Detail from './routes/Detail.jsx'
import axios from 'axios'

import { Button, Container,Nav,Navbar, NavDropdown, Col, Offcanvas } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom"



function App() {

  let[num,setNum] = useState(0);

  let[shoes] = useState(data);
  let[page,pageSet] = useState(false);

  let[data2, data2Set] = useState();


  let navigate = useNavigate();

  return (
    <div className='App'>
      

    {/* Navbar */} 
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link onClick={()=>{ navigate('/') }}>Main</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate(-1) }}>Back</Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">

            <NavDropdown.Item href="#action/3.1"> 메뉴 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"> 메뉴 2</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3"> 메뉴 3</NavDropdown.Item>

            <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"> Separated link</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {/* 메인 배경 이미지 */} 
    <div className='main-bg' style={{backgroundImage : 'url('+ bg +')'}}></div>


    {/* 라우트로 페이지 나누기기 */} 
    <Routes>
      {/* 상품 페이지들  */}
      <Route path='/' element={
        <>
          <div className="container">
            <div className="row">
              {
                shoes.map(function(a, i) {
                  return(<Card shoes={shoes} i = {i}></Card>)
                })
              }
              </div>
            </div>

            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((moreData)=>{ data2Set(moreData)
                console.log(data2.data);
              })
              .catch(()=>{ console.log("실패"); });

             pageSet(!page);
            }}> 버튼</button>

            {
                page == true ? <MoreItem data2={data2.data} /> : null
            }

          </>
        }
      />

      {/* 상세 페이지  */}
      <Route path='/detail/:id' element={<Detail data={data} />}></Route>

      {/* about  */}
      <Route path='/about' element={ <About/> }>
        <Route path='member' element={ <div>멤버임</div> }/>
        <Route path='location' element={ <div>location</div> }/>
      </Route>

      {/* 라우트 페이지 의외의 모든 것  */}
      <Route path='*' element={ <div>없는 페이지</div> }/>

    </Routes>

    </div>
  );
}


function MoreItem(props){
  return(
    <div>
      <h1>111</h1>
      <p>{ props.data2[0].title }</p>
      <p>{ props.data2[0].price }</p>
      <p>{ props.data2[0].content }</p>
    </div>
  )
}


function Card(props){
  return(
    <div className="col-md-4 ">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
       <h4> {props.shoes[props.i].title} </h4>
      <p> {props.shoes[props.i].content} </p>
    </div>
  )
}

function About(){
  return(
    <>
      <div> 회사 정보임</div>
      {/* nested route를 어디에 보여줄건지는 Outlet */}
      <Outlet/>
    </>
  )
}




export default App
