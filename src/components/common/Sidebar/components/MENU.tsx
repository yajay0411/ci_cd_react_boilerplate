import SettingsIcon from '@mui/icons-material/Settings';

import { ROUTE_PATHS } from '@/constants/ROUTE_PATHS';

export const MENU = [
  {
    path: ROUTE_PATHS.sipSelect,
    label: 'All SIPs',
    icon: <SettingsIcon className="sidebar_menu_item_icon" />,
  },
  {
    path: ROUTE_PATHS.my_profile,
    label: 'My Profile',
    icon: <SettingsIcon className="sidebar_menu_item_icon" />,
  },
  {
    path: ROUTE_PATHS.my_preference,
    label: 'My Preference',
    icon: <SettingsIcon className="sidebar_menu_item_icon" />,
  },
  {
    path: ROUTE_PATHS.my_wallet,
    label: 'My Wallet',
    icon: <SettingsIcon className="sidebar_menu_item_icon" />,
  },
  {
    path: ROUTE_PATHS.referral,
    label: 'Referral',
    icon: <SettingsIcon className="sidebar_menu_item_icon" />,
  },
];
