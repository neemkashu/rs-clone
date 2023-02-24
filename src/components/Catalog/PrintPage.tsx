import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNonogramMatrixForImage } from '../../api/requests';
import { getImageFromMatrix, printElem } from '../../utils/helpers';

export function PrintPage(): JSX.Element {
    const { id } = useParams();
    const [imageSrc, setImageSrc] = useState<string>('');

    function handlePrintClick(e: React.MouseEvent) {
        const targetButton = e.target as HTMLButtonElement;
        const widthValue = targetButton.innerText;
        printElem(imageSrc, widthValue);
    }

    useEffect(() => {
        if (id)
            getNonogramMatrixForImage(id).then((data) =>
                setImageSrc(getImageFromMatrix(data))
            );
    }, [id]);

    return (
        <div className="container py-3">
            <h5>Печать изображения</h5>
            <div className="w-25">
                <img
                    src={imageSrc}
                    alt="nonogram preview"
                    style={{
                        width: '100%',
                        maxHeight: '100%',
                    }}
                />
            </div>
            <div>Размер на странице</div>
            <div>
                <button onClick={handlePrintClick} type="button">
                    100%
                </button>
                <button onClick={handlePrintClick} type="button">
                    50%
                </button>
                <button onClick={handlePrintClick} type="button">
                    25%
                </button>
            </div>
        </div>
    );
}
