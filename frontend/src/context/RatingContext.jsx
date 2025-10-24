import React, { createContext, useContext, useMemo, useReducer } from 'react';

const RatingContext = createContext(null);

const initialState = {};

const ratingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RATING': {
      const { ideaId, score } = action.payload;
      return { ...state, [ideaId]: score };
    }
    default:
      return state;
  }
};

export const RatingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ratingReducer, initialState);

  const value = useMemo(
    () => ({
      ratings: state,
      setRating: (ideaId, score) => dispatch({ type: 'SET_RATING', payload: { ideaId, score } })
    }),
    [state]
  );

  return <RatingContext.Provider value={value}>{children}</RatingContext.Provider>;
};

export const useRatingContext = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRatingContext must be used within RatingProvider');
  }
  return context;
};
