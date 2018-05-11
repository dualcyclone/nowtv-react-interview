import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Comment.css'

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserEmail: false
        }

        this.handleMouseIn = this.handleMouseIn.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    render() {
        const { comment, user } = this.props;

        const displayUserEmail = {
            display: this.state.showUserEmail ? 'inline' : 'none'
        }

        return (
            <div className="comment">
                <div className="avatar">
                    {user.avatar && (<img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />)}
                </div>
                <div className="message">
                    <div onMouseOver={this.handleMouseIn} onMouseOut={this.handleMouseOut}>{comment.message}</div>

                    <div>{this.getHumanReadableTimestamp()} <span style={displayUserEmail}>{user.email}</span></div>
                </div>
            </div>
        );
    }

    handleMouseIn() {
        this.setState({ showUserEmail: true });
    }

    handleMouseOut() {
        this.setState({ showUserEmail: false });
    }

    getHumanReadableTimestamp() {
        const ts = new Date(this.props.comment.timestamp);

        return `${ts.toLocaleString().replace(',', '')}`
    }
}


Comment.propTypes = {
    comment: PropTypes.object,
    user: PropTypes.object
}

Comment.defaultProps = {
}

export default Comment
