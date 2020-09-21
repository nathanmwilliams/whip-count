import React from "react";
import { Select } from 'antd';
import { find } from 'lodash';
const { Option } = Select;


const Search = ({ senators, states, selectSenator }) => {
    function onChange(value) {
      console.log(`selected ${value}`);
      const senator = find(senators, { id: value});
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
        {senators.map((senator) => (
          <Option key={senator.id}>{senator.displayName}</Option>
        ))}
      </Select>
    );}

  export default Search;