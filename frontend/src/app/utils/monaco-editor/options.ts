export const monacoEditorOptions = { 
    theme: 'vs-dark', 
    language: 'typescript',
};

export const readOnlyMonacoEditorOptions = {
    ...monacoEditorOptions,
    readOnly: true,
};
