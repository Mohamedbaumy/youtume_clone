import { Box, Typography } from "@mui/material";
import { Videos } from "./";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";

const SearchVideo = () => {
    const [videos, setVideos] = useState([]);
    const { searchTerm } = useParams();
    useEffect(() => {
        fetchFromApi(`/search?part=snippet&q=${searchTerm}`)
            .then((data) => {
                setVideos(data.items);
            })
            .catch((err) => console.log(err));
    }, [searchTerm]);

    return (
        <Box m={2} sx={{
            overflowY: "auto",
            height: { xs: "auto", md: "90vh" },
        }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                mb={2}
                sx={{ color: "#FFF" }}
            >
                <span
                    style={{
                        color: "#FC1503",
                        marginTop: "25px",
                    }}> المرئيات </span>
                : نتائج البحث
            </Typography>
            <Videos videos={videos} />
        </Box>
    )
}

export default SearchVideo