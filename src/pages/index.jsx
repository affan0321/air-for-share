import LOGO from "../assets/logo.svg";
import './style.scss';
import { CiText } from "react-icons/ci";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { GrTextAlignFull } from "react-icons/gr";
import { useEffect, useState } from "react";
import TEXT_GREY from "../assets/text-gray.svg"
import TEXT_PRIMARY from "../assets/text-primary.svg"
import FILES_GREY from "../assets/files-gray.svg"
import FILES_PRIMARY from "../assets/files-primary.svg"
import TextArea from "../components/Textarea";
import ThemeBtn from "../components/Button";
import DropZone from "../components/Dropzone";
import FilesList from "../components/FilesList";
import { FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { storage, storageRef, uploadBytesResumable, getDownloadURL } from '../db/index'; // Adjust the path as needed
// import { ref, set, remove, onValue } from 'firebase'; // Add this line
import { ref,set,remove,onValue } from "firebase/database";
import { database } from "../db/index";




function HomePage(){
    const [type,setType] = useState("text");
    const [textvalue,setTextvalue] = useState("");
    const [isText,setIsText] = useState(false)
    const [files,setFiles] = useState([]);
    const onDrop = (acceptedFiles => {
        setFiles([...files,...acceptedFiles])
        uploadFiles(acceptedFiles[0],0)
      })
      const saveChanges = () => {
        
      
        console.log("textValue", textvalue);
      
      
        set(ref(database, 'sharing'), {
          text: textvalue,
        }).then(() => {
          console.log("Data saved successfully!");
        }).catch((error) => {
          console.error("Error saving data:", error);
        });
      };

      const handleTextChange = (event) => {
        setTextvalue(event.target.value); 
      };

      const clearText = async ()=> {
        await remove(ref(database, 'sharing'))
        setIsText("")
        setIsText(false)
      }

      useEffect(()=>{
        const starCountRef = ref(database, 'sharing');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.text) {
            setTextvalue(data.text); 
          }

          if(data.text){
            setIsText(true)
          }
});
      },[])

      const links = textvalue.match(/\bhttps?:\/\/\S+/gi) || [];

      const uploadFiles = (files, i) => {
        // Use the storage instance imported from the Firebase setup
        const fileRef = storageRef(storage, `file/${i}`); // Correctly reference the file path
        
        const uploadTask = uploadBytesResumable(fileRef, files);
      
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error('Upload failed:', error);
          },
          () => {
            // Handle successful uploads
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
            });
          }
        );
      };
      

    

    return(
        <div className="container">
            <div className="header-bar" >
            <div className="logo">
                <img src={LOGO} alt="" />
            </div>
            <div className="menu">
                <ul>
                    <li>How it works</li>
                    <li>Download</li>
                    <li>Upgrade</li>
                    <li>Feedback</li>
                    <li className="menu-btn">Login / Register</li>
                </ul>
            </div>
            </div>

            <div className="main-card">
            <div className="logo-card">
            <div onClick={() => setType("text")} >
                        <img src={type === "text" ? TEXT_PRIMARY : TEXT_GREY} alt="" />
                    </div>
                    <div onClick={() => setType("files")} >
                        <img src={type === "files" ? FILES_PRIMARY : FILES_GREY} alt="" />

                    </div>
            </div>
            <div className="card-container">
            { type === 'text'?
            <div className="text-section">
                <h1>Text</h1>
                <div className="resize-section">
                <TextArea values={textvalue} onChange={
                    (e)=>{setTextvalue(e.target.value)
                        setIsText(false)
                    }
                    }/>
                </div>
                <div className="text-footer">
                    <div className="links">
                    {
                        links.map((v, i) => (
                            <div key={i}>
                            <span>
                                <a href={v} target="_blank" rel="noopener noreferrer">{v}</a>
                            </span>
                            </div>
                        ))
                        }

                    </div>
                <div className="save-btn-section">
                    <span onClick={clearText}>Clear</span>
                    {
                    isText ?
                    <ThemeBtn onClick={()=>{
                        navigator.clipboard.writeText(textvalue)
                    }} title={"Copy"}/>
                    :
                    <ThemeBtn onClick={saveChanges} disabled={textvalue ? false : true} title={"save"}/>
                }
                </div>
                </div>

            </div>
            :
            <div className="file-section">
                <div  className="files-header">
                <h1>File</h1>
                <div>
                    <div className="files-btn">
                        <div className="download-btn">
                    <FaDownload/>
                    Download All
                    </div>
                    <div onClick={()=> setFiles([])} className="delete-btn">
                    <MdDelete/>
                    Delete All
                    </div>
                    </div>
                </div>
                </div>

                {files.length?
                    <FilesList files={files} onDrop={onDrop}/>
                    :
                 <DropZone onDrop={onDrop} textElement={
                    <>
                    Drag and drop any files up to 2 files, 5Mbs each or <span> Browse <br />
                    Upgrade </span> to get more space

                    </>
                }/> }
                
  
            </div>
            }
            </div>
            </div>
            

        </div>
    )
}
export default HomePage;