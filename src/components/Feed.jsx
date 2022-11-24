import { Box, Stack, Typography } from "@mui/material";
import { SideBar, Videos } from "./";

import { useEffect, useState } from "react";
import { fetchFromApi } from "../utils/fetchFromApi";

const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetchFromApi(`/search?part=snippet&q=${selectedCategory}`)
            .then((data) => {
                setVideos(data.items);
            })
            .catch((err) => console.log(err));
    }, [selectedCategory]);

    return (
        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
            <Box sx={{
                height: { xs: "auto", md: "92vh" },
                borderLeft: "1px solid #3d3d3d",
                px: { sx: 0, md: 2 },
            }}>
                <SideBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <Typography
                    className="copyright"
                    variant="body2"
                    sx={{ color: "#fff", mt: 1.5 }}>
                    © 2021  محمد بيومي
                </Typography>
            </Box>
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
                    {selectedCategory}
                </Typography>
                <Videos videos={videos} />
            </Box>
        </Stack>
    )
}

export default Feed