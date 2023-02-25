import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RedoButton } from '../Game/controlButtons/RedoButton';
import { UndoButton } from '../Game/controlButtons/UndoButton';
import Field from '../Game/Field';
import {
    clearGame,
    GUIDE_ID,
    loadNonogramByID,
    selectNonogramRaw,
} from '../Game/gameSlice';
import { UMRELLA } from '../Game/gameUtils/mochas';
import { NonogramRaw } from '../Game/gameUtils/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { makeGuideSteps } from './guideSteps';

const controllerNonogram = new AbortController();
const { signal } = controllerNonogram;

const UmbrellaHeight = '191px';

const style = {
    height: UmbrellaHeight,
};
export function Guide(): JSX.Element {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const nonogramInStore = useAppSelector(selectNonogramRaw);

    console.log('too mush guide rerender!');
    useEffect(() => {
        dispatch(loadNonogramByID({ id: GUIDE_ID, signal }));

        return () => {
            dispatch(clearGame());
        };
    }, []);
    useEffect(() => {
        if (nonogramInStore) {
            makeGuideSteps(dispatch);
        }
    }, [nonogramInStore]);

    return (
        <div className="d-flex flex-nowrap flex-column">
            <h1>How to solve a nonogram?</h1>
            <div className="position-relative">
                <div className="p-0 mb-2 p-sm-1 d-flex flex-column gap-2">
                    {nonogramInStore && (
                        <>
                            <div
                                className="position-absolute w-100 z-1"
                                onClickCapture={(event) => event.stopPropagation()}
                                style={style}
                            >
                                Solution Process Demo
                            </div>
                            <Field />

                            <div className="btn-group game-controls">
                                <UndoButton caption={`${t('gameUndo')} ↪`} />
                                <RedoButton caption={`${t('gameRedo')} ↩`} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
