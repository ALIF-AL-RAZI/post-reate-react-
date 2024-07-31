import { useState, useEffect } from 'react';
import './App.css';
import { domToPng } from 'modern-screenshot';
import FontPicker from "font-picker";


function App() {
const [headText, setHeadText] = useState("");
const [bodyText, setBodyText] = useState("");
const [image, setImage] = useState(false);
const [paragraphWidth, setParagraphWidth] = useState(40);
const [fontSize, setFontSize] = useState(20);
const [opacity, setOpacity] = useState(0.4);
const [bgColor, setBgColor] = useState("#ffffff");
const [fontColor, setFontColor] = useState("#000000");

const api = "AIzaSyCugkP0jti1o10o7VIJa29OiYJYKbo5O8U"

useEffect(()=>{
const fontPicker = new FontPicker(
  api, // Google API key
  "Open Sans", // Default font
  { limit: 30 }, // Additional options
);
},[])




const handleBgColor = (e) => {
setBgColor(e.target.value);
};
const handleFontColor = (e) => {
  setFontColor(e.target.value);
  };

const handleWidthChange = (e) => {
setParagraphWidth(e.target.value);
};

const handleFontSize = (e) => {
setFontSize(e.target.value);
};

const handleOpacity = (e) => {

setOpacity(e.target.value);
};

const imageHandler = (e) => {
setImage(e.target.files[0]);
};

const downloadHandler = () => {
domToPng(document.querySelector('.container')).then(dataUrl => {
  const link = document.createElement('a');
  link.download = 'screenshot.png';
  link.href = dataUrl;
  link.click();
});
};

useEffect(() => {
const elmnt = document.querySelector(".paragraph");
if (elmnt) {
  dragElement(elmnt);
}
}, []);







function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elmnt.onmousedown = dragMouseDown;
  elmnt.ontouchstart = dragTouchStart;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function dragTouchStart(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementTouchDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    setElementPosition(elmnt);
  }

  function elementTouchDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    setElementPosition(elmnt);
  }

  function setElementPosition(elmnt) {
    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const elementRect = elmnt.getBoundingClientRect();

    if (newTop < 0) {
      newTop = 0;
    } else if (newTop + elementRect.height > containerRect.height) {
      newTop = containerRect.height - elementRect.height;
    }

    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft + elementRect.width > containerRect.width) {
      newLeft = containerRect.width - elementRect.width;
    }

    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

return (
<div className="page">
  <div className="input">
  
    <input 
      className="header-input" 
      type="text" 
      onChange={(e) => setHeadText(e.target.value)} 
      placeholder='Writer Header...'
    />
    <label htmlFor='file-input'>
      <img src={image ? URL.createObjectURL(image) : "./upload_area.svg"} className='addproduct-thumnail-img' alt=''/>
      <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
    </label>
    <textarea name="" className="body-input" 
      type="text" 
      onChange={(e) => setBodyText(e.target.value)}
      placeholder='Writer Content...'>
    </textarea>
    <label htmlFor="width-slider">Adjust Paragraph Width:</label>
      <input 
        id="width-slider" 
        type="range" 
        min="40" 
        max="100" 
        value={paragraphWidth} 
        onChange={handleWidthChange} 
      />

<label htmlFor="fontSize-slider">Adjust Font Size:</label>
      <input 
        id="fontSize-slider" 
        type="range" 
        min="20" 
        max="70" 
        value={fontSize} 
        onChange={handleFontSize} 
      />
      <label htmlFor="opacity-slider">Adjust Image Opacity:</label>
      <input 
        id="opacity-slider" 
        type="range" 
        min="0" 
        max="1" 
        step="0.1"
        value={opacity} 
        onChange={handleOpacity} 
      />

<label htmlFor="bgColor">Select Background color:</label>
<input type="color" id="bgColor" value={bgColor} onChange={handleBgColor}/>

<label htmlFor="fontcolor">Select Font color:</label>
<input type="color" id="fontcolor" value={fontColor} onChange={handleFontColor}/>


  </div>   
  

  <div className="container">
    <h1>{headText}</h1>
    <p className="paragraph apply-font"  style={{position: 'absolute', width: `${paragraphWidth}%`, fontSize: `${fontSize}px`, color:`${fontColor}`}}>
      {bodyText}
    </p>
    <div className="img" style={{backgroundColor: `${bgColor}`}}>
      <img 
      src={image ? URL.createObjectURL(image) : "./plain-white-background-xdwiksazlsuzkuhi.jpg"} 
      alt=""
      style={{opacity:`${opacity}`}}
      />
    </div>

  </div>

  <div className="buttons">
    <button className="capture-button" onClick={downloadHandler}>Capture Screenshot</button>
  </div>
</div>
);
}

export default App;
