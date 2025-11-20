export const useAdmin = () => {
  // 2220413 : 이윤성
  // 2190019 : 장원덕
  // 2180063 : 우이경
  // 2130178 : 이동원
  const adminUsers = ["2220413", "2190019", "2180063", "2130178", "admin"];

  const isAdmin = () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return false;
    return adminUsers.indexOf(userId) > -1;
  };

  return {
    adminUsers,
    isAdmin,
  };
};
