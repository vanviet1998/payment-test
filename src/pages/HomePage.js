import React from 'react'
import styles from "../styles/home.module.css"
import MyButton from '../components/Button';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
    const { t } = useTranslation();
    return (
        <div>
            <section className={styles["banner-section-first"]}>
                <div className="container">
                    <img src="/assets/images/banner1.png" className="responsive-image" alt="Payment Gateway Introduction" />
                </div>
            </section>

            <section className={styles["banner-section-second"]}>
                <div className="container">
                    <img src="/assets/images/banner2.png" className="responsive-image" alt="Payment Gateway Introduction" />
                    <MyButton type="primary" className="mt-4">{t('create_link_now')}</MyButton>
                </div>

            </section>
        </div>
    )
}
