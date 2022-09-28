import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

function App() {
  var canvas = document.createElement('canvas');
  canvas.id     = "CursorLayer";
  document.body.appendChild(canvas);
  
  const html = document.documentElement;
  const context = canvas.getContext("2d")
  let ratio = window.innerWidth / window.innerHeight
  const frameCount = 1120;
  const currentFrame = index =>(
    webOrMobile(index)
  )
//  const currentFrame = index => (
//    `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/mobil/mobile${index.toString().padStart(4, '0')}.webp`
//  )
//  const currentFrameMobile = index => (
//    `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/mobile${index.toString().padStart(4, '0')}.webp`
//  )
const webOrMobile = (index) =>{
  if(ratio > 1){
      return `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/ersteFinal${index.toString().padStart(4, '0')}.webp`
  }else{
      return  `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/mobil/mobile${index.toString().padStart(4, '0')}.webp`
  }
}
  
  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  
  const img = new Image()
  img.src = currentFrame(1);
  if(ratio > 1){
    canvas.width=1920;
    canvas.height=1080;
  }else{
  canvas.width=1080;
  canvas.height=1920;
  }
  img.onload=function(){
    context.drawImage(img, 0, 0);
  }
  
  const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }
  
  window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = (scrollTop / maxScrollTop);
    const mathCeil = Math.ceil(scrollFraction * frameCount)
    const frameIndex = Math.min(
      frameCount - 1,
      mathCeil
    );    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });

  preloadImages()

  const onEnterDim =(event)=>{
    console.log(event);
    console.log(document.getElementsByClassName('dimensions'));
  }
  
  return (
  <>
  <ParallaxProvider>
  <Parallax className="welcome" speed={500} translateY={[100, -500]}>
        <h1 >Welcome to the TT Coffee-Table-Book!</h1>  
      </Parallax>
    <Parallax className="scroll" translateY={[-200, -50]}>
        <h1 >Scroll Down</h1>  
      </Parallax>
      <Parallax className="down" translateY={[-0, 200]}>
        <FontAwesomeIcon  icon={faChevronDown} />
      </Parallax>
      <Parallax className="down" translateY={[-50, 0]}>
        <FontAwesomeIcon  icon={faChevronDown} />
      </Parallax>
      <Parallax className="blättern" speed={500} translateY={[100, -500]}>
        <h1 >Including 48 pages of my stunning photography</h1>  
        <h1 >Compiled from my collection of 45455 images taken in 4 years</h1>  
      </Parallax>
      <Parallax className="dimensions" onEnter={(event)=>onEnterDim(event)} >
        <h1 >Dimensions: 29x29x3cm</h1>  
      </Parallax>
      <Parallax className="aurora" speed={500} translateY={[-50, 50]}>
        <h1 >Printed on premium Fuji crystal paper</h1>   
      </Parallax>
      <Parallax className="aurora2" speed={500} translateY={[-50, 300]}>
        <h1 >For an extremely sharp and detailed photo</h1>   
      </Parallax>
      <Parallax className="startrail" speed={500} translateY={[-50, 300]}>
        <h1 >Immerse yourself in the moment that was captured</h1>   
      </Parallax>
      <Parallax className="edition" speed={500} translateY={[-50, 50]}>
        <h1 >TT Edition #1 | 2018-2022</h1>   
      </Parallax>
      <Parallax className="continue" speed={500} translateY={[80, 50]}>
        <h1 >To be continued...</h1>   
      </Parallax>
    </ParallaxProvider>
  </>
  );
}

export default App;
