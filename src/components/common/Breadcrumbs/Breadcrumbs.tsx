import ArrowBackwardIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShareIcon from '@mui/icons-material/Share';
import React from 'react';
import { Link } from 'react-router-dom';

import LinkHandler from '@/components/common/LinkHandler/LinkHandler';
import { ROUTE_PATHS } from '@/constants/ROUTE_PATHS';
import type { BreadcrumbItem } from '@/context/breadcrumb.context';
import MaxWidthContainerLayout from '@/core/Layouts/MaxWidthContainerLayout/MaxWidthContainerLayout';
import { useIsMobile } from '@/hooks/useIsMobile';

import './Breadcrumb.scss';

interface IBreadcrumbProps {
  items: BreadcrumbItem[] | null;
  showShare?: boolean;
  sharePath?: string;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({
  items,
  showShare = true,
  sharePath = ROUTE_PATHS.referral,
}) => {
  const isMobile = useIsMobile();

  if (!items) return <></>;

  return (
    <div className="breadcrumb-wrapper">
      <MaxWidthContainerLayout className="breadcrumb-mwc">
        <div className="left">
          {isMobile ? (
            <>
              {items[0]?.path && (
                <LinkHandler to={items[0].path} variant="icon">
                  <ArrowBackwardIcon sx={{ fontSize: ['14px', '20px'] }} />
                </LinkHandler>
              )}
              <span>{items[items.length - 1].label}</span>
            </>
          ) : (
            <>
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx == 0 && <ArrowForwardIosIcon className="arrow-wrapper" />}
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={item.isActive ? 'active-link' : 'non-active-link'}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={item.isActive ? 'active-link' : ''}>{item.label}</span>
                  )}
                  {idx < items.length - 1 && <ArrowForwardIosIcon className="arrow-wrapper" />}
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {showShare && (
          <div className="right">
            <LinkHandler to={sharePath} variant="icon" className="share-wrapper">
              <ShareIcon sx={{ fontSize: ['14px', '20px'] }} />
            </LinkHandler>
          </div>
        )}
      </MaxWidthContainerLayout>
    </div>
  );
};

export default Breadcrumb;
