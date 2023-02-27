import './PrintPage.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { clearGame, loadNonogramByID, selectNonogramRaw } from '../Game/gameSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import Field from '../Game/Field';

const controllerNonogram = new AbortController();
const { signal } = controllerNonogram;

export function PrintPage(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();
    const imageContainer = useRef(null);
    const [imageSrc, setImageSrc] = useState<string>('');
    const nonogramInStore = useAppSelector(selectNonogramRaw);
    const dispatch = useAppDispatch();

    function handlePrintClick(e: React.MouseEvent) {
        const targetButton = e.target as HTMLButtonElement;
        const widthValue = targetButton.innerText;
        const image = imageContainer.current;
        if (image) {
            const printContent = (image as HTMLDivElement).querySelector(
                '.game-field'
            ) as HTMLDivElement;
            if (printContent) {
                html2canvas(printContent).then((canvas) => {
                    document.body.innerHTML = '';
                    // eslint-disable-next-line no-param-reassign
                    if (widthValue === 'Full') canvas.id = 'canvasToPrint100';
                    // eslint-disable-next-line no-param-reassign
                    if (widthValue === 'Half') canvas.id = 'canvasToPrint50';
                    // eslint-disable-next-line no-param-reassign
                    if (widthValue === 'Small') canvas.id = 'canvasToPrint25';
                    document.body.appendChild(canvas);
                    window.print();
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                });
            }
        }
    }

    function handleImageKeyUp(e: React.KeyboardEvent) {
        e.stopPropagation();
        console.log('key pressed');
    }

    function handleImageClick(e: React.MouseEvent) {
        e.stopPropagation();
        console.log('click');
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

    // useEffect(() => {
    //     if (id)
    //         getNonogramMatrixForImage(id).then((data) =>
    //             setImageSrc(getImageFromMatrix(data))
    //         );
    // }, [id]);

    return (
        <div className="container py-3">
            <div className="h4 text-center">Печать изображения</div>
            <div
                className="image-for-print-container"
                ref={imageContainer}
                onKeyUp={handleImageKeyUp}
                role="button"
                onClick={handleImageClick}
                tabIndex={0}
            >
                {nonogramInStore && <Field />}
            </div>
            <div className="text-center">Размер на странице</div>
            <div className="d-flex justify-content-center">
                <div className="btn-group">
                    {' '}
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-outline-primary"
                    >
                        Full
                    </button>
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-outline-primary"
                    >
                        Half
                    </button>
                    <button
                        onClick={handlePrintClick}
                        type="button"
                        className="btn btn-outline-primary"
                    >
                        Small
                    </button>
                </div>
            </div>
        </div>
    );
}
