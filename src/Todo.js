import React, { Component } from "react";
import './Todo.css'

class Todo extends Component {
    constructor(props) {
        super(props);//(props gives us access to the props of other components)
        this.state = {
            task: this.props.task,//we are taking it from the Todo props inside the TodoList
            isEditting: false
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

    }

    handleRemove() {
        this.props.removeTask(this.props.id)
    }
    toggleForm() {
        this.setState({ isEditting: !this.state.isEditting })//we are setting it to be the opposite of the state
    }

    handleUpdate(evt) {
        evt.preventDefault();
        //take a new task data and pass it up to parent
        //it is the fn defined in the TodoList and passed as prop in the single TOdo
        this.props.updateTask(this.props.id, this.state.task)//it takes as arg the id and task from the Todo's props
        this.setState({ isEditting: false })


    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleToggle() {
        this.props.toggleTodo(this.props.id)
    }

    render() {
        let result;
        if (this.state.isEditting) {
            result = (
                <div className='Todo'>
                    <form className='NewTodoForm' onSubmit={this.handleUpdate}>
                        <input type='text' value={this.state.task} name='task' onChange={this.handleChange} />
                        <button>Save</button>
                    </form>
                </div>
            )

        } else {
            result = (
                <div className='Todo'>
                    {/* we are making a conditional className that uses the prop passed inside handleSubmit in NewTodoForm */}
                    {/* Todo-task always on and completed sometimes */}
                    <li className={this.props.completed ? 'Todo-task completed' : 'Todo-task'} onClick={this.handleToggle}>{this.props.task}</li>
                    <button onClick={this.toggleForm}>Edit</button>
                    <button onClick={this.handleRemove}>Remove</button>
                </div>
            )
        }
        return result;

    }
}

export default Todo;