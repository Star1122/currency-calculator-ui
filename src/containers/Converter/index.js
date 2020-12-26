import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useSnackbar } from 'notistack';

import { getDailyRates, saveConversion } from 'store/actions/converter';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  content: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
  formControl: {
    minWidth: 140,
    margin: theme.spacing(1),
  },
  inputControl: {
    minWidth: 296,
    margin: theme.spacing(1),
  },
  button: {
    width: 296,
    height: 56,
    margin: theme.spacing(1),
    fontSize: 16,
    textTransform: 'none',
  },
}));

function Converter() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.converter.isLoading);
  const isSaving = useSelector((state) => state.converter.isSaving);
  const rates = useSelector((state) => state.converter.rates);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getDailyRates())
      .catch(() => {
        enqueueSnackbar('Failed to fetch currency rates.', {
          preventDuplicate: true,
          variant: 'error',
        });
      });
  }, [dispatch, enqueueSnackbar]);

  const [values, setValues] = useState({
    source: '',
    destination: '',
    amount: 0,
    calculatedAmount: 0,
  });

  const handleChange = (field) => (event) => {
    const amount = parseFloat(field === 'amount' ? event.target.value : values.amount);
    const source = field === 'source' ? event.target.value : values.source;
    const destination = field === 'destination' ? event.target.value : values.destination;

    setValues({
      ...values,
      [field]: event.target.value,
      calculatedAmount: (amount && source && destination)
        ? ((amount / rates[source]) * rates[destination])
        : 0,
    });
  };

  const handleSave = () => {
    dispatch(saveConversion({
      ...values,
      amount: values.amount.toString(),
      rate: (rates[values.destination] / rates[values.source]).toString(),
    }))
      .catch(() => {
        enqueueSnackbar('Failed to save conversion.', {
          preventDuplicate: true,
          variant: 'error',
        });
      });
  };

  const currencies = Object.keys(rates).sort();

  return (
    <Box className={classes.container}>
      {isLoading && <LinearProgress />}

      <Box className={classes.content}>
        <Box>
          <FormControl className={classes.inputControl} variant="outlined">
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              labelWidth={60}
              type="number"
              value={values.amount}
              onChange={handleChange('amount')}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-source-label">Source</InputLabel>
            <Select
              id="select-source"
              label="Source"
              labelId="select-source-label"
              value={values.source}
              onChange={handleChange('source')}
            >
              {currencies.map((currency) => (
                <MenuItem value={currency} key={currency}>{currency}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-destination-label">Destination</InputLabel>
            <Select
              id="select-destination"
              label="Destination"
              labelId="select-destination-label"
              value={values.destination}
              onChange={handleChange('destination')}
            >
              {currencies.map((currency) => (
                <MenuItem value={currency} key={currency}>{currency}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <TextField
            id="calculated-amount"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            className={classes.inputControl}
            value={values.calculatedAmount}
          />
        </Box>

        <Box>
          <Button
            color="primary"
            size="large"
            variant="contained"
            className={classes.button}
            startIcon={isSaving ? <CircularProgress color="inherit" size={18} /> : <SaveIcon />}
            disabled={isSaving || !(values.amount && values.source && values.destination)}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Converter;
