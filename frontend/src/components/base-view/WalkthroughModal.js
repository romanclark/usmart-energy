import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import campus from '../../images/campus.jpg';

class WalkthroughModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        };

        // bind functions
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.show}
                    centered={true}
                    scrollable={true}
                    backdrop="static"
                    onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">User Walkthrough</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img className="" src={campus} width={800} alt="campus" />
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium facilisis tristique. Proin tempus sed nunc id pharetra. Morbi tincidunt tristique pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam velit ante, hendrerit eu odio et, suscipit dictum nisl. Proin lacus nulla, pulvinar nec dictum sit amet, iaculis id diam. Aliquam vulputate non turpis vel posuere. Sed porta est sed metus pellentesque maximus. Pellentesque id posuere diam, sed elementum mi.</div>

                        <div>Mauris quis efficitur risus, sed imperdiet ante. Phasellus rhoncus nec lacus quis lobortis. In felis mauris, convallis ac congue ac, tincidunt sit amet ex. Proin molestie eget justo vel hendrerit. Donec vestibulum velit iaculis pharetra rhoncus. Cras ut purus vitae velit pulvinar tempor. Aenean semper consequat felis, sed volutpat urna molestie vel.</div>

                        <div>Sed finibus, libero et ultrices varius, nunc neque imperdiet ante, a ultricies mauris erat vitae ante. Curabitur tellus massa, condimentum sed dolor ac, convallis efficitur dui. Donec pellentesque ligula ante, quis suscipit magna blandit ut. Duis ac sem eleifend mauris porta mattis. Donec sed aliquet felis, pretium mattis ligula. Mauris ac fringilla enim. Quisque non orci vitae magna faucibus euismod. Pellentesque feugiat accumsan velit. Sed malesuada, odio vitae volutpat ornare, ante purus hendrerit ex, et scelerisque lacus magna et nunc. Mauris in tincidunt lorem. Morbi vitae lobortis leo. Ut in lobortis lorem, eget fringilla ipsum. Duis consequat dignissim enim, ac hendrerit libero auctor et. Proin nec velit tincidunt, tristique metus sed, posuere metus.</div>
                    </Modal.Body>
                    <Modal.Footer className="center-content">
                        <Button variant="outline-secondary">Previous</Button>
                        <Button variant="outline-secondary">Next</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default WalkthroughModal;
