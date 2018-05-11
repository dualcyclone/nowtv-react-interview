import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getChatLog, getUsers } from './service'
import Comment from './Comment'

import './App.css'

const MESSAGE_SORT = {
    ASCENDING: 'ASC',
    DECENDING: 'DESC'
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messageSort: MESSAGE_SORT.ASCENDING
        }

        this.sortMessages = this.sortMessages.bind(this)
    }

    componentWillMount() {
        this.props.getChatLog()
        this.props.getUsers()
    }

    render() {
        const { members } = this.props
        const renderMsgs = this.sortedMessages
            .map(msg => <Comment comment={msg} user={members.find(({ id }) => id === msg.userId)} key={msg.id}/>)

        return (
            <div>
                <div className="userTools">
                    <button onClick={this.sortMessages}>Sort messages</button>
                    <p>Messages
                        sorted {this.state.messageSort === MESSAGE_SORT.ASCENDING ? 'ascending' : 'descending'}</p>
                </div>
                <div id="comments">
                    {renderMsgs}
                </div>
            </div>
        )
    }

    sortMessages() {
        const { messageSort } = this.state

        this.setState({
            messageSort: messageSort === MESSAGE_SORT.ASCENDING ? MESSAGE_SORT.DECENDING : MESSAGE_SORT.ASCENDING
        })
    }

    get sortedMessages() {
        const { messages } = this.props
        const { messageSort } = this.state

        const isAsc = messageSort === MESSAGE_SORT.ASCENDING

        return messages.sort((a, b) => {
            if (a.timestamp > b.timestamp) {
                return isAsc ? 1 : -1
            }
            if (a.timestamp < b.timestamp) {
                return isAsc ? -1 : 1
            }
            return 0
        })
    }
}

const mapStateToProps = state => {
    return { messages: state.messages, members: state.members }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getChatLog, getUsers }, dispatch)

App.defaultProps = {
    messages: [],
    members: []
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
