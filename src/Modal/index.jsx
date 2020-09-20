import React from "react";
import { Modal, Card } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { STATUS_MAP } from "../constants";

const { Meta } = Card;

const SenatorModal = ({ senator, visible, closeModal }) => (
  <>
    <Modal
      title={`Senator ${senator.displayName} (${senator.party[0]})`}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
    >
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src={`https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`}
          />
        }
      >
        <Meta description={`Position: ${STATUS_MAP[senator.status]}`} />
      </Card>
      <div>
        <p className="quote">
            {senator.quote.text}
        </p>
        <h4>Contact</h4>
        <p>{senator.contact.address}</p>
        <p>{senator.contact.phone}</p>
        <p className="socials">
          {senator.socials.twitter && (
            <a target="_blank" href={`https://twitter.com/${senator.socials.twitter}`}>
              <TwitterOutlined />
            </a>
          )}

          {senator.socials.facebook && (
            <a target="_blank" href={`https://facebook.com/${senator.socials.facebook}`}>
              <FacebookOutlined />
            </a>
          )}

          {senator.socials.url && (
            <a target="_blank" href={senator.socials.urls}>
              <LinkOutlined />
            </a>
          )}
        </p>
      </div>
    </Modal>
  </>
);


export default SenatorModal;
