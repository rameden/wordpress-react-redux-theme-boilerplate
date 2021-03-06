import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';
import mapDispatchToProps from '../../actions';
import MenuItem from '../../components/Header/MenuItem';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  componentWillMount() {
    const { fetchMenu } = this.props;

    fetchMenu('primary');
  }
  handleNavBarToggle() {
    this.setState({isOpen: !this.state.isOpen});
  }
  handleMenuItems() {
    const { menu } = this.props;

    return (
      menu.data &&
      menu.data.map((data, i) =>
        (data.menuLocation === 'primary') &&
        data.menuStructure.map((menuStructure, i) =>
          <MenuItem
            key={i}
            menu={menuStructure}
          />
        )
      )
    )
  }
  render() {
    const { isOpen } = this.state;

    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand to="/" tag={Link}>
            {WP_REACT_REDUX.siteName}
          </NavbarBrand>
          <NavbarToggler onClick={::this.handleNavBarToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {::this.handleMenuItems()}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
