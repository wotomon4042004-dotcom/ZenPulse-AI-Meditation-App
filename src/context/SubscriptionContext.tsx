import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribe = () => {
    // Имитация успешной покупки подписки
    setIsSubscribed(true);
  };

  const unsubscribe = () => {
    setIsSubscribed(false);
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, subscribe, unsubscribe }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
