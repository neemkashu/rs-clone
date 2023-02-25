import { CSSProperties } from 'react';
import { LineType } from '../Game/gameUtils/types';
import { HighLightInfo } from './constants';

const highLightStyle: CSSProperties = {
    backgroundColor: 'var(--bs-teal)',
    content: '',
    height: 'var(--nonogram-square-width)',
    position: 'absolute',

    width: '200vw',
    zIndex: '-2',
};
const TOP_INDENT = '46px';

export function HighLighter({ type, index }: HighLightInfo): JSX.Element {
    const shift: CSSProperties =
        type === LineType.ROW
            ? {
                  top: `calc(${TOP_INDENT} + 2px + (var(--nonogram-square-width) + 1px) * ${
                      index + 2
                  })`,
                  left: '-100vw',
                  height: 'var(--nonogram-square-width)',
                  width: '200vw',
              }
            : {
                  top: '-100vh',
                  left: '0',
                  height: '200vh',
                  width: 'height: var(--nonogram-square-width)',
              };
    const style: CSSProperties = {
        ...highLightStyle,
        ...shift,
    };
    return <div style={style} />;
}
