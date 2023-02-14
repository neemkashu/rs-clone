import { FormCheckItemPropsType } from '../../../../utils/types';

export function FormCheckItem({ value, name, id, isChecked }: FormCheckItemPropsType) {
    return (
        <div className="form-check">
            <label className="form-check-label" htmlFor={id}>
                {value}
                <input
                    role="button"
                    className="form-check-input"
                    type="radio"
                    name={name}
                    id={id}
                />
            </label>
        </div>
    );
}
