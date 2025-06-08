type PropsMock = Record<string, any> | null;
type FunctionsMock = Record<string, (...args: any[]) => any> | undefined;

export const separatePropsAndFunctions = (
  props: Record<string, any>
): {
  propsMock: PropsMock;
  functionsMock: FunctionsMock;
} => {
  let propsMock: PropsMock = null;
  let functionsMock: FunctionsMock = undefined;

  for (const [key, value] of Object.entries(props)) {
    propsMock ??= {};

    if (typeof value === 'function') {
      propsMock[key] = `[Function: ${key}]`;

      functionsMock ??= {};
      functionsMock[key] = value;
    } else {
      propsMock[key] = value;
    }
  }

  return { propsMock, functionsMock };
};
