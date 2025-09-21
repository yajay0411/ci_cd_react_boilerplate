import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import LazyImage from '@/components/common/LazyImage/LazyImage';
import { useAuthState } from '@/context/auth.context';
import DonorIcon from '@images/donor_icon.png';
import './MyAvatarProgress.scss';

interface AvatarProgressProps {
  profilePic?: string | null;
  gap?: number;
  width?: number;
  height?: number;
  radius?: string;
  showComplete?: boolean;
}

const MyAvatarProgress: React.FC<AvatarProgressProps> = ({
  profilePic = null,
  gap = 14,
  width = 36,
  height = 36,
  radius = '0px',
  showComplete = false,
}) => {
  const { userData } = useAuthState();

  const profileComplete = userData?.profile_complate ?? 0;
  const avatarSrc = profilePic || userData?.avtar?.cdn_path || DonorIcon;

  // Animated progress value
  const progress = useMotionValue(0);

  // Background gradient bound to progress
  const background = useTransform(progress, val => {
    return `radial-gradient(closest-side, #fff 79%, transparent 85% 70%), 
            conic-gradient(#288b91 ${val}%, #D8E2EB 0)`;
  });

  // For text display, we need a rounded number
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    // Animate from current -> new profileComplete
    const controls = animate(progress, profileComplete, {
      duration: 1,
      ease: 'easeInOut',
      onUpdate: val => {
        setDisplayVal(Math.round(val));
      },
    });
    return controls.stop;
  }, [profileComplete, progress]);

  return (
    <div className="ap-dp" style={{ width: width + gap, height: height + gap }}>
      <motion.div
        className="ap-progress"
        style={{
          background,
          width: width + gap,
          height: height + gap,
        }}
      />
      <div className="ap-outline">
        <LazyImage
          src={avatarSrc}
          fallbackSrc={DonorIcon}
          alt="profile-pic"
          width={width}
          height={height}
          radius={radius}
          wrapperClassName="ap-avatar"
        />
      </div>
      {showComplete && <motion.div className="ap-completed">{displayVal}% complete</motion.div>}
    </div>
  );
};

export default MyAvatarProgress;
