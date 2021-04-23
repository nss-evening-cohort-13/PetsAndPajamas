import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

export default class ProductCard extends React.Component {
  render() {
    const { pajama } = this.props;
    return (
        <div className="card-container">
            <Card>
                <CardImg top width="100%" src={pajama.image} alt={pajama.description} />
                <CardBody>
                    <CardTitle tag="h5">{pajama.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">${pajama.price}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
  }
}
