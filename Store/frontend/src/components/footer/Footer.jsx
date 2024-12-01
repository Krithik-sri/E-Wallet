import React from 'react';
import styles from './Footer.module.scss';
import FooterLinks from './FooterLinks';


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <>
    <FooterLinks></FooterLinks>
    <div className={styles.footer}>
        {year} KS
    </div>
    </>
  )
};

export default Footer