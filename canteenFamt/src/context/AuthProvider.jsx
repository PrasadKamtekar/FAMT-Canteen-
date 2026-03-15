import { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';

export const AuthContext = createContext();

function AuthProvider(props) {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    // Seed demo users only if they are not already present.
    // This avoids wiping any existing localStorage data.
    setLocalStorage();

    const { customer, staff } = getLocalStorage();
    setuserData({ customer, staff });
  }, [])

  return (
    <AuthContext.Provider value={userData}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
