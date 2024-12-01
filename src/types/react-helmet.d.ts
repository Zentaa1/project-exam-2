declare module 'react-helmet' {
    import * as React from 'react';
  
    export interface HelmetAttributes {
      [key: string]: string | number | boolean | undefined;
    }
  
    export interface HelmetProps {
      base?: { href?: string };
      bodyAttributes?: HelmetAttributes;
      defaultTitle?: string;
      defer?: boolean;
      encodeSpecialCharacters?: boolean;
      htmlAttributes?: HelmetAttributes;
      link?: Array<{ rel?: string; href?: string; [key: string]: string | undefined }>;
      meta?: Array<{ name?: string; content?: string; [key: string]: string | undefined }>;
      noscript?: Array<{ innerHTML?: string; [key: string]: string | undefined }>;
      onChangeClientState?: (newState: {
        title?: string;
        baseTag?: Array<{ href?: string }>;
        metaTags?: Array<{ name?: string; content?: string }>;
        linkTags?: Array<{ rel?: string; href?: string }>;
        scriptTags?: Array<{ src?: string; type?: string }>;
        styleTags?: Array<{ cssText?: string; type?: string }>;
        [key: string]: unknown;
      }) => void;
      script?: Array<{ src?: string; type?: string; [key: string]: string | undefined }>;
      style?: Array<{ cssText?: string; type?: string; [key: string]: string | undefined }>;
      title?: string;
      titleAttributes?: HelmetAttributes;
      titleTemplate?: string;
      children?: React.ReactNode;
    }
  
    export class Helmet extends React.Component<HelmetProps> {}
  }
  