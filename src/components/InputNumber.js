import React from "react";
import { Form, InputNumber as AntdInput } from "antd";


export default function MyInputNumber({
    error,
    touched,
    value,
    ...rest
}) {

    return (
        <Form.Item
            validateStatus={touched && error ? 'error' : 'success'}
            help={touched && error}
        >
            <AntdInput
                {...rest}
                value={value}
                className="w-100"
            />
        </Form.Item>
    );
};
