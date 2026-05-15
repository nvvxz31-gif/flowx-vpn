import React, { useState } from 'react';
import UserPanelLogin from '../components/userpanel/UserPanelLogin';
import UserPanelLayout from '../components/userpanel/UserPanelLayout';

export default function UserPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <UserPanelLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <UserPanelLayout />;
}