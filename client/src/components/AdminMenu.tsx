import React from 'react';
import { Link, Stack } from '@chakra-ui/react';
import {
  Link as RouterLink,
  matchPath,
  useLocation,
  useParams,
} from 'react-router-dom';
import {
  getAdminPersonsUrl,
  getAdminProductsUrl,
  getAdminPaymentsUrl,
  getAdminPurchasesUrl,
  getAdminSettingsUrl,
  getAdminProductCategoriesUrl,
} from '../routes/paths';

export default function AdminMenu() {
  const { instanceId } = useParams<{ instanceId?: string }>();
  const instanceIdString = instanceId ?? '';
  const location = useLocation();
  const matchPage = (path: string) => {
    return Boolean(matchPath({ path, end: true }, location.pathname));
  };
  return (
    <Stack
      direction={{ base: 'row', md: 'column' }}
      alignItems="flex-start"
      wrap="wrap"
      mb={4}
    >
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
        to={getAdminProductCategoriesUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminProductCategoriesUrl(instanceIdString))
            ? 'underline'
            : ''
        }
      >
        Produktkategorier
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
        to={getAdminSettingsUrl(instanceIdString)}
        fontSize="xl"
        textDecoration={
          matchPage(getAdminSettingsUrl(instanceIdString)) ? 'underline' : ''
        }
      >
        Inställningar
      </Link>
    </Stack>
  );
}
