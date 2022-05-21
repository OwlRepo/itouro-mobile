import { ViewStyle } from 'react-native';
interface IOverlayProps {
    isOpen?: boolean;
    children?: any;
    useRNModalOnAndroid?: boolean;
    onRequestClose?: (() => any) | undefined;
    isKeyboardDismissable?: boolean;
    animationPreset?: 'fade' | 'slide' | 'none';
    style?: ViewStyle;
}
export declare function Overlay({ children, isOpen, useRNModalOnAndroid, isKeyboardDismissable, animationPreset, onRequestClose, style, }: IOverlayProps): JSX.Element;
export {};
