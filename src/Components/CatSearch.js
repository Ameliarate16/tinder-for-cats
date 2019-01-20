import React, { Component } from 'react';
import jsonp from 'jsonp';
import like from '../emoji.png';
import pass from '../red-x13.png';

class CatSearch extends Component{
    constructor(){
        super();
        this.state = {
            cat: undefined
        };
    }

    componentDidMount(){
        this.searchRandom();
    }

    //componentDidUpdate(prevProps, prevState){
    //    console.log(prevState);
    //    console.log(this.state);
    //    if (this.state.cat !== prevState.cat) this.searchRandom();
    //}
    
    async searchRandom () {
        const cat = await jsonp(
            `http://api.petfinder.com/pet.getRandom` +
                `?key=8820e5a33c8a3a3ce8dab58ef814de13&format=json&output=full&animal=cat`, 
            null, 
            (err, data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(data.petfinder.pet);
                    this.setState({
                        cat: data.petfinder.pet
                    });
                }
            }
        );
        return cat;
    }

    likeCat = () => {
        this.props.likeCallback(this.state.cat);
        this.searchRandom();
    }

    passCat = () => {
        this.searchRandom();
    }

    renderCat() {
        let catPic = "";
        if (this.state.cat.media.photos){
            catPic = this.state.cat.media.photos.photo.filter((pic) => {
                return pic["@size"]==="x";
            })[0];
        }
        let sex = this.state.cat.sex["$t"];
        const name = this.state.cat.name["$t"];
        const age = this.state.cat.age["$t"];
        let size = this.state.cat.size["$t"];
        const description = this.state.cat.description["$t"];
        if (sex === "F") sex = "Female";
        else sex = "Male";
        if (size === "S") size = "Small";
        else if (size === "M") size = "Medium";
        else if (size === "L") size = "Large";
        else size = "Extra Large";
        return (
            <div className="catProfile">
                <img src={catPic["$t"]} alt={name}/>
                <h3>{name}</h3>
                <p>{size} {age} {sex}</p>
                <p>{description}</p>
                <span>
                    <button className="pass" onClick={this.passCat} >
                        <img src={pass} alt="Pass" width="100" />
                    </button>
                    <button className="like" onClick={this.likeCat} >
                        <img src={like} alt="Like" width="100" />
                    </button>
                </span>
            </div>
        );
    }

    renderBlank(){
        return (
            <div className="catProfile">
                <p>No matches found. Try again later!</p>
            </div>
        );
    }

    render(){
        return (this.state.cat ? this.renderCat() : this.renderBlank());
    }
};

export default CatSearch;