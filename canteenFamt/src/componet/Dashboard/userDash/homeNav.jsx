import { CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeNav() {
    const navigate = useNavigate();

    // LOCALSTORAGE (CURRENT USER):
    // We read the currentUser object from localStorage to greet the user by name.
    // If nothing is stored we fall back to a generic name.
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    const displayName = currentUser?.username || "User";

    return (
        <div
            id="nav"
            className="h-auto md:h-[10dvh] flex flex-col md:flex-row justify-between items-start md:items-center px-[4vw] pt-[3vh] md:pt-0 gap-4"
        >

            <h1 className="text-[6vw] md:text-[1.8vw] font-bold md:mt-[5vh] leading-7 text-[#F8FAFC]">
                FAMT<span className="text-[#FBA808]">CANTEEN</span><br />

                <span className="text-[4vw] md:text-[1.2vw] font-semibold text-white">
                    Hello <span className="text-[#FBA808]">{displayName}!!</span>
                </span>
            </h1>

            <div className="self-end md:self-auto">
                <button onClick={() => {
                    navigate('/profile');
                }

                } className="bg-[#FBA808] mt-[1vh] md:mt-[5vh] rounded-full p-[2vw] md:p-[0.5vw] hover:bg-white">
                    <CircleUserRound size={24} strokeWidth={1} />
                </button>
            </div>

        </div>
    )
}

export default HomeNav
