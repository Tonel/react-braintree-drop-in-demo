import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BraintreeDropIn from "./components/BraintreeDropIn";
import {Col, Container, Input, Row, Button} from "reactstrap";
import {useState} from "react";

function App() {
    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);
    const [numberOfProducts, setNumberOfProducts] = useState(1);

    const PRICE = 50;

    return (
        <Container>
            <Col>
                <Row
                    className={"productHeaderRow"}
                >
                    <Col
                        xs={4}
                    >
                        {
                            "Product"
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"text-center"}
                    >
                        {
                            "Price"
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"text-center"}
                    >
                        {
                            "Quantity"
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"text-center"}
                    >
                        {
                            "Total"
                        }
                    </Col>
                    <Col
                        xs={2}
                    />
                </Row>
                <Row
                    className={"productInfoRow"}
                >
                    <Col
                        xs={4}
                        className={"productInfoColumn"}
                    >
                        {
                            "Foo product"
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"productInfoColumnCenter"}
                    >
                        {
                            `$ ${PRICE}`
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"productInfoColumnCenter"}
                    >
                        <Input
                            placeholder="0"
                            min={1}
                            max={100}
                            type="number"
                            step="1"
                            value={numberOfProducts}
                            onChange={((e) => {
                                setNumberOfProducts(e.target.value)
                            })}
                        />
                    </Col>
                    <Col
                        xs={2}
                        className={"productInfoColumnCenter"}
                    >
                        {
                            `$ ${numberOfProducts * PRICE}`
                        }
                    </Col>
                    <Col
                        xs={2}
                        className={"productInfoColumnCenter"}
                    >
                        <Button
                            onClick={() => {setShowBraintreeDropIn(true)}}
                            disabled={showBraintreeDropIn}
                        >
                            {
                                "Go to Checkout"
                            }
                        </Button>
                    </Col>
                </Row>
            </Col>
            <BraintreeDropIn
                show={showBraintreeDropIn}
                onPaymentCompleted={() => {
                    setShowBraintreeDropIn(false);
                    setNumberOfProducts(1);
                }}
            />
        </Container>
    );
}

export default App;
