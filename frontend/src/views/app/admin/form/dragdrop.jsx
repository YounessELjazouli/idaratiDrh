import { cilFile } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCard, CCardBody, CCardSubtitle } from "@coreui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";



const DragDrop=(props)=>{
    const [label,setLabel]=useState(props.label?props.label:"select file or drag and drop here")
    useEffect(()=>{
        console.log(props.label)
    },[])
    return (
        <CCard style={{minWidth:300,minHeight:150,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CCardBody>
                <CIcon
                    height={200}
                    width={200}
                    size="custom-size"
                    icon={cilFile}
                />
                <CCardSubtitle>{label}</CCardSubtitle>
            </CCardBody>
        </CCard>
    )
}

export default DragDrop