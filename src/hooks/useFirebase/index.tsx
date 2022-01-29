import {
  getDocs,
  collection,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from '@firebase/firestore';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {Details, CurrencyToEdit} from '../../interfaces/Currencies';
import {useFirestore} from './useFirestore';

interface CurrencyDetails extends Details {
  name: string;
}

export const useFirebase = () => {
  const [currencies, setCurrencies] = useState<CurrencyDetails[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState<boolean>(true);

  useEffect(() => {
    GetCurrencies();
  }, []);

  const GetCurrencies = async () => {
    setLoadingCurrencies(true);
    setCurrencies([]);
    const {db} = useFirestore();
    const currenciesDB = collection(db, 'currencies');
    const currenciesResponse = await getDocs(currenciesDB);
    const currenciesDoc: CurrencyDetails[] = [];
    currenciesResponse.forEach(currencyDoc => {
      const details = currencyDoc.data() as CurrencyDetails;
      const name = currencyDoc.id;
      currenciesDoc.push({details, name});
    });
    setCurrencies(currenciesDoc);
    setLoadingCurrencies(false);

    onSnapshot(currenciesDB, currencyDoc => {
      console.log(currencyDoc);
    });
  };

  const AddCurrency = async (name: string, amount: string) => {
    const {db} = useFirestore();
    const currenciesDB = collection(db, 'currencies');
    const date: any = moment().format('DDMMYYYY');
    const hour: any = moment().format('HH:mm');

    const currencyRef = doc(currenciesDB, name);
    const newCurrency: CurrencyDetails = {
      [date]: {
        [hour]: {
          amount,
        },
      },
    };

    await setDoc(currencyRef, newCurrency, {merge: true});
  };

  const EditCurrency = async (currency: CurrencyToEdit) => {
    const {date, hour, name, amount} = currency;
    const {db} = useFirestore();
    const currenciesDB = collection(db, 'currencies');
    const currencyRef = doc(currenciesDB, name);
    const newCurrency: CurrencyDetails = {
      [date]: {
        [hour]: {
          amount,
        },
      },
    };
    await setDoc(currencyRef, newCurrency, {merge: true});
  };

  const DeleteCurrency = async (docName: string) => {
    const {db} = useFirestore();
    const currenciesDB = collection(db, 'currencies');
    const currencyRef = doc(currenciesDB, docName);
    await deleteDoc(currencyRef);
  };

  return {
    GetCurrencies,
    currencies,
    loadingCurrencies,
    AddCurrency,
    EditCurrency,
    DeleteCurrency,
  };
};
