import React, { useState, useEffect } from 'react'
import "./Style.css"

const getLocalData = () => {
    const list = localStorage.getItem("mytodoList")
    if (list) {
        return JSON.parse(list)
    } else {
        return [""]
    }
}

export default function Todo() {

    const [inputData, setinputData] = useState("")
    const [item, setitem] = useState(getLocalData())
    const [isEditItem, setisEditItem] = useState("")
    const [toggleButton, settoggleButton] = useState(false)
    useEffect(() => {
        localStorage.setItem("mytodoList", JSON.stringify(item))
    }, [item])

    const addItem = () => {
        if (!inputData) {
            alert("⚠ Please fill the data")
        }else if(inputData && toggleButton){
            setitem(
                item.map((currentElement)=>{
                    if(currentElement.id===isEditItem){
                        return {...currentElement, name:inputData}
                       
                    }
                    return currentElement;
                }) 
            )
            setinputData("")
        setisEditItem("")
        settoggleButton("");
        }       
         else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }

            setitem([...item, myNewInputData])
            setinputData("")
        }
    }

    const editItem = (index) => {
        const edited = item.find((currentElement) => {
            return currentElement.id === index;
        })
        setinputData(edited.name)
        setisEditItem(index)
        settoggleButton(true);
    }

    const deleteItem = (id) => {
        const updateItem = item.filter((currentElement) => {
            return currentElement.id !== id;
        })
        setitem(updateItem);

    }

    const removeAll = () => {
        setitem([])
    }

    return (

        <div>

            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/download.jpg" alt="todoLogo" />
                        <figcaption>Add your list here ✌</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="📝 Add Item" className="form-control" value={inputData} onChange={(event) => setinputData(event.target.value)} />

                       { toggleButton ? <i className="fa fa-check add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
                     
                    </div>




                    <div className="showItems">
                        {
                            item.map((currentElement) => {
                                return (
                                    <div className="eachItem" key={currentElement.id} >
                                        <h3>{currentElement.name} </h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(currentElement.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currentElement.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }





                    </div>


                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} >
                            <span>Clear List</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
