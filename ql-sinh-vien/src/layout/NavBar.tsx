import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
// import Logo from "../components/Logo";
import { APP_ROUTER_CONST } from "../shared/constants/router/app-router.constant";
// import { logoutAsync } from "../features/auths/redux/authSlice";
import SSBoxModal from "../components/common/other/SSBoxModal";
import SSHeaderPage from "../components/common/other/SSHeaderPage";
import { Grid, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KEY_STORE } from "../shared/constants/auth.constant";

function ModalLogout({ open, onClose }: { open: boolean; onClose: any }) {
  const navigate = useNavigate();
	const dispatch = useDispatch();
	const logoutUrlStore = localStorage.getItem(KEY_STORE.LOGOUT_URL)

  const handleAcceptedLogout = async () => {
		// await dispatch(logoutAsync("ok"));
    onClose()
		if (logoutUrlStore) {
			window.location.href = logoutUrlStore
		} else {
			navigate(APP_ROUTER_CONST.login.path, { replace: true });
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<SSBoxModal>
				<SSHeaderPage title="Xác nhận đăng xuất">
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</SSHeaderPage>
				<div className="mt-3 mb-4">Bạn có chắc chắn muốn đăng xuất ra khỏi hệ thống?</div>
				<Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
					<Grid item sm={6} style={{ textAlign: "right" }}>
						<Button
							variant="contained"
							color="info"
							type="button"
              onClick={onClose}
						>
							Hủy
						</Button>
					</Grid>
					<Grid item sm={6}>
						<Button variant="contained" color="secondary" type="button" onClick={handleAcceptedLogout}>
							Đồng ý
						</Button>
					</Grid>
				</Grid>
			</SSBoxModal>
		</Modal>
	);
}

function NavBar({handleCollapseMenu}: {handleCollapseMenu: any}) {
	const navigate = useNavigate();
	// const currentUser = useSelector(
	// 	(state: any) => state.authentications.account
	// );
	const [anchorEl, setAnchorEl] = useState(null);
	const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseDialog = (e: any) => {
		setOpenLogoutDialog(false);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickItem = (event: any) => {
		setAnchorEl(null);
		setOpenLogoutDialog(true);
	};

	const goToHomePage = () => {
		navigate(APP_ROUTER_CONST.layout.childrens.overview.path, { replace: true });
	}

	return (
		<>
			<ModalLogout open={openLogoutDialog} onClose={handleCloseDialog} />
			<nav
				className="navbar sticky-top navbar-light px-4 bg-common"
				style={{
					height: "100%",
				}}
			>
				<div>
					<span onClick={handleCollapseMenu}>
						{/* menu */}
					</span>
					<a className="navbar-brand" href="#" onClick={goToHomePage} >
						{/* <Logo variant="white" width="100px" /> */}
					</a>
				</div>
				<div
					style={{
						color: "#fff",
					}}
				>
					<div className="d-flex align-items-baseline">
						<span className="mx-2">
							<Avatar sx={{ width: 32, height: 32, color: "white" }}>
								D
							</Avatar>
						</span>
						<span className="mx-2">devmaster</span>
						<span
							className="mx-3 cursor-pointer navbar-icon-dropdown "
							onClick={handleClick}
						>
							<KeyboardArrowDownIcon />
						</span>
					</div>
					<div>
						<Menu
							id="account-menu"
							MenuListProps={{
								"aria-labelledby": "demo-basic-button",
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							TransitionComponent={Fade}
							PaperProps={{
								elevation: 0,
								sx: {
									mt: 3,
									width: 200,
									minWidth: 100,
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={handleClickItem}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								<ListItemText>Đăng xuất</ListItemText>
							</MenuItem>
						</Menu>
					</div>
				</div>
			</nav>
		</>
	);
}
export default NavBar;
