import React from "react";
import { Form, Select as SelectInput } from "antd";


export default function MySelect({
    error,
    name,
    touched,
    ...rest
}) {
    return (

        <Form.Item
            validateStatus={touched && error ? 'error' : 'success'}
            help={touched && error}
            name={name}
        >
            <SelectInput
                {...rest}
                className={"w-100"}
            />
        </Form.Item>

    );
};
