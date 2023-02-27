import './PrintPage.scss';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import {
    clearGame,
    loadNonogramByID,
    updateUserGame,
    selectNonogramRaw,
} from '../Game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import Field from '../Game/Field';
import { printNonogram } from '../../utils/helpers';
import { makeInitialSaveGame } from '../Game/gameUtils/helpers';
import { Loading } from '../Loading/Loading';
import { PrintSizes, PrintSizesPercentage } from '../../utils/enums';

const controllerNonogram = new AbortController();
const { signal } = controllerNonogram;

export function PrintPage(): JSX.Element {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const imageContainer = useRef(null);
    const nonogramInStore = useAppSelector(selectNonogramRaw);
    const userGame = makeInitialSaveGame(nonogramInStore);

    function handleClearClick() {
        if (userGame) {
            dispatch(updateUserGame(userGame));
        }
    }

    function handlePrintClick(e: React.MouseEvent) {
        const targetButton = e.target as HTMLButtonElement;
        const widthValue = targetButton.innerText;
        const image = imageContainer.current;
        if (image) {
            const printContent = (image as HTMLDivElement).querySelector(
                '.game-field'
            ) as HTMLDivElement;
            if (printContent) {
                html2canvas(printContent, { scale: 10 }).then((canvas) => {
                    const canvasImageSrc = canvas.toDataURL('image/png');
                    if (widthValue === PrintSizes.FULL)
                        printNonogram(canvasImageSrc, PrintSizesPercentage.FULL);
                    if (widthValue === PrintSizes.HALF)
                        printNonogram(canvasImageSrc, PrintSizesPercentage.HALF);
                    if (widthValue === PrintSizes.SMALL)
                        printNonogram(canvasImageSrc, PrintSizesPercentage.SMALL);
                });
            }
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(clearGame());
            dispatch(loadNonogramByID({ id, signal }));
        }

        return () => {
            dispatch(clearGame());
        };
    }, [dispatch, id]);

    return (
        <div className="py-3">
            <div className="h4 text-center">{t('printImage')}</div>
            <div className="image-for-print-container" ref={imageContainer}>
                {nonogramInStore ? <Field /> : <Loading />}
            </div>
            <div className="text-center my-3">
                <button
                    type="button"
                    onClick={handleClearClick}
                    className="btn btn-primary"
                >
                    {t('clearPrintImage')}
                </button>
            </div>
            <div className="text-center my-2">{t('pageSize')}</div>
            <div className="d-flex justify-content-center">
                <div className="btn-group">
                    {' '}
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-primary"
                    >
                        {t('full')}
                    </button>
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-primary"
                    >
                        {t('half')}
                    </button>
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-primary"
                    >
                        {t('small')}
                    </button>
                </div>
            </div>
        </div>
    );
}
