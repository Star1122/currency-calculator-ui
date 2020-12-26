import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { getConversions } from 'store/actions/history';
import MaterialTable from 'components/MaterialTable';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  content: {
    minHeight: 'calc(100vh - 60px)',
    padding: theme.spacing(2),
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
      padding: theme.spacing(1),
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
}));

function ConversionHistory() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.history.isLoading);
  const conversions = useSelector((state) => state.history.conversions);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getConversions())
      .catch(() => {
        enqueueSnackbar('Failed to fetch conversion history.', {
          preventDuplicate: true,
          variant: 'error',
        });
      });
  }, [dispatch, enqueueSnackbar]);

  return (
    <Box className={classes.container}>
      {isLoading && <LinearProgress />}

      <Box className={classes.content}>
        <MaterialTable
          columns={['source', 'destination', 'amount', 'calculated_amount', 'date']}
          rows={conversions}
        />
      </Box>
    </Box>
  );
}

export default ConversionHistory;
