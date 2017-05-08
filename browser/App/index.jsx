import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../Login/index.jsx';
import Logout from '../Logout/index.jsx';
import Chat from '../Chat/index.jsx';
import Sidebar from '../Sidebar/index.jsx';
import { socket } from '../store';

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const previousChatroomId = this.props.params.chatroomId;
    const nextChatroomId = nextProps.params.chatroomId;

    if (previousChatroomId !== nextChatroomId) {
      socket.emit('leave', previousChatroomId);
    }
    socket.emit('join', nextChatroomId);
  }

  render() {
    return (
      <div style={{ height: '200px' }}>
        {this.props.user ? <Logout /> : <Login /> }
        {this.props.user && <Sidebar style={{ backgroundColor: 'green', height: '200px' }} />}
        {this.props.user && this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.auth });

export default connect(mapStateToProps)(App);