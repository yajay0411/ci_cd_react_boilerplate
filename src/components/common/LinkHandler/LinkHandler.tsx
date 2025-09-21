import { IconButton, Button, Typography, type SxProps } from '@mui/material';
import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'icon' | 'button' | 'text' | 'custom';

interface LinkHandlerProps extends LinkProps {
  children: React.ReactNode;
  variant?: Variant;
  width?: number | string;
  height?: number | string;
  iconSize?: number;
  sx?: SxProps;
}

const LinkHandler: React.FC<LinkHandlerProps> = ({
  children,
  variant = 'icon',
  width,
  height,
  iconSize,
  sx,
  ...linkProps
}) => {
  const style: SxProps = {
    width,
    height,
    fontSize: iconSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    ...sx,
  };

  switch (variant) {
    case 'icon':
      return (
        <Link {...linkProps}>
          <IconButton sx={style}>{children}</IconButton>
        </Link>
      );

    case 'button':
      return (
        <Link {...linkProps} style={{ textDecoration: 'none' }}>
          <Button sx={style}>{children}</Button>
        </Link>
      );

    case 'text':
      return (
        <Link {...linkProps} style={{ textDecoration: 'none' }}>
          <Typography component="span" sx={style}>
            {children}
          </Typography>
        </Link>
      );

    case 'custom':
      return (
        <Link {...linkProps} style={{ textDecoration: 'none' }}>
          <div style={{ width, height }}>{children}</div>
        </Link>
      );

    default:
      return null;
  }
};

export default LinkHandler;
