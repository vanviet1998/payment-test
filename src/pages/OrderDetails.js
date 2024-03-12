import React, { useEffect, useState } from "react";
import { getDetailPayment } from "../service/FakeApiService";
import styles from "../styles/detaiPayment.module.css";
import { Col, Row, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function OrderDetail() {
    const { t } = useTranslation();

    const paymentMethod = {
        zalo: { icon: "/assets/icons/zalo.svg", link: "https://zalopay.vn/" },
        bankTransfer: { icon: "/assets/icons/bank_transfer.svg", link: "https://vnpay.vn/" },
        card: { icon: "/assets/icons/card.svg", link: "https://vnpay.vn/" },
        momo: { icon: "/assets/icons/momo.svg", link: "https://momo.vn/" },
        viettel: { icon: "/assets/icons/viettel.svg", link: "https://viettelstore.vn/viettelpay"},
    };
    const [loading, setLoading] = useState(false);
    const [detailPayment, setDetailPayment] = useState(false);
    const { id } = useParams()

    const handleGetLink = (link) => {
        window.open(link, '_blank');

    }

    useEffect(() => {
        setLoading(true);
        getDetailPayment()
            .then((response) => {
                response?.length && setDetailPayment(response[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    return (
        <div className="">
            <Row>
                <Col xs={24} md={8}>
                    <div className={styles["detail-payment"]}>
                        <h2>
                            <b className="upper">{t("order_information")}</b>
                        </h2>
                        <p>
                            <span className={styles.mute}>{t("transaction_code")}: </span>
                            <span className={styles["payment-id"]}>
                                {detailPayment?.transactionCode}
                            </span>
                        </p>
                        <p>
                            <span>{t("requested_amount")}: </span>
                            <span>{detailPayment?.requestedAmount}</span>
                        </p>
                        <p>
                            <span>{t("transfer_fee")}: </span>
                            <span>{detailPayment?.transferFee}</span>
                        </p>
                        <p>
                            <span> {t("transaction_fee")}: </span>
                            <span>{detailPayment?.transactionFee}</span>
                        </p>
                        <p>
                            <span>{t("order_fee")}: </span>
                            <span>{detailPayment?.orderFee}</span>
                        </p>
                        <p>
                            <span>{t("actual_amount_received")}: </span>
                            <span className={styles["payment-id"]}>
                                {detailPayment?.actualAmount}
                            </span>
                        </p>
                        <p>
                            <span>{t("request_content")}: </span>
                            <span className="upper bold">
                                {detailPayment?.requestContent}
                            </span>
                        </p>
                    </div>
                </Col>
                <Col xs={24} md={16}>
                    <div className={styles["detail-payment"]}>
                        <h2>
                            <b className="upper">{t("payment_method")}</b>
                        </h2>
                        {detailPayment?.paymentMethods?.map((data, index) => (
                            <div onClick={() =>handleGetLink(paymentMethod[data?.code]?.link)} key={index} className={styles["payment-method"]}>
                                <span>
                                    <b className="me-2">{data?.method}</b>({data?.limit}, {t("transaction_fee")}:{" "}
                                    {data?.transactionFee})
                                </span>
                                <img
                                    className={styles["payment-icon"]}
                                    src={paymentMethod[data?.code]?.icon}
                                />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>

            <Spin spinning={loading} fullscreen />
        </div>
    );
}
