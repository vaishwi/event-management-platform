import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Box,
  Card,
  CardMedia,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import MyEventsComponent from './myEventComponent.jsx'
export default function RegisteredEvents() {

  return (
      <Box
        justifyContent="center"
        alignItems="center"
      >
        <MyEventsComponent />
      </Box>
  );
}
