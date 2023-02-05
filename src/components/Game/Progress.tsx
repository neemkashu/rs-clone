import './gameStyles/Progress.scss';

const CAPTIONS = {
    progress: 'Progress',
};
// TODO: may add to tech spec changing title from id to name after solution

const { progress: progressCaption } = CAPTIONS;

const getProgress = (): string => {
    // TODO: calculates persentage from input parameters
    const progress = 78;
    return `${progress}%`;
};
const progress = getProgress();

function Progress(): JSX.Element {
    return (
        <div className="container">
            {progressCaption} {progress}
        </div>
    );
}

export default Progress;
