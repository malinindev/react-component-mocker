import { ComprehensiveComponent } from './ComprehensiveComponent.js';

type ContainerComponentProps = {
  title: string;
  onFnOne?: () => void;
  onFnTwo?: (value: string) => string;
  onNestingFn?: () => void;
};

export const ContainerComponent: React.FC<ContainerComponentProps> = ({
  title,
  onFnOne,
  onFnTwo,
  onNestingFn,
}) => (
  <div>
    <h1>{title}</h1>
    <ComprehensiveComponent
      text="test"
      onFnOne={onFnOne}
      onFnTwo={onFnTwo}
      nestingProp={{
        one: '123',
        two: true,
        onNestingFn: onNestingFn,
      }}
    />
  </div>
);
