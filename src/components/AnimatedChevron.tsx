import { clsx } from 'clsx';
import { motion, type Transition } from 'framer-motion';
import { Icon } from 'lucide-react';
import { ICONOGRAPHY } from '../foundations/canonical/Icons';
import { DURATION, EASING } from '../foundations/canonical/Motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export interface AnimatedChevronProps {
  expanded: boolean;
  size?: keyof typeof ICONOGRAPHY.size;
  className?: string;
}

// Lucide ChevronDown and ChevronUp with matching path commands and point order.
const DOWN = 'M 6 9 L 12 15 L 18 9';
const UP = 'M 6 15 L 12 9 L 18 15';
const [x1, y1, x2, y2] = EASING.standard.slice('cubic-bezier('.length, -1).split(',').map(Number);
const transition: Transition = {
  type: 'tween',
  duration: parseFloat(DURATION.feedback) / 1000,
  ease: [x1, y1, x2, y2],
};

function AnimatedChevron({ expanded, size = 'md', className, horizontal }: AnimatedChevronProps & { horizontal?: boolean }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const path = expanded ? UP : DOWN;

  return (
    <Icon
      iconNode={[]}
      size={ICONOGRAPHY.size[size]}
      strokeWidth={ICONOGRAPHY.stroke.width}
      className={clsx('rds-chevron', horizontal && 'rds-chevron--horizontal', className)}
      aria-hidden="true"
      focusable="false"
    >
      {reducedMotion ? <path key="static" d={path} /> : (
        <motion.path key="animated" initial={false} animate={{ d: path }} transition={transition} />
      )}
    </Icon>
  );
}

/** Down when collapsed and up when expanded. The parent owns the disclosure state. */
export function VerticalAnimatedChevron(props: AnimatedChevronProps) {
  return <AnimatedChevron {...props} />;
}

/** Points toward inline-end when collapsed and inline-start when expanded. */
export function HorizontalAnimatedChevron(props: AnimatedChevronProps) {
  return <AnimatedChevron {...props} horizontal />;
}
