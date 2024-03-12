import React, { useEffect, useState } from "react";
import { getDetailPayment } from "../service/FakeApiService";
import styles from "../styles/detaiPayment.module.css";
import { Col, Row, Spin } from "antd";
import { useTranslation } from 'react-i18next';

export default function DetailPayment() {
  const { t } = useTranslation();

  const paymentMethodIcon = {
    zalo: "/assets/icons/zalo.svg",
    bankTransfer: "/assets/icons/bank_transfer.svg",
    card: "/assets/icons/card.svg",
    momo: "/assets/icons/momo.svg",
    viettel: "/assets/icons/viettel.svg",
  };
  const [loading, setLoading] = useState(false);
  const [detailPayment, setDetailPayment] = useState(false);

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
              <span className={styles.mute}>{t("transaction_code")} </span>
              <span className={styles["payment-id"]}>
                {detailPayment?.transactionCode}
              </span>
            </p>
            <p>
              <span>{t("requested_amount")} </span>
              <span>{detailPayment?.requestedAmount}</span>
            </p>
            <p>
              <span>{t("transfer_fee")} </span>
              <span>{detailPayment?.transferFee}</span>
            </p>
            <p>
              <span> {t("transaction_fee")} </span>
              <span>{detailPayment?.transactionFee}</span>
            </p>
            <p>
              <span>{t("order_fee")} </span>
              <span>{detailPayment?.orderFee}</span>
            </p>
            <p>
              <span>{t("actual_amount_received")} </span>
              <span className={styles["payment-id"]}>
                {detailPayment?.actualAmount}
              </span>
            </p>
            <p>
              <span>{t("request_content")} </span>
              <span className="upper bold">
                {detailPayment?.requestContent}
              </span>
            </p>
            <div>
              <h4>{t("recipient_information")} </h4>
              <p>
                <span>{t("recipient_name")} </span>
                <span className="upper bold"> ************ </span>
              </p>
              <p>
                <span>{t("bank")} </span>
                <span className="upper bold">************</span>
              </p>
              <p>
                <span>{t("account_number")} </span>
                <span className="upper bold">************</span>
              </p>
            </div>
          </div>
        </Col>
        <Col xs={24} md={16}>
          <div className={styles["detail-payment"]}>
            <h2>
              <b className="upper">{t("payment_method")}</b>
            </h2>
            {detailPayment?.paymentMethods?.map((data, index) => (
              <div key={index} className={styles["payment-method"]}>
                <span>
                  <b className="me-2">
                    {data?.method}
                  </b>({data?.limit}, {t("transaction_fee")}: {data?.transactionFee})
                </span>
                <img
                  className={styles["payment-icon"]}
                  src={paymentMethodIcon[data?.code]}
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
