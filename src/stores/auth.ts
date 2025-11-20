import { create } from "zustand";

const user = (set) => ({
  BPU_CODE: "",
  DEPT_CODE: null,
  DEPT_NAME: null,
  EMP_TITLE_CD: "",
  E_BPU_CODE: "",
  E_ZROLE: "",
  HR_CODE: null,
  HR_NAME: null,
  PROFIT_DEADLINE: "",
  USER_ID: "",
  USER_NAME: "",
  ZROLE: "",

  loginSuccess: (user) => {
    set((state) => {
      return {
        BPU_CODE: user.BPU_CODE,
        DEPT_CODE: user.DEPT_CODE,
        DEPT_NAME: user.DEPT_NAME,
        EMP_TITLE_CD: user.EMP_TITLE_CD,
        E_BPU_CODE: user.E_BPU_CODE,
        E_ZROLE: user.E_ZROLE,
        HR_CODE: user.HR_CODE,
        HR_NAME: user.HR_NAME,
        PROFIT_DEADLINE: user.PROFIT_DEADLINE,
        USER_ID: user.USER_ID,
        USER_NAME: user.USER_NAME,
        ZROLE: user.ZROLE,
      };
    });
  },
});

export const useStoreAuth = create(user);
