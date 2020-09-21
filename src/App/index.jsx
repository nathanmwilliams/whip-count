import React, { Component } from 'react';
import {
  Col,
  Row,
  Table,
  Popover,
  Button,
  Tag,
  Layout,
  Input,
  Space,
} from "antd";
import { map, filter } from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { firestore, firebasedb } from '../utils/setup-firebase';
import { getSenatorsByStatus } from './selectors';
import SenatorModal from "../Modal";
import Search from "../Search";
import './style.css';
import { STATUS_COLORS, STATUS_DISPLAY, STATUS_TYPES } from '../constants';
const { Column } = Table;
const { Header, Content } = Layout;

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
    senators: [],
    modalSenator: null,
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
  getSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  scrollTo = (id, options) => {
    console.log(id);
    const row = document.querySelector(`[data-row-key="${id}"]`);
    row.scrollIntoView(options);
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

  selectSenator = (senator) => {
    this.scrollTo(senator.id);

    this.openModal(senator);
  };

  openModal = (senator) => {
    this.setState({ modalSenator: senator });
  };

  closeModal = () => {
    this.setState({ modalSenator: null });
  };

  render() {
    const senateMapByStatus = getSenatorsByStatus(this.state.senators);
    return (
      <Layout className="App">
        <Header>
          <Search
            senators={this.state.senators}
            selectSenator={this.selectSenator}
          />
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
                      <Popover
                        key={senator.id}
                        content={
                          <p>
                            {senator.party} {senator.state}
                          </p>
                        }
                        title={`Sen. ${senator.displayName}`}
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
              sticky
              scroll={{
                x: true,
                y: "60vh",
              }}
            >
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
              <Column
                {...this.getSearchProps("state", this.state)}
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
                onFilter={(value, record) => {
                  console.log(record, value);
                  return record.status.includes(value);
                }}
                sorter={makeSortFunction("status")}
                render={(id) => {
                  return (
                    <Tag color={STATUS_COLORS[id]} key={id}>
                      {STATUS_TYPES[id]}
                    </Tag>
                  );
                }}
              />
              <Column
                title="See More"
                key="see-more"
                render={(record) => {
                  return (
                    <>
                      <Button onClick={() => this.openModal(record)}>
                        Details
                      </Button>
                    </>
                  );
                }}
              />
            </Table>
            {this.renderModal()}
          </Row>
        </Content>
      </Layout>
    );
  }
}


export default App;
