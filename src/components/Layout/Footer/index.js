import "./Footer.scss";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__wrap">
          <div className="footer__title">TEAM12</div>
          <div className="footer__social">
            <div className="footer__box"><FaFacebookF/></div>
            <div className="footer__box"><FaInstagram/></div>
            <div className="footer__box"><FaGithub/></div>
          </div>
          <div className="footer__end">COPYRIGHT © 2023 - DESIGN: HA CUONG THINH</div>
        </div>
      </footer>
    </>
  )
}

export default Footer;