import React from 'react'
import "./FooterLinks.scss"
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const FooterLinks = () => {
  return (
    <>
        <section className="contact-section">
            <div className="container contact">
                <div className="contact-icon">
                <FaTwitter className='i' />
                <FaInstagram className='i' />
                <FaLinkedin className='i' />
                </div>

                <h2 className='wtxt'>Let's Talk?</h2>
                <a href="#home" className='btn btn-dark'>Connect With Me!</a>
            </div>


        </section>
    </>
  )
}

export default FooterLinks