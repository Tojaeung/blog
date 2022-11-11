import Link from 'next/link';
import React from 'react';
import { Typography } from './style';

function Logo() {
  return (
    <Link href="/">
      <Typography>TOJAEUNG</Typography>
    </Link>
  );
}

export default Logo;
