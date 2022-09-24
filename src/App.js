import './App.css';
import React from 'react';


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
  console.log(ratio)
  if(ratio > 1){
      return `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/ersteFinal${index.toString().padStart(4, '0')}.webp`
  }else{
      return  `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/mobil/mobile${index.toString().padStart(4, '0')}.webp`
  }
}
  
  const preloadImages = () => {
    console.log(window.innerWidth)
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
  
  return (
  <>
    <div className="test">test</div>  
  </>
  );
}

export default App;
