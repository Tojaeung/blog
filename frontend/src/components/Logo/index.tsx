import { Link } from 'react-router-dom';

import { Typography } from './style';

function Logo() {
  return (
    <Link to='/'>
      <Typography>TOJAEUNG</Typography>
    </Link>
  );
}

export default Logo;
