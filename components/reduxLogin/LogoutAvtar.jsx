const LogoutAvtar = ({ onLogout }) => {
  const handleLogoutClick = () => {
    localStorage.removeItem("userDetails");
    if (typeof onLogout === "function") onLogout();
  };

  return (
    <button onClick={handleLogoutClick} className="text-primary font-semibold">
      Logout
    </button>
  );
};

export default LogoutAvtar;
