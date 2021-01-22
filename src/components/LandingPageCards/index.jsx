import React from "react";
import { Card } from "antd";
import { TRACKED_ISSUES } from "../../constants";

const LandingPageCards = ({setIssue}) => (
        TRACKED_ISSUES.map((issue) => 
             (
              <Card
                title={issue.header}
                onClick={() => setIssue(issue.key)}
              ></Card>
            )
        )
);

export default LandingPageCards;
