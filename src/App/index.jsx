import React, { Component } from 'react';
import { Col, Row } from "antd";
import { map } from 'lodash';

import { firestore } from '../utils/setup-facebook';
import { getSenatorsByStatus } from './selectors';

import './style.css';

class App extends Component {
  state = {
    senators: []
  }

  componentDidMount = () => {
    
    firestore.collection('whip_count_2020').get()
      .then((snapshot) => {
        const senators = [];
        snapshot.forEach((node) => {
          senators.push(node.data())
        })
        this.setState({senators})
      }) 
  }

  render() {
    const senateMapByStatus = getSenatorsByStatus(this.state.senators);
    return (
      <div className="App">
        <div className="team">
          <h1>Whip Count</h1>
          <Row className="all-status-container">
            {map(senateMapByStatus, (senators) => {
              return (
                <Col flex={'1 1 auto'} className="status-container">
                  {map(senators, (senator) => (
                    <div className="image-container">
                      <img
                        width={200}
                        src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`}
                      />
                    </div>
                  ))}
                </Col>
              );
            })}
          </Row>
          <Row className="DogTeam" gutter={16}>
         
          </Row>
        </div>
      </div>
    );
  }
}


export default App;
