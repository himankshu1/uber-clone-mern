import { createContext, ReactNode, useState } from "react";

export const UserDataContext = createContext({});

export default function UserContext({ children }: { children: ReactNode }) {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
    });
    return (
        <div>
            <UserDataContext.Provider value={[user, setUser]}>
                {children}
            </UserDataContext.Provider>
        </div>
    );
}
