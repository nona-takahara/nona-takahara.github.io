import { Image, type ImageProps } from "./image";

export type ColorModeImageProps = Omit<ImageProps, "src"> & {
    src: string;
    darkSrc?: string;
};

export function ColorModeImage({ darkSrc, ...props }: ColorModeImageProps) {
    return (
        <picture>
            {darkSrc ? (
                <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />
            ) : null}
            <Image {...props} />
        </picture>
    );
}
