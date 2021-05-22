/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import pajamaTypeData from '../../helpers/data/pajamaTypeData';
import AccordianCheckbox from '../AccordionCheckbox';

export default class FilterAccordion extends React.Component {
    state = {
      categories: [],
      categoryToggled: true
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

    togglePlusMinus = () => {
      this.setState({
        categoryToggled: !this.state.categoryToggled
      });
    }

    render() {
      const { categories } = this.state;
      const { filterProducts } = this.props;
      return (
        <>
            <Accordion defaultActiveKey="0">
                <Card className="product-accordion">
                    <Accordion.Toggle as={Card.Header} className="accordion-header" eventKey="0" onClick={this.togglePlusMinus}>
                        Category {this.state.categoryToggled ? <i className="fas fa-minus accordion-hover"></i> : <i className="fas fa-plus accordion-hover"></i>}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="checkboxes-container">
                            {categories.map((category) => {
                              if (this.countType(category.type) !== 0) {
                                return <AccordianCheckbox key={category.id} category={category} quantity={this.countType(category.type)} filterProducts={filterProducts} />;
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
