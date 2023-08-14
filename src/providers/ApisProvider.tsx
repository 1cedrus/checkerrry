import { ApiPromise, WsProvider } from '@polkadot/api';
import { NetworkInfo, Props } from 'types.ts';
import { createContext, useContext, useState } from 'react';
import { SUPPORTED_NETWORKS } from 'utils/networks.ts';
import { useEffectOnce } from 'react-use';
import { useToast } from '@chakra-ui/react';
import LoadingToast from 'components/shared/LoadingToast.tsx';

const UNFOUND_API = {
  apiReady: false,
  network: {},
} as Api;

const DEFAULT_NETWORK_PROVIDER = Object.values(SUPPORTED_NETWORKS).find((one) => one.id === 'polkadot')?.provider;

interface Api {
  api?: ApiPromise;
  apiReady: boolean;
  network: NetworkInfo;
}

interface ApisContext {
  apis: Record<string, Api>;
  apiSelected: Api;
  selectApi: (provider: string) => void;
}

// Skipping define default context value
export const ApisContext = createContext<ApisContext>({} as ApisContext);

export const useApisContext = () => {
  return useContext(ApisContext);
};

const generateProvider = (endPoint: string) => {
  return new WsProvider(endPoint);
};

export default function ApisProvider({ children }: Props) {
  const toast = useToast();
  const [apiProvider, setApiProvider] = useState<string | undefined>(DEFAULT_NETWORK_PROVIDER);

  const [apis, setApis] = useState<Record<string, Api>>(
    Object.values(SUPPORTED_NETWORKS).reduce(
      (currentValue, network) => ({
        ...currentValue,
        [network.id]: { apiReady: false, network },
      }),
      {},
    ),
  );

  useEffectOnce(() => {
    Object.values(SUPPORTED_NETWORKS).forEach((network) => {
      const provider = generateProvider(network.provider);

      const toastId = toast({
        position: 'bottom-left',
        status: 'loading',
        render: () => <LoadingToast children={`Connecting to ${network.id}`} />,
        duration: null,
      });
      ApiPromise.create({ provider }).then((api) => {
        if (toastId) {
          toast.update(toastId, {
            status: 'success',
            render: () => <LoadingToast done children={`Connected to ${network.id}`} />,
            duration: 1000,
          });
        }

        setApis((current) => {
          return { ...current, [network.id]: { api, apiReady: true, network } };
        });
      });
    });
  });

  const api = Object.values(apis).find((one) => one.network.provider === apiProvider) || UNFOUND_API;

  return (
    <ApisContext.Provider value={{ apis, apiSelected: api, selectApi: setApiProvider }}>
      {children}
    </ApisContext.Provider>
  );
}
