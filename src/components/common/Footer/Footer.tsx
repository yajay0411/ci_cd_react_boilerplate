import React from 'react';
import { Link } from 'react-router-dom';

import LazyImage from '@/components/common/LazyImage/LazyImage';
import { FOOTER_LINKS } from '@/constants/STATIC_DATA';
import MaxWidthContainerLayout from '@/core/Layouts/MaxWidthContainerLayout/MaxWidthContainerLayout';
import { useIsMobile } from '@/hooks/useIsMobile';
import FooterImgMb from '@images/footer/secured-card-mb.png';
import FooterImg from '@images/footer/secured-card.png';

import './Footer.scss';

// Types
interface FooterLink {
  text: string;
  absoluteLink: string;
}

interface FooterLinksColumnProps {
  title: string;
  links: FooterLink[];
  className?: string;
}

// Sub-components
const SocialIcons: React.FC = () => (
  <div className="share-icons">
    {FOOTER_LINKS.social_links.map((social, index) => (
      <Link
        key={index}
        to={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="share-link"
      >
        <LazyImage src={social.src} alt={social.alt} />
      </Link>
    ))}
  </div>
);

const FollowersSection: React.FC = () => (
  <div className="followers">
    <p>2.5M +</p>
    <span>Followers</span>
  </div>
);

const ContactSection: React.FC = () => (
  <div className="reach-out">
    <p className="for-queries">
      For any queries
      <br />
      Email: info@ketto.org
    </p>
    <p className="contact">Contact No: +91 9930088522</p>
  </div>
);

const FooterLinksColumn: React.FC<FooterLinksColumnProps> = ({
  title,
  links,
  className = 'cover-list',
}) => (
  <div className={`footer-column ${className}`}>
    <h3>{title}</h3>
    <ul className="footer-links-list">
      {links.map(item => (
        <li key={item.text}>
          <Link
            className="list-data"
            to={item.absoluteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const PaymentMethods: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <div className="payment-methods-holder">
    <div className="payment-methods">
      <LazyImage
        src={isMobile ? FooterImgMb : FooterImg}
        alt="secured payment methods"
        style={{ width: '406px' }}
      />
    </div>
  </div>
);

const Copyright: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <div className="copyright">
    <div className="copyright-text">
      Copyright © {new Date().getFullYear()} Ketto Online Ventures Pvt Ltd. All Rights Reserved.
      {!isMobile &&
        FOOTER_LINKS.policies.map((policy, index) => (
          <React.Fragment key={policy.text}>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              to={policy.href}
              className="copyright-links"
            >
              {policy.text}
            </Link>
            {index < FOOTER_LINKS.policies.length - 1 && <span className="separator">|</span>}
          </React.Fragment>
        ))}
    </div>
    <div className="disclaimer">
      Ketto is a private limited company operating an online intermediary platform providing
      crowdfunding services for medical, social and charitable causes. We facilitate transactions
      between contributors and campaigners. Ketto does not provide any financial benefits in any
      form whatsoever to any person making contributions on its platform.
    </div>
  </div>
);

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile && (
        <div className="footer-mb">
          <div className="section-1">
            <p className="title">Subscribe and follow us on</p>
            <SocialIcons />
          </div>
          <div className="section-2">
            <FollowersSection />
          </div>
        </div>
      )}
      <footer className="footer-wrapper">
        <MaxWidthContainerLayout className="footer-mwc">
          <div className="footer-container">
            {/* Left Section */}
            <div className="footer-section-1">
              <LazyImage
                width={80}
                className="footer-logo"
                src="https://d1vdjc70h9nzd9.cloudfront.net/images/logo-dark-bg.svg?w=80"
                alt="footer_ketto_logo"
              />
              {!isMobile && <SocialIcons />}
              {!isMobile && <FollowersSection />}
              {!isMobile && <ContactSection />}
            </div>

            {/* Right Section */}
            {!isMobile && (
              <div className="footer-section-2">
                <FooterLinksColumn title="Causes" links={FOOTER_LINKS.causes} />
                <FooterLinksColumn title="How it works?" links={FOOTER_LINKS.how_it_works} />
                <FooterLinksColumn title="About Us" links={FOOTER_LINKS.aboutUs} />
                <FooterLinksColumn title="Support" links={FOOTER_LINKS.support} className="" />
              </div>
            )}
            {isMobile && (
              <div className="footer-section-2-mb">
                {FOOTER_LINKS.mobileMenu.map((policy, index) => (
                  <React.Fragment key={policy.text}>
                    <Link rel="noopener noreferrer" target="_blank" to={policy.absoluteLink}>
                      {policy.text}
                    </Link>
                    {index < FOOTER_LINKS.mobileMenu.length - 1 && (
                      <span className="separator">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Copyright Section */}
          <div className="copyright-section">
            <PaymentMethods isMobile={isMobile} />
            <Copyright isMobile={isMobile} />
          </div>
        </MaxWidthContainerLayout>
      </footer>
    </>
  );
};

export default Footer;
