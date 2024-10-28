import { CiFileOn } from "react-icons/ci";
import "./style.scss"
import DropZone from "./Dropzone";
import { GoPlus } from "react-icons/go";
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";



function FilesList({ files, onDrop }) {
    return (
        <div className="files-list">
            {files.map((v, i) => {

                let icons;
                switch (v.type) {
                    case "text/html":
                        icons = <FaHtml5 />;
                        break;

                    case "text/css":
                        icons = <FaCss3Alt />;
                        break;

                    case "text/javascript":
                        icons = <IoLogoJavascript />;
                        break;

                    default:
                        icons = <CiFileOn />;
                }

                return (
                    <div key={i}>
                        {v.type.indexOf("image") !== -1 ? (
                            <img src={URL.createObjectURL(v)} alt="" />
                        ) : (
                            <>
                                {icons}
                                <span className="file-name">
                                    {v.name.slice(0, 10)}
                                </span>
                            </>
                        )}
                    </div>
                );
            })}

            <div>
                <DropZone
                    onDrop={onDrop}
                    textElement={
                        <span className="add-more-files">
                            <GoPlus />
                            <br />
                            <p>Add File</p>
                            <span>(Upto 5 MB)</span>
                        </span>
                    }
                />
            </div>
        </div>
    );
}

export default FilesList;