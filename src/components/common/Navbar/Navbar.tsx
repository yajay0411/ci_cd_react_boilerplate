import React from 'react';

import LazyImage from '@/components/common/LazyImage/LazyImage';
import MyAvatarProgress from '@/components/common/MyAvatarProgress/MyAvatarProgress';
import { useNavbarState } from '@/context/navbar.context';
import MaxWidthContainerLayout from '@/core/Layouts/MaxWidthContainerLayout/MaxWidthContainerLayout';
import { useToggleMenu } from '@/hooks/useToggleMenu';
import kettoLogoLight from '@images/logo-light.svg';

import './Navbar.scss';

const Navbar: React.FC = () => {
  const { showLogo, showProfile } = useNavbarState();
  const toggleSidebar = useToggleMenu();
  return (
    <>
      <nav className="navbar-wrapper">
        <MaxWidthContainerLayout className="navbar-mwc">
          {showLogo && <LazyImage src={kettoLogoLight} width={'73px'} alt="ketto_logo" />}
          {showProfile && (
            <div onClick={toggleSidebar}>
              <MyAvatarProgress width={28} height={28} radius={'50%'} />
            </div>
          )}
        </MaxWidthContainerLayout>
      </nav>
    </>
  );
};

export default Navbar;
