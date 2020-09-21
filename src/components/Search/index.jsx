import React from "react";
import { Select } from 'antd';
import { find } from 'lodash';

// import states from "../../data/states";

const { Option } = Select;
// const statesMap = states.map((state) => ({
//   id: state,
//   displayName: state,
// }))

const Search = ({ senators, selectSenator, handleStateSearch }) => {
  function onChange(value) {
    const senator = find(senators, { id: value });
    if (senator) {
      selectSenator(senator);
    }
 
  }

  function onBlur() {
    //   console.log('blur');
  }

  function onFocus() {
    //   console.log('focus');
  }

  function onSearch(val) {
    //   console.log('search:', val);
  }
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Search for your Senator"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {senators.map((senatorOrState) => (
        <Option key={senatorOrState.id}>{senatorOrState.displayName}</Option>
      ))}
    </Select>
  );
};

  export default Search;