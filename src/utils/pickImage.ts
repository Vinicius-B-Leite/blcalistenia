import { launchImageLibrary } from 'react-native-image-picker';
import { ImageLibraryOptions } from 'react-native-image-picker/lib/typescript/types';

export const pickeImage = async () => {

    const opt: ImageLibraryOptions = {
        mediaType: 'photo',
        presentationStyle: 'popover',
        includeExtra: true
    }

    return await launchImageLibrary(opt)
}