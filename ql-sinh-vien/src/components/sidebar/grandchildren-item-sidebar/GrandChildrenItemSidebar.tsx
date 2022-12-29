import React from 'react'
import classNames from "classnames";
import { any } from "prop-types";
import { useRef } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { checkActiveLink } from "../../../shared/utils/sidebar.utils";
import { changeCountClick } from "../redux/sidebar.redux";

import "./GrandChildrenItemSidebar.css"
function GrandChildrenItemSidebar(props: any) {
    const { data } = props
    const location = useLocation();
	const dispatch = useAppDispatch();

	// const checkActiveLink = (pathname: string, link: string) => {
	// 	return pathname.startsWith(link);
	// }

	const clickItemChild =(id: any) => (event: any) => {
		dispatch(changeCountClick(id))
    // refLink.current.click()
	};

  

	return (
		<>  
			<ul
				style={{
						listStyleType: 'none'
					}}
			>	
				{data.map((itemChild: any, index: number) => (
					<li
						className={classNames("item-children-item-sidebar", {
							"item-children-item-sidebar-active": checkActiveLink(
								location.pathname,
								itemChild.link
							),
						})}
						onClick={clickItemChild(itemChild.id)}
						key={index}
					>
						<Link
              className="py-2 d-inline-block w-100"
							to={itemChild.link}
							style={{ 
                    textDecoration: "none", 
                    color: "#475985",
                    paddingLeft: '1.5rem',
                  }}
							key={index}
              id={itemChild.link}
						>
							{itemChild.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default GrandChildrenItemSidebar