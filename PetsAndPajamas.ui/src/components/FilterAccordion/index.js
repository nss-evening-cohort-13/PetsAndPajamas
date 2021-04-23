/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import pajamaTypeData from '../../helpers/data/pajamaTypeData';
import AccordianCheckbox from '../AccordionCheckbox';

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

    countType = (type) => {
      const { pajamas } = this.props;
      const group = pajamas.filter((pajama) => pajama.pajamaType.type === type);
      return group.length;
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
                        <Card.Body className="checkboxes-container">
                            {categories.map((category) => {
                              if (this.countType(category.type) !== 0) {
                                return <AccordianCheckbox key={category.id} category={category} amount={this.countType(category.type)} />;
                              }
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
      );
    }
}
