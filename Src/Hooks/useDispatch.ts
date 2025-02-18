import { useDispatch as defaultUseDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const useDispatch = () => defaultUseDispatch<AppDispatch>();

export default useDispatch;
