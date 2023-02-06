import { createContext } from 'react';
import { NonogramRaw } from '../../../utils/types';

export const GameStatusContext = createContext(null);

export const NonogramContext = createContext<NonogramRaw | null>(null);
