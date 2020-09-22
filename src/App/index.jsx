import React, { Component } from 'react';
import { Col, Row, Tooltip, Layout, Button, Image } from "antd";
import { map, filter } from "lodash";

import { firestore, firebasedb } from '../utils/setup-firebase';
import { getFilteredSenators, getSenatorsByStatus } from './selectors';
import SenatorModal from "../components/Modal";
import Search from "../components/Search";
import './style.css';
import { SHORT_STATUS_TYPES } from '../constants';
import SenateTable, { makeSortFunction } from '../components/Table';
import ProgressBar from "../components/ProgressBar";

import thpLogo from '../thp-logo.png';
import indivisibleLogo from "../indivisible-logo.png";

const { Header, Content, Footer } = Layout;

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
      }).then(() => {
        this.getTableHight();

      });
 
      window.addEventListener("resize", () => this.getTableHight());
  };

  handleStateSearch = (value) => {
    this.setState({
      searchText: value,
      searchedColumn: "state",
    });
  };

  getTableHight = () => {
    const statusContainer = document.getElementsByClassName("all-status-container");
    const footer = document.getElementsByClassName("ant-layout-footer");
    const progressBar = document.getElementsByClassName(
      "progress-bar-container"
    );
    const tableHeader = document.getElementsByClassName("ant-table-thead");
    if (statusContainer[0] && progressBar[0] && tableHeader[0] && footer[0]) {
      const height =
        statusContainer[0].scrollHeight +
        progressBar[0].scrollHeight +
        footer[0].scrollHeight +
        tableHeader[0].scrollHeight;
      const windowHeight = window.innerHeight;
      const tableHeight = windowHeight - height;
      this.setState({ tableHeight });
    }
  }

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
    this.setState({ searchText: "", searchedSenator: "" });
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
    this.setState({
      searchedSenator: senator.displayName,
    });
  };

  closeModal = () => {
    this.setState({ modalSenator: null });
  };

  render() {
    const senateMapByStatus = getSenatorsByStatus(this.state.senators);
    const filteredSenators = getFilteredSenators(this.state.senators, this.state.searchedColumn, this.state.searchText);
    return (
      <Layout className="App">
        <div className="title-bar">
          <h1>SCOTUS Vacancy - Senate Whip Count</h1>
        </div>
        <Header>
          <Search
            handleStateSearch={this.handleStateSearch}
            senators={this.state.senators}
            selectSenator={this.selectSenator}
            handleReset={this.handleReset}
          />
          <Button
            ghost
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLScH8KYmrnWScWJr1v3jUwMdxP5ekN5x0IZ05Q23J7SxoDoQrw/viewform"
          >
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
                  <h3>{`${SHORT_STATUS_TYPES[statusNo]} (${senators.length})`}</h3>
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
                          onClick={() => this.selectSenator(senator)}
                        >
                          <Image
                            preview={false}
                            alt={senator.displayName}
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
            <ProgressBar senateMapByStatus={senateMapByStatus} />
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
              searchedSenator={this.state.searchedSenator}
              height={this.state.tableHeight}
              getTableHight={this.getTableHight}
            />
            {this.renderModal()}
          </Row>
        </Content>
        <Footer>
          <div>
            A joint project of{" "}
            <a href="https://townhallproject.com" target="_blank" rel="noopener noreferrer" >
              <img className="logo" alt="town hall project" src={thpLogo} />
            </a>{" "}
            and{" "}
            <a href="https://savescotus.indivisible.org/" target="_blank" rel="noopener noreferrer" >
              <img className="logo" alt="indivisible" src={indivisibleLogo} />
            </a>
          </div>
          <div>
            <Button href="mailto:info@townhallproject.com" type="primary">
              Contact
            </Button>
          </div>
        </Footer>
      </Layout>
    );
  }
}


export default App;
