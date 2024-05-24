// import { useLocation, useNavigate } from "react-router-dom";
// import { decodeJwt } from "../middelwares";

// export default function Protectedroutes({ children }){
//     const location = useLocation();
//     const navigate = useNavigate();
    
//     const currentPath = location.pathname.split("/")[1];
//     console.log("current path in the protected route is", currentPath)
//     console.log("Condiiton is", token!==null && decoded.isAdmin === true && decoded.isUser === false)
//     const token = localStorage.getItem("dietToken");
//     console.log("token inside protectedroute is", token);
//     const decoded = decodeJwt(token);
//     console.log("decoded jwt in the protected route is", decoded);

//     switch(currentPath){
//         case "dashboard":
//             return (token!==null && decoded.isAdmin === true && decoded.isUser === false) ? children : navigate("/auth/login");

//         case "fitness":
//             return (token!==null && decoded.isAdmin === false && decoded.isUser === true) ? children : navigate("/");
//         default:
//             navigate("/")
//             return ; 
//     }
// }



import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { decodeJwt } from "../middelwares"; // Assuming 'middlewares' is correctly named

export default function Protectedroutes({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("dietToken");
    const decoded = token ? decodeJwt(token) : null;

    const currentPath = location.pathname.split("/")[1];
    console.log("current path in the protected route is", currentPath);
    console.log("Condition is", token !== null && decoded?.isAdmin === true && decoded?.isUser === false);
    console.log("token inside protectedroute is", token);
    console.log("decoded jwt in the protected route is", decoded);

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        } else if (currentPath === "dashboard" && !(decoded?.isAdmin === true && decoded?.isUser === false)) {
            return children;
        } else if (currentPath === "fitness" && !(decoded?.isAdmin === false && decoded?.isUser === true)) {
            return navigate("/");
        }
    }, [token, decoded, currentPath, navigate]);

    // if (!token || (currentPath === "dashboard" && !(decoded?.isAdmin === true && decoded?.isUser === false)) ||
    //     (currentPath === "fitness" && !(decoded?.isAdmin === false && decoded?.isUser === true))) {
    //     return null; // Render nothing while redirecting
    // }

    return children;
}
