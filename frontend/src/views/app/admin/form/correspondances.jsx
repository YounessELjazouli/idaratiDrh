import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Component } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import axiosYns from "src/axios";
import DragDrop from "./dragdrop";

const CorrespondanceForm = (props) => {
    const Navigate = useNavigate()
    const [doctypes, setdoctypes] = useState(null)
    const [selectedDoctypes, setSelectedDoctypes] = useState(null)
    const [sujet, setSujet] = useState(null)
    const [reference, setRefernce] = useState(null)
    const [refOrder, setRefOrder] = useState(null)
    const [refYear, setRefYear] = useState(null)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [file, setFile] = useState(null)
    const fileTypes = ["PDF"];
    const fileSet=(file)=>{
        setFile(file)
    }
    const saveChange =()=>{
        // const formData = new FormData();
        // formData.append('ref', reference);
        // formData.append('date', date);
        // formData.append('sujet', sujet);
        // formData.append('selectedDoctypes', selectedDoctypes);
        // formData.append('texte', file[0]);  
        corr = {
            'ref': reference,
            'date': date,
            'sujet': sujet,
            'selectedDoctypes': selectedDoctypes,
            'texte': file[0]
        }

        console.log("Save",corr);
    }
    const getDocTypes = async () => {
        await axiosYns.get('/types-textes-reglementaires')
          .then(({ data }) => {
            setdoctypes(data.data)
          })
      }
      useEffect(() => {
        getDocTypes();
      }, [])
    return (
        <div id="booking" class="section">
            <div class="section-center">
                <div class="container">
                    <div class="row">
                        <div class="booking-form">
                            <form>
                                <div class="form-group">
                                    <div class="form-checkbox">
                                        {doctypes &&
                                            doctypes.map((d, index) => (
                                                <label for={d.nom}>
                                                    <input type="radio" id={d.nom} name="docType" />
                                                    <span></span>{d.nom}
                                                </label>
                                            ))}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <span class="form-label">Réference</span>
                                            <input class="form-control" type="text" placeholder="City or airport" />
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="form-group">
                                            <span class="form-label">Objet</span>
                                            <input class="form-control" type="text" placeholder="City or airport" />
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <span class="form-label">Date</span>
                                            <input class="form-control" type="date" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group">
                                        <span class="form-label">Fichier</span>
                                        <FileUploader
                                        types={fileTypes}
                                        handleChange={fileSet}
                                        classes="col-md-12" 
                                        name="file" 
                                        children={<DragDrop label="selictionnez le fichier PDF ou dragée le Ici"></DragDrop>}
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-btn">
                                            <button onClick={() => { Navigate(-1) }} class="submit-btn">Annuler</button>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-btn">
                                            <button onClick={saveChange} class="submit-btn btn-save">Enregistrer</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CorrespondanceForm