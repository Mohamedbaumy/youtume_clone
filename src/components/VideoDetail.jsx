import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetchFromApi } from "../utils/fetchFromApi";
import { Videos } from "./";

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState({});
    const [relatedVideos, setRelatedVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchFromApi(`/videos?part=snippet&id=${id}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
            })
            .catch((err) => console.log(err));
        fetchFromApi(`/search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then((data) => {
                setRelatedVideos(data.items);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!videoDetail?.snippet) return 'جاري التحميل...';

    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            className="react-player"
                            controls
                        />
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            mt={2}
                            sx={{ color: "#FFF" }}
                        >
                            {videoDetail.snippet?.title}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ color: "#FFF" }}
                            py={1}
                            px={2}
                        >
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={{ sm: 'subtitle1', md: "h6" }}
                                    color="#fff"
                                >
                                    {channelTitle}
                                    <CheckCircle
                                        sx={{ color: "gray", fontSize: "12ox", fontWeight: "bold" }}
                                    />
                                </Typography>
                            </Link>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography variant="body1" sx={{ opicity: 0.7 }}>
                                    {parseInt(viewCount).toLocaleString()} مشاهدات
                                </Typography>
                                <Typography variant="body1" sx={{ opicity: 0.7 }}>
                                    {parseInt(likeCount).toLocaleString()} إعجاب
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
            <Box
                bx={2} py={{ xs: 1, md: 5 }} justifyContent="center"
                alignItems="center"
            >
                <Videos videos={relatedVideos} />
            </Box>
        </Box>

    )
}

export default VideoDetail