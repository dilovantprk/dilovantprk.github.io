'use client';

import React from 'react';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export const ActivityView: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
      <ActivityFeed />
    </div>
  );
};
