import React from "react";
import { Card, Row, Col } from "antd";
import { TRACKED_ISSUES } from "../../constants";
import "./style.css";

const LandingPageCards = ({ setIssue, height }) => (
  <div style={{ height: height }} className="landing-page">
    <Row
      gutter={[16, 16]}
      justify="space-evenly"
      align="stretch"
      className="cards-row"
    >
      {TRACKED_ISSUES.map((issue) => (
        <Col span={8} key={issue.key}>
          <Card
            hoverable
            className="issue-card"
            actions={[
              <a
                href={issue.aboutLinkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {issue.aboutLinkText}
              </a>,
            ]}
          >
            <a href={issue.link} onClick={() => setIssue(issue.key)}>
              <Card.Meta title={issue.header} description={issue.description} />
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default LandingPageCards;
