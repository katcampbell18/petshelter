import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            newPet: {
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
    change = (key, e) => {
        let p = {...this.state.newPet};
        p[key] = e.target.value;
        this.setState({newPet: p});
    }

    makepet = (e) =>{
        e.preventDefault();
        axios.post("/api/pets", this.state.newPet)
        .then( res =>{
            if(res.data.errors){
                this.setState({errors: res.data.errors.errors})
  
            } else{
                this.props.history.push("/");
            }
        });
    } 
    render(){
        return(
            <>
            <h2>Know of a pet needing a home?</h2>
                <form onSubmit={this.makepet}>
                    <div className="form-group">
                        <label>Pet Name:  </label>
                        <input type="text" onChange={this.change.bind(this, "name")} />
                        {
                            (this.state.errors.name) ?
                            <span className="error">{this.state.errors.name.message}</span> :
                            <span></span>
                        }
                    </div>
                    <div className="form-group">
                        <label>Pet Type:  </label>
                        <input type="text" onChange={this.change.bind(this, "type")} />
                    {
                        (this.state.errors.type) ?
                        <span className="error">{this.state.errors.type.message}</span> :
                        <span></span>
                    }
                    </div>
                    <div className="form-group">
                        <label>Description:  </label>
                        <textarea className="form-control" rows="2" id="comment" onChange={this.change.bind(this, "description")} />
                    {
                        (this.state.errors.description) ?
                        <span className="error">{this.state.errors.description.message}</span> :
                        <span></span>
                    }
                        <fieldset>
                            <legend>Skills:</legend>
                            <div className="form-group">
                                <label>Skill 1:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_one")} />
                                <label>Skill 2:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_two")} />
                                <label>Skill 3:  </label>
                                <input type="text" onChange={this.change.bind(this, "skill_three")} />
                            </div>
                        </fieldset>
                    </div>
                    <br></br>
                    <input type="submit" value="Add Pet" />
                    <Link to="/">Cancel</Link>
                
                </form>  
            </> 
        )
    }
    }
export default New;