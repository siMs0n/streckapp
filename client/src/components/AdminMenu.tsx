import React from 'react';
import { Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import {
  adminPersonsUrl,
  adminProductsUrl,
  adminPaymentsUrl,
  adminPurchasesUrl,
  adminSettingsUrl,
} from '../routes/paths';

export default function AdminMenu() {
  const location = useLocation();
  const matchPage = (path: string) => {
    return Boolean(matchPath(location.pathname, { path, exact: true }));
  };
  return (
    <VStack alignItems="flex-start">
      <Link
        as={RouterLink}
        to={adminPersonsUrl}
        fontSize="xl"
        textDecoration={matchPage(adminPersonsUrl) ? 'underline' : ''}
      >
        Användare
      </Link>
      <Link
        as={RouterLink}
        to={adminProductsUrl}
        fontSize="xl"
        textDecoration={matchPage(adminProductsUrl) ? 'underline' : ''}
      >
        Produkter
      </Link>
      <Link
        as={RouterLink}
        to={adminPaymentsUrl}
        fontSize="xl"
        textDecoration={matchPage(adminPaymentsUrl) ? 'underline' : ''}
      >
        Betalningar
      </Link>
      <Link
        as={RouterLink}
        to={adminPurchasesUrl}
        fontSize="xl"
        textDecoration={matchPage(adminPurchasesUrl) ? 'underline' : ''}
      >
        Streck
      </Link>
      <Link
        as={RouterLink}
        to={adminSettingsUrl}
        fontSize="xl"
        textDecoration={matchPage(adminSettingsUrl) ? 'underline' : ''}
      >
        Inställningar
      </Link>
    </VStack>
  );
}
