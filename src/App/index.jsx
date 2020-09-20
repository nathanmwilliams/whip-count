import React, { Component } from 'react';
import { Col, Row, Table, Popover } from "antd";
import { map } from 'lodash';

import { firestore } from '../utils/setup-facebook';
import { getSenatorsByStatus } from './selectors';

import './style.css';
import { STATUS_DISPLAY, STATUS_MAP } from '../constants';

const { Column, ColumnGroup } = Table;



const makeSortFunction = (key) => {
  return (a, b) => {
        if (a[key] > b[key]) {
            return 1;
          }
          if (a[key] < b[key]) {
            return -1;
          }
          return 0;
        }

}

class App extends Component {
  state = {
    senators: []
  }

  componentDidMount = () => {
    
    firestore.collection('whip_count_2020').get()
      .then((snapshot) => {
        const senators = [];
        snapshot.forEach((node) => {
          const data = {
            ...node.data(),
            id: node.id,

          }
          senators.push(data);
        })
        senators.sort(makeSortFunction("state"));
        this.setState({senators})
      }) 
  }

  scrollTo = (id) => {
    console.log(id)
    const row = document.querySelector(`[data-row-key="${id}"]`);
    row.scrollIntoView({ behavior: "smooth"});

  }

  render() {
    const senateMapByStatus = getSenatorsByStatus(this.state.senators);
    return (
      <div className="App">
        <div className="team">
          <h1>Whip Count</h1>
          <Row className="all-status-container">
            {map(senateMapByStatus, (senators, statusNo) => {
              return (
                <Col flex={"1 1 auto"} className="status-col">
                  <h4>{STATUS_MAP[statusNo]}</h4>
                  <div className="status-container">
                    {map(senators, (senator) => (
                      <Popover
                        content={`${senator.party} ${senator.state}`}
                        title={`Sen. ${senator.displayName}`}
                      >
                        <div
                          className={[
                            "image-container",
                            senator.party.toLowerCase(),
                          ].join(" ")}
                          onClick={() => this.scrollTo(senator.id)}
                        >
                          <img
                            width={200}
                            src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`}
                          />
                        </div>
                      </Popover>
                    ))}
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row className="table-container" gutter={16}>
            <Table 
              dataSource={this.state.senators} 
              rowKey="id"
              pagination={false}
             sticky scroll={{
              x: true,
              y: '60vh',

            }}>
              <ColumnGroup title="Name">
                <Column
                  title="First Name"
                  dataIndex="first_name"
                  key="first_name"
                />
                <Column
                  title="Last Name"
                  dataIndex="last_name"
                  key="last_name"
                  sorter={makeSortFunction("last_name")}
                />
              </ColumnGroup>
              <Column
                title="State"
                dataIndex="state"
                key="state"
                sorter={makeSortFunction("state")}
              />
              <Column
                title="Party"
                dataIndex="party"
                key="party"
                sorter={makeSortFunction("party")}
              />
              <Column
                title="Status"
                dataIndex="status"
                key="status"
                filters={STATUS_DISPLAY}
                onFilter={(value, record) => record.status.includes(value)}
                sorter={makeSortFunction("status")}
              />
            </Table>
            ,
          </Row>
        </div>
      </div>
    );
  }
}


export default App;
