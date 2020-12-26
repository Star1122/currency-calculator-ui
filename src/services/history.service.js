import httpService from './http.service';

const getConversions = () => httpService.get('/conversions');

export default {
  getConversions,
};
