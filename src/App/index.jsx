import React, { Component } from 'react';
import './style.css';
import { Col, Row } from 'antd';

import allDogs from '../data/dogs';
import DogCard from '../components/DogCard';
import { getAvailableDogs } from './selectors';
import FilterSelector from '../components/FilterSelector';


class App extends Component {
  setTags = (tags) => {
    console.log(tags)
  }

  render() {
    return (
      <div className="App">
        <div className="team">
          <h1>Dogs</h1>
          <Row>
            <Col span={8} gutter={16} offset={8}>
              <FilterSelector selectTag={this.setTags}/>
            </Col>

          </Row>
          <Row className="DogTeam" gutter={16}>
            {getAvailableDogs(allDogs).map(dog => (<DogCard
              key={dog.name}
              name={dog.name}
              image={dog.image}
              tags={dog.tags}
            />
            ))}
          </Row>
        </div>
      </div>
    );
  }
}


export default App;
