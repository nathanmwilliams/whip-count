import React from 'react';
import { Select } from 'antd';
import { TAGS } from '../../constants';

const { Option } = Select;

const FilterSelector = ({
    selectTag
}) => (
        <Select mode="tags" style={{ width: '100%' }} placeholder="Select filters" onChange={selectTag}>
            {TAGS.map(tag => (
                <Option value={tag} key={tag} >
                    {tag}
                </Option>
            ))}
        </Select>
    )

export default FilterSelector;