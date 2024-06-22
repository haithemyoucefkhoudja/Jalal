import { ReactElement } from 'react';

type AwaitProps<T> = {
  promise: () => Promise<T>;
  children: (result: T) => ReactElement;
};

// Use the generic type in your function component
async function Await<T>({ promise, children }: AwaitProps<T>): Promise<ReactElement | null> {
  let result = await promise();
  if (!result) return null; // or a loading component if you'd like
  return children(result);
}

export default Await;
