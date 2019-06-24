import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import axios from 'axios';

class Edit extends Component {
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
        }
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
    change = (key, e) => {
        let p = {...this.state.pet};
        p[key] = e.target.value;
        this.setState({pet: p});
    }
    updatePet = (e) =>{
        e.preventDefault();
        
        axios.put(`http://localhost:8000/api/pets/${this.props.match.params._id}`, this.state.pet)
            .then( res => {
                if(res.data.errors){
                this.setState({errors: res.data.errors.errors})
                } else {
                    this.props.history.push(`/pets/${this.props.match.params._id}/detail`);
            }
        });
    }
    render(){
        return(
            <>
            <h2>Edit this pet</h2>
                <form onSubmit={this.updatePet}>
                    <div className="form-group">
                        <label>Pet Name:  </label>
                        <input type="text" onChange={this.change.bind(this, "name")} value={this.state.pet.name}  />
                        {
                            (this.state.errors.name) ?
                            <span className="error">{this.state.errors.name.message}</span> :
                            <span></span>
                        }
                    </div>
                    <div className="form-group">
                        <label>Pet Type:  </label>
                        <input type="text" onChange={this.change.bind(this, "type")} value={this.state.pet.type} />
                    {
                        (this.state.errors.type) ?
                        <span className="error">{this.state.errors.type.message}</span> :
                        <span></span>
                    }
                    </div>
                    <div className="form-group">
                        <label>Description:  </label>
                        <textarea className="form-control" rows="2" id="comment" onChange={this.change.bind(this, "description")} value={this.state.pet.description}  />
                    {
                        (this.state.errors.description) ?
                        <span className="error">{this.state.errors.description.message}</span> :
                        <span></span>
                    }
                        <fieldset>
                            <legend>Skills:</legend>
                            <div className="form-group">
                                <label>Skill 1:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_one")} value={this.state.pet.skill_one} />
                                <label>Skill 2:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_two")} value={this.state.pet.skill_two} />
                                <label>Skill 3:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_three")} value={this.state.pet.skill_three} />
                            </div>
                        </fieldset>
                    </div>
                    <br></br>
                    <input type="submit" value="Update Pet" />
                    <Link to={`/pets/${this.props.match.params._id}/detail`}>Cancel</Link>
        
                
                </form>  
            </> 
        )
    }
}
export default Edit;