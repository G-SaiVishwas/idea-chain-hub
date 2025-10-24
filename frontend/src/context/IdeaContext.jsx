import React, { createContext, useContext, useMemo, useState } from 'react';

const IdeaContext = createContext(null);

export const IdeaProvider = ({ children }) => {
  const [filters, setFilters] = useState({ stage: 'all', sort: 'latest', tags: [] });
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      selectedIdeaId,
      setSelectedIdeaId
    }),
    [filters, selectedIdeaId]
  );

  return <IdeaContext.Provider value={value}>{children}</IdeaContext.Provider>;
};

export const useIdeaContext = () => {
  const context = useContext(IdeaContext);
  if (!context) {
    throw new Error('useIdeaContext must be used within IdeaProvider');
  }
  return context;
};
