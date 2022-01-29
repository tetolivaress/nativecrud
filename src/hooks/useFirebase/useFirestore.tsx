import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

export const useFirestore = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {app, db};
};
