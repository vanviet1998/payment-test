import React from 'react';
import styles from '../styles/button.module.css';
import { Button } from 'antd';


const MyButton = ({ children, className, ...props }) => {
    return (
        <Button  {...props} className={`${className} ${styles["my-button"]}`}>
            {children}
        </Button>
    );
}

export default MyButton;