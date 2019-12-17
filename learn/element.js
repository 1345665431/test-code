import React  from "react";
import axios from "axios";
import character from "./character.css";
import * as myConstant from "./constant.js";

class Character extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                persons: []
              }
    }


    componentDidMount(){
        axios.get(`https://rickandmortyapi.com/api/character/`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons },() =>{
            //   console.log(persons)
          });
        })
    }

    checkSpecies () {
        let arraySpecies = [];
        for (let i = 0; i < myConstant.species.length; i++) {
            arraySpecies.push(<tr><td><input type="checkbox" id= {myConstant.species[i].id}/></td><td>{myConstant.species[i].label} </td></tr>); 
        }
        return arraySpecies;
    }
    checkGender() {
        let arrayGender = [];
        for (let i = 0; i < myConstant.gender.length; i++) {
            arrayGender.push(<tr><td><input type="checkbox" id={myConstant.gender[i].id}/></td><td>{myConstant.gender[i].label} </td></tr>);
        }
        return arrayGender;
    }
    checkOrigin() {
        let arrayOrigin = [];
        for (let i = 0; i < myConstant.origin.length; i++) {
            arrayOrigin.push(<tr><td><input type="checkbox" id={myConstant.origin[i].id}/></td><td>{myConstant.origin[i].label} </td></tr>);
        }
        return arrayOrigin;
    }
    render() {
        const {persons} = this.state;
        console.log(persons);
        // console.log(new);
        var a = new Date();
        var currDate = a.getFullYear();
        console.log(currDate);
      return (
        <div className="message">
            <div className= "filter-wrapper">
            <table className= "speciesFilter">
                <thead>Species</thead>
                <tbody>
                    {this.checkSpecies()}
                </tbody>
            </table>
            <table className= "genderFilter">
                <thead>Gender</thead>
                <tbody>
                          {this.checkGender()}
                </tbody>
            </table>
            <table className="originFilter">
                <thead>Origin</thead>
                <tbody>
                          {this.checkOrigin()}
                </tbody>
            </table>


            </div>
            <div className= "character-wrapper">
            {
                !!persons.results && persons.results.map((data)=>{
                    return <div className="character-profile">
                    <img  className = "char-img" key = {data.id} src = {`https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`}/>
                    <h3 className="char-heading">{data.name}</h3>
                    <p className><span>id:  {data.id}</span><span> - </span><span>created {currDate - data.created.slice(0,4)} years ago</span></p>
                    <table>
                    <tr><td>STATUS</td> <td>{data.status}</td></tr>
                    <tr><td>SPECIES</td> <td>{data.species}</td></tr>
                     <tr><td>GENDER</td> <td>{data.gender}</td></tr>
                    <tr><td>ORIGIN</td> <td>{data.origin.name}</td></tr>
                    <tr><td>LASTLOCATION</td> <td>{data.location.name}</td></tr>
                    </table>
                    </div>

                    
                })                                  
            }
            </div>
        </div>
      );
    }
  }

  export default Character;