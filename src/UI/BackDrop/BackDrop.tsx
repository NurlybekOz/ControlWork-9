
interface Props {
    show?: boolean;
    onClickBackDrop?: React.MouseEventHandler;
}

const BackDrop: React.FC<Props> = ({show = false, onClickBackDrop}) => {
    return (
        <div
            className={`modal-backdrop show`}
            style={{display: show ? 'block' : 'none', zIndex: 1}}
            onClick={onClickBackDrop}
        />
    );
};

export default BackDrop;