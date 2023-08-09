import { useApisContext } from 'providers/ApisProvider.tsx';

export default function useApi(id: string) {
  const apis = useApisContext();

  return apis[id];
}
