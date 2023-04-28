import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import ToDo from './Todo';
import './NewTodoForm.css';

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { task: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        // we are adding and id to the existing state.
        this.props.addNewTask({ ...this.state, id: uuidv4(), completed: false });//we are making a new object with the id added to it 
        //and we pass it as an argument of addNewTask. We also add the completed boolean for the scratched effect 
        this.setState({ task: '' }); //in oredr to empty the input
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='task'>New Todo</label>
                    <input type='text'
                        placeholder='New Todo'
                        id='task'
                        name='task'//name shoudl always be the same with what we have in state
                        value={this.state.task}
                        onChange={this.handleChange}
                    >
                    </input>
                    <button>Add Todo</button>
                </form>
            </div>
        )
    }
}

export default NewTodoForm;