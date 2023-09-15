import { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiDecodeJWT, apiLogout, apiRefreshJWT } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = async (data) => {
    try {
      const response = await apiLogin(data);
      if (response.ok) {
        await verifyToken();
        return true;
      } else {
        const json = await response.json();
        return json.message;
      }
    } catch {
      console.error('Erreur pendant la connexion');
      return false;
    }
  };

  const verifyToken = async () => {
    try {
      const response = await apiDecodeJWT();
      if (response.ok) {
        const decodedData = await response.json();
        setUserData(decodedData);
      } else if (response.status === 401) {
        await refreshToken();
      } else {
        if (userData) {
          setUserData(null);
          await apiLogout();
        }
      }
    } catch {
      console.error("Erreur pendant la vérification de l'authentification");
    }
  };

  const refreshToken = async () => {
    try {
      const response = await apiRefreshJWT();
      if (response.ok) {
        await verifyToken();
      } else {
        console.error("Échec du rafraîchissement du jeton d'accès");
        setUserData(null);
      }
    } catch {
      console.error("Erreur pendant le rafraîchissement du jeton d'accès");
      setUserData(null);
    }
  };

  const logout = async (data) => {
    try {
      const response = await apiLogout(data);
      if (response.ok) {
        await verifyToken();
        return true;
      }
      return false;
    } catch {
      console.error('Erreur pendant la déconnexion');
      return false;
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
