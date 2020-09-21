import React from "react";
import { Table, Button, Tag, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { STATUS_COLORS, STATUS_DISPLAY, STATUS_TYPES } from "../../constants";

const { Column } = Table;
export const makeSortFunction = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  };
};

class SenateTable extends React.Component {
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
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              this.props.handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.props.handleReset(clearFilters)}
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
      this.props.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.props.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  render() {
    const { senators } = this.props;
    return (
      <Table
        dataSource={senators}
        rowKey="id"
        pagination={false}
        sticky
        scroll={{
          x: true,
          y: "60vh",
        }}
      >
        <Column title="First Name" dataIndex="first_name" key="first_name" />
        <Column
          title="Last Name"
          dataIndex="last_name"
          key="last_name"
          sorter={makeSortFunction("last_name")}
        />
        <Column
          {...this.getSearchProps("state")}
          title="State"
          dataIndex="state"
          width={100}
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
                <Button onClick={() => this.props.openModal(record)}>Details</Button>
              </>
            );
          }}
        />
      </Table>
    );
  }
}

export default SenateTable;
