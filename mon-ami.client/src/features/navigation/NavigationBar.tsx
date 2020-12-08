import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface INavigationBarProps {
  openCreateForm: () => void;
}

const NavigationBar: React.FC<INavigationBarProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Mon Ami
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item name="Create Activity">
          <Button onClick={openCreateForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavigationBar;
