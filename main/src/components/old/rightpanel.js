import React, { Component } from 'react';
import NavBar from './navbar';
import RoomList from './roomlist';

class RightPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currTopic: 'Home',
      currSubtopic: ''
    }
    this.changeTopic = this.changeTopic.bind(this);
    this.changeSubtopic = this.changeSubtopic.bind(this);
  }

  filterRoomsByTopic(topic) {
    const allRooms = this.props.allRooms;
    if (topic === 'Home') {
      return allRooms
    } else {
      return allRooms.filter((room) => {
        return room.topic === topic
      })
    }
  }

  filterRoomsBySubtopic(subtopic) {
    return this.props.allRooms.filter((room) => {
      return room.subtopic === subtopic
    })
  }

  changeTopic(e) {
    this.setState({
      currTopic: e.target.text,
      currSubtopic: ''
    })
  }

  changeSubtopic(e) {
    this.setState({
      currSubtopic: e.target.textContent
    })
  }

  render() {
    return (
      <div className="rightpanel">
        <NavBar 
          topics={this.props.topics} 
          changeTopic={this.changeTopic} 
          changeSubtopic={this.changeSubtopic}
          socket={this.props.socket}
          user={this.props.user}
          clearCookie={this.props.clearCookie}
          />
        <RoomList 
          roomArray={this.state.currSubtopic ? 
            this.filterRoomsBySubtopic(this.state.currSubtopic) : 
            this.filterRoomsByTopic(this.state.currTopic)} 
          />
      </div>
    );
  }
}

export default RightPanel;