import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { stub } from 'sinon'
import App from './App'

describe('App.js', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
            <App.WrappedComponent
                getChatLog={() => {}}
                getUsers={() => {}}
            />,
            div
        )
    })

    describe('Should render the chat log', () => {
        const stubGetChatlog = stub()
        const stubGetUsers = stub()
        const mockComents = [
            {
                'id': 'message1',
                'userId': 'member1',
                'message': 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
                'timestamp': '2017-02-09T04:27:38Z'
            },
            {
                'id': 'message2',
                'userId': 'member2',
                'message': 'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.',
                'timestamp': '2016-11-09T05:04:58Z'
            }
        ]
        const mockMembers = [
            {
                'id': 'member1',
                'firstName': 'Martin',
                'lastName': 'Bradley',
                'email': 'mbradley0@google.it',
                'avatar': 'http://dummyimage.com/100x100.png/5fa2dd/ffffff'
            },
            {
                'id': 'member2',
                'firstName': 'Helen',
                'lastName': 'Hawkins',
                'email': 'hhawkins1@posterous.com',
                'avatar': 'http://dummyimage.com/100x100.jpg/dddddd/000000'
            }
        ]

        beforeEach(() => {
            stubGetChatlog.reset()
            stubGetUsers.reset()
        })

        it('Will call getChatLog and getUsers when mounting the component', () => {
            const div = document.createElement('div')
            ReactDOM.render(
                <App.WrappedComponent
                    getChatLog={stubGetChatlog}
                    getUsers={stubGetUsers}
                />,
                div
            )

            expect(stubGetChatlog.callCount).to.equal(1)
            expect(stubGetUsers.callCount).to.equal(1)
        })

        it('Will render comments list with member information', () => {
            const div = document.createElement('div')
            const component = ReactDOM.render(
                <App.WrappedComponent
                    getChatLog={stubGetChatlog}
                    getUsers={stubGetUsers}
                    messages={mockComents}
                    members={mockMembers}
                />,
                div
            )
            const commentsEl = div.querySelector('#comments')
            const commentElList = commentsEl.getElementsByClassName('comment')

            expect(commentElList.length).to.equal(2)
            expect(commentElList[0].outerHTML).to.equal(
                '<div class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.jpg/dddddd/000000" alt="Helen Hawkins">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.</div>' +
                        '<div><!-- react-text: 14 -->09/11/2016 05:04:58<!-- /react-text --><!-- react-text: 15 --> <!-- /react-text -->' +
                            '<span style="display: none;">hhawkins1@posterous.com</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
            expect(commentElList[1].outerHTML).to.equal(
                '<div class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="Martin Bradley">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.</div>' +
                        '<div><!-- react-text: 23 -->09/02/2017 04:27:38<!-- /react-text --><!-- react-text: 24 --> <!-- /react-text -->' +
                            '<span style="display: none;">mbradley0@google.it</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
        })

        it('Will rerender the order of the comments when the comment order is changed', () => {
            const div = document.createElement('div')
            const component = ReactDOM.render(
                <App.WrappedComponent
                    getChatLog={stubGetChatlog}
                    getUsers={stubGetUsers}
                    messages={mockComents}
                    members={mockMembers}
                />,
                div
            )
            component.sortMessages()

            const commentsEl = div.querySelector('#comments')
            const commentElList = commentsEl.getElementsByClassName('comment')

            expect(commentElList.length).to.equal(2)

            expect(commentElList[0].outerHTML).to.equal(
                '<div class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.png/5fa2dd/ffffff" alt="Martin Bradley">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.</div>' +
                        '<div><!-- react-text: 23 -->09/02/2017 04:27:38<!-- /react-text --><!-- react-text: 24 --> <!-- /react-text -->' +
                            '<span style="display: none;">mbradley0@google.it</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
            expect(commentElList[1].outerHTML).to.equal(
                '<div class="comment">' +
                    '<div class="avatar">' +
                        '<img src="http://dummyimage.com/100x100.jpg/dddddd/000000" alt="Helen Hawkins">' +
                    '</div>' +
                    '<div class="message">' +
                        '<div>Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus.</div>' +
                        '<div><!-- react-text: 14 -->09/11/2016 05:04:58<!-- /react-text --><!-- react-text: 15 --> <!-- /react-text -->' +
                            '<span style="display: none;">hhawkins1@posterous.com</span>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            )
        })

    })
})
