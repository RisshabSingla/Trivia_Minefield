import DropDown from "./DropDown";

function User({ userSettings }) {
  return (
    <div>
      <div className="flex p-3 text-orange-100">
        <div>
          <img
            width="40px"
            height="40px"
            src={
              userSettings?.gender === "male"
                ? "/images/userImage/1.svg"
                : "/images/userImage/1.svg"
            }
            alt=""
          />
        </div>
        <div className="text-base font-serif pl-3.5 text-left	">
          <div>
            {userSettings?.name ? userSettings.name : "Loading"}
            {/* Risshab Singla */}
          </div>
          {/* <div className="text-xs font-serif">
            {isPremium ? "Premium" : "Hello"}
          </div> */}
        </div>
        <div>
          <DropDown />
        </div>
      </div>
    </div>
  );
}

export default User;
