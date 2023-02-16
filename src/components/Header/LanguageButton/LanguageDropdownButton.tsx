import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecificLanguageButton } from './SpecificLanguageButton';
import EnglishFlag from '../../../svg/EnglishFlag';
import GermanFlag from '../../../svg/GermanFlag';
import RussianFlag from '../../../svg/RussianFlag';
import { LanguagesEnum, LanguagesShortNamesEnum } from '../../../utils/enums';
import { getInitialLanguage } from '../../../utils/helpers';

export function LanguageDropDownButton(): JSX.Element {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState<string>(getInitialLanguage());

    function handleLanguageSwitch(value: LanguagesShortNamesEnum) {
        setSelectedLang(value);
        i18n.changeLanguage(value);
        localStorage.setItem('lang', value);
    }

    const isEnLangSelected = selectedLang === LanguagesShortNamesEnum.EN_VALUE;
    const isDeLangSelected = selectedLang === LanguagesShortNamesEnum.DE_VALUE;
    const isRuLangSelected = selectedLang === LanguagesShortNamesEnum.RU_VALUE;

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
                {isDeLangSelected && <GermanFlag />}
                {isRuLangSelected && <RussianFlag />}
                {isEnLangSelected && <EnglishFlag />}
            </button>
            <div
                id="dropdownMenuLang"
                className="dropdown-menu"
                aria-labelledby="dropdownLangButton"
            >
                <SpecificLanguageButton
                    handleLang={() =>
                        handleLanguageSwitch(LanguagesShortNamesEnum.EN_VALUE)
                    }
                    id={LanguagesEnum.EN}
                    svg={<EnglishFlag />}
                    active={isEnLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() =>
                        handleLanguageSwitch(LanguagesShortNamesEnum.RU_VALUE)
                    }
                    id={LanguagesEnum.RU}
                    svg={<RussianFlag />}
                    active={isRuLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() =>
                        handleLanguageSwitch(LanguagesShortNamesEnum.DE_VALUE)
                    }
                    id={LanguagesEnum.DE}
                    svg={<GermanFlag />}
                    active={isDeLangSelected ? 'active' : ''}
                />
            </div>
        </div>
    );
}
