
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

function signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // AUTH + LOCALSTORAGE (SIGNUP):
  // We keep existing users array from localStorage (or [] if empty),
  // push the new user, and save it back. This way old data is never lost.
  const handleSignup = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = existingUsers.some((u) => u.username === username);
    if (alreadyExists) {
      alert("Username already exists");
      return;
    }

    const updatedUsers = [...existingUsers, { username, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsername("");
    setPassword("");
    navigate("/login");
  };

  return (
    <div className="bg-[#0F6657] w-[90vw] md:w-[23vw] pt-[2vw] rounded-[0.6vw]">
            <h1 className="text-[1.7vw] leading-[2.5vw] mb-[1.2vw] pl-[2.2vw] font-semibold text-[#F8FAFC]">
                Sign up to <br />
                FAMT<span className="text-[#FBA808]">CANTEEN</span>
            </h1>
            <div className="bg-[#F8FAFC] rounded-[0.4vw] flex flex-col gap-4 p-[1.5vw] m-[1.3vw] pt-[2vw]">
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Username</h2>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                <div>
                    <h2 className="text-[1vw] mb-[0.6vw] font-[400] text-gray-500">Password</h2>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="bg-gray-200 w-[100%] p-[0.6vw] text-[0.8vw] rounded-lg outline-none"
                    />
                </div>
                  
                <button 
                onClick={handleSignup}
                className="bg-[#FBA808] p-[0.52vw] rounded-lg text-[1vw] text-[#F8FAFC]">
                    Sign Up
                </button>
                
            </div>
             <div className="mt-[2vw] mb-[1vw] text-center">
                <h1 className="text-[0.85vw] text-[#F8FAFC]">
                    Already have an account?{" "}
                   
                    <span className="font-[600] text-[#FBA808]"><Link to="/login">Sign in</Link></span>
                </h1>
            </div>
     
        </div>
  )
}

export default signup
