import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack, // 引入 Stack
  Snackbar, // 引入 Snackbar
  Alert, // 引入 Alert
} from '@mui/material';
import ThumbnailCard from './ThumbnailCard'; // 引入 ThumbnailCard

interface Thumbnail {
  quality: string;
  url: string;
  resolution: string;
}

const YoutubeThumbnailFetcher = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // 控制 Snackbar 開啟/關閉
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar 顯示的訊息

  const getYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleFetchThumbnail = () => {
    const videoId = getYouTubeVideoId(youtubeUrl);
    if (videoId) {
      const newThumbnails: Thumbnail[] = [
        {
          quality: 'Max-Resolution',
          resolution: '1280x720',
          url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        },
        {
          quality: 'Standard-Definition',
          resolution: '640x480',
          url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
        },
        {
          quality: 'High-Quality',
          resolution: '480x360',
          url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        },
      ];
      setThumbnails(newThumbnails);
    } else {
      setSnackbarMessage('無效的 YouTube 網址，請確認後再試一次。');
      setOpenSnackbar(true);
      setThumbnails([]);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4, // 增加間距
        width: '100%',
        alignItems: 'center', // 讓內容置中
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          YouTube 縮圖擷取工具
        </Typography>
        <Typography variant="body1" color="text.secondary">
          貼上影片網址，立即取得高清縮圖
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', maxWidth: '600px', gap: 1 }}>
        <TextField
          label="請貼上 YouTube 影片網址"
          variant="outlined"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleFetchThumbnail}
          disabled={!youtubeUrl}
          sx={{ whiteSpace: 'nowrap' }} // 防止按鈕文字換行
        >
          擷取縮圖
        </Button>
      </Box>

      {thumbnails.length > 0 && (
        <Stack
          direction="column"
          spacing={2} // 間距
          alignItems="center" // 垂直置中
          sx={{ width: '100%' }} // 確保 Stack 佔滿寬度
        >
          {thumbnails.map((thumb) => (
            <ThumbnailCard key={thumb.quality} thumb={thumb} />
          ))}
        </Stack>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default YoutubeThumbnailFetcher;
