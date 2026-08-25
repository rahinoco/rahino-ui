import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type QippoAvatarType = 'initials' | 'image' | 'icon';

export interface QippoAvatarProps {
  size?: QippoAvatarSize;
  type?: QippoAvatarType;
  initials?: string;
  src?: string;
  alt?: string;
  icon?: ReactNode;
  status?: boolean;
  className?: string;
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 19c1.5-3 4-4.5 6.5-4.5S17 16 18.5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Qippo Avatar — Figma Ui Kit / Other-Component / Avatar (2066:1223).
 * Qipper PersianAvatar is product chrome, not extracted — lab shows gap.
 * NOT Rahino canonical.
 */
export function QippoAvatar({
  size = 'md',
  type = 'initials',
  initials = 'م',
  src,
  alt = '',
  icon,
  status = false,
  className,
}: QippoAvatarProps) {
  return (
    <span className={cn('qippo inline-flex', className)}>
      <span className="qippo-avatar" data-size={size} data-type={type}>
        {type === 'image' && src ? (
          <img className="qippo-avatar__img" src={src} alt={alt} />
        ) : null}
        {type === 'initials' ? <span className="qippo-avatar__initials">{initials}</span> : null}
        {type === 'icon' ? <span className="qippo-avatar__icon">{icon ?? <UserIcon />}</span> : null}
        {status ? <span className="qippo-avatar__status" aria-hidden /> : null}
      </span>
    </span>
  );
}
