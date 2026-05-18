declare module 'image-compare-viewer' {
  interface ImageCompareOptions {
    controlColor?: string;
    controlShadow?: boolean;
    addLabels?: boolean;
    labelBefore?: string;
    labelAfter?: string;
    showLabels?: boolean;
    smoothing?: boolean;
    smoothingAmount?: number;
    hoverStart?: boolean;
    verticalMode?: boolean;
    startingPoint?: number;
    fluidMode?: boolean;
    addCircle?: boolean;
    addCircleBlur?: boolean;
  }

  export default class ImageCompare {
    constructor(element: HTMLElement, options?: ImageCompareOptions);
    mount(): ImageCompare;
  }
}
