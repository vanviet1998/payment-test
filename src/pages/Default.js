import { Select } from 'antd';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

export default function Default() {
    const { t, i18n } = useTranslation();
    const handleChange = (value) => {
        i18n.changeLanguage(value);
    };

    return (
        <div>
            <div className='mb-4'>
                <span className='me-4'>{t('language')}</span>
                <Select
                    defaultValue={i18n.language}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'vi', label: 'VietNam' },
                        { value: 'en', label: 'Englist' },
                    ]}
                />
            </div>
            <Link className='me-4' to={"/home"}>{t('page_one')}</Link>
            <Link className='me-4' to={"/payment"}>{t('page_two')}</Link>
            <Link className='me-4' to={"/detail"}>{t('page_three')}</Link>
            <Link className='me-4' to={"/order/1"}>{t('page_four')}</Link>
        </div>
    )
}
