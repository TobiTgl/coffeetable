import './App.css';
import React from 'react';


function App() {
  var canvas = document.createElement('canvas');
  canvas.id     = "CursorLayer";
  document.body.appendChild(canvas);
  
  const html = document.documentElement;
  const context = canvas.getContext("2d")
  
  const frameCount = 1097;
  const currentFrame = index => (
    `https://res.cloudinary.com/tobitgl/image/upload/v1663511212/Portfolio/CoffeTable/ersteFinal${index.toString().padStart(4, '0')}.webp`
  )
  
  const preloadImages = () => {
    console.log('preload')
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  
  const img = new Image()
  img.src = currentFrame(1);
  canvas.width=1920;
  canvas.height=1080;
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
    console.log(window.innerHeight)
    console.log(window.innerWidth)

    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });
  
  preloadImages()
  
  return (
  <>
    <div></div>  
  </>
  );
}

export default App;
