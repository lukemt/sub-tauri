declare module '*.yaml' {
  const content: {
    messages: (string | string[])[];
  };
  export default content;
} 