import React from "react";
import { map } from "lodash";
import { STATUS_COLORS_PROGRESS } from "../../constants";

import "./style.css";

const ProgressBar = ({ senateMapByStatus }) => (
  <div className="progress-bar-container">
    <div className="progress-bar">
      {map(senateMapByStatus, (senators, status) => {
        return (
          <div
            key={`progress-${status}`}
            style={{
              flexBasis: `${senators.length}%`,
              background: STATUS_COLORS_PROGRESS[status],
              height: 20,
              color: "white",
            }}
          >
            {senators.length}
          </div>
        );
      })}
    </div>
    <div className="half-way"></div>
  </div>
);

export default ProgressBar;
