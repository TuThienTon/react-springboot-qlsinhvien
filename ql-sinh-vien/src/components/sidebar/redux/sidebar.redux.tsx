import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
	dashboardCountClick: 0,
	userCountClick: 0,
	groupCountClick: 0,
	listAssetCountClick: 0,
	searchAssetByNbrCountClick: 0,
	searchAssetByCodeCountClick: 0,
	addAssetCountClick: 0,
	assetTypeCountClick: 0,
	assetGroupCountClick: 0,
	assetClassCountClick: 0,
	buildingCountClick: 0,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		changeCountClick(state, action) {
			// switch (action.payload) {
			// 	case SIDERBAR_ENUM.DASHBOARD:
			// 		return {
			// 			...state,
			// 			dashboardCountClick: state.dashboardCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.USER:
			// 		return {
			// 			...state,
			// 			userCountClick: state.userCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.GROUP:
			// 		return {
			// 			...state,
			// 			groupCountClick: state.groupCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.LIST_ASSET:
			// 		return {
			// 			...state,
			// 			listAssetCountClick: state.listAssetCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.SEARCH_ASSET_BY_NBR:
			// 		return {
			// 			...state,
			// 			searchAssetByNbrCountClick: state.searchAssetByNbrCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.SEARCH_ASSET_BY_CODE:
			// 		return {
			// 			...state,
			// 			searchAssetByCodeCountClick: state.searchAssetByCodeCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.ADD_ASSET:
			// 		return {
			// 			...state,
			// 			addAssetCountClick: state.addAssetCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.ASSET_TYPE:
			// 		return {
			// 			...state,
			// 			assetTypeCountClick: state.assetTypeCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.ASSET_GROUP:
			// 		return {
			// 			...state,
			// 			assetGroupCountClick: state.assetGroupCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.ASSET_CLASS:
			// 		return {
			// 			...state,
			// 			assetClassCountClick: state.assetClassCountClick + 1,
			// 		};
			// 	case SIDERBAR_ENUM.BUILDING:
			// 		return {
			// 			...state,
			// 			buildingCountClick: state.buildingCountClick + 1,
			// 		};
			// }

			return initialState;
		},
	},
});

export const { changeCountClick } = sidebarSlice.actions;

export default sidebarSlice.reducer;
