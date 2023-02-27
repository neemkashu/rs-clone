import { createContext, useState } from 'react';
import { GameStatus, NonogramRaw } from '../gameUtils/types';

export const NonogramContext = createContext<NonogramRaw | null>(null);

interface GameStatusContextType {
    state: GameStatus | null;
    // eslint-disable-next-line no-undef
    setState?: React.Dispatch<React.SetStateAction<GameStatus | null>>;
}

const defaultState = {
    state: null,
};

export const GameStatusContext = createContext<GameStatusContextType>(defaultState);
