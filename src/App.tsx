import { useState } from 'react';
import styles from './styles.module.css'
import './App.css'

function App() {

  const [imageIndex, setImageIndex] = useState(0);
  const [imageRoster, setImageRoster] = useState([])
  const [loadingImages, setLoadingImages] = useState(false);

  function addImageToGrid(data, imgIndex) {
    let imageRosterCopy = imageRoster;
    imageRosterCopy.push(<img src={`${data}`} key={`${imgIndex}`} className={`image-${imgIndex} ${styles.image}`} />);
    setImageRoster(imageRosterCopy);
  }

  async function getImage(evt){
    setLoadingImages(true);
    console.log(evt.target.files)
    
    const files = [...evt.target.files].map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    const res = await Promise.all(files);
    for(let i = 0; i < res.length; i++) {
      const imgData = res[i];
      setImageIndex(imageIndex+1);
      addImageToGrid(imgData, imageIndex + "-" + i);
    }
    setLoadingImages(false)
  }

  return (
    <>
    <h1
      className={`${styles.title}`}
    >Photo Grid By Ahan</h1>
      <div className={styles.grid}>
        {imageRoster}
      </div>
      <div className={styles.inputSection+" "+(loadingImages?styles.freeze:"")}>
        <label htmlFor="images" className={`${styles.imageInputLabel}`}>Add images</label>
        <input 
          type="file" 
          name="images" 
          id="images" 
          onChange={getImage} 
          style={{display: "none"}}
          accept='.png,.jpeg,.jpg,.jfif,.webp'
          multiple 
        />
      </div>
    </>
  )
}

export default App
