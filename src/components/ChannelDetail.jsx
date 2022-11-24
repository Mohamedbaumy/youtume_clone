import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ChannelCard, Videos } from "./";

import { fetchFromApi } from "../utils/fetchFromApi";

const ChannelDetail = () => {
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchFromApi(`/channels?part=snippet&id=${id}`)
            .then(data => {
                console.log(data);
                setChannelDetail(data.items?.[0]);
            });
        fetchFromApi(`/search?part=snippet&channelId=${id}&order=date`)
            .then(data => setVideos(data?.items));
    }, [id]);

    return (
        <Box>
            <div style={{
                background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(9,9,118,1) 100%, rgba(9,9,121,1) 100%)',
                height: "300px",
                zIndex: "10",
            }}>
                <ChannelCard channelDetail={channelDetail} />
                <Videos videos={videos} />

            </div>
        </Box>
    )
}

export default ChannelDetail