import React, {useCallback, useLayoutEffect, useState} from 'react';


interface ICaptureResize {
    captureRef: React.RefObject<HTMLElement>,
    children(size: DOMRect): React.ReactElement,
}

const CaptureResize: React.FC<ICaptureResize> = (props) => {
    const {captureRef, children} = props;
    const [size, setSize] = useState<DOMRect>(new DOMRect());

    const updateSize = useCallback((): void => {
        captureRef?.current && setSize(captureRef.current.getBoundingClientRect());
    }, [captureRef]);

    useLayoutEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () =>
            window.removeEventListener("resize", updateSize);
    }, [updateSize]);
    return children(size);
}

export default CaptureResize;
