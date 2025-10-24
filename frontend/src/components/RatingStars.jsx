import { useMemo } from 'react';
import classNames from 'classnames';

const Star = ({ filled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames('text-xl', filled ? 'text-amber-400' : 'text-slate-300')}
  >
    ★
  </button>
);

const RatingStars = ({ value = 0, onChange, readOnly = false }) => {
  const safeValue = Number.isFinite(value) ? value : 0;

  const stars = useMemo(() => {
    const floored = Math.round(safeValue * 2) / 2;
    return Array.from({ length: 5 }, (_, index) => ({
      filled: index + 1 <= floored
    }));
  }, [safeValue]);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star, index) => (
        <Star key={index} filled={star.filled} onClick={readOnly ? undefined : () => onChange?.(index + 1)} />
      ))}
      <span className="ml-2 text-sm text-slate-500">{safeValue.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
