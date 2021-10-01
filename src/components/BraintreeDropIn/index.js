import React, {useEffect, useState} from 'react'
import './index.css';
import dropin from "braintree-web-drop-in"
import {Button} from "reactstrap";

function BraintreeDropIn(props) {
    const { show, onPaymentCompleted } = props;

    const [braintreeInstance, setBraintreeInstance] = useState(undefined)

    useEffect(() => {
        if (show) {
            const initializeBraintree = () => dropin.create({
                authorization: "sandbox_s9gd7m2p_vp62s592633kc5p5", // insert your tokenization key or client token here
                container: '#braintree-drop-in-div',
            }, function (error, instance) {
                if (error)
                    console.error(error)
                else
                    setBraintreeInstance(instance);
            });

            if (braintreeInstance) {
                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            }
        }
    }, [show])

    return (
        <div
            style={{display: `${show ? "block" : "none"}`}}
        >
            <div
                id={"braintree-drop-in-div"}
            />

            <Button
                className={"braintreePayButton"}
                type="primary"
                disabled={!braintreeInstance}
                onClick={() => {
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            (error, payload) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", payload.nonce);

                                    // TODO: use the paymentMethodNonce to
                                    //  call you server and complete the payment here

                                    // ...

                                    alert(`Payment completed with nonce=${paymentMethodNonce}`);

                                    onPaymentCompleted();
                                }
                            });
                    }
                }}
            >
                {
                    "Pay"
                }
            </Button>
        </div>
    )
}

export default BraintreeDropIn
