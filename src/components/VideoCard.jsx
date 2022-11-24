import { CheckCircle } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { demoChannelTitle, demoChannelUrl, demoThumbnailUrl, demoVideoTitle, demoVideoUrl } from '../utils/constants';

const VideoCard = ({ video: { id: { videoId }, snippet } }) => {
    return (
        <Card sx={{
            width: {
                md: "320px", xs: "100%",
                boxShadow: "none", borderRadius: "none",
            }
        }}>
            <Link to={videoId ? `/watch/${videoId}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                    alt={snippet?.title || demoVideoTitle}
                    sx={{ width: 358, height: 180 }}
                />
                <CardContent
                    sx={{ backgroundColor: "#1e1e1e", height: "106px" }}
                >
                    <Link to={videoId ? `/watch/${videoId}` : demoVideoUrl}>
                        <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: "bold" }}>
                            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                        </Typography>
                    </Link>
                    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                        <Typography variant="subtitle2" sx={{ color: "gray", fontWeight: "bold" }}>
                            {snippet?.channelTitle || demoChannelTitle}
                            <CheckCircle sx={{ color: "gray", fontSize: "12px", mr: "5px" }} />
                        </Typography>
                    </Link>
                </CardContent>
            </Link>
        </Card>
    )
}

export default VideoCard