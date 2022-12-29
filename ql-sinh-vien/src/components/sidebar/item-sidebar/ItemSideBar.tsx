import './ItemSideBar.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChildrenItemSideBar from '../children-item-sidebar/ChildrenItemSideBar';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';
import classNames from "classnames";
import { useAppDispatch } from '../../../app/hooks';
import { changeCountClick } from '../redux/sidebar.redux';
import { useSelector } from 'react-redux';
import { checkActiveLink } from '../../../shared/utils/sidebar.utils';

function ItemSideBar(data: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebar = useSelector((state: any) => state.sidebar);
  const isPathActiveChildren = () => data.item.childrens.some((item: any) => checkActiveLink(location.pathname, item.link)) ;

  const isPathActive = data.item.childrens ? isPathActiveChildren() : checkActiveLink(location.pathname, data.item.link);

  const toggleItem =(id: any) => (event: any) => {
    if (!data.item.childrens) {
      event.target.classList.toggle('wrapper-item-sidebar-active');
      dispatch(changeCountClick(id))
      navigate(data.item.link);
    } else {
      event.target.nextSibling && event.target.nextSibling.classList.toggle('wrapper-children-item-sidebar-active');
    }
  }

  const onMouseOverItem = (event: any) => {
    // event.target.nextSibling.classList.add('abc-hi');
  }

  const onMouseOutItem = (event: any) => {
    // event.target.nextSibling.classList.remove('abc-hi');
  }

  return (
    <>
      <li className={classNames("d-block", {
        // 'parrent-wrapper-item-sidebar-active': isPathActive
      })} id={'item-sidebar-' + data.index} >
        <div className={classNames("d-flex py-3 m-1 wrapper-item-sidebar align-items-end", {
          'wrapper-item-sidebar-active': isPathActive,
        })}
          onClick={toggleItem(data.id)}
          onMouseOver={onMouseOverItem}
          onMouseOut={onMouseOutItem}
        >
          <span className="pointer-events-none mx-2 start-icon-item-sidebar">
            {data.item  && data.item.icon ? data.item.icon() : null}
          </span>
          <span className="mx-1 pointer-events-none text-item-sidebar">
            {data.item.name}
          </span>
          {
            data.item.childrens &&
            <span className="item-sidebar-children-drop px-2 pointer-events-none">
              <KeyboardArrowDownIcon />
            </span>
          }
        </div>
        {
          data.item.childrens ? <ChildrenItemSideBar data={data.item.childrens} /> : <ul style={{overflow: 'hidden'}}></ul>
        }
        

      </li>
    </>
  )
}

export default ItemSideBar;
