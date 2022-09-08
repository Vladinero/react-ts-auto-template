import {useDispatch} from 'react-redux';
import {githubActions} from '../store/slices/project.slice';
import {bindActionCreators} from '@reduxjs/toolkit';

export const useActions = () => {
  const dispatch = useDispatch();
const actions = {
  ...githubActions
};

  return bindActionCreators(actions, dispatch)
};
