import { useAuth } from "../context/useAuth";

const Wishlist = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>My Wishlist</h1>
      <p>Welcome, {user?.name || "Guest"}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Wishlist;
