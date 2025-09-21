import React from 'react';

import LazyImage from '@/components/common/LazyImage/LazyImage';
import DonorIcon from '@images/donor_icon.png';

import './MyAvatar.scss';

interface IMyAvatarProps {
  src?: string | null;
  fallbackSrc?: string;
  width?: number;
  height?: number;
  radius?: number | string;
  alt?: string;
}

const MyAvatar: React.FC<IMyAvatarProps> = ({
  src = null,
  alt = 'my_avatar',
  width = 36,
  height = 36,
  radius = 0,
  fallbackSrc = DonorIcon,
}) => {
  return (
    <>
      <LazyImage
        src={src}
        fallbackSrc={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        radius={radius}
        wrapperClassName={'my-avatar'}
      />
    </>
  );
};

export default MyAvatar;
