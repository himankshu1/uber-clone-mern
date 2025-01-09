import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

type UserType = {
    fullName: string;
    email: string;
};

type UserContextType = {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
};

export const UserDataContext = createContext<UserContextType>({
    user: { fullName: "", email: "" },
    setUser: () => {},
});

export default function UserContext({ children }: { children: ReactNode }) {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
    });
    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    );
}
