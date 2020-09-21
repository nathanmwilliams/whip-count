import React from "react";
import { Popover } from "antd";
import { map } from "lodash";
import { SHORT_STATUS_TYPES, STATUS_COLORS_PROGRESS } from "../../constants";

import "./style.css";

const ProgressBar = ({senateMapByStatus}) => (
    <div className="progress-bar-container">
        <div className="progress-bar">

            {map(senateMapByStatus, (senators, status) => {
                return (
                //   <Popover content={senators.length} placement="topLeft">
                    <div
                    key={`progress-${status}`}
                    style={{
                        flexBasis: `${senators.length}%`,
                        background: STATUS_COLORS_PROGRESS[status],
                        height: 20,
                        color: 'white'
                    }}
                    >
                    {senators.length}
                    </div>
                //   </Popover>
                );
            })}
        </div>
        <div className="half-way"></div>
    </div>)

export default ProgressBar;
