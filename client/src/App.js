import React, { Component } from 'react'
import './App.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            newTasks: '',
            checked: [],
        }
    }

    // Life cycle component, here you get the tasks and evaluate the completed tasks
    componentDidMount = () => {
        axios
            .get('http://localhost:7001/api/tasks')
            .then(response => {
                let data = []
                response.data.tasks
                    .filter(element => element.done)
                    .forEach((element, key) => {
                        data.push(key)
                    })
                this.setState({ tasks: response.data.tasks, checked: data })
            })
            .catch(error => {
                console.log(error)
                toast.error('Error getting the task list!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

    // Here it is validated when a task is marked as completed or not.
    handleToggle = value => () => {
        const { checked } = this.state
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            axios
                .put(`http://localhost:7001/api/task-done/${value}`, {
                    done: true,
                })
                .then(response => {
                    newChecked.push(value)
                    this.setState({
                        checked: newChecked,
                    })
                    toast.success('Updated Task', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
                .catch(error => {
                    toast.error('Error when performing the action!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
        } else {
            axios
                .put(`http://localhost:7001/api/task-done/${value}`, {
                    done: false,
                })
                .then(response => {
                    newChecked.splice(currentIndex, 1)
                    this.setState({
                        checked: newChecked,
                    })
                    toast.success('Updated Task', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
                .catch(error => {
                    toast.error('Error when performing the action!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
        }
    }

    // Here you change the text of the inputs, corresponding to each task
    changeTextForTask = (event, key) => {
        let { tasks } = this.state
        tasks[key].name = event.target.value
        this.setState({ tasks })
    }

    // Task Removal Function
    removeTasks = key => {
        axios
            .delete(`http://localhost:7001/api/task/${key}`)
            .then(response => {
                let { tasks } = this.state
                tasks.splice(key, 1)
                this.setState({ tasks, focus: null })
                toast.success('Delete Task', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
            .catch(error => {
                toast.error('Error when performing the action!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

    // Function to add new task, pressing enter
    _handleKeyPress = e => {
        if (e.key === 'Enter') {
            let data = {
                name: this.state.newTasks,
                done: false,
            }

            axios
                .post('http://localhost:7001/api/tasks', {
                    task: data,
                })
                .then(response => {
                    let { tasks } = this.state
                    tasks.push(data)
                    this.setState({
                        tasks,
                        newTasks: '',
                    })
                    toast.success('Save Task', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
                .catch(error => {
                    toast.error('Error when performing the action!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    })
                })
        }
    }

    // Function to update task
    updateTasks = (name, key) => {
        axios
            .put(`http://localhost:7001/api/task/${key}`, {
                name,
            })
            .then(response => {
                toast.success('Saved Task', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
            .catch(error => {
                toast.error('Error when performing the action!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            })
    }

    render() {
        return (
            <div className="App">
                <header className="headerApp">
                    <h3>ToDo App</h3>
                </header>

                <section className="contentApp">
                    <div className="contentList">
                        <input
                            type="text"
                            name="newTasks"
                            className="inputTaskFocus"
                            value={this.state.newTasks}
                            placeholder="Write for a new task..."
                            onChange={event => {
                                this.setState({ newTasks: event.target.value })
                            }}
                            onKeyPress={e => {
                                if (this.state.newTasks.length > 0) {
                                    this._handleKeyPress(e)
                                }
                            }}
                        />
                        <List>
                            {this.state.tasks
                                .filter(element => element.name)
                                .map((element, key) => {
                                    return (
                                        <ListItem
                                            key={key}
                                            role={undefined}
                                            dense
                                        >
                                            <Checkbox
                                                checked={
                                                    this.state.checked.indexOf(
                                                        key
                                                    ) !== -1
                                                }
                                                tabIndex={-1}
                                                disableRipple
                                                onClick={this.handleToggle(key)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className="addTask"
                                                onClick={() =>
                                                    this.removeTasks(key)
                                                }
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                className="addTask"
                                                onClick={e => {
                                                    if (
                                                        element.name.length > 0
                                                    ) {
                                                        this.updateTasks(
                                                            element.name,
                                                            key
                                                        )
                                                    }
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <input
                                                type="text"
                                                name="name"
                                                autoFocus={
                                                    key === this.state.focus
                                                        ? true
                                                        : false
                                                }
                                                onFocus={() => {
                                                    this.setState({
                                                        focus: key,
                                                    })
                                                }}
                                                className={
                                                    key === this.state.focus
                                                        ? 'inputTaskFocus'
                                                        : 'inputTaskNotFocus'
                                                }
                                                value={element.name}
                                                onChange={event =>
                                                    this.changeTextForTask(
                                                        event,
                                                        key
                                                    )
                                                }
                                            />
                                        </ListItem>
                                    )
                                })}
                        </List>

                        {this.state.tasks.length <= 0 && (
                            <h4>There are no tasks</h4>
                        )}
                    </div>
                </section>
                <ToastContainer />
            </div>
        )
    }
}

export default App
