import { useState } from 'react'

import './App.css'

import { domToPng } from 'modern-screenshot'


function App() {
  const [headText, setHeadText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [image, setImage] = useState(false);

  const imageHandler = (e)=>{
    setImage(e.target.files[0]);
};


  const downloadHandler = () =>{
  domToPng(document.querySelector('.container')).then(dataUrl => {
    
    const link = document.createElement('a')
    link.download = 'screenshot.png'
    link.href = dataUrl
    link.click()
  })
}






  // const downloadHandler = () =>{
  //       html2canvas(document.querySelector(".container"), 
  //       {allowTaint: true, useCors: true}).then(canvas => {
  //     document.querySelector('.preview-container').appendChild(canvas)
      
  //   });
  //     }


      // const download = document.querySelector(".capture-button");
      // download.addEventListener("click", downloadHandler());

  return (
    <>

    <div className="page">
      <div className="input">
        <input 
          className="header-input" 
          type="text" 
          onChange={(e)=>setHeadText(e.target.value)} 
          placeholder='Writer Header...'
        />
        <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):"./upload_area.svg"} className='addproduct-thumnail-img' alt=''/>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </label>
        <textarea name="" className="body-input" 
          type="text" 
          onChange={(e)=>setBodyText(e.target.value)}
          placeholder='Writer Content...'>
        </textarea>
        
      </div>   

      <div className="container">
          <h1>{headText}</h1>
          
          <img src={image?URL.createObjectURL(image):"./HEROSCREEN-WALLPAPER-4K-TIGER.jpg"} alt=""/>
          <p>
            {bodyText}
          </p>
      </div>
        
      
      <div className="buttons">
        <button className="capture-button" onClick={downloadHandler}>Capture Screenshot</button>
      </div>
    </div>

    
    </>
  )
}

export default App
