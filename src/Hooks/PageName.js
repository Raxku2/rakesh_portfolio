import { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";


function PageName(location) {
    const {Name} = useContext(DataContext)
    useEffect(() => {
        // Define a mapping between routes and titles
        const titles = {
            "/": `About -  ${Name.split(" ")[0]}`,
            "/contact": `Contact - ${Name.split(" ")[0]} `,
            "/projects": `Projects -  ${Name.split(" ")[0]}`,
            // Add other routes and titles here
        };

        // Set the document title based on the current route
        const pageTitle = titles[location.pathname] || "My App";
        document.title = pageTitle;
    }, [location]);
}

export default PageName