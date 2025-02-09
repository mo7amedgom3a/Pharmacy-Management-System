"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingComponent() {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeout(true);
      window.location.href = '/login';
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    </div>
  );
}