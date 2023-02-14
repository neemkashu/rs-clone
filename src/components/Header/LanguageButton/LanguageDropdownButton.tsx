import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SpecificLanguageButton } from './SpecificLanguageButton';
import EnglishFlag from '../../../svg/EnglishFlag';
import GermanFlag from '../../../svg/GermanFlag';
import RussianFlag from '../../../svg/RussianFlag';
import { LanguagesEnum, LanguagesShortNamesEnum } from '../../../utils/enums';

export function LanguageDropDownButton(): JSX.Element {
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState<LanguagesEnum>(LanguagesEnum.EN);

    function handleLanguageSwitch(id: LanguagesEnum, value: LanguagesShortNamesEnum) {
        setSelectedLang(id);
        i18n.changeLanguage(value);
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
                        handleLanguageSwitch(
                            LanguagesEnum.EN,
                            LanguagesShortNamesEnum.EN_VALUE
                        )
                    }
                    id={LanguagesEnum.EN}
                    svg={<EnglishFlag />}
                    active={isEnLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() =>
                        handleLanguageSwitch(
                            LanguagesEnum.RU,
                            LanguagesShortNamesEnum.RU_VALUE
                        )
                    }
                    id={LanguagesEnum.RU}
                    svg={<RussianFlag />}
                    active={isRuLangSelected ? 'active' : ''}
                />
                <SpecificLanguageButton
                    handleLang={() =>
                        handleLanguageSwitch(
                            LanguagesEnum.DE,
                            LanguagesShortNamesEnum.DE_VALUE
                        )
                    }
                    id={LanguagesEnum.DE}
                    svg={<GermanFlag />}
                    active={isDeLangSelected ? 'active' : ''}
                />
            </div>
        </div>
    );
}
