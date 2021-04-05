export interface Line {
    value: string;
    content?: Content;
}

export interface Content {
    copy?: string;
    link?: Link;
}

export interface Link {
    title: string;
    url: string;
}
