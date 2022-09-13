import React from 'react';
import FilmItemRow from './myFilmItemRow';

class StarWars extends React.Component {
    constructor(props) {
        super(props)

        //Set the state to blank on setup
        this.state = {
            wasCharacterLoaded: false,
            name: null,
            height: null,
            homeworld: null,
            films: [],
            data:null
        }
    }

    //Everytime getNewCharacter() is called, we need to update the state
    getNewCharacter() {
        console.log("Get new character from a button")
        const randomNumber = Math.round(Math.random() * 82) //Create random number between 1 and 82. Ideally we would get COUNT from API to do this calc
        const baseUrl = `https://swapi.dev/api/people/${randomNumber}/`
        
        fetch(baseUrl) //Connect to URL
            .then(response => response.json()) //Get the response as JSON
            .then(data => { //Now we can work with the "data"
                this.setState({
                    wasCharacterLoaded: true,
                    Image:data.img,
                    name: data.name,
                    height: data.height,
                    homeworld: data.homeworld,
                    films: data.films,
                })
            })
    }
   

    render() {
        //Map is basically a loop function. Every item in a list needs a key (index) to ensure there are no errors
        const movies = this.state.films.map((url, index) => {
            return <FilmItemRow key={index} url={url}/> //key and url are props i think
        })

        return (
        <div>
            {/* JS logic inside {} */}
            {
                this.state.wasCharacterLoaded === true &&
                <div>
                    <h1>{this.state.name}</h1>
                   
                    <p>{this.state.height} (cm)</p>
                    <p><a href={this.state.homeworld}>Homeworld: {this.state.homeworld}</a></p>
                    <ul>
                        {movies}
                    </ul>
                </div>
            } 
            
            <button type="button" onClick={() => this.getNewCharacter()} className="btn">Randomize Character</button>
            </div>
        )    
    }
}

export default StarWars;