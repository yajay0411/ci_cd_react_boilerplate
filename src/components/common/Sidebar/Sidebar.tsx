import ForwardArrowIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button } from '@mui/material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MyAvatarProgress from '@/components/common/MyAvatarProgress/MyAvatarProgress';
import { MENU } from '@/components/common/Sidebar/components/MENU';
import { ROUTE_PATHS } from '@/constants/ROUTE_PATHS';
import { useAuthState } from '@/context/auth.context';
import { useMainLayoutState } from '@/context/main_layout.context';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useToggleMenu } from '@/hooks/useToggleMenu';

import './Sidebar.scss';

const Sidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const toggleMenu = useToggleMenu();
  const location = useLocation();

  const { showSidebar } = useMainLayoutState();
  const { userData } = useAuthState();

  // Menu item animation
  const menuVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  // Manual animation controller
  const controlsBackDrop = useAnimation();
  const controlsSidebar = useAnimation();

  useEffect(() => {
    controlsBackDrop.start({ opacity: 0.5, transition: { duration: 0.35 } });
    controlsSidebar.start({ x: 0, transition: { duration: 0.35 } });
  }, [controlsBackDrop, controlsSidebar]);

  const handleClose = async () => {
    // animate out first
    controlsBackDrop.start({ opacity: 0, transition: { duration: 0.35 } });
    await controlsSidebar.start({ x: '100%', transition: { duration: 0.35 } });
    toggleMenu(); // then unmount
  };

  const profileComplete = userData?.profile_complate ?? 0;

  return (
    <AnimatePresence>
      {showSidebar && (
        <>
          {/* Backdrop */}
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={controlsBackDrop}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              zIndex: 1200,
            }}
          />

          {/* Sidebar */}
          <motion.aside
            className="sidebar-container"
            initial={{ x: '100%' }}
            animate={controlsSidebar} // controlled by useAnimation
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: isMobile ? '100%' : 340,
              zIndex: 1300,
              background: '#fff',
            }}
          >
            <div className="sidebar">
              {/* Header */}
              <div className="sidebar_header">
                <IconButton className="sidebar_close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>

                <div className="sidebar_profile">
                  <MyAvatarProgress width={70} height={70} gap={24} radius="50%" showComplete />
                  <div className="sidebar_profile_content">
                    <h3 className="sidebar_name">{userData?.fname}</h3>
                    <p className="sidebar_email">{userData?.email}</p>
                    <Link
                      to={ROUTE_PATHS.my_profile}
                      onClick={handleClose}
                      className="sidebar_link"
                    >
                      <Button className="sidebar_btn">
                        {profileComplete === 100 ? 'Go to profile' : 'Complete Profile'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <ul className="sidebar_menu">
                {MENU.map(({ label, path, icon }, index) => (
                  <motion.li
                    key={path}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuVariants}
                    className={`sidebar_menu_item ${location.pathname === path ? 'selected' : ''}`}
                  >
                    <Link to={path} onClick={handleClose}>
                      {icon && <span className="sidebar_menu_item_icon">{icon}</span>}
                      <span className="sidebar_menu_item_label">{label}</span>
                      <ForwardArrowIcon className="arrow_icon" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div className="sidebar_footer">
                <Button className="logout_btn" onClick={handleClose}>
                  Log Out
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
