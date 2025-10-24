import { twMerge } from 'tailwind-merge';
import clsx from 'classnames';

const cn = (...inputs) => twMerge(clsx(inputs));

export default cn;
