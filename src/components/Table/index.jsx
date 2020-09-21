import React from "react";
import { Table, Button, Tag } from "antd";
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
  render() {
    const { senators, getSearchProps } = this.props;
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
          {...getSearchProps("state")}
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
                <Button onClick={() => this.openModal(record)}>Details</Button>
              </>
            );
          }}
        />
      </Table>
    );
  }
}

export default SenateTable;
