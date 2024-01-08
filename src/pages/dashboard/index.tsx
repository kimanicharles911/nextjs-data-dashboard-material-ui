import { Box, Grid, Paper } from '@mui/material';
import scss from './dashboard.module.scss';
import DataRibbon from '@/components/Dashboard/DataRibbon/DataRibbon';
import TransactionsPerDay from '@/components/Dashboard/TransactionsPerDay/TransactionsPerDay';

const Dashboard = () => {
  return (
    <Box>
      <DataRibbon />
      <TransactionsPerDay />
    </Box>
  )
};

export default Dashboard;