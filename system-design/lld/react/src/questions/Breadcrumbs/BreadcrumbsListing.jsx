import { Link, useLocation } from "react-router-dom";

function BreadcrumbsListing() {
    const location = useLocation();
    const pathNameArray = location?.pathname?.split("/").filter(Boolean);
    let url = "/";

    return (
        <div style={{ display: "flex", gap: "5px" }}>
            <Link to={"/"}>Home</Link>

            {pathNameArray?.map((pathName, index) => {
                const isLastBreadCrumb = index + 1 == pathNameArray.length;
                url += pathName;
                return isLastBreadCrumb ? (
                    <span>{pathName}</span>
                ) : (
                    <Link to={url} key={index}>
                        {pathName}{" "}
                    </Link>
                );
            })}
        </div>
    );
}

export default BreadcrumbsListing;
