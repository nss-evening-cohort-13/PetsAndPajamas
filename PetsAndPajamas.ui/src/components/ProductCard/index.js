import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ProductCard extends React.Component {
  render() {
    const { pajama } = this.props;
    return (
        <div className="card-container">
            <Card className="product-card">
            <Link to={`/product-detail/${pajama.id}`}><CardImg top width="100%" className="product-card-img" src={pajama.image} alt={pajama.description} /></Link>
                <CardBody className="product-card-body">
                    <CardTitle tag="h5" className="product-name">{pajama.title}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted product-price">${pajama.price}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
  }
}
