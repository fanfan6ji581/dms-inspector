import { Box } from '@mui/material';

import IdnFlag from '../assets/img/idn.png';
import IndFlag from '../assets/img/ind.png';
import MysFlag from '../assets/img/mys.png';

const CountryFlag = ({ countryCode, width = 20 }) => {
  const flagImgMap = {
    MY: MysFlag,
    IN: IndFlag,
    ID: IdnFlag,
  };

  return <Box component="img" src={flagImgMap[countryCode.toUpperCase()]} alt={countryCode} sx={{ width: width }} />;
};

export default CountryFlag;
