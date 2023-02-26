import { TFunction } from 'i18next';
import { CSSProperties, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Field from '../Game/Field';
import {
    clearGame,
    GUIDE_ID,
    loadNonogramByID,
    selectNonogramRaw,
} from '../Game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GuideNotesOrder } from './constants';
import { GuideRedo } from './GuideRedo';
import { makeGuideSteps } from './guideSteps';
import { GuideUndo } from './GuideUndo';

const controllerNonogram = new AbortController();
const { signal } = controllerNonogram;

const UMBRELLA_HEIGHT = '191px';

const style = {
    height: UMBRELLA_HEIGHT,
};
const styleComment: CSSProperties = {
    minHeight: 'calc(4rem * var(--bs-body-line-height))',
};
const getTranslatedStepByIndex = (
    t: TFunction<'translation', undefined, 'translation'>,
    index: number
) => {
    const JSONkey = `guide${GuideNotesOrder[index]}`;
    return t(JSONkey);
};

export function Guide(): JSX.Element {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const nonogramInStore = useAppSelector(selectNonogramRaw);

    const [commentIndex, setCommentIndex] = useState(0);

    useEffect(() => {
        dispatch(clearGame());
        dispatch(loadNonogramByID({ id: GUIDE_ID, signal }));

        return () => {
            dispatch(clearGame());
        };
    }, [dispatch]);
    useEffect(() => {
        if (nonogramInStore) {
            makeGuideSteps(dispatch);
        }
    }, [nonogramInStore, dispatch]);

    const handleRedo = () => {
        setCommentIndex((previous) => previous + 1);
    };
    const handleUndo = () => {
        setCommentIndex((previous) => previous - 1);
    };

    return (
        <div className="d-flex flex-nowrap flex-column w-100">
            <h1>{t('guideHeader')}</h1>
            <div className="position-relative">
                <p className="fs-5">{t('guideAppeal')}</p>
                <div className="d-flex flex-column gap-2">
                    {nonogramInStore && (
                        <>
                            <div
                                className="position-absolute w-100 z-1"
                                onClickCapture={(event) => event.stopPropagation()}
                                style={style}
                            />
                            <div className="d-flex gap-2 flex-column">
                                <Field />

                                <p style={styleComment}>
                                    {getTranslatedStepByIndex(t, commentIndex)}
                                </p>
                            </div>

                            <div className="btn-group game-controls gap-2">
                                <GuideUndo handleClick={handleUndo} />
                                <GuideRedo handleClick={handleRedo} />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <p className="pt-3">
                {t('guideRedirect')}{' '}
                <a href="https://www.nonograms.ru/methods">{t('guideLink')}</a>.
            </p>
        </div>
    );
}
