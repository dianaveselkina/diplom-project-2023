import React from 'react';
import Box from '@mui/material/Box';
import { Link, Typography } from '@mui/material';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7ff2d2',
        marginBottom: 0,
        /* zIndex: '2', */
      }}
    >
      <Typography
        noWrap={true}
        sx={{ fontSize: '18px', color: '#0766be', marginRight: '350px' }}
      >
        Authors: Di & Lou
      </Typography>
      <Typography
        noWrap={true}
        sx={{ fontSize: '18px', color: '#0766be', marginRight: '350px' }}
      >
        Ⓒ{new Date().getFullYear()}
      </Typography>
      <Link
        href="Lel.: 8 888-999-99-99"
        sx={{
          padding: '10px',
          opacity: 0.9,
          '&:hover': {
            opacity: [1, 0.9, 1],
          },
        }}
      >
        <AddIcCallIcon />
      </Link>

      <Link
        href="https://t.me/Diana"
        sx={{
          padding: '10px',
          opacity: 0.9,
          '&:hover': {
            opacity: [2, 0.9, 1],
          },
        }}
      >
        <TelegramIcon />
      </Link>

      <Link
        href="mailto:lou8bus@gmail.com&subject=Сайт посты"
        sx={{
          padding: '10px',
          opacity: 0.9,
          '&:hover': {
            opacity: [1, 0.9, 1],
          },
        }}
      >
        <AlternateEmailIcon />
      </Link>

      <Link
        href="https://github.com/8Lou/posts_2023"
        sx={{
          padding: '10px',
          opacity: 0.9,
          '&:hover': {
            opacity: [1, 0.9, 1],
          },
        }}
      >
        <GitHubIcon />
      </Link>
    </Box>
  );
};
