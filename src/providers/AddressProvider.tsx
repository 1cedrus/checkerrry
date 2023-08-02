import { createContext, useContext, useState } from 'react';
import { Props } from 'types.ts';

interface AddressContextProps {
  address: string;
  setAddress: (address: string) => void;
}

export const AddressContext = createContext<AddressContextProps>({
  address: '',
  setAddress: () => {},
});

export const useAddressContext = () => {
  return useContext(AddressContext);
};

export default function AccountProvider({ children }: Props) {
  const [address, setAddress] = useState<string>('');

  return <AddressContext.Provider value={{ address, setAddress }}>{children}</AddressContext.Provider>;
}
