import { ApiPromise, WsProvider } from '@polkadot/api';
import { NetworkInfo, Props } from 'types.ts';
import { createContext, useContext, useState } from 'react';
import { SUPPORTED_NETWORKS } from 'utils/networks.ts';
import { useEffectOnce } from 'react-use';

interface Api {
  api: ApiPromise;
  apiReady: boolean;
  network: NetworkInfo;
}

export const ApisContext = createContext<Record<string, Api>>({});

export const useApisContext = () => {
  return useContext(ApisContext);
};

const generateProvider = (endPoint: string) => {
  return new WsProvider(endPoint);
};

export default function ApisProvider({ children }: Props) {
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

      ApiPromise.create({ provider }).then((api) => {
        console.log(`${network.name} has connected`);

        setApis((current) => {
          // Because of React.Strict Mode makes two promises per network,
          // So we use this to avoid including networks which already been added
          return { ...current, [network.id]: { api, apiReady: true, network } };
        });
      });
    });
  });

  return <ApisContext.Provider value={apis}>{children}</ApisContext.Provider>;
}
