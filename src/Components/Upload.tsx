import React from "react";
import Uploady, { useRequestPreSend,useItemProgressListener,useItemFinishListener } from "@rpldy/uploady";
import { asUploadButton } from "@rpldy/upload-button";

import { useState, useEffect } from 'react'

const CLOUD_NAME = "dvmo50ocz",
UPLOAD_PRESET = "c9oynwg9",
API_KEY = "661814449754765";



// const retrieveSignatureForUpload = async (params, timestamp) => {
//   const response = await fetch("http://localhost:3000/api/cloudinary", {
//     method: "POST",
//     body: {
//       ...params,
//       timestamp
//     }
//   });

//   const responseJson = await response.json();

//   return responseJson.signature;
// };

// const SignedUploadButton = () => {
//   useRequestPreSend(async ({ options }) => {
//     const timestamp = Date.now();
//     const signature = await retrieveSignatureForUpload(
//       options.destination.params,
//       timestamp
//     );

//     return {
//       options: {
//         destination: {
//           params: {
//             signature,
//             timestamp,
//             api_key: API_KEY
//           }
//         }
//       }
//     };
//   });

//   return <UploadButton>Signed Upload to Cloudinary</UploadButton>;
// };



export default function Upload({setURL}) {
    const [uploaded, setUploaded] = useState(false)
    const [publicURL,setpublicURL]=useState()
    const Respone = () => {useItemFinishListener((item) => {
        console.log(item.uploadResponse.data);  
         setUploaded(true)
        setpublicURL(item.uploadResponse.data.secure_url)
    });
    return null;
    }
    useEffect(() => {
    
      setURL(publicURL)
    },[publicURL])
    const LogProgress = () => {
        useItemProgressListener((item) => {
           
            console.log(`>>>>> ${item.file.type} (hook)  File ${item.file.name} completed: ${item.completed}`);
        });
    
        return null;
    }
    const DivUploadButton = asUploadButton((props) => {
        if (!uploaded) {
            
        
        return <div {...props} style={{ cursor: "pointer" }}>
             <button
              className="w-32 py-1 mr-4 leading-5 blue button">Upload</button>
        </div>
        } else
        return <div {...props} style={{ cursor: "pointer" }}>
        <button
         className="w-32 py-1 mr-4 leading-5 hollow green button">Done</button>
   </div>
    });
  return (
    <div className="">
  
      {/* <Uploady
        destination={{
          url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
          params: {
            upload_preset: UPLOAD_PRESET,
            folder: "upload-folder"
            //additional cloudinary upload params can be defined here
          }
        }}
      >
        <SignedUploadButton />
      </Uploady> */}
      <Uploady
    destination={{ 
        url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        params: {
            upload_preset: UPLOAD_PRESET,
        }
    }}>
         <LogProgress/> 
         <Respone/>
    <DivUploadButton/>
</Uploady>
    </div>
  );
}
