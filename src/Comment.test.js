import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai'
import { stub } from 'sinon'
import Comment from './Comment';

describe('Comment.js', () => {
    const mockUser = {
        "id": "member1",
        "firstName": "Martin",
        "lastName": "Bradley",
        "email": "mbradley0@google.it",
        "avatar": "http://dummyimage.com/100x100.png/5fa2dd/ffffff"
    }
    const mockMessage = {
        "id": "message1",
        "userId": "member1",
        "message": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
        "timestamp": "2017-02-09T04:27:38Z"
    }

    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Comment
                comment={mockMessage}
                user={mockUser}
            />,
            div
        );
    });

    describe('Rendering a comment', () => {
        it('should render a comment', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <Comment
                    comment={mockMessage}
                    user={mockUser}
                />,
                div
            );

            expect(div.innerHTML).to.equal(
                '<div data-reactroot="" class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="Martin Bradley">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.</div>' +
                        '<div><!-- react-text: 7 -->09/02/2017 04:27:38<!-- /react-text --><!-- react-text: 8 --> <!-- /react-text -->' +
                            '<span style="display: none;">mbradley0@google.it</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
        })
        it('should render a comment with the user email displaying, then hidden on mouse over/out user actions', () => {
            const div = document.createElement('div');
            const component = ReactDOM.render(
                <Comment
                    comment={mockMessage}
                    user={mockUser}
                />,
                div
            );

            component.handleMouseIn()

            expect(div.innerHTML).to.equal(
                '<div data-reactroot="" class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="Martin Bradley">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.</div>' +
                        '<div><!-- react-text: 7 -->09/02/2017 04:27:38<!-- /react-text --><!-- react-text: 8 --> <!-- /react-text -->' +
                            '<span style="display: inline;">mbradley0@google.it</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )

            component.handleMouseOut()

            expect(div.innerHTML).to.equal(
                '<div data-reactroot="" class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="Martin Bradley">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.</div>' +
                        '<div><!-- react-text: 7 -->09/02/2017 04:27:38<!-- /react-text --><!-- react-text: 8 --> <!-- /react-text -->' +
                            '<span style="display: none;">mbradley0@google.it</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
        })
    })

})
