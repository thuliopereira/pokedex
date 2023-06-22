import React from "react"
import { useState } from "react"
import { searchPokemon } from "./Api"

const Searchbar = (props) => {
    const [search, setSearch] = useState("ditto")
    const {onSearch} = props
    

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length === 0) {
            onSearch(undefined)
        }
    }


    const onButtonClickHandler = () =>{
        onSearch(search)
    }


    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="Buscar Pikomon" onChange={onChangeHandler}/>
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler}> BUSCAR </button>
            </div>
        </div>
    )  

}

export default Searchbar;