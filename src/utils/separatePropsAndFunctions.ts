type PropsMock = Record<string, any> | null;
type PropsFunctionsMock = Record<string, (...args: any[]) => any> | null;

type SeparatePropsAndFunctions = (props: Record<string, any>) => {
  propsMock: PropsMock;
  functionsMock: PropsFunctionsMock;
};

export const separatePropsAndFunctions: SeparatePropsAndFunctions = (props) => {
  let propsMock: PropsMock = null;
  let functionsMock: PropsFunctionsMock = null;

  for (const [key, value] of Object.entries(props)) {
    propsMock ??= {};

    if (typeof value === 'function') {
      propsMock[key] = `[Function: ${key}]`;

      functionsMock ??= {};
      functionsMock[key] = value as (...args: any[]) => any;
    } else {
      propsMock[key] = value;
    }
  }

  return { propsMock, functionsMock };
};
