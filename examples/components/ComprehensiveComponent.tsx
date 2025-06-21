type ComprehensiveComponentProps = {
  text: string;
  nestingProp: {
    one: string;
    two: boolean;
    onNestingFn?: () => void;
  };
  onFnOne?: () => void;
  onFnTwo?: (param: string) => string;
};

export const ComprehensiveComponent: React.FC<ComprehensiveComponentProps> = (
  props
) => (
  <div>
    <div>{JSON.stringify(props)}</div>
    <button onClick={props.onFnOne} type="button">
      one
    </button>
    <button
      onClick={(): string | undefined => props.onFnTwo?.('any text')}
      type="button"
    >
      two
    </button>
    <button onClick={props.nestingProp.onNestingFn} type="button">
      nestingFn
    </button>
  </div>
);
