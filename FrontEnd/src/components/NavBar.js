import useScreenSize from "./useScreenSize";
import User from "./User";

function NavBar({ userSettings }) {
  const screenSize = useScreenSize();
  return (
    <div className="w-screen flex justify-between">
      <div className="flex h-20 p-4 center">
        <img width="50px" src="./images/logo.svg" alt="logo"></img>
        {screenSize.width > 650 ? (
          <p className="text-3xl text-white  font-mono font-extrabold mt-2 pl-2">
            Trivia MineField
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="text-white">
        <User userSettings={userSettings} />
      </div>
    </div>
  );
}

export default NavBar;
