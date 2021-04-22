import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import pajamaTypeData from '../../helpers/data/pajamaTypeData';

export default class FilterAccordion extends React.Component {
    state = {
      categories: []
    }

    componentDidMount() {
      this.getPajamaTypes();
    }

    getPajamaTypes = () => {
      pajamaTypeData.getPajamaTypes().then((res) => {
        this.setState({
          categories: res
        });
      });
    }

    render() {
      const { categories } = this.state;
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
