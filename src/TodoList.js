import React, { Component } from "react";
import Todo from './Todo';
import './TodoList.css'

import NewTodoForm from './NewTodoForm'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }
    //newTask is an object 
    addNewTask(newTask) {
        //we are adding the new task to the current state
        this.setState({ todos: [...this.state.todos, newTask] })
    }

    removeTask(id) {
        //we don't use the fn(async) form of setState as we don't do anything else after the state is updated
        //we are filtering all of the todos that are NOT the passed id
        //(filter out(махни това) the ones with the passed id) => it should ONLY be ONE with that ID
        //it makes a new array and gets rid of the id that was passed in
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    updateTask(id, uupdatedTask) {//it accepts the id and the new text input
        const updatedTodos = this.state.todos.map(todo => {
            //we are checking if todo.id is equal to the id we are looking for
            if (todo.id === id) {
                //if true we are returning that existing todo with updated task
                return { ...todo, task: uupdatedTask };
            }
            //otherwise we are returning the todo UNCHANGED 
            return todo;
        });
        this.setState({ todos: updatedTodos })
    }

    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            //we are checking if todo.id is equal to the id we are looking for
            if (todo.id === id) {
                //if true we are returning that existing reversed completed state
                return { ...todo, completed: !todo.completed };
            }
            //otherwise we are returning the todo UNCHANGED 
            return todo;
        });
        this.setState({ todos: updatedTodos })
    }

    render() {

        //we are making the logic to display the single task
        const todos = this.state.todos.map(todo => {
            return <Todo
                key={todo.id} //key is an internal React thing-we DO NOT have access to it in other components
                id={todo.id} //we pass id with same contents as key so we can use it inside other components
                task={todo.task}
                completed={todo.completed}
                removeTask={this.removeTask}
                updateTask={this.updateTask}
                toggleTodo={this.toggleCompletion} />
        })

        return (
            <div className="TodoList">
                <h1>Todo List!</h1>
                <p>A Simple React Todo List</p>
                <ul>{todos}</ul>
                <NewTodoForm addNewTask={this.addNewTask} />
            </div>
        )
    }
}

export default TodoList;

