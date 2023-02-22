import { SettingsCategoryItemPropsType } from '../../../utils/types';

export function SettingsCategoryItem({
    name,
    id,
    active,
    handleSettingsCategorySelect,
}: SettingsCategoryItemPropsType) {
    return (
        <label className={`btn btn-primary ${active}`} htmlFor={id}>
            {name}
            <input
                type="radio"
                className="btn-check"
                name="settings"
                id={id}
                autoComplete="off"
                onClick={handleSettingsCategorySelect}
            />
        </label>
    );
}
