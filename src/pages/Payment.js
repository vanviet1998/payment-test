import React, { useEffect } from 'react'
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import MyInput from '../components/Input';
import MySelect from '../components/Select';
import { getBanks } from '../service/BankApiService';
import { Button, Form, Space } from 'antd';
import { Switch } from 'antd';
import { AuditOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import styles from "../styles/payment.module.css"
import MyInputNumber from '../components/InputNumber';
import { replaceNumberToAmount } from '../common/common';
import MyTextInput from '../components/TextInput';
import { useTranslation } from 'react-i18next';

const initialValues = {
    bankId: null,
    accountNumber: null,
    accountName: null,
    amount: 0,
    content: "",

};

const MAX_AMOUNT = 100000000
const SUGGEST_AMOUNT = [
    100000, 200000, 300000, 500000, 1000000, 2000000, 3000000, 5000000
]

function suggestAmountForUser(inputNumber) {
    let time = 4;
    const limit = MAX_AMOUNT
    const arr = []
    for (let i = 0; i < time; i++) {
        (inputNumber < limit && inputNumber > 0) && arr.push(inputNumber *= 10)
    }
    return arr
}
export default function Payment() {
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        bankId: Yup.number()
            .required(t("bank_id_required")),
        accountNumber: Yup.string()
            .matches(/^\d{6,19}$/, t("account_number_validation"))
            .required(t("account_number_required")),
        accountName: Yup.string().required(t("account_name_required"))
            .min(2, t("account_name_min_length"))
            .max(50, t("account_name_max_length")),
        amount: Yup.number()
            .required(t("amount_required")).min(1, t("amount_min")).max(MAX_AMOUNT, t("amount_max")),
        content: Yup.string()
            .required(t("content_required")),
    });
    
    
    const [banks, setBanks] = useState([])
    const [suggestAmount, setSuggestAmount] = useState(SUGGEST_AMOUNT)
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: values => { alert(JSON.stringify(values)) }
    });
    const { values, setFieldValue, errors, touched, handleBlur, submitForm } = formik
    useEffect(() => {
        getBanks().then(response => {
            setBanks(response?.data?.map(v => ({ value: v.id, name: v.shortName, logo: v.logo })))
        })
    }, [])

    const filterOption = (input, option) =>
        (option?.name ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div className="container">
            <div className={styles.payment}>
                <Form>
                    <MySelect
                        onBlur={handleBlur}
                        touched={touched.bankId}
                        error={errors.bankId}
                        options={banks}
                        showSearch={true}
                        optionLabelProp="name"
                        filterOption={filterOption}
                        optionRender={(option) => (
                            <Space>
                                <div className="d-flex-center">
                                    <img className={styles["bank-logo"]} src={option?.data?.logo}></img>
                                    <span> {option?.data?.name}</span>
                                </div>
                            </Space>
                        )}
                        onChange={(e) => {
                            setFieldValue("bankId", e)
                        }}
                        size="large"
                        name="bankId"
                        placeholder={t('select_bank')} />
                    <MyInput
                        size="large"
                        value={values.accountNumber}
                        name="accountNumber"
                        placeholder={t('account_number')}
                        onBlur={handleBlur}
                        touched={touched.accountNumber}
                        error={errors.accountNumber}
                        suffix={<AuditOutlined />}
                        onChange={(e) => {
                            setFieldValue("accountNumber", e.target.value)
                        }}
                    />
                    <MyInput
                        size="large"
                        value={values.accountName}
                        name="accountName"
                        placeholder={t('recipient_name')}
                        onBlur={handleBlur}
                        touched={touched.accountName}
                        error={errors.accountName}
                        onChange={(e) => {
                            setFieldValue("accountName", e.target.value)
                        }}
                    />
                    <Form.Item >
                        <div className='d-flex direction-reverse align-center'>
                            <Switch className='ms-2' />
                            <span>{t('save_to_contacts')}</span>
                        </div>
                    </Form.Item>
                    <MyInputNumber
                        size="large"
                        name="amount"
                        placeholder={t('VND_amount')}
                        value={values.amount}
                        onBlur={handleBlur}
                        formatter={(value) => replaceNumberToAmount(value)}
                        parser={(value) => value ? value.replace(/\$\s?|(,*)/g, '') : 0}
                        touched={touched.amount}
                        error={errors.amount}
                        onInput={(e) => {
                            const value = e ? e.replace(/\$\s?|(,*)/g, '') : 0
                            setSuggestAmount(suggestAmountForUser(value))
                            setFieldValue("amount", value)
                        }}
                        suffix={<div className='d-flex'> <span className='me-2'>{t('limit')}</span> <QuestionCircleOutlined className='me-3' /> </div>}
                    />
                    <Form.Item >
                        {suggestAmount.map((amount, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setFieldValue("amount", amount)
                                }}
                                className={styles["suggest-amount"]}>
                                {replaceNumberToAmount(amount) + "VND"}
                            </div>
                        ))}
                    </Form.Item>
                    <MyTextInput
                        size="large"
                        value={values.content}
                        name="content"
                        placeholder={t('money_transfer_content')}
                        onBlur={handleBlur}
                        touched={touched.content}
                        error={errors.content}
                        suffix={<AuditOutlined />}
                        onChange={(e) => {
                            setFieldValue("content", e.target.value)
                        }}
                        autoSize={{ minRows: 3, maxRows: 5 }}

                    />
                    <Button type="primary" onClick={() => submitForm()}>
                    {t('payment')}
                    </Button>
                </Form>
            </div>
        </div>
    )
}
