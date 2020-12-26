import httpService from './http.service';

const getDailyRates = () => httpService.get('/rates');

const saveConversion = (data) => httpService.post('/conversions', data);

export default {
  getDailyRates,
  saveConversion,
};
