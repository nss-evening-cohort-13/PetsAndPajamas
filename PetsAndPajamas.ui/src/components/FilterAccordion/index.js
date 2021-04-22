import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

export default class FilterAccordion extends React.Component {
  render() {
    const { categories } = this.props;
    return (
        <>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Category
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{categories.length}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
  }
}
