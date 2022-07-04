import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as jobActionCreator from  "../store/actions/jobActionCreator";

export const useJobAction = () => {
    const dispatch = useDispatch();

return useMemo(() => {
    return bindActionCreators(jobActionCreator, dispatch);    
}, [dispatch]);
};

