import { Box, Grid } from '@mui/material';
import scss from './dashboard.module.scss';
import DataRibbon from '@/components/Dashboard/DataRibbon/DataRibbon';
import TransactionsPerDay from '@/components/Dashboard/TransactionsPerDay/TransactionsPerDay';
import TransactionsBottomRow from '@/components/Dashboard/TransactionsBottomRow/TransactionsBottomRow';

const Dashboard = () => {
  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
        <TransactionsPerDay />
      </Grid>
      <TransactionsBottomRow/>
    </Box>
  )
};

export default Dashboard;