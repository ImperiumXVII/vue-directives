import { DirectiveBinding } from 'vue';

export const DragScroll = {
    mounted(targetElement: HTMLElement, directiveBinding: DirectiveBinding) {
        if (directiveBinding.value === false) {
            return;
        }

        const isHorizontal = directiveBinding.value.modes.includes('horizontal') || directiveBinding.value === true;
        const isVertical = directiveBinding.value.modes.includes('vertical') || directiveBinding.value === true;

        let positionRef = {
            scrollTop: 0,
            scrollLeft: 0,
            clientX: 0,
            clientY: 0,
        };
        const mouseDown = (e: MouseEvent) => {
            positionRef = {
                scrollTop: targetElement.scrollTop,
                scrollLeft: targetElement.scrollLeft,
                clientX: e.clientX,
                clientY: e.clientY,
            };
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            document.addEventListener('mouseleave', mouseLeave);
        };

        const mouseMove = (e: MouseEvent) => {
            if (isVertical) {
                const deltaY = e.clientY - positionRef.clientY;
                targetElement.scrollTop = positionRef.scrollTop - deltaY;
            }
            if (isHorizontal) {
                const deltaX = e.clientX - positionRef.clientX;
                targetElement.scrollLeft = positionRef.scrollLeft - deltaX;
            }
        };

        const mouseLeave = () => {
            document.removeEventListener('mouseleave', mouseLeave);
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };

        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };

        targetElement.addEventListener('mousedown', mouseDown);
    },
};
