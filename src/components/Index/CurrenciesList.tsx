import React from 'react';
import Currency from './Currency';
import {useFirebase} from '../../hooks/useFirebase';
import {StyledText, Average, AverageText, StyledBoldText} from '../Theme';
import {ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import {getLastKey} from '../../utils/objects';

const CurrenciesList = () => {
  const {currencies, GetCurrencies, loadingCurrencies} = useFirebase();
  const lastCurrencyValues = currencies.map(({details}) => {
    const lastDate = Number(getLastKey(details));
    const lastHour = getLastKey(details[lastDate]);
    const lastValue = details[lastDate][lastHour];
    return Number(lastValue.amount);
  });

  const currencyTotal = lastCurrencyValues.reduce(
    (acc, current) => acc + current,
    0,
  );
  const average = currencyTotal / currencies.length;

  const emptyOrLoading = loadingCurrencies ? (
    <ActivityIndicator />
  ) : (
    <StyledText>NO HAY MONEDAS</StyledText>
  );

  return (
    <ScrollView>
      {currencies.length ? (
        <>
          <Average>
            <StyledBoldText>Average:</StyledBoldText>
            <AverageText>{average}</AverageText>
          </Average>
          {currencies.map(currency => (
            <>
              <Currency
                currency={currency.details}
                key={currency.name}
                name={currency.name}
              />
            </>
          ))}
        </>
      ) : emptyOrLoading}
      <RefreshControl
        onRefresh={GetCurrencies}
        refreshing={loadingCurrencies}
      />
    </ScrollView>
  );
};

export default CurrenciesList;
