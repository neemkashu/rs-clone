import React, { useState } from 'react';
import { SpecificLanguageButton } from './SpecificLanguageButton';
import EnglishFlag from '../../../svg/EnglishFlag';
import GermanFlag from '../../../svg/GermanFlag';
import RussianFlag from '../../../svg/RussianFlag';
import { LanguagesEnum } from '../../../utils/types';

export function LanguageDropDownButton(): JSX.Element {
    const [selectedLang, setSelectedLang] = useState<LanguagesEnum>(LanguagesEnum.RU);

    function handleLanguageSwitch(id: LanguagesEnum) {
        setSelectedLang(id);
    }

    const isEnLangSelected = selectedLang === LanguagesEnum.EN;
    const isDeLangSelected = selectedLang === LanguagesEnum.DE;
    const isRuLangSelected = selectedLang === LanguagesEnum.RU;

    return (
        <div className="dropdown d-flex align-items-center">
            <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="dropdownLangButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {isEnLangSelected ? <EnglishFlag /> : ''}
                {isDeLangSelected ? <GermanFlag /> : ''}
                {isRuLangSelected ? <RussianFlag /> : ''}
            </button>
            <div
                id="dropdownMenuLang"
                className="dropdown-menu"
                aria-labelledby="dropdownLangButton"
            >
                <SpecificLanguageButton
                    handleLang={() => handleLanguageSwitch(LanguagesEnum.EN)}
                    id={LanguagesEnum.EN}
                    svg={<EnglishFlag />}
                    active={isEnLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() => handleLanguageSwitch(LanguagesEnum.RU)}
                    id={LanguagesEnum.RU}
                    svg={<RussianFlag />}
                    active={isRuLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() => handleLanguageSwitch(LanguagesEnum.DE)}
                    id={LanguagesEnum.DE}
                    svg={<GermanFlag />}
                    active={isDeLangSelected ? 'active' : ''}
                />
            </div>
        </div>
    );
}
