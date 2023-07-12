/* eslint-disable @typescript-eslint/no-explicit-any */

import { styled } from '@mui/system';

export const StyledTable = styled('table')`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  
  th {
    font-weight: normal;
    position: sticky;
    top: 0;
    background: white;
  }

  td:not(:first-child) > div:first-child {
    justify-content: center;
  }

  th, td {
    padding: 0.5rem 0.25rem;
    line-height: 1.5;
    text-align: center;
  }

  td:first-child {
    text-align: left;
  }

  tbody tr:nth-child(2n) {
    background: ${({ theme }: any) => theme.palette.athensGray};
  }
`;
