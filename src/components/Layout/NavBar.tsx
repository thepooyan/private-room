import { getAvatar } from "../../utility/backend";
import Login from "../Login";
import Logout from "../Logout";
import { userManager } from "../../utility/signal";
import EditProfile from "../EditProfile";

const NavBar = () => {
  return (
    <div class="bg-gray-200 border-b-gray-500 border-b-2 p-2 flex justify-end items-center">
      {!userManager.isLoading() ? (
        <>
          {userManager.getUser() && (
            <div class="mr-auto flex items-center gap-2">
              <img
                src={getAvatar(userManager.getUser())}
                alt="user avatar"
                class="w-20 h-20 object-cover rounded-full text-transparent bg-gray-300"
              />
              <div>
                <p>{userManager.getUser()?.username}</p>
                <p>{userManager.getUser()?.email}</p>
              </div>
            </div>
          )}
          {(userManager.isLoggedIn() && <div><Logout /><EditProfile/></div>) || <Login />}
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
};

export default NavBar;
