import React from "react";
import { Card } from "antd";
import { TRACKED_ISSUES } from "../../constants";
import "./style.css";

const LandingPageCards = ({ setIssue }) =>
  TRACKED_ISSUES.map((issue) => (
    <Card
      hoverable
      className="issue-card"
      actions={[
        <a href={issue.aboutLinkHref} target="_blank">
          {issue.aboutLinkText}
        </a>,
      ]}
    >
      <a href={issue.link} onClick={() => setIssue(issue.key)}>
        <Card.Meta title={issue.header} description={issue.description} />
      </a>
    </Card>
  ));

export default LandingPageCards;
