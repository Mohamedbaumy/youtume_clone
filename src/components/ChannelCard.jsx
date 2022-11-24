import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";
const ChannelCard = ({ channelDetail }) => {
    return (
        <Box
            sx={{
                boxShadow: "none",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { md: "320px", xs: "356" },
                margin: "auto",
            }}
        >
            <Link to={channelDetail?.id?.channelId ? `/channel/${channelDetail?.id?.channelId}` : "/channel/UC_x5XG1OV2P6uZZ5FSM9Ttw"}>
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    <CardMedia
                        image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                        alt={channelDetail?.snippet?.title || "Channel Name"}
                        sx={{
                            borderRadius: "50%",
                            height: "180px",
                            width: "180px",
                            mb: "2",
                            border: "1px solid #e3e3e3",
                        }}
                    />
                    <Typography variant="h6">
                        {channelDetail?.snippet?.title || "Channel Name"}
                    </Typography>
                    <CheckCircle sx={{ color: "gray", fontSize: "14px", mr: "5px" }} />
                    {channelDetail?.statistics?.subscriberCount && (
                        <Typography>
                            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} مشترك
                        </Typography>
                    )}
                </CardContent>
            </Link>
        </Box>
    )
}

export default ChannelCard