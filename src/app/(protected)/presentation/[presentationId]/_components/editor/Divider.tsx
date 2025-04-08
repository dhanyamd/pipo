import { cn } from '@/lib/utils';
import { useSlidesStore } from '@/store/useSlideStore';
import React from 'react';

type Props = {
  className: string;
};

const Divider = ({ className }: Props) => {
  const { currentTheme } = useSlidesStore();
  return (
    <hr
      className={cn('my-4', className)}
      style={{ borderColor: currentTheme.accentColor }}
    />
  );
};

export default Divider