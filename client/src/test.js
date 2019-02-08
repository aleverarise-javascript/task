import React, { Component } from 'react'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [],
            focus: null,
        }
    }

    addTasks = () => {
        if (this.state.focus === null) {
            let { tasks } = this.state
            tasks.push({ name: '', done: false })
            this.setState({
                tasks,
                focus:
                    this.state.tasks.length > 0
                        ? this.state.tasks.length - 1
                        : 0,
            })
        }
    }

    updateTask = (event, key) => {
        let { tasks } = this.state
        tasks[key].name = event.target.value
        this.setState({ tasks })
    }

    removeTasks = key => {
        let { tasks } = this.state
        console.log(tasks)
        tasks.splice(key, 1)
        this.setState({ tasks, focus: null })
    }

    _handleOnBlur = (name, key) => {
        if (name.length <= 0) {
            let { tasks } = this.state
            tasks.splice(key, 1)
            this.setState({
                tasks,
                focus: null,
            })
        } else {
            this.setState({
                focus: null,
            })
        }
    }

    _handleKeyPress = (e, key) => {
        if (e.key === 'Enter') {
            let { tasks } = this.state
            tasks.push({ name: '' })
            this.setState({
                tasks,
                focus:
                    this.state.tasks.length > 0
                        ? this.state.tasks.length - 1
                        : 0,
            })
        }
    }

    _handleSubmit = () => {
        let { tasks } = this.state
        tasks.push({ name: '' })
        this.setState({
            tasks,
            focus:
                this.state.tasks.length > 0 ? this.state.tasks.length - 1 : 0,
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
                        <ul>
                            {this.state.tasks.map((element, key) => {
                                return (
                                    <li key={key}>
                                        <input
                                            type="text"
                                            name="name"
                                            autoFocus={
                                                key === this.state.focus
                                                    ? true
                                                    : false
                                            }
                                            onFocus={() => {
                                                this.setState({ focus: key })
                                            }}
                                            className={
                                                key === this.state.focus
                                                    ? 'inputTaskFocus'
                                                    : 'inputTaskNotFocus'
                                            }
                                            value={element.name}
                                            onBlur={() =>
                                                this._handleOnBlur(
                                                    element.name,
                                                    key
                                                )
                                            }
                                            onChange={event =>
                                                this.updateTask(event, key)
                                            }
                                            onKeyPress={e => {
                                                if (element.name.length > 0) {
                                                    this._handleKeyPress(e, key)
                                                }
                                            }}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <a className="addTask" onClick={() => this.addTasks()}>
                        + add task
                    </a>
                </section>
            </div>
        )
    }
}

export default App
