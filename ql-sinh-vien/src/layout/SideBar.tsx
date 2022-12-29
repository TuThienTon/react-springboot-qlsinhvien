import { useSelector } from "react-redux";
import ItemSideBar from "../components/sidebar/item-sidebar/ItemSideBar";
import SideBarConst from "../shared/constants/side-bar.constant";
import { filterRolesSideBar } from "../shared/utils/auth.util";
import './SideBar.css';
// import ImgSibar from '../assets/images/image_sibar.png'

function SideBar() {
  // const account = useSelector((state: any) => state.authentications.account);
  // const accessRightCodes = account.group.accessRights.map((item: any) => item.code)
  // const accessRightCodes = [{ code: '' }];
  const accessRightCodes: any = [];
  return (
    <>
      <div className="px-2 pt-3 wrapper-sidebar">
        <ul className="list-unstyled d-block">
          {
            filterRolesSideBar(SideBarConst, accessRightCodes)
              .map((item, index) => (<ItemSideBar item={item} index={index} key={index} />))
          }
          <li className="text-center my-5">
            {/* <img src={ImgSibar} alt="image_sibar" width="60%"/> */}
          </li>
        </ul>
        {/* <pre>
          {JSON.stringify(filterRolesSideBar(SideBarConst, accessRightCodes), null, 2)}
        </pre> */}
      </div>
    </>
  )
}
export default SideBar;