declare module "react-file-icon" {
  import { FC } from "react";

  interface FileIconProps {
    extension?: string;
    color?: string;
    secondaryColor?: string;
    glyphColor?: string;
    labelColor?: string;
    labelTextColor?: string;
    type?: string;
    fold?: boolean;
    radius?: number;
    [key: string]: unknown;
  }

  export const FileIcon: FC<FileIconProps>;
  export const defaultStyles: Record<string, FileIconProps>;
}
