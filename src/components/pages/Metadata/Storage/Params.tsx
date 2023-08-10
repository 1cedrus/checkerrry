import { useState } from 'react';
import { ParamsType } from 'types.ts';
import useApi from 'hooks/useApi.ts';
import { TypeDef, TypeDefInfo } from '@polkadot/types/types';
import { Flex, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import Button from 'components/shared/Button.tsx';
import { useToggle } from 'react-use';
import TextBox from 'components/shared/TextBox.tsx';

interface ParamInputProps {
  params: ParamsType;
  section: string;
  method: string;
}

interface StateVal {
  type: string;
  name: string;
  isOption: boolean;
  value: string;
}

export default function Params({ params, section, method }: ParamInputProps) {
  const { api } = useApi('polkadot');
  const [tryNow, setTryNow] = useToggle(false);
  const [value, setValue] = useState<string>('');

  const [paramValue, setParamValue] = useState<StateVal[]>(() => {
    const tmp = params.map((one) => {
      const type = one.type;

      if (type.withOptionActive === true) {
        if ((type.sub as TypeDef).info === TypeDefInfo.Tuple) {
          return ((type.sub as TypeDef).sub as TypeDef[]).map(
            (inner) =>
              ({
                type: inner.type,
                name: inner.name,
                isOption: true,
                value: '',
              }) as StateVal,
          );
        } else {
          const innerSub = type.sub as TypeDef;
          return { type: innerSub.type, name: innerSub.name, isOption: true, value: '' } as StateVal;
        }
      } else {
        const innerSub = type as TypeDef;
        return { type: innerSub.type, name: innerSub.name, isOption: true, value: '' } as StateVal;
      }
    });

    return tmp.flat();
  });

  const onChangeParamsValue = (newValue: string, index: number) => {
    setParamValue((prevState) => {
      const tmp = [...prevState];
      tmp[index].value = newValue;
      return tmp;
    });
  };

  // TODO: Need to research about `multi` method more
  const onRun = async () => {
    const value = await api.query[section][method].multi(paramValue.map((one) => one.value));
    setValue(
      JSON.stringify(
        value.map((one) => one.toHuman()),
        null,
        2,
      ),
    );
  };

  const onRemove = () => {
    setValue('');
  };

  return (
    <Flex flexDirection='column' gap='0.25rem'>
      <Text>Parameter: {paramValue.map(({ type }) => type).join(',')}</Text>
      <Flex gap='0.5rem'>
        <Button
          onClick={() => {
            setTryNow();
            onRemove();
          }}>
          {tryNow ? 'Close' : 'Try now'}
        </Button>
        {tryNow && (
          <>
            <Button onClick={onRun}>Run</Button>
            <Button onClick={onRemove}>Remove</Button>
          </>
        )}
      </Flex>
      {tryNow && (
        <>
          {paramValue.map(({ type, isOption, value }, index) => (
            <InputGroup key={index}>
              <InputLeftAddon
                borderRadius='none'
                height='2rem'
                boxShadow='2px 2px gray'
                border='solid 1px gray'
                children={isOption ? `Option<${type}>` : type}
              />
              <Input
                borderRadius='none'
                height='2rem'
                boxShadow='2px 2px gray'
                border='solid 1px gray'
                value={value}
                onChange={(e) => onChangeParamsValue(e.currentTarget.value, index)}
              />
            </InputGroup>
          ))}
          {value && (
            <TextBox
              props={{
                width: '100%',
                maxHeight: '30rem',
                overflow: 'scroll',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <pre>{value}</pre>
            </TextBox>
          )}
        </>
      )}
    </Flex>
  );
}
