import useScreenSize from "../components/useScreenSize";
import { useNavigate } from "react-router-dom";

function WrongPage() {
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  return (
    <div>
      <div className={`h-screen `}>
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
        </div>
        <div className="h-5/6">
          <div className="flex h-4/6 items-center justify-center ">
            <div>
              <div className="flex items-center justify-center">
                <img src="./images/logo.svg" alt="" />
              </div>
              <div className="flex justify-center p-3 text-white text-3xl">
                The Ultimate Quiz Builder
              </div>
              <div className="px-4 text-white text-2xl">
                Create quizes, share with people in a convenient way
              </div>
              <div className="py-4 px-4 text-white text-2xl text-center">
                Looks like you took a wrong turn
              </div>
              <div className=" px-4 text-white text-2xl text-center">
                <button
                  className="rounded-xl p-3 bg-slate-900"
                  onClick={() => navigate("/")}
                >
                  Back to Safety
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WrongPage;
