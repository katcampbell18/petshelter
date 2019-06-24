import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {

    constructor(props){
        super(props);
        this.state = {
            pet: {
                name: "",
                type: "",
                description: "",
                skill_one: "",
                skill_two: "",
                skill_three: "",
                like: 0,
                liked: false
            },
            errors: {}
        };
        this.addLike = this.addLike.bind(this);
    }
    componentDidMount =() => {
        console.log(this.props.match.params._id);
        axios.get(`http://localhost:8000/api/pets/${this.props.match.params._id}`)
        .then( res => {
            this.setState({pet: res.data.pet});
        })
        .catch( err => {
            console.log(err);
        });
    }
    addLike = (e) =>{
        let like = this.state.pet.like + 1;
        this.state.pet.like ++;
        this.state.pet.liked = true;
        this.setState({pet: {...this.state.pet, like: like, liked:true}});
        axios.put(`http://localhost:8000/api/pets/${this.props.match.params._id}`, this.state.pet)
            .then( res =>{
                this.componentDidMount();
            })
                .catch( err => {
                    console.log(err);
            });
    }
    delete = (e) =>{
        axios.delete(`http://localhost:8000/api/pets/${this.props.match.params._id}`)
            .then(res =>{
                this.props.history.push("/");
            })
            .catch( err =>{
                console.log(err);

        });
    }
    render(){
        return(
            <>
                <h3>Details about {this.state.pet.name}</h3>
                <h3>Pet Type: {this.state.pet.type}</h3>
                <h3>Description: {this.state.pet.description}</h3>
                <fieldset>
                <legend>Skills:</legend>
                    <h2>Skill 1:  {this.state.pet.skill_one}</h2>
                    <h2>Skill 2:  {this.state.pet.skill_two}</h2>
                    <h2>Skill 3:  {this.state.pet.skill_three}</h2>
                </fieldset>
                <h3>Likes: {this.state.pet.like} </h3>
                <button disabled={this.state.liked} onClick={this.addLike}>Like this pet</button>
                <button onClick={this.delete}>Adopt this pet</button>
            </>
        )
    }
}
export default Detail;