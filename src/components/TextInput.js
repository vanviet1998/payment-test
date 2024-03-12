import React from "react";
import { Form, Input as AntdInput } from "antd";


export default function MyTextInput({
    error,
    touched,
    ...rest
}) {

    return (
        <Form.Item
            validateStatus={touched && error ? 'error' : 'success'}
            help={touched && error}
        >
            <AntdInput.TextArea
                {...rest}
                className="w-100"
            />
        </Form.Item>
    );
};
