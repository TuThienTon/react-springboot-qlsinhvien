import classNames from 'classnames';
import { any } from 'prop-types';
import React, { useRef } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { checkActiveLink } from '../../../shared/utils/sidebar.utils';
import GrandChildrenItemSidebar from '../grandchildren-item-sidebar/GrandChildrenItemSidebar';
import { changeCountClick } from '../redux/sidebar.redux';

import './ChildrenItemSideBar.css';

function ChildrenItemSideBar(props: any) {
	const {data} = props;
  const location = useLocation();
  const dispatch = useAppDispatch();

  // const checkActiveLink = (pathname: string, link: string) => {
  // 	return pathname.startsWith(link);
  // }

  const clickItemChild = (id: any) => (event: any) => {
    dispatch(changeCountClick(id));
    // refLink.current.click()
  };

  const isActiveChildrenItemSideBar = (itemChild: any): boolean => {
    if (itemChild.childrens) {
      return itemChild.childrens.some((item: any) => checkActiveLink(location.pathname, item.link))
    } else {
      return checkActiveLink(
        location.pathname,
        itemChild.link
      )
    }
  }

  return (
    <>
      <ul
        className={classNames('list-unstyled wrapper-children-item-sidebar', {
          'wrapper-children-item-sidebar-active': data.some(
            (item: any) => checkActiveLink(location.pathname, item.link)
            ),
        })}
      > 
    
        {data.map((itemChild: any, index: number) => (
					<React.Fragment key={index}>
            <li
              className={classNames('item-children-item-sidebar', {
                'item-children-item-sidebar-active': isActiveChildrenItemSideBar(itemChild) ,
              })}
              onClick={clickItemChild(itemChild.id)}
              key={index}
            >
              <Link
                className="py-2 d-inline-block w-100"
                to={itemChild.link}
                style={{
                  textDecoration: 'none',
                  color: '#475985',
                  paddingLeft: '1.5rem',
                }}
                key={index}
                id={itemChild.link}
              >
                {itemChild.name}
              </Link>
            </li>
            {itemChild.childrens ? (
              <GrandChildrenItemSidebar data={itemChild.childrens} />
            ) : (
              <ul style={{ overflow: 'hidden' }}></ul>
            )}
					</React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default ChildrenItemSideBar;
