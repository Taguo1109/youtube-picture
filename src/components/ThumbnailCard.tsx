import { FC, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

interface Thumbnail {
  quality: string;
  url: string;
  resolution: string;
}

interface ThumbnailCardProps {
  thumb: Thumbnail;
}

const ThumbnailCard: FC<ThumbnailCardProps> = ({ thumb }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');

  const handleDownload = async () => {
    try {
      const response = await fetch(thumb.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const filename = `${thumb.quality}_${thumb.resolution}.jpg`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setSnackbarMessage('圖片下載成功！');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      console.error('下載圖片失敗:', error);
      setSnackbarMessage('下載圖片失敗，請稍後再試。');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' },
        maxWidth: { xs: '100%', sm: '300px', md: '300px' },
        flexGrow: 1,
      }}
    >
      <Card
        sx={{
          width: '100%',
          height: 'auto',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.05)',
            boxShadow: '5px 5px 20px rgba(0,0,0,0.3)',
          },
        }}
      >
        <CardMedia
          component="img"
          alt={`${thumb.quality} thumbnail`}
          height="150"
          image={thumb.url}
          sx={{
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {thumb.quality}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {thumb.resolution}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            size="small"
            onClick={handleDownload}
          >
            下載圖片
          </Button>
        </CardActions>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ThumbnailCard;
