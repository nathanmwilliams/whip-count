import React, { Component } from 'react';
import { Col, Row, Tooltip, Layout, Progress, Button } from "antd";
import { map, filter } from "lodash";


import { firestore, firebasedb } from '../utils/setup-firebase';
import { getFilteredSenators, getSenatorsByStatus } from './selectors';
import SenatorModal from "../components/Modal";
import Search from "../components/Search";
import './style.css';
import { STATUS_COLORS, STATUS_TYPES } from '../constants';
import SenateTable, { makeSortFunction } from '../components/Table';
const { Header, Content } = Layout;

const tooltipPlacement = {
  1: "right",
  2: "top",
  3: "top",
  4: "left"
}

class App extends Component {
  state = {
    senators: [],
    modalSenator: null,
    searchText: "",
    searchedColumn: "",
  };

  componentDidMount = () => {
    firebasedb
      .ref("townHalls")
      .once("value")
      .then((snapshot) => {
        const townHalls = [];
        snapshot.forEach((node) => {
          townHalls.push(node.val());
        });
        this.setState({ townHalls });
      });
    firestore
      .collection("whip_count_2020")
      .get()
      .then((snapshot) => {
        const senators = [];
        snapshot.forEach((node) => {
          const data = {
            ...node.data(),
            id: node.id,
          };
          senators.push(data);
        });
        senators.sort(makeSortFunction("state"));
        this.setState({ senators });
      });
  };

  handleStateSearch = (value) => {
    this.setState({
      searchText: value,
      searchedColumn: "state",
    });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    if (clearFilters) {
      clearFilters();
    }
    this.setState({ searchText: "" });
  };

  scrollTo = (id, options) => {
    const row = document.querySelector(`[data-row-key="${id}"]`);
    if (row) {
      row.scrollIntoView(options);
    }
  };

  renderModal = () => {
    const { modalSenator, townHalls } = this.state;
    if (!modalSenator) {
      return null;
    }
    const thisTownhalls = filter(townHalls, {
      officePersonId: modalSenator.id,
    });
    return (
      <SenatorModal
        visible={true}
        senator={modalSenator}
        townHalls={thisTownhalls}
        closeModal={this.closeModal}
      />
    );
  };

  openModal = (senator) => {
    this.setState({ modalSenator: senator });
  };

  selectSenator = (senator) => {
    this.scrollTo(senator.id);
    this.openModal(senator);
  };

  closeModal = () => {
    this.setState({ modalSenator: null });
  };

  render() {
    const senateMapByStatus = getSenatorsByStatus(this.state.senators);
    const filteredSenators = getFilteredSenators(this.state.senators, this.state.searchedColumn, this.state.searchText);
    return (
      <Layout className="App">
        <Header>
          <Search
            handleStateSearch={this.handleStateSearch}
            senators={this.state.senators}
            selectSenator={this.selectSenator}
            handleReset={this.handleReset}
          />
          <Button ghost>
            Submit position update
          </Button>
        </Header>
        <Content className="team">
          <Row className="all-status-container">
            {map(senateMapByStatus, (senators, statusNo) => {
              return (
                <Col
                  key={statusNo}
                  flex={"1 1 auto"}
                  className={`status-col status__${statusNo}`}
                >
                  <h3>{`${STATUS_TYPES[statusNo]} (${senators.length})`}</h3>
                  <div className="status-container">
                    {map(senators, (senator) => (
                      <Tooltip
                        key={senator.id}
                        placement={tooltipPlacement[statusNo]}
                        title={`Sen. ${senator.displayName} (${senator.party[0]}) ${senator.state}`}
                      >
                        <div
                          className={[
                            "image-container",
                            senator.party.toLowerCase(),
                          ].join(" ")}
                          onClick={() =>
                            this.scrollTo(senator.id, { behavior: "smooth" })
                          }
                        >
                          <img
                            width={200}
                            alt={`${senator.displayName}`}
                            src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`}
                          />
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </Col>
              );
            })}
          </Row>
          {senateMapByStatus[1] && (
            <>
              <Tooltip>
                <Progress
                  strokeColor={STATUS_COLORS[4]}
                  showInfo={false}
                  strokeLinecap="square"
                  percent={senateMapByStatus[4].length}
                  trailColor="#7a76884d"
                  strokeWidth={12}
                  success={{
                    strokeLinecap: "square",
                    strokeColor: STATUS_COLORS[1],
                    percent:
                      senateMapByStatus[1].length + senateMapByStatus[2].length,
                  }}
                />
                <div className="half-way"></div>
              </Tooltip>
            </>
          )}
          <Row className="table-container" gutter={16}>
            <SenateTable
              senators={filteredSenators}
              getSearchProps={this.getSearchProps}
              handleSearch={this.handleSearch}
              handleReset={this.handleReset}
              searchedColumn={this.state.searchedColumn}
              searchText={this.state.searchText}
              openModal={this.openModal}
            />
            {this.renderModal()}
          </Row>
        </Content>
      </Layout>
    );
  }
}


export default App;
