import React from "react";
import { Modal, Card, Row, Col, List } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { STATUS_TYPES } from "../constants";
import "./style.css";

const { Meta } = Card;

const townHallsDisplay = (townHalls) => (
  <Card title="Attend an event">
    <List
      itemLayout="vertical"
      dataSource={townHalls}
      renderItem={(item) => {
          console.log(item)
          return (
            <List.Item
              extra={
                item.link
                  ? (<a href={item.link}>{item.linkName || "More info"}</a>)
                  : []
              }
  
            >
              <List.Item.Meta
                title={
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://townhallproject.com/${item.eventId}`}
                  >
                    {item.eventName}
                  </a>
                }
                description={`${item.meetingType} at ${item.Time} on ${item.dateString}`}
              />
            </List.Item>
          );}}
    />
  </Card>
);

const SenatorModal = ({ senator, visible, closeModal, townHalls }) => (
  <>
    <Modal
      width={"80%"}
      title={`Senator ${senator.displayName} (${senator.party[0]})`}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      footer={null}
    >
      <div className="modal-row">
        <div className="left-container modal-col">
          <Card
            style={{ maxWidth: 200 }}
            bordered={false}
            className={`status__${senator.status}`}
            cover={
              <img
                alt="example"
                src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`}
              />
            }
          >
            <Meta description={`Position: ${STATUS_TYPES[senator.status]}`} />
          </Card>
        </div>
        <div className="right-container modal-col">
          {senator.quote && <p className="quote">{senator.quote.text}</p>}
          <Card
            title="Contact the senator:"
            actions={[
              senator.socials.facebook && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://facebook.com/${senator.socials.facebook}`}
                >
                  <FacebookOutlined />
                </a>
              ),
              senator.socials.twitter && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/${senator.socials.twitter}`}
                >
                  <TwitterOutlined />
                </a>
              ),
              senator.socials.url && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={senator.socials.url}
                >
                  <LinkOutlined />
                </a>
              ),
            ]}
          >
            <p>{senator.contact.address}</p>
            <p>{senator.contact.phone}</p>
          </Card>

          {townHalls.length > 0 && townHallsDisplay(townHalls)}
        </div>
      </div>
    </Modal>
  </>
);

export default SenatorModal;
