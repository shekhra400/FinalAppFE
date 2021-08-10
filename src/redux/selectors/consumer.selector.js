import { createSelector } from "reselect";

const selectConsumers = (state) => state.consumers;

export const selectUserListData = createSelector(
  [selectConsumers],
  (data) => data.listData.data
);

export const selectUserListIsLoading = createSelector(
  [selectConsumers],
  (userList) => userList.isLoading
);

export const selectUserListPageNo = createSelector(
  [selectConsumers],
  (listPageNo) => listPageNo.listData.data.page
);