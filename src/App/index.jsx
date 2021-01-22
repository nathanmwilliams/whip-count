import React, { Component } from 'react';
import { Col, Row, Tooltip, Layout, Button, Card } from "antd";
import { map, filter } from "lodash";

import { firestore, firebasedb } from '../utils/setup-firebase';
import { getFilteredSenators, getSenatorsByStatus } from './selectors';
import SenatorModal from "../components/Modal";
import Search from "../components/Search";
import './style.css';
import { SHORT_STATUS_TYPES, TRACKED_ISSUES } from '../constants';
import SenateTable, { makeSortFunction } from '../components/Table';
import ProgressBar from "../components/ProgressBar";

import thpLogo from '../thp-logo.png';
import circleInPerson from '../circle-in-person.svg'
import IssueCounts from './IssueCounts';
import LandingPageCards from '../components/LandingPageCards';

const { Header, Content, Footer } = Layout;

const tooltipPlacement = {
  1: "right",
  2: "top",
  3: "top",
  4: "left"
}

const formatParty = (party) => {
  if (!party) {
    return console.log('no party')
  }
  if (party.length > 1) {
    return party
  }
  switch (party) {
    case 'D':
      return 'Democratic'
      case 'R':
        return 'Republican'
      default: 
        return 'Independent'
  }

}
class App extends Component {
  state = {
    senators: [],
    modalSenator: null,
    searchText: "",
    searchedColumn: "",
    selectedIssue: "",
    tableHeight: 0,
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
            party: node.data().party
              ? formatParty(node.data().party)
              : console.log(node.data().displayName),
          };
          senators.push(data);
        });
        senators.sort(makeSortFunction("state"));
        console.log(senators);
        this.setState({ senators });
      })
 

    window.addEventListener("resize", () => this.getTableHight());
  };

  handleStateSearch = (value) => {
    this.setState({
      searchText: value,
      searchedColumn: "state",
    });
  };

  setTableHeight = (tableHeight) => {

      this.setState({ tableHeight });

  };

  setIssue = (issueKey) => {
    console.log(issueKey)
    this.setState({selectedIssue: issueKey})
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
  
   scrollTo = (id, options) => {
    const row = document.querySelector(`[data-row-key="${id}"]`);
    if (row) {
      row.scrollIntoView(options);
    }
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
    const senateMapByStatus = getSenatorsByStatus(this.state.senators, this.state.selectedIssue);
    const filteredSenators = getFilteredSenators(
      this.state.senators,
      this.state.searchedColumn,
      this.state.searchText
    );
    return (
      <Layout className="App">
        <div className="title-bar">
          <h1>Senate Whip Count</h1>
        </div>
        <Header>
          <Search
            handleStateSearch={this.handleStateSearch}
            senators={this.state.senators}
            selectSenator={this.selectSenator}
            handleReset={this.handleReset}
          />
          {this.renderModal()}

          <Button
            ghost
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLScH8KYmrnWScWJr1v3jUwMdxP5ekN5x0IZ05Q23J7SxoDoQrw/viewform"
          >
            Submit position update
          </Button>
        </Header>
        <Content className="team">
          {this.state.selectedIssue ? (
            <IssueCounts
              selectSenator={this.selectSenator}
              senateMapByStatus={senateMapByStatus}
              filteredSenators={filteredSenators}
              searchText={this.state.searchText}
              searchedColumn={this.state.searchedColumn}
              searchedSenator={this.state.searchedSenator}
              tableHeight={this.state.tableHeight}
              setTableHeight={this.setTableHeight}
              openModal={this.openModal}
            />
          ) : (
            <LandingPageCards setIssue={this.setIssue} />
          )}
        </Content>
        <Footer>
          <div>
            <a
              href="https://townhallproject.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="logo" alt="town hall project" src={thpLogo} />
            </a>{" "}
          </div>
          <div>
            <Button href="mailto:info@townhallproject.com" type="text">
              Contact
            </Button>
          </div>
        </Footer>
      </Layout>
    );
  }
}


export default App;
