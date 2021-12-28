import React from 'react';
import { Link, VStack } from '@chakra-ui/react';
import {
  Link as RouterLink,
  matchPath,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  adminSettingsUrl,
  getAdminPersonsUrl,
  getAdminProductsUrl,
  getAdminPaymentsUrl,
  getAdminPurchasesUrl,
} from '../routes/paths';

export default function AdminMenu() {
  const { instanceId } = useParams<{ instanceId?: string }>();
  const instanceIdString = instanceId ?? '';
  const location = useLocation();
  const matchPage = (path: string) => {
    return Boolean(matchPath(location.pathname, { path, exact: true }));
  };
  return (
    <VStack alignItems="flex-start">
      <Link
        as={RouterLink}
        to={getAdminPersonsUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminPersonsUrl(instanceIdString)) ? 'underline' : ''
        }
      >
        Användare
      </Link>
      <Link
        as={RouterLink}
        to={getAdminProductsUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminProductsUrl(instanceIdString)) ? 'underline' : ''
        }
      >
        Produkter
      </Link>
      <Link
        as={RouterLink}
        to={getAdminPaymentsUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminPaymentsUrl(instanceIdString)) ? 'underline' : ''
        }
      >
        Betalningar
      </Link>
      <Link
        as={RouterLink}
        to={getAdminPurchasesUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminPurchasesUrl(instanceIdString)) ? 'underline' : ''
        }
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
